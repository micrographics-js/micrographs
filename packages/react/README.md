# @micrographics-js/react

**84 animated micro-UI components for React.** Dark industrial terminal aesthetic. Pure SVG. Fully themeable via CSS custom properties.

Built for dashboards, HUDs, monitoring panels, developer tools, creative portfolios, and anywhere you want that retro-terminal look.

## Preview

| Signals | Data | Gauges | Radar |
|---------|------|--------|-------|
| SignalMeter, PulseTag, StatusLight, HeartbeatLine, BatteryMeter, SystemLoad, WatchdogTimer... | WaveformLine, RadarSweep, HeatGrid, FrequencyBars, PacketFlow, DotChart... | DialGauge, Speedometer, CompassRose, PressureGauge, TankLevel, VoltageDisplay... | RadarReticle, CrosshairTarget, OrbitSystem, TargetReticle, MissionStatus... |

## Install

```bash
npm install @micrographics-js/react @micrographics-js/core
```

> Requires a license token. See [purchase & setup](#setup) below.

## Quick Start

```tsx
import { SignalMeter, PulseTag, DialGauge, RadarSweep } from "@micrographics-js/react";

export default function Dashboard() {
  return (
    <div style={{ background: "#0d0e17", padding: 24, fontFamily: "monospace" }}>
      <SignalMeter bars={5} speed={180} />
      <PulseTag label="ONLINE" />
      <DialGauge value={72} />
      <RadarSweep size={80} />
    </div>
  );
}
```

## Components (84)

### Pack 1 — Signals (23)
`SignalMeter` `PulseTag` `StatusLight` `HeartbeatLine` `LoadBar` `BootSequence` `BatteryMeter` `Uptime` `PingIndicator` `ConnectionStatus` `AlertBanner` `ReadyBadge` `ScanLine` `NetworkPulse` `CPUSparkline` `ErrorRate` `MemoryBar` `SpinDial` `ScanBeam` `SystemLoad` `EventTicker` `SignalQuality` `WatchdogTimer`

### Pack 2 — Data Visualization (11)
`DotChart` `BarSparkline` `FrequencyBars` `BinaryStream` `VUMeter` `HexDump` `WaveformLine` `RadarSweep` `PacketFlow` `HeatGrid` `ThermalBar`

### Pack 3 — Terminal Text (12)
`GlitchCycler` `Typewriter` `GlitchText` `LogStream` `CounterUp` `BootLog` `MatrixRain` `KanaTag` `MicroStrip` `WeatherStrip` `ScrollingText` `BinaryCounter`

### Pack 4 — Decorative Chrome (11)
`CornerOrnament` `Barcode` `PanelTitle` `PixelDiamond` `ChevronRow` `DataLabel` `SectorBadge` `RulerTick` `CoordLabel` `WireFrame` `HexGrid`

### Pack 5 — Time & Clocks (6)
`PixelClock` `UnixTimestamp` `DayProgress` `CountdownTimer` `StopwatchDisplay` `TimezoneBar`

### Pack 6 — Industrial Gauges (8)
`DialGauge` `TankLevel` `FlowMeter` `PressureGauge` `VoltageDisplay` `TemperatureBar` `CompassRose` `Speedometer`

### Pack 7 — Interaction (5)
`CopyButton` `RatingDots` `ToggleSwitch` `NumericStepper` `SegmentedBar`

### Pack 8 — Orbit & Navigation (8)
`OrbitSystem` `TargetReticle` `PriorityBadge` `RegistrationMark` `ArchiveTag` `RadarReticle` `CrosshairTarget` `MissionStatus`

## Theming

All components use CSS custom properties. Override on any ancestor:

```css
:root {
  --bg:            #0d0e17;
  --bg-secondary:  #13141f;
  --fg:            #e8e8e8;
  --fg-dim:        #9a9aaa;
  --fg-dimmer:     #555566;
  --accent:        #3ecf8e;     /* primary color — change this for instant theming */
  --accent-amber:  #f5a623;
  --accent-red:    #e05252;
  --border:        rgba(255,255,255,0.07);
  --border-strong: rgba(255,255,255,0.15);
}
```

Per-component color override:

```tsx
<SignalMeter color="#8b5cf6" />
<DialGauge value={80} color="var(--accent-red)" />
```

Per-section theme:

```css
.cyberpunk { --accent: #8b5cf6; }
```

## Tailwind CSS

```bash
npm install @micrographics-js/tailwind
```

```js
// tailwind.config.js
module.exports = {
  presets: [require("@micrographics-js/tailwind/preset")],
};
```

Then use: `bg-mg-bg`, `text-mg-accent`, `mg-card`, `mg-badge`, `mg-glow`, `animate-mg-pulse`, etc.

## Next.js

All components include `"use client"` — works out of the box with App Router:

```tsx
// app/page.tsx
import { SignalMeter, PixelClock } from "@micrographics-js/react";

export default function Page() {
  return <div className="bg-mg-bg p-8"><SignalMeter /><PixelClock /></div>;
}
```

## Setup

1. Purchase a license at [micrographics.lemonsqueezy.com](https://micrographics.lemonsqueezy.com)
2. You'll receive a GitHub token via email
3. Create `.npmrc` in your project root:

```ini
@micrographics-js:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_TOKEN
```

4. Add `.npmrc` to `.gitignore`
5. Install: `npm install @micrographics-js/react @micrographics-js/core`

## Design Principles

- **Pure SVG** — pixel-crisp rendering at any size
- **CSS custom properties** — no hardcoded colors, fully themeable
- **Zero runtime deps** — only `@micrographics-js/core` (tiny shared utils)
- **Monospace-first** — designed for JetBrains Mono / monospace fonts
- **Subtle animations** — non-distracting micro-animations via `createTicker()`
- **"use client"** — Next.js/RSC compatible out of the box

## License

Commercial license. See [LICENSE.md](https://github.com/micrographics-js/micrographs/blob/main/LICENSE.md).

Free for personal/non-commercial use. Purchase required for production.
