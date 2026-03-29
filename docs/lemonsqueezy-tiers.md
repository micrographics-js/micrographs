# Micrographics — LemonSqueezy Product

## One Product. One Price. Everything Included.

---

## Product: Micrographics

**Name:** Micrographics — 84 Animated Micro-UI Components

**Price:** $49 (one-time, lifetime access)

**What the customer gets:**
- All 84 components
- All 4 frameworks: React, Vue 3, Svelte 5, Vanilla Web Components
- Tailwind CSS plugin (also free separately)
- TypeScript types
- All future updates
- npm install via GitHub Packages token

---

## Store Setup

**Store:** recursivevoid.lemonsqueezy.com (ID: 328112)
**Currency:** USD
**Tax:** Digital goods (auto-handled by LemonSqueezy)

---

## npm Packages (all included in the $49 purchase)

```
@micrographics-js/core        # shared utilities (also free on its own)
@micrographics-js/react       # 84 React components
@micrographics-js/vue         # 84 Vue 3 components
@micrographics-js/svelte      # 84 Svelte 5 components
@micrographics-js/vanilla     # 52 Vanilla Web Components
@micrographics-js/tailwind    # Tailwind CSS plugin (also free on its own)
```

---

## Free Tier (always available, no purchase needed)

```
@micrographics-js/core        # MIT — install from GitHub Packages
@micrographics-js/tailwind    # MIT — install from GitHub Packages
```

---

## Webhook Flow

```
Customer pays $49 on LemonSqueezy
        ↓
LemonSqueezy sends order_created to erginturk.com/api/lemon-webhook
        ↓
Webhook handler sends email with:
  - GitHub Packages read token
  - .npmrc setup instructions
  - npm install commands for all frameworks
        ↓
Customer installs whichever framework they use
```

---

## Webhook Config

- **Endpoint:** `https://erginturk.com/api/lemon-webhook`
- **Signing secret:** `3b348d6084b3f08b829f683a02531f75b9bb3ee6`
- **Event:** `order_created`

---

## Customer Email (sent after purchase)

```
Hi {name},

Thank you for purchasing Micrographics!

Here's how to install:

STEP 1 — Create .npmrc in your project root:

  @micrographics-js:registry=https://npm.pkg.github.com
  //npm.pkg.github.com/:_authToken={TOKEN}

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

  # Tailwind plugin (optional, also free)
  npm install @micrographics-js/tailwind

DOCS: https://github.com/micrographics-js/micrographs
SUPPORT: reply to this email

— Micrographics
```

---

## Token Distribution

All customers share the same GitHub Classic PAT (`read:packages` scope).
One token for everyone. Simple.

To create the token:
1. https://github.com/settings/tokens
2. "Generate new token (classic)"
3. Check only: `read:packages`
4. No expiration
