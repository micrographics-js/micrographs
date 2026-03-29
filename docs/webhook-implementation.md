# Micrographics — Webhook Implementation Guide

Instructions for a Claude Code agent to implement the LemonSqueezy webhook handler on erginturk.com.

---

## Overview

When a customer purchases on LemonSqueezy, a webhook fires to `erginturk.com/api/lemon-webhook`. The handler verifies the signature, identifies what was purchased, and sends the customer an email with their GitHub Packages install token.

---

## Endpoint

```
POST https://erginturk.com/api/lemon-webhook
```

**Trigger:** LemonSqueezy `order_created` event

**Signing secret:** `3b348d6084b3f08b829f683a02531f75b9bb3ee6`

Store this as env var: `LEMON_WEBHOOK_SECRET=3b348d6084b3f08b829f683a02531f75b9bb3ee6`

---

## Environment Variables Needed

```env
LEMON_WEBHOOK_SECRET=3b348d6084b3f08b829f683a02531f75b9bb3ee6
CUSTOMER_GITHUB_TOKEN=ghp_xxxxxxxxxxxxx   # Classic PAT with read:packages scope
RESEND_API_KEY=re_xxxxxxxxxxxxx           # or any email service (Resend, SendGrid, etc.)
EMAIL_FROM=support@micrographics.dev      # or noreply@erginturk.com
```

---

## Implementation

### 1. Webhook Handler (Next.js API Route)

Create `app/api/lemon-webhook/route.ts` (App Router) or `pages/api/lemon-webhook.ts` (Pages Router):

```ts
import crypto from "crypto";

// Single product — all customers get everything

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
  const expectedSignature = hmac.digest("hex");

  if (signature !== expectedSignature) {
    return new Response("Invalid signature", { status: 401 });
  }

  // 3. Parse payload
  const payload = JSON.parse(rawBody);
  const eventName = payload.meta?.event_name;

  if (eventName !== "order_created") {
    return new Response("Ignored event: " + eventName, { status: 200 });
  }

  // 4. Extract customer info
  const data = payload.data.attributes;
  const customerName = data.user_name || "Customer";
  const customerEmail = data.user_email;
  const orderId = payload.data.id;

  // 5. Send email with install instructions
  const token = process.env.CUSTOMER_GITHUB_TOKEN!;

  await sendEmail({
    to: customerEmail,
    subject: "Your Micrographics license is ready",
    body: `Hi ${customerName},

Thank you for purchasing Micrographics!

Here's how to install all 84 components:


STEP 1 — Create .npmrc in your project root:

  @micrographics-js:registry=https://npm.pkg.github.com
  //npm.pkg.github.com/:_authToken=${token}


STEP 2 — Add .npmrc to .gitignore:

  echo ".npmrc" >> .gitignore


STEP 3 — Install for your framework:

  # React
  npm install @micrographics-js/react @micrographics-js/core

  # Vue 3
  npm install @micrographics-js/vue @micrographics-js/core

  # Svelte 5
  npm install @micrographics-js/svelte @micrographics-js/core

  # Vanilla Web Components
  npm install @micrographics-js/vanilla @micrographics-js/core

  # Tailwind plugin (optional)
  npm install @micrographics-js/tailwind


DOCS: https://github.com/micrographics-js/micrographs/blob/main/docs/documentation.md
SUPPORT: Reply to this email

Order ID: ${orderId}

— Micrographics`,
  });

  console.log(`[micrographics] Order ${orderId}: ${customerEmail}`);

  return new Response("OK", { status: 200 });
}
```

### 2. Email Sending Function

Using **Resend** (recommended, free tier = 3,000 emails/month):

```ts
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
    console.error("[micrographics] Email failed:", await res.text());
  }
}
```

Or using **SendGrid**:

```ts
async function sendEmail({ to, subject, body }: { to: string; subject: string; body: string }) {
  await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.SENDGRID_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: process.env.EMAIL_FROM || "noreply@erginturk.com" },
      subject,
      content: [{ type: "text/plain", value: body }],
    }),
  });
}
```

Or using **Nodemailer** with any SMTP:

```ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

async function sendEmail({ to, subject, body }: { to: string; subject: string; body: string }) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    text: body,
  });
}
```

---

## 3. Testing

### Test locally

```bash
# Simulate a webhook (replace with your local dev URL)
curl -X POST http://localhost:3000/api/lemon-webhook \
  -H "Content-Type: application/json" \
  -H "X-Signature: $(echo -n '{"meta":{"event_name":"order_created"},"data":{"id":"12345","attributes":{"user_name":"Test User","user_email":"test@example.com","first_order_item":{"product_name":"React Bundle","variant_name":"React Bundle"}}}}' | openssl dgst -sha256 -hmac '3b348d6084b3f08b829f683a02531f75b9bb3ee6' | awk '{print $2}')" \
  -d '{"meta":{"event_name":"order_created"},"data":{"id":"12345","attributes":{"user_name":"Test User","user_email":"test@example.com","first_order_item":{"product_name":"React Bundle","variant_name":"React Bundle"}}}}'
```

### Test on LemonSqueezy

1. Create a $0 test product
2. Purchase it yourself
3. Check your email for the install instructions
4. Verify the token works: create a test project, add `.npmrc`, run `npm install @micrographics-js/react`

---

## 4. LemonSqueezy Webhook Config

1. Go to https://app.lemonsqueezy.com/settings/webhooks
2. Click "Add endpoint"
3. URL: `https://erginturk.com/api/lemon-webhook`
4. Signing secret: `3b348d6084b3f08b829f683a02531f75b9bb3ee6`
5. Events: check `order_created`
6. Save

---

## 5. File Structure

```
your-project/
├── app/
│   └── api/
│       └── lemon-webhook/
│           └── route.ts        ← the webhook handler
├── .env.local                  ← secrets (never commit)
│   LEMON_WEBHOOK_SECRET=3b348d6084b3f08b829f683a02531f75b9bb3ee6
│   CUSTOMER_GITHUB_TOKEN=ghp_xxxxxxxxxxxxx
│   RESEND_API_KEY=re_xxxxxxxxxxxxx
│   EMAIL_FROM=support@micrographics.dev
```

---

## 6. Security Checklist

- [ ] Webhook secret stored in env vars, NOT in code
- [ ] Signature verified before processing ANY data
- [ ] `.env.local` is in `.gitignore`
- [ ] GitHub token is a Classic PAT with ONLY `read:packages` scope
- [ ] Email "from" address has proper DNS (SPF/DKIM) to avoid spam folder
- [ ] Rate limiting on the endpoint (LemonSqueezy retries on failure)

---

## 7. What Happens on Purchase

```
Customer clicks "Buy" on LemonSqueezy
        ↓
LemonSqueezy processes payment
        ↓
LemonSqueezy sends POST to erginturk.com/api/lemon-webhook
  Headers: X-Signature: <hmac-sha256 of body>
  Body: { meta: { event_name: "order_created" }, data: { ... } }
        ↓
Webhook handler:
  1. Verifies X-Signature with LEMON_WEBHOOK_SECRET
  2. Extracts customer name, email, product name
  3. Looks up install packages from PRODUCT_MAP
  4. Sends email with GitHub token + npm install command
        ↓
Customer receives email:
  - .npmrc config with GitHub token
  - npm install command for their purchased packages
  - Link to docs
        ↓
Customer installs:
  npm install @micrographics-js/react @micrographics-js/core
```

---

## Agent Prompt (copy this when working on erginturk.com)

```
Implement the Micrographics LemonSqueezy webhook handler.

Read the full spec at: /path/to/micrographs/docs/webhook-implementation.md

Create POST /api/lemon-webhook that:
1. Verifies X-Signature header using HMAC-SHA256 with LEMON_WEBHOOK_SECRET
2. Parses order_created events
3. Maps product name to npm packages
4. Sends email with GitHub Packages token and install instructions
5. Uses Resend (or whatever email service is configured)

Env vars needed: LEMON_WEBHOOK_SECRET, CUSTOMER_GITHUB_TOKEN, RESEND_API_KEY, EMAIL_FROM
```
