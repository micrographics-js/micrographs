# Micrographics — Webhook & License Implementation Guide

Instructions for implementing the LemonSqueezy webhook on erginturk.com with Supabase.

---

## Architecture

```
Customer buys on LemonSqueezy ($49)
        ↓
LemonSqueezy auto-generates a license key
        ↓
LemonSqueezy sends POST to erginturk.com/api/lemon-webhook
        ↓
Webhook handler:
  1. Verifies signature
  2. Stores order + license key in Supabase
  3. Sends email with license key + install instructions
        ↓
Customer adds MICROGRAPHICS_KEY=xxx to .env
        ↓
npm install @micrographics-js/react (public npm, no token needed)
        ↓
Components auto-validate the key against LemonSqueezy API
```

**No GitHub tokens, no .npmrc, no private registry.** Packages are public on npm. License key validates at runtime.

---

## Environment Variables (erginturk.com)

```env
LEMON_WEBHOOK_SECRET=3b348d6084b3f08b829f683a02531f75b9bb3ee6
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=eyJ...                    # service role key (NOT anon)
RESEND_API_KEY=re_xxxxxxxxxxxxx                # or any email service
EMAIL_FROM=Micrographics <support@erginturk.com>
```

---

## Supabase Schema

Create this table in Supabase SQL editor:

```sql
CREATE TABLE micrographics_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),

  -- LemonSqueezy data
  order_id TEXT NOT NULL UNIQUE,
  customer_name TEXT,
  customer_email TEXT NOT NULL,
  product_name TEXT,
  variant_name TEXT,
  total_cents INTEGER,
  currency TEXT DEFAULT 'USD',

  -- License key (from LemonSqueezy)
  license_key TEXT,

  -- Status
  email_sent BOOLEAN DEFAULT false,

  -- Raw webhook payload (for debugging)
  raw_payload JSONB
);

-- Index for lookups
CREATE INDEX idx_orders_email ON micrographics_orders(customer_email);
CREATE INDEX idx_orders_license ON micrographics_orders(license_key);
```

---

## Webhook Handler

Create `app/api/lemon-webhook/route.ts`:

```ts
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function POST(req: Request) {
  // 1. Read raw body
  const rawBody = await req.text();

  // 2. Verify signature
  const signature = req.headers.get("x-signature");
  if (!signature) {
    return new Response("Missing signature", { status: 401 });
  }

  const hmac = crypto.createHmac("sha256", process.env.LEMON_WEBHOOK_SECRET!);
  hmac.update(rawBody);
  const expected = hmac.digest("hex");

  if (signature !== expected) {
    return new Response("Invalid signature", { status: 401 });
  }

  // 3. Parse payload
  const payload = JSON.parse(rawBody);
  const eventName = payload.meta?.event_name;

  if (eventName !== "order_created") {
    return new Response("OK", { status: 200 });
  }

  // 4. Extract data
  const data = payload.data.attributes;
  const customerName = data.user_name || "Customer";
  const customerEmail = data.user_email;
  const orderId = String(payload.data.id);
  const firstItem = data.first_order_item;
  const productName = firstItem?.product_name || "";
  const variantName = firstItem?.variant_name || "";
  const totalCents = data.total || 0;
  const currency = data.currency || "USD";

  // 5. Get license key from the order
  // LemonSqueezy includes license key info in the webhook payload
  // It's in: data.attributes.urls.license_key or we fetch it via API
  const licenseKey = await fetchLicenseKey(orderId);

  // 6. Store in Supabase
  const { error: dbError } = await supabase
    .from("micrographics_orders")
    .upsert({
      order_id: orderId,
      customer_name: customerName,
      customer_email: customerEmail,
      product_name: productName,
      variant_name: variantName,
      total_cents: totalCents,
      currency,
      license_key: licenseKey,
      raw_payload: payload,
    }, { onConflict: "order_id" });

  if (dbError) {
    console.error("[micrographics] DB error:", dbError);
  }

  // 7. Send email
  if (licenseKey) {
    await sendEmail({
      to: customerEmail,
      subject: "Your Micrographics license key",
      body: buildEmailBody(customerName, licenseKey, orderId),
    });

    // Mark email as sent
    await supabase
      .from("micrographics_orders")
      .update({ email_sent: true })
      .eq("order_id", orderId);
  }

  console.log(`[micrographics] Order ${orderId}: ${customerEmail} — license: ${licenseKey ? "sent" : "pending"}`);

  return new Response("OK", { status: 200 });
}

// --- Helper: Fetch license key from LemonSqueezy API ---

async function fetchLicenseKey(orderId: string): Promise<string | null> {
  // LemonSqueezy creates the license key asynchronously
  // We need to fetch it via the API using the order ID
  // The license-keys endpoint filters by order_id

  try {
    const res = await fetch(
      `https://api.lemonsqueezy.com/v1/license-keys?filter[order_id]=${orderId}`,
      {
        headers: {
          "Authorization": `Bearer ${process.env.LEMON_API_KEY}`,
          "Accept": "application/vnd.api+json",
        },
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    const keys = data.data;

    if (keys && keys.length > 0) {
      return keys[0].attributes.key;
    }

    return null;
  } catch {
    return null;
  }
}

// --- Helper: Build email body ---

function buildEmailBody(name: string, licenseKey: string, orderId: string): string {
  return `Hi ${name},

Thank you for purchasing Micrographics!

Your license key:

  ${licenseKey}


HOW TO INSTALL:

Step 1 — Install the package (no special config needed):

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
}

// --- Helper: Send email via Resend ---

async function sendEmail({ to, subject, body }: { to: string; subject: string; body: string }) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM || "Micrographics <noreply@erginturk.com>",
      to: [to],
      subject,
      text: body,
    }),
  });

  if (!res.ok) {
    console.error("[micrographics] Email error:", await res.text());
  }
}
```

---

## Additional Environment Variable

You also need the LemonSqueezy API key to fetch license keys:

```env
LEMON_API_KEY=eyJ...   # your LemonSqueezy API key
```

---

## LemonSqueezy Product Setup

1. Go to your product settings
2. Enable **"License keys"**
3. Set activation limit: **5** (allows 5 projects per customer)
4. License key length: perpetual (no expiration)

---

## How License Validation Works (client-side)

The `@micrographics-js/core` package includes a license checker:

```ts
// In customer's app — automatic (reads from env):
import { SignalMeter } from "@micrographics-js/react";
// → core auto-checks MICROGRAPHICS_KEY env var on first import
// → shows console warning if missing/invalid

// Or explicit:
import { initLicense } from "@micrographics-js/core";
initLicense("your-license-key");
```

The validation flow:
1. Component is imported → core checks `MICROGRAPHICS_KEY` env var
2. Sends `POST https://api.lemonsqueezy.com/v1/licenses/validate`
3. If valid → works silently
4. If invalid → console warning (components still render, just a warning)
5. If offline → allows usage (no network = no block)

---

## Customer Experience

```bash
# 1. Install (no .npmrc, no tokens, just npm install)
npm install @micrographics-js/react @micrographics-js/core

# 2. Add license key to .env
echo "NEXT_PUBLIC_MICROGRAPHICS_KEY=your-key-here" >> .env.local

# 3. Use
import { SignalMeter } from "@micrographics-js/react";
```

---

## Supabase Dashboard Queries

### View all orders
```sql
SELECT order_id, customer_name, customer_email, license_key, email_sent, created_at
FROM micrographics_orders
ORDER BY created_at DESC;
```

### Find order by email
```sql
SELECT * FROM micrographics_orders
WHERE customer_email = 'someone@example.com';
```

### Orders where email failed
```sql
SELECT * FROM micrographics_orders
WHERE email_sent = false AND license_key IS NOT NULL;
```

---

## Revoking a License

If someone shares their key:

1. Go to LemonSqueezy dashboard → Orders → find the order
2. Click the license key → Disable it
3. The validation API will return `valid: false` for that key
4. Customer sees console warning, can't suppress it

---

## Testing

### 1. Local test

```bash
node scripts/test-webhook.mjs
```

### 2. End-to-end test

1. Enable license keys on your LemonSqueezy product
2. Create a 100% discount code
3. Purchase with the code ($0)
4. Check Supabase — order should appear
5. Check email — license key should arrive
6. Test in a new project:
   ```bash
   npm install @micrographics-js/react @micrographics-js/core
   echo "NEXT_PUBLIC_MICROGRAPHICS_KEY=your-received-key" > .env.local
   ```
7. Import a component — no console warning = success

---

## Agent Prompt (copy when working on erginturk.com)

```
Implement the Micrographics LemonSqueezy webhook with Supabase.

Full spec: [path to micrographs]/docs/webhook-implementation.md

Summary:
1. Create Supabase table "micrographics_orders" (schema in the doc)
2. Create POST /api/lemon-webhook that:
   - Verifies X-Signature with HMAC-SHA256
   - Fetches license key from LemonSqueezy API
   - Stores order in Supabase
   - Sends email with license key via Resend
3. Env vars: LEMON_WEBHOOK_SECRET, LEMON_API_KEY, SUPABASE_URL,
   SUPABASE_SERVICE_KEY, RESEND_API_KEY, EMAIL_FROM

No GitHub tokens needed. Packages are public on npm.
License validation happens client-side via @micrographics-js/core.
```

---

## File Structure (on erginturk.com)

```
app/
  api/
    lemon-webhook/
      route.ts          ← webhook handler (code above)
.env.local              ← secrets
  LEMON_WEBHOOK_SECRET=3b348d6084b3f08b829f683a02531f75b9bb3ee6
  LEMON_API_KEY=eyJ...
  SUPABASE_URL=https://xxx.supabase.co
  SUPABASE_SERVICE_KEY=eyJ...
  RESEND_API_KEY=re_xxx
  EMAIL_FROM=Micrographics <support@erginturk.com>
```
