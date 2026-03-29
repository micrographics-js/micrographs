# Micrographics — LemonSqueezy Product & Tier Structure

## Store Setup

**Store name:** Micrographics
**Store URL:** micrographics.lemonsqueezy.com
**Currency:** USD
**Tax:** Digital goods (auto-handled by LemonSqueezy)

---

## Component Inventory (84 total across 8 packs)

| Pack | Components | Count |
|------|-----------|-------|
| Signals | SignalMeter, PulseTag, StatusLight, HeartbeatLine, LoadBar, BootSequence, BatteryMeter, Uptime, PingIndicator, ConnectionStatus, AlertBanner, ReadyBadge, ScanLine, NetworkPulse, CPUSparkline, ErrorRate, MemoryBar, SpinDial, ScanBeam, SystemLoad, EventTicker, SignalQuality, WatchdogTimer | 23 |
| Data | DotChart, BarSparkline, FrequencyBars, BinaryStream, VUMeter, HexDump, WaveformLine, RadarSweep, PacketFlow, HeatGrid, ThermalBar | 11 |
| Text | GlitchCycler, Typewriter, GlitchText, LogStream, CounterUp, BootLog, MatrixRain, KanaTag, MicroStrip, WeatherStrip, ScrollingText, BinaryCounter | 12 |
| Chrome | CornerOrnament, Barcode, PanelTitle, PixelDiamond, ChevronRow, DataLabel, SectorBadge, RulerTick, CoordLabel, WireFrame, HexGrid | 11 |
| Clocks | PixelClock, UnixTimestamp, DayProgress, CountdownTimer, StopwatchDisplay, TimezoneBar | 6 |
| Gauges | DialGauge, TankLevel, FlowMeter, PressureGauge, VoltageDisplay, TemperatureBar, CompassRose, Speedometer | 8 |
| Interaction | CopyButton, RatingDots, ToggleSwitch, NumericStepper, SegmentedBar | 5 |
| Orbit & Nav | OrbitSystem, TargetReticle, PriorityBadge, RegistrationMark, ArchiveTag, RadarReticle, CrosshairTarget, MissionStatus | 8 |

---

## npm Package Names (publish before creating products)

```
@micrographics-js/core               # always included, free peer dep
@micrographics-js/tailwind            # Tailwind CSS plugin/preset (free, drives adoption)

# Per-pack, per-framework packages
@micrographics-js/react-signals       @micrographics-js/vue-signals       @micrographics-js/svelte-signals       @micrographics-js/vanilla-signals
@micrographics-js/react-data          @micrographics-js/vue-data          @micrographics-js/svelte-data          @micrographics-js/vanilla-data
@micrographics-js/react-text          @micrographics-js/vue-text          @micrographics-js/svelte-text          @micrographics-js/vanilla-text
@micrographics-js/react-chrome        @micrographics-js/vue-chrome        @micrographics-js/svelte-chrome        @micrographics-js/vanilla-chrome
@micrographics-js/react-clocks        @micrographics-js/vue-clocks        @micrographics-js/svelte-clocks        @micrographics-js/vanilla-clocks
@micrographics-js/react-gauges        @micrographics-js/vue-gauges        @micrographics-js/svelte-gauges        @micrographics-js/vanilla-gauges
@micrographics-js/react-interact      @micrographics-js/vue-interact      @micrographics-js/svelte-interact      @micrographics-js/vanilla-interact
@micrographics-js/react-orbit         @micrographics-js/vue-orbit         @micrographics-js/svelte-orbit         @micrographics-js/vanilla-orbit
```

---

## Products & Variants

### Product 1 — Signals Pack (23 components)
**Description:** 23 animated signal & status indicators — SignalMeter, PulseTag, StatusLight, HeartbeatLine, LoadBar, BatteryMeter, SystemLoad, WatchdogTimer, SignalQuality, SpinDial, ScanBeam, EventTicker, and more.

| Variant Name             | Price | npm packages delivered |
|--------------------------|-------|------------------------|
| Signals — React          | $24   | `react-signals`        |
| Signals — Vue            | $24   | `vue-signals`          |
| Signals — Svelte         | $24   | `svelte-signals`       |
| Signals — Vanilla        | $19   | `vanilla-signals`      |
| Signals — All Frameworks | $49   | all 4 above            |

---

### Product 2 — Data Pack (11 components)
**Description:** 11 data micro-visualization components — DotChart, BarSparkline, FrequencyBars, WaveformLine, RadarSweep, PacketFlow, HeatGrid, ThermalBar, BinaryStream, VUMeter, HexDump.

| Variant Name           | Price | npm packages delivered |
|------------------------|-------|------------------------|
| Data — React           | $24   | `react-data`           |
| Data — Vue             | $24   | `vue-data`             |
| Data — Svelte          | $24   | `svelte-data`          |
| Data — Vanilla         | $19   | `vanilla-data`         |
| Data — All Frameworks  | $49   | all 4 above            |

---

### Product 3 — Text Pack (12 components)
**Description:** 12 terminal text & display components — GlitchCycler, Typewriter, GlitchText, MatrixRain, LogStream, BootLog, CounterUp, KanaTag, MicroStrip, ScrollingText, BinaryCounter, WeatherStrip.

| Variant Name           | Price | npm packages delivered |
|------------------------|-------|------------------------|
| Text — React           | $24   | `react-text`           |
| Text — Vue             | $24   | `vue-text`             |
| Text — Svelte          | $24   | `svelte-text`          |
| Text — Vanilla         | $19   | `vanilla-text`         |
| Text — All Frameworks  | $49   | all 4 above            |

---

### Product 4 — Chrome Pack (11 components)
**Description:** 11 decorative chrome & layout components — CornerOrnament, Barcode, PanelTitle, PixelDiamond, ChevronRow, DataLabel, SectorBadge, RulerTick, CoordLabel, WireFrame, HexGrid.

| Variant Name            | Price | npm packages delivered |
|-------------------------|-------|------------------------|
| Chrome — React          | $24   | `react-chrome`         |
| Chrome — Vue            | $24   | `vue-chrome`           |
| Chrome — Svelte         | $24   | `svelte-chrome`        |
| Chrome — Vanilla        | $19   | `vanilla-chrome`       |
| Chrome — All Frameworks | $49   | all 4 above            |

---

### Product 5 — Clocks Pack (6 components)
**Description:** 6 time & clock display components — PixelClock, UnixTimestamp, DayProgress, CountdownTimer, StopwatchDisplay, TimezoneBar.

| Variant Name             | Price | npm packages delivered |
|--------------------------|-------|------------------------|
| Clocks — React           | $19   | `react-clocks`         |
| Clocks — Vue             | $19   | `vue-clocks`           |
| Clocks — Svelte          | $19   | `svelte-clocks`        |
| Clocks — Vanilla         | $14   | `vanilla-clocks`       |
| Clocks — All Frameworks  | $39   | all 4 above            |

---

### Product 6 — Gauges Pack (8 components)
**Description:** 8 industrial gauge components — DialGauge, TankLevel, FlowMeter, PressureGauge, VoltageDisplay, TemperatureBar, CompassRose, Speedometer.

| Variant Name             | Price | npm packages delivered |
|--------------------------|-------|------------------------|
| Gauges — React           | $24   | `react-gauges`         |
| Gauges — Vue             | $24   | `vue-gauges`           |
| Gauges — Svelte          | $24   | `svelte-gauges`        |
| Gauges — Vanilla         | $19   | `vanilla-gauges`       |
| Gauges — All Frameworks  | $49   | all 4 above            |

---

### Product 7 — Interaction Pack (5 components)
**Description:** 5 interactive micro-UX components — CopyButton, RatingDots, ToggleSwitch, NumericStepper, SegmentedBar.

| Variant Name                 | Price | npm packages delivered |
|------------------------------|-------|------------------------|
| Interaction — React          | $14   | `react-interact`       |
| Interaction — Vue            | $14   | `vue-interact`         |
| Interaction — Svelte         | $14   | `svelte-interact`      |
| Interaction — Vanilla        | $14   | `vanilla-interact`     |
| Interaction — All Frameworks | $29   | all 4 above            |

---

### Product 8 — Orbit & Navigation Pack (8 components)
**Description:** 8 orbital, tactical, and navigation components — OrbitSystem, TargetReticle, RadarReticle, CrosshairTarget, PriorityBadge, RegistrationMark, ArchiveTag, MissionStatus.

| Variant Name                | Price | npm packages delivered |
|-----------------------------|-------|------------------------|
| Orbit & Nav — React         | $24   | `react-orbit`          |
| Orbit & Nav — Vue           | $24   | `vue-orbit`            |
| Orbit & Nav — Svelte        | $24   | `svelte-orbit`         |
| Orbit & Nav — Vanilla       | $19   | `vanilla-orbit`        |
| Orbit & Nav — All Frameworks| $49   | all 4 above            |

---

## Bundle Products

### Product 9 — React Bundle (recommended)
**All 8 packs for React.** 84 components.

| Variant      | Price | npm packages delivered                      |
|--------------|-------|---------------------------------------------|
| React Bundle | $79   | all 8 `@micrographics-js/react-*` packages     |

> Saves ~$98 vs buying individual packs ($177 total separately).

---

### Product 10 — Vue Bundle
**All 8 packs for Vue 3.** 84 components.

| Variant    | Price | npm packages delivered                    |
|------------|-------|-------------------------------------------|
| Vue Bundle | $79   | all 8 `@micrographics-js/vue-*` packages     |

---

### Product 11 — Svelte Bundle
**All 8 packs for Svelte 5.** 84 components.

| Variant       | Price | npm packages delivered                       |
|---------------|-------|----------------------------------------------|
| Svelte Bundle | $79   | all 8 `@micrographics-js/svelte-*` packages     |

---

### Product 12 — Vanilla Bundle
**All 8 packs as framework-agnostic Web Components.**

| Variant        | Price | npm packages delivered                        |
|----------------|-------|-----------------------------------------------|
| Vanilla Bundle | $59   | all 8 `@micrographics-js/vanilla-*` packages     |

---

### Product 13 — Full Library — All Frameworks
**Every pack, every framework. 32 packages total + core + tailwind.**

| Variant      | Price | npm packages delivered |
|--------------|-------|------------------------|
| Full Library | $149  | all 32 packages        |

> Best value. Saves ~$167 vs separate bundles.

---

### Product 14 — Lifetime License
**Full Library now + all future packs, components, and framework adapters forever.**

| Variant  | Price | npm packages delivered        |
|----------|-------|-------------------------------|
| Lifetime | $199  | current + all future packages |

> Recommended for agencies and freelancers billing multiple clients.

---

## Pricing Summary

| Tier | Price | What you get |
|------|-------|-------------|
| Single pack, single framework | $14–$24 | 5–23 components for one framework |
| Single pack, all frameworks | $29–$49 | 5–23 components for React + Vue + Svelte + Vanilla |
| Framework bundle | $59–$79 | All 84 components for one framework |
| Full Library | $149 | All 84 components, all 4 frameworks |
| Lifetime | $199 | Everything now + forever |

---

## Free Tier (drives adoption)

These are always free on npm:
- `@micrographics-js/core` — shared utilities (RNG, easing, tickers)
- `@micrographics-js/tailwind` — Tailwind CSS plugin + preset

---

## Webhook → npm Token Mapping

Copy this into your webhook handler `PACK_MAP`:

```ts
const PACK_MAP: Record<string, string[]> = {
  // Individual packs (variant_id → npm packages)
  "signals_react":    ["@micrographics-js/react-signals", "@micrographics-js/core"],
  "signals_vue":      ["@micrographics-js/vue-signals", "@micrographics-js/core"],
  "signals_svelte":   ["@micrographics-js/svelte-signals", "@micrographics-js/core"],
  "signals_vanilla":  ["@micrographics-js/vanilla-signals", "@micrographics-js/core"],
  "signals_all":      ["@micrographics-js/react-signals", "@micrographics-js/vue-signals", "@micrographics-js/svelte-signals", "@micrographics-js/vanilla-signals", "@micrographics-js/core"],

  "data_react":       ["@micrographics-js/react-data", "@micrographics-js/core"],
  "data_vue":         ["@micrographics-js/vue-data", "@micrographics-js/core"],
  "data_svelte":      ["@micrographics-js/svelte-data", "@micrographics-js/core"],
  "data_vanilla":     ["@micrographics-js/vanilla-data", "@micrographics-js/core"],
  "data_all":         ["@micrographics-js/react-data", "@micrographics-js/vue-data", "@micrographics-js/svelte-data", "@micrographics-js/vanilla-data", "@micrographics-js/core"],

  "text_react":       ["@micrographics-js/react-text", "@micrographics-js/core"],
  "text_vue":         ["@micrographics-js/vue-text", "@micrographics-js/core"],
  "text_svelte":      ["@micrographics-js/svelte-text", "@micrographics-js/core"],
  "text_vanilla":     ["@micrographics-js/vanilla-text", "@micrographics-js/core"],
  "text_all":         ["@micrographics-js/react-text", "@micrographics-js/vue-text", "@micrographics-js/svelte-text", "@micrographics-js/vanilla-text", "@micrographics-js/core"],

  "chrome_react":     ["@micrographics-js/react-chrome", "@micrographics-js/core"],
  "chrome_vue":       ["@micrographics-js/vue-chrome", "@micrographics-js/core"],
  "chrome_svelte":    ["@micrographics-js/svelte-chrome", "@micrographics-js/core"],
  "chrome_vanilla":   ["@micrographics-js/vanilla-chrome", "@micrographics-js/core"],
  "chrome_all":       ["@micrographics-js/react-chrome", "@micrographics-js/vue-chrome", "@micrographics-js/svelte-chrome", "@micrographics-js/vanilla-chrome", "@micrographics-js/core"],

  "clocks_react":     ["@micrographics-js/react-clocks", "@micrographics-js/core"],
  "clocks_vue":       ["@micrographics-js/vue-clocks", "@micrographics-js/core"],
  "clocks_svelte":    ["@micrographics-js/svelte-clocks", "@micrographics-js/core"],
  "clocks_vanilla":   ["@micrographics-js/vanilla-clocks", "@micrographics-js/core"],
  "clocks_all":       ["@micrographics-js/react-clocks", "@micrographics-js/vue-clocks", "@micrographics-js/svelte-clocks", "@micrographics-js/vanilla-clocks", "@micrographics-js/core"],

  "gauges_react":     ["@micrographics-js/react-gauges", "@micrographics-js/core"],
  "gauges_vue":       ["@micrographics-js/vue-gauges", "@micrographics-js/core"],
  "gauges_svelte":    ["@micrographics-js/svelte-gauges", "@micrographics-js/core"],
  "gauges_vanilla":   ["@micrographics-js/vanilla-gauges", "@micrographics-js/core"],
  "gauges_all":       ["@micrographics-js/react-gauges", "@micrographics-js/vue-gauges", "@micrographics-js/svelte-gauges", "@micrographics-js/vanilla-gauges", "@micrographics-js/core"],

  "interact_react":   ["@micrographics-js/react-interact", "@micrographics-js/core"],
  "interact_vue":     ["@micrographics-js/vue-interact", "@micrographics-js/core"],
  "interact_svelte":  ["@micrographics-js/svelte-interact", "@micrographics-js/core"],
  "interact_vanilla": ["@micrographics-js/vanilla-interact", "@micrographics-js/core"],
  "interact_all":     ["@micrographics-js/react-interact", "@micrographics-js/vue-interact", "@micrographics-js/svelte-interact", "@micrographics-js/vanilla-interact", "@micrographics-js/core"],

  "orbit_react":      ["@micrographics-js/react-orbit", "@micrographics-js/core"],
  "orbit_vue":        ["@micrographics-js/vue-orbit", "@micrographics-js/core"],
  "orbit_svelte":     ["@micrographics-js/svelte-orbit", "@micrographics-js/core"],
  "orbit_vanilla":    ["@micrographics-js/vanilla-orbit", "@micrographics-js/core"],
  "orbit_all":        ["@micrographics-js/react-orbit", "@micrographics-js/vue-orbit", "@micrographics-js/svelte-orbit", "@micrographics-js/vanilla-orbit", "@micrographics-js/core"],

  // Framework bundles
  "bundle_react":   ["@micrographics-js/react-signals", "@micrographics-js/react-data", "@micrographics-js/react-text", "@micrographics-js/react-chrome", "@micrographics-js/react-clocks", "@micrographics-js/react-gauges", "@micrographics-js/react-interact", "@micrographics-js/react-orbit", "@micrographics-js/core"],
  "bundle_vue":     ["@micrographics-js/vue-signals", "@micrographics-js/vue-data", "@micrographics-js/vue-text", "@micrographics-js/vue-chrome", "@micrographics-js/vue-clocks", "@micrographics-js/vue-gauges", "@micrographics-js/vue-interact", "@micrographics-js/vue-orbit", "@micrographics-js/core"],
  "bundle_svelte":  ["@micrographics-js/svelte-signals", "@micrographics-js/svelte-data", "@micrographics-js/svelte-text", "@micrographics-js/svelte-chrome", "@micrographics-js/svelte-clocks", "@micrographics-js/svelte-gauges", "@micrographics-js/svelte-interact", "@micrographics-js/svelte-orbit", "@micrographics-js/core"],
  "bundle_vanilla": ["@micrographics-js/vanilla-signals", "@micrographics-js/vanilla-data", "@micrographics-js/vanilla-text", "@micrographics-js/vanilla-chrome", "@micrographics-js/vanilla-clocks", "@micrographics-js/vanilla-gauges", "@micrographics-js/vanilla-interact", "@micrographics-js/vanilla-orbit", "@micrographics-js/core"],

  // Full library + lifetime (all 32 per-pack packages)
  "full_library": [
    "@micrographics-js/react-signals", "@micrographics-js/react-data", "@micrographics-js/react-text", "@micrographics-js/react-chrome", "@micrographics-js/react-clocks", "@micrographics-js/react-gauges", "@micrographics-js/react-interact", "@micrographics-js/react-orbit",
    "@micrographics-js/vue-signals", "@micrographics-js/vue-data", "@micrographics-js/vue-text", "@micrographics-js/vue-chrome", "@micrographics-js/vue-clocks", "@micrographics-js/vue-gauges", "@micrographics-js/vue-interact", "@micrographics-js/vue-orbit",
    "@micrographics-js/svelte-signals", "@micrographics-js/svelte-data", "@micrographics-js/svelte-text", "@micrographics-js/svelte-chrome", "@micrographics-js/svelte-clocks", "@micrographics-js/svelte-gauges", "@micrographics-js/svelte-interact", "@micrographics-js/svelte-orbit",
    "@micrographics-js/vanilla-signals", "@micrographics-js/vanilla-data", "@micrographics-js/vanilla-text", "@micrographics-js/vanilla-chrome", "@micrographics-js/vanilla-clocks", "@micrographics-js/vanilla-gauges", "@micrographics-js/vanilla-interact", "@micrographics-js/vanilla-orbit",
    "@micrographics-js/core"
  ],
  "lifetime": [], // same as full_library — update when new packs ship
};
```

> **Note:** Replace the string keys above with actual LemonSqueezy variant IDs after creating products in the dashboard. Format is numeric, e.g. `"123456"`.

---

## Email Template (sent after purchase)

**Subject:** Your Micrographics license is ready

```
Hi {name},

Your Micrographics license is ready. Here's how to install:

STEP 1 — Create .npmrc in your project root:

  @micrographics-js:registry=https://npm.pkg.github.com
  //npm.pkg.github.com/:_authToken={CUSTOMER_READ_TOKEN}

STEP 2 — Add .npmrc to .gitignore:

  echo ".npmrc" >> .gitignore

STEP 3 — Install your packages:

  npm install {packages}

Optional — Tailwind integration (free, no token needed):

  npm install @micrographics-js/tailwind

Docs: https://github.com/micrographics-js/micrographs
Support: support@micrographics.dev

—Micrographics
```

---

## Token Distribution

Packages are hosted on **GitHub Packages** (free). Customers get a Classic GitHub PAT with `read:packages` scope.

### Creating the customer token

1. Go to https://github.com/settings/tokens
2. **"Generate new token (classic)"** (NOT fine-grained — those don't support packages)
3. Note: `micrographics-customer-read`
4. Expiration: No expiration
5. Scopes: check **only** `read:packages`
6. Generate → copy the `ghp_xxx...` token
7. This token goes in the email template above as `{CUSTOMER_READ_TOKEN}`

> **Note:** All customers share the same read token. To revoke, delete + recreate + re-distribute.

---

## LemonSqueezy Setup Steps

1. Create store → set name, currency, logo
2. Create each Product (14 total) with correct variants
3. On each variant: set price, disable trials, enable "charge upfront"
4. Settings → Webhooks → Add endpoint:
   `https://your-vercel-app.vercel.app/api/lemon-webhook`
   Events: `order_created`
5. Copy webhook signing secret → `LEMON_WEBHOOK_SECRET` env var
6. Test with a $0 test order before going live
