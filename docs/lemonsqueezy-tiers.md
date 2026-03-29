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
@micrographics/core               # always included, free peer dep
@micrographics/tailwind            # Tailwind CSS plugin/preset (free, drives adoption)

# Per-pack, per-framework packages
@micrographics/react-signals       @micrographics/vue-signals       @micrographics/svelte-signals       @micrographics/vanilla-signals
@micrographics/react-data          @micrographics/vue-data          @micrographics/svelte-data          @micrographics/vanilla-data
@micrographics/react-text          @micrographics/vue-text          @micrographics/svelte-text          @micrographics/vanilla-text
@micrographics/react-chrome        @micrographics/vue-chrome        @micrographics/svelte-chrome        @micrographics/vanilla-chrome
@micrographics/react-clocks        @micrographics/vue-clocks        @micrographics/svelte-clocks        @micrographics/vanilla-clocks
@micrographics/react-gauges        @micrographics/vue-gauges        @micrographics/svelte-gauges        @micrographics/vanilla-gauges
@micrographics/react-interact      @micrographics/vue-interact      @micrographics/svelte-interact      @micrographics/vanilla-interact
@micrographics/react-orbit         @micrographics/vue-orbit         @micrographics/svelte-orbit         @micrographics/vanilla-orbit
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
| React Bundle | $79   | all 8 `@micrographics/react-*` packages     |

> Saves ~$98 vs buying individual packs ($177 total separately).

---

### Product 10 — Vue Bundle
**All 8 packs for Vue 3.** 84 components.

| Variant    | Price | npm packages delivered                    |
|------------|-------|-------------------------------------------|
| Vue Bundle | $79   | all 8 `@micrographics/vue-*` packages     |

---

### Product 11 — Svelte Bundle
**All 8 packs for Svelte 5.** 84 components.

| Variant       | Price | npm packages delivered                       |
|---------------|-------|----------------------------------------------|
| Svelte Bundle | $79   | all 8 `@micrographics/svelte-*` packages     |

---

### Product 12 — Vanilla Bundle
**All 8 packs as framework-agnostic Web Components.**

| Variant        | Price | npm packages delivered                        |
|----------------|-------|-----------------------------------------------|
| Vanilla Bundle | $59   | all 8 `@micrographics/vanilla-*` packages     |

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
- `@micrographics/core` — shared utilities (RNG, easing, tickers)
- `@micrographics/tailwind` — Tailwind CSS plugin + preset

---

## Webhook → npm Token Mapping

Copy this into your webhook handler `PACK_MAP`:

```ts
const PACK_MAP: Record<string, string[]> = {
  // Individual packs (variant_id → npm packages)
  "signals_react":    ["@micrographics/react-signals", "@micrographics/core"],
  "signals_vue":      ["@micrographics/vue-signals", "@micrographics/core"],
  "signals_svelte":   ["@micrographics/svelte-signals", "@micrographics/core"],
  "signals_vanilla":  ["@micrographics/vanilla-signals", "@micrographics/core"],
  "signals_all":      ["@micrographics/react-signals", "@micrographics/vue-signals", "@micrographics/svelte-signals", "@micrographics/vanilla-signals", "@micrographics/core"],

  "data_react":       ["@micrographics/react-data", "@micrographics/core"],
  "data_vue":         ["@micrographics/vue-data", "@micrographics/core"],
  "data_svelte":      ["@micrographics/svelte-data", "@micrographics/core"],
  "data_vanilla":     ["@micrographics/vanilla-data", "@micrographics/core"],
  "data_all":         ["@micrographics/react-data", "@micrographics/vue-data", "@micrographics/svelte-data", "@micrographics/vanilla-data", "@micrographics/core"],

  "text_react":       ["@micrographics/react-text", "@micrographics/core"],
  "text_vue":         ["@micrographics/vue-text", "@micrographics/core"],
  "text_svelte":      ["@micrographics/svelte-text", "@micrographics/core"],
  "text_vanilla":     ["@micrographics/vanilla-text", "@micrographics/core"],
  "text_all":         ["@micrographics/react-text", "@micrographics/vue-text", "@micrographics/svelte-text", "@micrographics/vanilla-text", "@micrographics/core"],

  "chrome_react":     ["@micrographics/react-chrome", "@micrographics/core"],
  "chrome_vue":       ["@micrographics/vue-chrome", "@micrographics/core"],
  "chrome_svelte":    ["@micrographics/svelte-chrome", "@micrographics/core"],
  "chrome_vanilla":   ["@micrographics/vanilla-chrome", "@micrographics/core"],
  "chrome_all":       ["@micrographics/react-chrome", "@micrographics/vue-chrome", "@micrographics/svelte-chrome", "@micrographics/vanilla-chrome", "@micrographics/core"],

  "clocks_react":     ["@micrographics/react-clocks", "@micrographics/core"],
  "clocks_vue":       ["@micrographics/vue-clocks", "@micrographics/core"],
  "clocks_svelte":    ["@micrographics/svelte-clocks", "@micrographics/core"],
  "clocks_vanilla":   ["@micrographics/vanilla-clocks", "@micrographics/core"],
  "clocks_all":       ["@micrographics/react-clocks", "@micrographics/vue-clocks", "@micrographics/svelte-clocks", "@micrographics/vanilla-clocks", "@micrographics/core"],

  "gauges_react":     ["@micrographics/react-gauges", "@micrographics/core"],
  "gauges_vue":       ["@micrographics/vue-gauges", "@micrographics/core"],
  "gauges_svelte":    ["@micrographics/svelte-gauges", "@micrographics/core"],
  "gauges_vanilla":   ["@micrographics/vanilla-gauges", "@micrographics/core"],
  "gauges_all":       ["@micrographics/react-gauges", "@micrographics/vue-gauges", "@micrographics/svelte-gauges", "@micrographics/vanilla-gauges", "@micrographics/core"],

  "interact_react":   ["@micrographics/react-interact", "@micrographics/core"],
  "interact_vue":     ["@micrographics/vue-interact", "@micrographics/core"],
  "interact_svelte":  ["@micrographics/svelte-interact", "@micrographics/core"],
  "interact_vanilla": ["@micrographics/vanilla-interact", "@micrographics/core"],
  "interact_all":     ["@micrographics/react-interact", "@micrographics/vue-interact", "@micrographics/svelte-interact", "@micrographics/vanilla-interact", "@micrographics/core"],

  "orbit_react":      ["@micrographics/react-orbit", "@micrographics/core"],
  "orbit_vue":        ["@micrographics/vue-orbit", "@micrographics/core"],
  "orbit_svelte":     ["@micrographics/svelte-orbit", "@micrographics/core"],
  "orbit_vanilla":    ["@micrographics/vanilla-orbit", "@micrographics/core"],
  "orbit_all":        ["@micrographics/react-orbit", "@micrographics/vue-orbit", "@micrographics/svelte-orbit", "@micrographics/vanilla-orbit", "@micrographics/core"],

  // Framework bundles
  "bundle_react":   ["@micrographics/react-signals", "@micrographics/react-data", "@micrographics/react-text", "@micrographics/react-chrome", "@micrographics/react-clocks", "@micrographics/react-gauges", "@micrographics/react-interact", "@micrographics/react-orbit", "@micrographics/core"],
  "bundle_vue":     ["@micrographics/vue-signals", "@micrographics/vue-data", "@micrographics/vue-text", "@micrographics/vue-chrome", "@micrographics/vue-clocks", "@micrographics/vue-gauges", "@micrographics/vue-interact", "@micrographics/vue-orbit", "@micrographics/core"],
  "bundle_svelte":  ["@micrographics/svelte-signals", "@micrographics/svelte-data", "@micrographics/svelte-text", "@micrographics/svelte-chrome", "@micrographics/svelte-clocks", "@micrographics/svelte-gauges", "@micrographics/svelte-interact", "@micrographics/svelte-orbit", "@micrographics/core"],
  "bundle_vanilla": ["@micrographics/vanilla-signals", "@micrographics/vanilla-data", "@micrographics/vanilla-text", "@micrographics/vanilla-chrome", "@micrographics/vanilla-clocks", "@micrographics/vanilla-gauges", "@micrographics/vanilla-interact", "@micrographics/vanilla-orbit", "@micrographics/core"],

  // Full library + lifetime (all 32 per-pack packages)
  "full_library": [
    "@micrographics/react-signals", "@micrographics/react-data", "@micrographics/react-text", "@micrographics/react-chrome", "@micrographics/react-clocks", "@micrographics/react-gauges", "@micrographics/react-interact", "@micrographics/react-orbit",
    "@micrographics/vue-signals", "@micrographics/vue-data", "@micrographics/vue-text", "@micrographics/vue-chrome", "@micrographics/vue-clocks", "@micrographics/vue-gauges", "@micrographics/vue-interact", "@micrographics/vue-orbit",
    "@micrographics/svelte-signals", "@micrographics/svelte-data", "@micrographics/svelte-text", "@micrographics/svelte-chrome", "@micrographics/svelte-clocks", "@micrographics/svelte-gauges", "@micrographics/svelte-interact", "@micrographics/svelte-orbit",
    "@micrographics/vanilla-signals", "@micrographics/vanilla-data", "@micrographics/vanilla-text", "@micrographics/vanilla-chrome", "@micrographics/vanilla-clocks", "@micrographics/vanilla-gauges", "@micrographics/vanilla-interact", "@micrographics/vanilla-orbit",
    "@micrographics/core"
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

Your npm access token for Micrographics is ready.

TOKEN: npm_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

Add this to your project's .npmrc file:

  //registry.npmjs.org/:_authToken=npm_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

Then install your pack(s):

  npm install {packages}

Docs & gallery: https://micrographics.dev
Support: support@micrographics.dev

—Micrographics
```

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
