# @micrographics-js/vue

**84 animated micro-UI components for Vue 3.** Dark industrial terminal aesthetic. Pure SVG. Fully themeable via CSS custom properties.

Built for dashboards, HUDs, monitoring panels, developer tools, creative portfolios, and anywhere you want that retro-terminal look.

## Install

```bash
npm install @micrographics-js/vue @micrographics-js/core
```

> Requires a license token. See [setup](#setup) below.

## Quick Start

```vue
<script setup>
import { SignalMeter, PulseTag, DialGauge, RadarSweep } from "@micrographics-js/vue";
</script>

<template>
  <div style="background: #0d0e17; padding: 24px; font-family: monospace">
    <SignalMeter :bars="5" :speed="180" />
    <PulseTag label="ONLINE" />
    <DialGauge :value="72" />
    <RadarSweep :size="80" />
  </div>
</template>
```

## 84 Components across 8 Packs

**Signals (23):** SignalMeter, PulseTag, StatusLight, HeartbeatLine, LoadBar, BatteryMeter, SpinDial, ScanBeam, SystemLoad, SignalQuality, WatchdogTimer, and more.

**Data (11):** WaveformLine, RadarSweep, HeatGrid, FrequencyBars, PacketFlow, DotChart, BarSparkline, BinaryStream, VUMeter, HexDump, ThermalBar.

**Text (12):** GlitchCycler, Typewriter, GlitchText, MatrixRain, LogStream, BootLog, CounterUp, KanaTag, MicroStrip, ScrollingText, BinaryCounter, WeatherStrip.

**Chrome (11):** CornerOrnament, Barcode, PanelTitle, DataLabel, CoordLabel, RulerTick, WireFrame, HexGrid, PixelDiamond, ChevronRow, SectorBadge.

**Clocks (6):** PixelClock, UnixTimestamp, DayProgress, CountdownTimer, StopwatchDisplay, TimezoneBar.

**Gauges (8):** DialGauge, Speedometer, CompassRose, PressureGauge, TankLevel, FlowMeter, VoltageDisplay, TemperatureBar.

**Interaction (5):** CopyButton, RatingDots, ToggleSwitch, NumericStepper, SegmentedBar.

**Orbit & Nav (8):** OrbitSystem, TargetReticle, RadarReticle, CrosshairTarget, MissionStatus, PriorityBadge, RegistrationMark, ArchiveTag.

## Theming

Override CSS custom properties on any ancestor element:

```css
:root {
  --accent: #3ecf8e;   /* change this for instant theming */
}
```

Per-component: `<SignalMeter color="#8b5cf6" />`

## Setup

1. Purchase at [recursivevoid.lemonsqueezy.com](https://recursivevoid.lemonsqueezy.com)
2. Install: `npm install @micrographics-js/vue @micrographics-js/core`
3. Add your license key in your app entry:

```ts
// main.ts
import { initLicense } from "@micrographics-js/core";
initLicense("your-license-key");
```

## Tech

- Vue 3 Composition API (`<script setup lang="ts">`)
- `.vue` single-file components published as source
- All animations via `createTicker()` from `@micrographics-js/core`
- CSS custom properties only — no hardcoded colors
- SVG with `shape-rendering="crispEdges"` for pixel-perfect rendering

## License

Commercial license. Free for personal use. Purchase required for production.
