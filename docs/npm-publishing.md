# Micrographics — npm Publishing Guide

## How it works

```
@micrographics/core       → PUBLIC  (free, drives adoption)
@micrographics/tailwind   → PUBLIC  (free, drives adoption)
@micrographics/react      → RESTRICTED (requires npm token)
@micrographics/vue        → RESTRICTED (requires npm token)
@micrographics/svelte     → RESTRICTED (requires npm token)
@micrographics/vanilla    → RESTRICTED (requires npm token)
```

**Token-based access:** After a customer purchases via LemonSqueezy, they receive a read-only npm token. They add it to their project's `.npmrc` to install restricted packages.

---

## Initial Setup (one-time)

### 1. Create the npm organization

```bash
# Log in to npm
npm login

# Create the @micrographics org (must be done on npmjs.com)
# Go to: https://www.npmjs.com/org/create
# Org name: micrographics
# Plan: Teams ($7/month) — required for private/restricted packages
```

### 2. Build all packages

```bash
pnpm build
```

This compiles:
- `packages/core/` → `packages/core/dist/`
- `packages/react/` → `packages/react/dist/`
- `packages/vanilla/` → `packages/vanilla/dist/`

Vue, Svelte, and Tailwind publish source directly (no build step needed).

### 3. Publish free packages first

```bash
# These are public — anyone can install them
pnpm --filter @micrographics/core publish --access public --no-git-checks
pnpm --filter @micrographics/tailwind publish --access public --no-git-checks
```

### 4. Publish paid packages

```bash
# These are restricted — require org membership or token
pnpm --filter @micrographics/react publish --access restricted --no-git-checks
pnpm --filter @micrographics/vue publish --access restricted --no-git-checks
pnpm --filter @micrographics/svelte publish --access restricted --no-git-checks
pnpm --filter @micrographics/vanilla publish --access restricted --no-git-checks
```

Or all at once:
```bash
pnpm publish:all
```

---

## Creating Customer Tokens

### Option A: Shared read-only token (simple, good for start)

1. Go to https://www.npmjs.com/settings/YOUR_USERNAME/tokens
2. Click "Generate New Token"
3. Select **Granular Access Token**
4. Settings:
   - Name: `micrographics-customer-read`
   - Expiration: No expiration (or 1 year)
   - Permissions: **Read-only**
   - Packages: Select all `@micrographics/*` packages
5. Copy the token
6. This is the token you distribute to all customers

### Option B: Per-customer tokens via npm API (advanced)

```ts
// In your LemonSqueezy webhook handler
const response = await fetch("https://registry.npmjs.org/-/npm/v1/tokens", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${process.env.NPM_AUTOMATION_TOKEN}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    password: process.env.NPM_PASSWORD,
    readonly: true,
  }),
});
const { token } = await response.json();
// Store and email this token to the customer
```

---

## Customer Installation Guide

After purchase, customers receive this in their email:

```
TOKEN: npm_xxxxxxxxxxxxxxxxxxxx

Step 1: Create .npmrc in your project root:

  echo "//registry.npmjs.org/:_authToken=npm_xxxxxxxxxxxxxxxxxxxx" > .npmrc
  echo "@micrographics:registry=https://registry.npmjs.org/" >> .npmrc

Step 2: Add .npmrc to .gitignore:

  echo ".npmrc" >> .gitignore

Step 3: Install:

  npm install @micrographics/react @micrographics/core
```

---

## Version Bumping

```bash
# Bump all packages to same version
pnpm -r exec -- npm version patch  # 0.1.0 → 0.1.1
pnpm -r exec -- npm version minor  # 0.1.0 → 0.2.0
pnpm -r exec -- npm version major  # 0.1.0 → 1.0.0

# Then rebuild and republish
pnpm build
pnpm publish:all
```

---

## Revoking Access

If you need to revoke a customer's access:

### Shared token approach
1. Revoke the current token on npmjs.com
2. Generate a new token
3. Email new token to all valid customers
4. (Not ideal — use per-customer tokens if possible)

### Per-customer token approach
1. Delete the specific customer's token via npm API
2. No other customers affected

---

## Webhook Flow (LemonSqueezy → npm token → customer)

```
Customer purchases on LemonSqueezy
        ↓
LemonSqueezy sends webhook to your API
        ↓
Webhook handler:
  1. Validates signature (LEMON_WEBHOOK_SECRET)
  2. Looks up variant_id in PACK_MAP
  3. Creates/retrieves npm read token
  4. Sends email with token + package names
        ↓
Customer adds token to .npmrc
Customer runs: npm install @micrographics/react
```

---

## Package Contents

What gets published to npm:

| Package | Published files | Size (approx) |
|---------|----------------|---------------|
| `@micrographics/core` | `dist/` (JS + d.ts) + `src/` | ~15 KB |
| `@micrographics/react` | `dist/` (JS + d.ts) | ~120 KB |
| `@micrographics/vue` | `src/` (.vue + .ts) | ~100 KB |
| `@micrographics/svelte` | `src/` (.svelte + .ts) | ~90 KB |
| `@micrographics/vanilla` | `dist/` (JS + d.ts) | ~80 KB |
| `@micrographics/tailwind` | `src/` (JS) + README | ~8 KB |
