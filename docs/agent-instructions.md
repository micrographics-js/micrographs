# Micrographics Webhook — Agent Instructions for erginturk.com

## What to Build

A single API route `POST /api/lemon-webhook` that handles LemonSqueezy purchase webhooks for the Micrographics component library. When a customer buys Micrographics ($49), this endpoint receives the webhook, fetches the license key from LemonSqueezy, stores the order in Supabase, and emails the customer their license key with install instructions.

---

## Step 1: Create Supabase Table

Run this SQL in the Supabase SQL editor (or create a migration):

```sql
CREATE TABLE micrographics_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  order_id TEXT NOT NULL UNIQUE,
  customer_name TEXT,
  customer_email TEXT NOT NULL,
  product_name TEXT,
  variant_name TEXT,
  total_cents INTEGER,
  currency TEXT DEFAULT 'USD',
  license_key TEXT,
  email_sent BOOLEAN DEFAULT false,
  raw_payload JSONB
);

CREATE INDEX idx_micrographics_orders_email ON micrographics_orders(customer_email);
CREATE INDEX idx_micrographics_orders_license ON micrographics_orders(license_key);
```

---

## Step 2: Environment Variables

These env vars **already exist** in the project's `.env.local`:

```env
# Already present:
NEXT_PUBLIC_SUPABASE_URL=https://ewqwzjdorazlaovmmrxo.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<already set>
RESEND_API_KEY=<already set>
EMAIL_FROM=contact@erginturk.com
EMAIL_SALES_ALIAS=sales@erginturk.com

# Micrographics-specific (already added):
LEMON_WEBHOOK_SECRET=3b348d6084b3f08b829f683a02531f75b9bb3ee6
LEMON_API_KEY=<already set>
```

**Important env var names in this project:**
- Supabase URL: `NEXT_PUBLIC_SUPABASE_URL` (not `SUPABASE_URL`)
- Supabase service key: `SUPABASE_SERVICE_ROLE_KEY` (not `SUPABASE_SERVICE_KEY`)
- Email from: use `EMAIL_FROM` (`contact@erginturk.com`) or `EMAIL_SALES_ALIAS` (`sales@erginturk.com`)
- Site URL: `NEXT_PUBLIC_SITE_URL` = `https://erginturk.com`

No new env vars need to be added — everything is already configured.

---

## Step 3: Create the Webhook Route

Create `app/api/lemon-webhook/route.ts`:

```ts
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const rawBody = await req.text();

  // Verify webhook signature
  const signature = req.headers.get("x-signature");
  if (!signature) return new Response("Missing signature", { status: 401 });

  const hmac = crypto.createHmac("sha256", process.env.LEMON_WEBHOOK_SECRET!);
  hmac.update(rawBody);
  if (signature !== hmac.digest("hex")) {
    return new Response("Invalid signature", { status: 401 });
  }

  const payload = JSON.parse(rawBody);
  if (payload.meta?.event_name !== "order_created") {
    return new Response("OK", { status: 200 });
  }

  // Extract order data
  const attrs = payload.data.attributes;
  const orderId = String(payload.data.id);
  const customerName = attrs.user_name || "Customer";
  const customerEmail = attrs.user_email;
  const firstItem = attrs.first_order_item;
  const productName = firstItem?.product_name || "";
  const variantName = firstItem?.variant_name || "";
  const totalCents = attrs.total || 0;
  const currency = attrs.currency || "USD";

  // Fetch license key from LemonSqueezy
  let licenseKey: string | null = null;
  try {
    const res = await fetch(
      `https://api.lemonsqueezy.com/v1/license-keys?filter[order_id]=${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.LEMON_API_KEY}`,
          Accept: "application/vnd.api+json",
        },
      }
    );
    if (res.ok) {
      const data = await res.json();
      if (data.data?.length > 0) {
        licenseKey = data.data[0].attributes.key;
      }
    }
  } catch (e) {
    console.error("[micrographics] Failed to fetch license key:", e);
  }

  // If no license key yet (LemonSqueezy may be slow), retry once after 2s
  if (!licenseKey) {
    await new Promise((r) => setTimeout(r, 2000));
    try {
      const res = await fetch(
        `https://api.lemonsqueezy.com/v1/license-keys?filter[order_id]=${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.LEMON_API_KEY}`,
            Accept: "application/vnd.api+json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        if (data.data?.length > 0) {
          licenseKey = data.data[0].attributes.key;
        }
      }
    } catch {}
  }

  // Store in Supabase
  await supabase.from("micrographics_orders").upsert(
    {
      order_id: orderId,
      customer_name: customerName,
      customer_email: customerEmail,
      product_name: productName,
      variant_name: variantName,
      total_cents: totalCents,
      currency,
      license_key: licenseKey,
      raw_payload: payload,
    },
    { onConflict: "order_id" }
  );

  // Send email with license key
  if (licenseKey) {
    const emailBody = `Hi ${customerName},

Thank you for purchasing Micrographics!

Your license key:

  ${licenseKey}


HOW TO INSTALL:

Step 1 — Install (no tokens or .npmrc needed):

  npm install @micrographics-js/react @micrographics-js/core

  # Or for other frameworks:
  # npm install @micrographics-js/vue @micrographics-js/core
  # npm install @micrographics-js/svelte @micrographics-js/core
  # npm install @micrographics-js/vanilla @micrographics-js/core

Step 2 — Add your license key to .env:

  MICROGRAPHICS_KEY=${licenseKey}

  # For Next.js:
  NEXT_PUBLIC_MICROGRAPHICS_KEY=${licenseKey}

  # For Vite:
  VITE_MICROGRAPHICS_KEY=${licenseKey}

Step 3 — Use components:

  import { SignalMeter, DialGauge, RadarSweep } from "@micrographics-js/react";

That's it! The license validates automatically.

Optional — Tailwind plugin (free):
  npm install @micrographics-js/tailwind


DOCS: https://github.com/micrographics-js/micrographs
SUPPORT: Reply to this email

Order: ${orderId}

— Micrographics`;

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Micrographics <${process.env.EMAIL_SALES_ALIAS || process.env.EMAIL_FROM || "contact@erginturk.com"}>`,
        to: [customerEmail],
        subject: "Your Micrographics license key",
        text: emailBody,
      }),
    });

    if (emailRes.ok) {
      await supabase
        .from("micrographics_orders")
        .update({ email_sent: true })
        .eq("order_id", orderId);
    } else {
      console.error("[micrographics] Email failed:", await emailRes.text());
    }
  }

  console.log(
    `[micrographics] Order ${orderId}: ${customerEmail} — key: ${licenseKey ? "sent" : "pending"}`
  );

  return new Response("OK", { status: 200 });
}
```

---

## Step 4: Install Dependencies (if not already present)

```bash
npm install @supabase/supabase-js    # likely already installed
npm install resend                    # optional, we use fetch directly
```

Actually, the code above uses raw `fetch` for both LemonSqueezy API and Resend, so **no new dependencies are needed** if the project already has `@supabase/supabase-js`.

---

## Step 5: Deploy and Test

1. Deploy to production
2. On LemonSqueezy: Settings → Webhooks → verify endpoint is `https://erginturk.com/api/lemon-webhook`
3. Create a 100% discount code
4. Buy the product with the discount ($0)
5. Check:
   - Supabase `micrographics_orders` table — order should appear
   - Email inbox — license key email should arrive
   - `email_sent` should be `true`

---

## How It All Connects

```
LemonSqueezy (sells the product, generates license keys)
        ↓ webhook (order_created)
erginturk.com/api/lemon-webhook
        ↓ fetches license key from LemonSqueezy API
        ↓ stores order in Supabase
        ↓ sends email via Resend
Customer
        ↓ npm install @micrographics-js/react (public npm, no auth)
        ↓ adds MICROGRAPHICS_KEY=xxx to .env
        ↓ components auto-validate against LemonSqueezy License API
Works!
```

---

## Important Notes

- **No GitHub tokens** — packages are public on npm, anyone can install
- **License validation** happens client-side in `@micrographics-js/core` — it calls `POST https://api.lemonsqueezy.com/v1/licenses/validate` with the key
- **If validation fails** — components still render but show a console warning
- **If offline** — components work (no network = no validation = no block)
- **Revoking a key** — disable it in LemonSqueezy dashboard, validation will fail on next check
- **Activation limit** — set to 5 in LemonSqueezy (5 projects per license)

---

## Supabase Env Variable Names

This project uses:

```ts
process.env.NEXT_PUBLIC_SUPABASE_URL    // "https://ewqwzjdorazlaovmmrxo.supabase.co"
process.env.SUPABASE_SERVICE_ROLE_KEY   // service role key (for server-side writes)
```

The webhook handler uses the **service role key** (not the anon key) because it needs to write to the database without RLS restrictions. The anon key is `NEXT_PUBLIC_SUPABASE_ANON_KEY` — do NOT use that for the webhook.

---

## Quick Agent Prompt

```
Read /Users/erginturk/Desktop/loeve-projects/micrographs/docs/agent-instructions.md and implement everything:
1. Create Supabase table micrographics_orders (SQL in the doc)
2. Create app/api/lemon-webhook/route.ts (full code in the doc)
3. All env vars are already in .env.local (LEMON_WEBHOOK_SECRET, LEMON_API_KEY, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY, EMAIL_FROM, EMAIL_SALES_ALIAS)
4. Also debug email delivery — emails from Resend may not be arriving. Check Resend dashboard, DNS records for erginturk.com (SPF/DKIM), and verify the FROM address (contact@erginturk.com or sales@erginturk.com) is verified in Resend.
5. Test with: create 100% discount on LemonSqueezy, buy $0, check Supabase + email
```
