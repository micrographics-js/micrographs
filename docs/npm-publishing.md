# Micrographics — Publishing & Distribution Guide

## Architecture

```
FREE (npmjs.org — public, no auth needed)
├── @micrographics-js/core
└── @micrographics-js/tailwind

PAID (GitHub Packages — private, token-gated)
├── @micrographics-js/react
├── @micrographics-js/vue
├── @micrographics-js/svelte
└── @micrographics-js/vanilla
```

**How it works:**
- Free packages are on npmjs.org — anyone can `npm install @micrographics-js/core`
- Paid packages are on GitHub Packages — requires a GitHub token
- After LemonSqueezy purchase → customer gets a GitHub token → adds to `.npmrc` → installs normally
- Core + tailwind are ALSO published to GitHub Packages so paid customers only need one registry config

---

## Initial Setup (one-time)

### 1. Create `micrographics` GitHub organization

1. Go to https://github.com/organizations/plan
2. Create org: `micrographics` (free plan is fine)
3. Transfer repo: `RecursiveVoid/micrographs` → `micrographics/micrographs`
   - Repo Settings → Danger Zone → Transfer ownership → `micrographics`

### 2. Log in to both registries

```bash
# Log in to npmjs (for free packages)
npm login

# Log in to GitHub Packages (for paid packages)
npm login --registry=https://npm.pkg.github.com
# Username: your-github-username
# Password: your GitHub PAT with `write:packages` scope
# Email: your email
```

Or create a `.npmrc` in the repo root (for publishing only, don't commit this):

```ini
# For publishing to GitHub Packages
//npm.pkg.github.com/:_authToken=ghp_YOUR_GITHUB_PAT_WITH_WRITE_PACKAGES
```

### 3. Build all packages

```bash
pnpm build
```

### 4. Publish

```bash
# Publish free packages to npmjs
pnpm publish:free

# Publish paid packages to GitHub Packages
pnpm publish:paid

# Also publish core+tailwind to GitHub Packages (so paid customers only need one registry)
pnpm publish:gh-free

# Or do everything:
pnpm publish:all && pnpm publish:gh-free
```

---

## Creating Customer Tokens

After a LemonSqueezy purchase, you need to give the customer a GitHub token that can read packages.

### Option A: Fine-grained PAT (recommended)

1. Go to https://github.com/settings/tokens?type=beta
2. Click "Generate new token"
3. Settings:
   - Name: `micrographics-customer-{order_id}`
   - Expiration: No expiration
   - Resource owner: `micrographics` (the org)
   - Repository access: Only select repositories → `micrographics/micrographs`
   - Permissions → Packages: **Read**
4. Generate token
5. Send to customer

### Option B: Shared classic PAT (simpler for start)

1. Go to https://github.com/settings/tokens
2. Generate new token (classic)
3. Select scope: `read:packages` only
4. No expiration
5. Use this ONE token for all customers
6. To revoke a customer: revoke the token and create a new one (affects all customers)

### Option C: Automate via LemonSqueezy webhook (advanced)

```ts
// api/lemon-webhook.ts (Vercel/Next.js API route)
import crypto from "crypto";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("x-signature");

  // Verify webhook signature
  const hmac = crypto.createHmac("sha256", process.env.LEMON_WEBHOOK_SECRET!);
  hmac.update(body);
  if (hmac.digest("hex") !== sig) return new Response("Invalid", { status: 401 });

  const data = JSON.parse(body);
  const email = data.data.attributes.user_email;
  const name = data.data.attributes.user_name;
  const variantId = data.data.attributes.first_order_item.variant_id;

  // Look up which packages this variant includes
  const packages = VARIANT_MAP[variantId];

  // Send email with the shared token + install instructions
  await sendEmail({
    to: email,
    subject: "Your Micrographics license is ready",
    body: `Hi ${name},

Your Micrographics packages are ready to install.

Step 1 — Create .npmrc in your project root:

  @micrographics:registry=https://npm.pkg.github.com
  //npm.pkg.github.com/:_authToken=${process.env.CUSTOMER_READ_TOKEN}

Step 2 — Install:

  npm install ${packages.join(" ")}

Docs: https://micrographics.dev
Support: support@micrographics.dev`,
  });

  return new Response("OK");
}
```

---

## Customer Installation Guide

This is what the customer receives after purchase:

```
Your Micrographics packages are ready.

Step 1 — Create .npmrc in your project root:

  @micrographics:registry=https://npm.pkg.github.com
  //npm.pkg.github.com/:_authToken=ghp_xxxxxxxxxxxx

Step 2 — Add .npmrc to .gitignore:

  echo ".npmrc" >> .gitignore

Step 3 — Install your packages:

  npm install @micrographics-js/react @micrographics-js/core

  # or for Vue:
  npm install @micrographics-js/vue @micrographics-js/core

  # or for Svelte:
  npm install @micrographics-js/svelte @micrographics-js/core

  # or for Vanilla Web Components:
  npm install @micrographics-js/vanilla @micrographics-js/core

Optional — Tailwind integration:

  npm install @micrographics-js/tailwind

Docs & gallery: https://micrographics.dev
```

---

## Version Bumping & Republishing

```bash
# Bump version across all packages
pnpm -r --filter './packages/*' exec npm version patch

# Rebuild and republish
pnpm build
pnpm publish:all
pnpm publish:gh-free
```

---

## Revoking Access

### If using shared token
1. Delete the token on GitHub: https://github.com/settings/tokens
2. Create a new token
3. Update `CUSTOMER_READ_TOKEN` in your webhook handler
4. Email new token to all valid customers

### If using per-customer tokens
1. Delete only that customer's token
2. No other customers affected

---

## Pricing → Package Mapping

```ts
const VARIANT_MAP: Record<string, string[]> = {
  // Framework bundles (most common purchase)
  "react_bundle":   ["@micrographics-js/react", "@micrographics-js/core"],
  "vue_bundle":     ["@micrographics-js/vue", "@micrographics-js/core"],
  "svelte_bundle":  ["@micrographics-js/svelte", "@micrographics-js/core"],
  "vanilla_bundle": ["@micrographics-js/vanilla", "@micrographics-js/core"],

  // Full library
  "full_library": [
    "@micrographics-js/react", "@micrographics-js/vue",
    "@micrographics-js/svelte", "@micrographics-js/vanilla",
    "@micrographics-js/core"
  ],

  // Lifetime (same as full, just different license terms)
  "lifetime": [
    "@micrographics-js/react", "@micrographics-js/vue",
    "@micrographics-js/svelte", "@micrographics-js/vanilla",
    "@micrographics-js/core"
  ],
};
```

> **Note:** Since we publish ONE package per framework (not per-pack), the variant mapping is simpler. All customers who buy any React pack get the full `@micrographics-js/react` package. The pricing tiers are about perceived value, not technical access control.

---

## Cost Summary

| Service | Cost |
|---------|------|
| npmjs (public packages) | $0 |
| GitHub Packages (private) | $0 (free for orgs) |
| GitHub org | $0 (free plan) |
| LemonSqueezy | 5% + payment processing |
| **Total infrastructure** | **$0/month** |
