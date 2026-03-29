# LemonSqueezy Store Setup

One product. One price. Everything included.

---

## Create the Product

Go to: https://app.lemonsqueezy.com/products → **New Product**

**Name:** `Micrographics — 84 Animated Micro-UI Components`

**Price:** $49 (one-time)

**Image:** Upload `docs/assets/products/png/micrographics-product.png`

**Description** (paste into rich text editor):

```
84 animated micro-UI components for React, Vue 3, Svelte 5 & Vanilla Web Components.

Dark industrial terminal aesthetic. Pure SVG. Fully themeable via CSS custom properties. Zero dependencies. TypeScript included.

What's included:
• 84 production-ready animated components across 8 packs
• All 4 framework adapters (React, Vue 3, Svelte 5, Vanilla Web Components)
• Tailwind CSS plugin + preset
• Full TypeScript types
• Lifetime updates — all future components included
• npm install via GitHub Packages

Components:
Signals (23) — SignalMeter, PulseTag, StatusLight, HeartbeatLine, BatteryMeter, SystemLoad, RadarSweep, WatchdogTimer...
Data Viz (11) — WaveformLine, HeatGrid, FrequencyBars, PacketFlow, DotChart, ThermalBar...
Text (12) — Typewriter, GlitchText, MatrixRain, ScrollingText, KanaTag, BinaryCounter...
Chrome (11) — Barcode, CornerOrnament, DataLabel, CoordLabel, WireFrame, HexGrid...
Clocks (6) — PixelClock, CountdownTimer, StopwatchDisplay, TimezoneBar...
Gauges (8) — DialGauge, Speedometer, CompassRose, PressureGauge, TankLevel...
Interaction (5) — ToggleSwitch, NumericStepper, SegmentedBar, CopyButton...
Orbit & Nav (8) — OrbitSystem, RadarReticle, CrosshairTarget, MissionStatus...

After purchase you'll receive an email with your npm install token and setup instructions.

Docs: https://github.com/micrographics-js/micrographs
```

---

## After Creating the Product

### 1. Set up webhook

1. Go to https://app.lemonsqueezy.com/settings/webhooks
2. Click "Add endpoint"
3. URL: `https://erginturk.com/api/lemon-webhook`
4. Signing secret: `3b348d6084b3f08b829f683a02531f75b9bb3ee6`
5. Events: check `order_created`
6. Save

### 2. Create customer read token

1. https://github.com/settings/tokens
2. "Generate new token (classic)" — NOT fine-grained
3. Check only: `read:packages`
4. No expiration
5. Save as `CUSTOMER_GITHUB_TOKEN` env var on erginturk.com

### 3. Test

1. Create a 100% discount code on LemonSqueezy
2. Purchase the product with the discount ($0)
3. Verify the webhook fires and email arrives
4. Test the token: create a new project, add `.npmrc`, run `npm install @micrographics-js/react`
