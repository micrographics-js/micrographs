# Micrographics Documentation

**84 animated micro-UI components** for React, Vue, Svelte, and Vanilla Web Components.
Dark industrial terminal aesthetic. Pure SVG. CSS custom properties. Zero runtime dependencies.

---

## Quick Start

### React

```bash
npm install @micrographics-js/react @micrographics-js/core
```

```tsx
// app/layout.tsx or src/main.tsx — call once at startup
import { initLicense } from "@micrographics-js/core";
initLicense("your-license-key");
```

```tsx
import { SignalMeter, PulseTag, RadarSweep } from "@micrographics-js/react";

export default function Dashboard() {
  return (
    <div style={{ background: "#0d0e17", padding: 20 }}>
      <SignalMeter bars={5} speed={180} />
      <PulseTag label="LIVE" />
      <RadarSweep size={80} />
    </div>
  );
}
```

### Vue 3

```bash
npm install @micrographics-js/vue @micrographics-js/core
```

```ts
// main.ts — call once at startup
import { initLicense } from "@micrographics-js/core";
initLicense("your-license-key");
```

```vue
<script setup>
import { SignalMeter, PulseTag, RadarSweep } from "@micrographics-js/vue";
</script>
<template>
  <div style="background: #0d0e17; padding: 20px">
    <SignalMeter :bars="5" :speed="180" />
    <PulseTag label="LIVE" />
    <RadarSweep :size="80" />
  </div>
</template>
```

### Svelte 5

```bash
npm install @micrographics-js/svelte @micrographics-js/core
```

```svelte
<script>
import { initLicense } from "@micrographics-js/core";
import { SignalMeter, PulseTag, RadarSweep } from "@micrographics-js/svelte";
initLicense("your-license-key"); // call once in root layout
</script>
<div style="background: #0d0e17; padding: 20px">
  <SignalMeter bars={5} speed={180} />
  <PulseTag label="LIVE" />
  <RadarSweep size={80} />
</div>
```

### Vanilla (Web Components)

```bash
npm install @micrographics-js/vanilla @micrographics-js/core
```

```html
<script type="module">
  import { initLicense } from "@micrographics-js/core";
  initLicense("your-license-key");
  import "@micrographics-js/vanilla";
</script>

<div style="background: #0d0e17; padding: 20px">
  <mg-signal-meter bars="5" speed="180"></mg-signal-meter>
  <mg-pulse-tag label="LIVE"></mg-pulse-tag>
  <mg-radar-sweep size="80"></mg-radar-sweep>
</div>
```

---

## Theming

All components use CSS custom properties. Set them on any ancestor element:

```css
:root {
  --bg:            #0d0e17;
  --bg-secondary:  #13141f;
  --fg:            #e8e8e8;
  --fg-dim:        #9a9aaa;
  --fg-dimmer:     #555566;
  --border:        rgba(255,255,255,0.07);
  --border-strong: rgba(255,255,255,0.15);
  --accent:        #3ecf8e;
  --accent-amber:  #f5a623;
  --accent-red:    #e05252;
}
```

### Override per section

```css
.my-section {
  --accent: #8b5cf6;  /* violet accent */
}
```

```tsx
<div className="my-section">
  <SignalMeter />   {/* renders in violet */}
  <PulseTag label="CUSTOM" />
</div>
```

### Per-component color override

Most components accept a `color` prop:

```tsx
<SignalMeter color="#ff6b6b" />
<PulseTag label="WARN" color="var(--accent-amber)" />
<DialGauge value={80} color="var(--accent-red)" />
```

### Preset Themes

| Theme | Accent | Background | Vibe |
|-------|--------|------------|------|
| Phosphor (default) | `#3ecf8e` | `#0d0e17` | Green terminal |
| Amber | `#f5a623` | `#0f0c00` | Warm CRT |
| Crimson | `#e05252` | `#110010` | Alert/military |
| Ice | `#60cfff` | `#050d17` | Cool HUD |
| Violet | `#a78bfa` | `#090717` | Cyberpunk |
| Mono | `#cccccc` | `#0a0a0a` | Grayscale |

---

## Tailwind CSS Integration

```bash
npm install @micrographics-js/tailwind
```

### Option A — Plugin only

```js
// tailwind.config.js
const micrographics = require("@micrographics-js/tailwind");

module.exports = {
  plugins: [micrographics.plugin],
};
```

### Option B — Full preset (recommended)

```js
// tailwind.config.js
module.exports = {
  presets: [require("@micrographics-js/tailwind/preset")],
};
```

### Tailwind utility classes

```html
<!-- Layout -->
<div class="bg-mg-bg font-mg mg-card">
  <div class="mg-panel-header">SYSTEM STATUS</div>
  <div class="mg-panel-body">
    <span class="text-mg-accent mg-glow">ONLINE</span>
  </div>
</div>

<!-- Badges -->
<span class="mg-badge mg-badge-active">ACTIVE</span>
<span class="mg-badge mg-badge-warn">DEGRADED</span>
<span class="mg-badge mg-badge-error">FAILED</span>

<!-- HUD corners -->
<div class="mg-hud relative p-8">
  <div class="mg-hud-corner mg-hud-corner-tl"></div>
  <div class="mg-hud-corner mg-hud-corner-tr"></div>
  <div class="mg-hud-corner mg-hud-corner-bl"></div>
  <div class="mg-hud-corner mg-hud-corner-br"></div>
</div>

<!-- Animations -->
<span class="animate-mg-pulse text-mg-accent">LIVE</span>
<div class="animate-mg-blink">_</div>

<!-- Scanline overlay -->
<div class="mg-scanlines">...</div>
```

### Override accent via Tailwind

```html
<div class="[--mg-accent:#8b5cf6] [--accent:#8b5cf6]">
  <SignalMeter />  <!-- renders violet -->
</div>
```

---

## Component Reference

### Pack 1 — Signals (23 components)

| Component | Key Props | Description |
|-----------|-----------|-------------|
| `SignalMeter` | `bars`, `speed`, `color` | Animated EQ-style signal bars |
| `PulseTag` | `label`, `speed`, `color` | Blinking status dot + label |
| `StatusLight` | `status: "ok"\|"warn"\|"error"\|"idle"`, `speed` | Color-coded status square |
| `HeartbeatLine` | `width`, `speed`, `color` | ECG heartbeat waveform |
| `LoadBar` | `segments`, `duration`, `color` | Segmented loading bar |
| `BootSequence` | `speed` | Multi-step boot text sequence |
| `BatteryMeter` | `level`, `charging`, `color` | Battery gauge with charge animation |
| `Uptime` | `color` | Live uptime counter (HH:MM:SS) |
| `PingIndicator` | `ms`, `color` | Ping latency display |
| `ConnectionStatus` | `connected` | Connected/disconnected badge |
| `AlertBanner` | `message`, `color` | Flashing alert bar |
| `ReadyBadge` | `color` | "READY" status badge |
| `ScanLine` | `width`, `height`, `speed` | Vertical scanning line |
| `NetworkPulse` | `color`, `speed` | Network activity pulse |
| `CPUSparkline` | `color`, `speed` | Mini CPU usage chart |
| `ErrorRate` | `count`, `color` | Error count display |
| `MemoryBar` | `used`, `total`, `color` | Memory usage bar |
| `SpinDial` | `done`, `size`, `color` | Rotating dial indicator / checkmark |
| `ScanBeam` | `width`, `height`, `speed`, `color` | Horizontal scanning beam |
| `SystemLoad` | `cores`, `width`, `height`, `color` | Multi-core CPU load bars |
| `EventTicker` | `events[]`, `speed`, `color` | Scrolling event log |
| `SignalQuality` | `quality (0-5)`, `color` | Cell signal strength bars |
| `WatchdogTimer` | `interval`, `color` | Auto-resetting watchdog countdown |

### Pack 2 — Data (11 components)

| Component | Key Props | Description |
|-----------|-----------|-------------|
| `DotChart` | `width`, `height`, `speed` | Mini scatter-plot with lines |
| `BarSparkline` | `bars`, `color` | Animated bar chart |
| `FrequencyBars` | `bars`, `color` | Audio-style frequency display |
| `BinaryStream` | `cols`, `rows`, `speed` | Animated 0/1 grid |
| `VUMeter` | `height`, `color` | Dual-channel VU meter |
| `HexDump` | `rows`, `cols` | Animated hex data display |
| `WaveformLine` | `width`, `height`, `amplitude`, `frequency` | Oscilloscope sine wave |
| `RadarSweep` | `size`, `speed`, `pings` | Circular radar with sweep arm |
| `PacketFlow` | `width`, `packets`, `speed` | Animated data packet flow |
| `HeatGrid` | `cols`, `rows`, `cellSize`, `speed` | 2D heat map grid |
| `ThermalBar` | `value`, `min`, `max`, `width` | Horizontal thermal gradient bar |

### Pack 3 — Text (12 components)

| Component | Key Props | Description |
|-----------|-----------|-------------|
| `GlitchCycler` | `words[]`, `speed` | Cycling text with glitch transition |
| `Typewriter` | `text`, `speed`, `loop` | Character-by-character typing |
| `GlitchText` | `text`, `intensity` | Text with random glitch distortion |
| `LogStream` | `maxLines`, `speed` | Streaming terminal log output |
| `CounterUp` | `target`, `duration`, `prefix`, `suffix` | Animated number counter |
| `BootLog` | `speed` | Sequential boot log messages |
| `MatrixRain` | `cols`, `rows`, `speed` | Matrix-style falling characters |
| `KanaTag` | `section`, `color` | Katakana ID label (e.g. "ジコ─001") |
| `MicroStrip` | `section`, `done` | Composite header: barcode + kana + data label + spinner |
| `WeatherStrip` | `done`, `temp`, `condition` | Weather data strip with scan animation |
| `ScrollingText` | `text`, `speed`, `width` | Horizontal ticker/marquee |
| `BinaryCounter` | `bits`, `animated`, `speed` | Binary number display |

### Pack 4 — Chrome (11 components)

| Component | Key Props | Description |
|-----------|-----------|-------------|
| `CornerOrnament` | `corner: "tl"\|"tr"\|"bl"\|"br"`, `size` | SVG corner bracket |
| `Barcode` | `seed`, `width`, `height`, `color` | Seeded barcode pattern |
| `PanelTitle` | `title`, `color` | Centered title with horizontal rules |
| `PixelDiamond` | `size`, `glow`, `color` | SVG diamond shape |
| `ChevronRow` | `direction`, `count`, `speed` | Animated chevron arrows |
| `DataLabel` | `label`, `value`, `color` | Two-tone `[LABEL\|VALUE]` badge |
| `SectorBadge` | `sector`, `zone`, `color` | Sector/zone identifier |
| `RulerTick` | `width`, `divisions`, `showLabels` | SVG ruler with tick marks |
| `CoordLabel` | `x`, `y`, `z`, `precision` | Coordinate display (X:001.23 Y:045.67) |
| `WireFrame` | `width`, `height`, `depth`, `animated` | Isometric wireframe box |
| `HexGrid` | `cols`, `rows`, `size`, `animated` | Decorative hexagonal grid |

### Pack 5 — Clocks (6 components)

| Component | Key Props | Description |
|-----------|-----------|-------------|
| `PixelClock` | `showSeconds`, `color` | Digital clock display |
| `UnixTimestamp` | `color` | Live Unix epoch time |
| `DayProgress` | `unit: "day"\|"year"\|"month"` | Percentage of time elapsed |
| `CountdownTimer` | `from`, `alertAt`, `color` | Countdown in MM:SS |
| `StopwatchDisplay` | `running`, `color` | HH:MM:SS:ms stopwatch |
| `TimezoneBar` | `zones[]`, `color` | Multi-timezone time display |

### Pack 6 — Gauges (8 components)

| Component | Key Props | Description |
|-----------|-----------|-------------|
| `DialGauge` | `value`, `min`, `max`, `size` | Semicircular dial gauge |
| `TankLevel` | `level`, `label`, `color` | Vertical tank fill indicator |
| `FlowMeter` | `direction`, `speed`, `color` | Animated flow arrows |
| `PressureGauge` | `value`, `size`, `unit`, `color` | Circular pressure dial |
| `VoltageDisplay` | `voltage`, `min`, `max`, `unit` | Vertical LED voltage bar |
| `TemperatureBar` | `value`, `min`, `max`, `unit` | Vertical thermometer bar |
| `CompassRose` | `heading`, `size`, `animated` | N/E/S/W compass with needle |
| `Speedometer` | `value`, `max`, `size`, `unit` | Half-circle speed dial |

### Pack 7 — Interaction (5 components)

| Component | Key Props | Description |
|-----------|-----------|-------------|
| `CopyButton` | `text`, `color` | Click-to-copy with confirmation |
| `RatingDots` | `value`, `max`, `color` | Diamond dot rating |
| `ToggleSwitch` | `on`, `onChange`, `label` | Industrial toggle switch |
| `NumericStepper` | `value`, `min`, `max`, `step`, `onChange` | Terminal [−] 042 [+] stepper |
| `SegmentedBar` | `value`, `segments`, `color` | Discrete segmented progress |

### Pack 8 — Orbit & Navigation (8 components)

| Component | Key Props | Description |
|-----------|-----------|-------------|
| `OrbitSystem` | `center`, `satellites[]`, `size` | Orbital system with rotating satellites |
| `TargetReticle` | `size`, `rings`, `crosshair`, `animate` | Animated targeting reticle |
| `PriorityBadge` | `level: "A"\|"B"\|"C"`, `label`, `blink` | Priority level badge |
| `RegistrationMark` | `size`, `label` | Print registration crosshair |
| `ArchiveTag` | `id`, `label`, `seed` | Archive metadata tag |
| `RadarReticle` | `size`, `targets`, `speed` | Full radar screen with targets |
| `CrosshairTarget` | `size`, `animated`, `locked` | Targeting crosshair overlay |
| `MissionStatus` | `mission`, `status`, `phase`, `total` | Mission status board |

---

## Architecture

```
packages/
  core/         # Shared utilities (RNG, easing, ticker) — no framework deps
  react/        # 84 React components (uses core)
  vue/          # 84 Vue 3 components (uses core)
  svelte/       # 49 Svelte 5 components (uses core)
  vanilla/      # 52 Vanilla Web Components (uses core)
  tailwind/     # Tailwind CSS plugin + preset (no framework deps)
apps/
  test-app/     # Vite + React gallery at localhost:5173
```

### Design Principles

1. **Pure SVG** — all visual components render `<svg>` elements, pixel-crisp with `shapeRendering="crispEdges"`
2. **CSS Custom Properties** — no hardcoded colors, fully themeable
3. **Zero runtime deps** — only `@micrographics-js/core` (tiny, shared utilities)
4. **Monospace first** — designed for `JetBrains Mono` / monospace fonts
5. **Subtle animations** — looping, non-distracting micro-animations via `createTicker()`
6. **Framework parity** — same component API across React/Vue/Svelte/Vanilla

---

## Advanced Usage

### Composing components

```tsx
import { Barcode, KanaTag, DataLabel, SpinDial, PanelTitle } from "@micrographics-js/react";

function CustomPanel({ title, children }) {
  return (
    <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px", borderBottom: "1px solid var(--border)" }}>
        <Barcode seed={42} width={40} height={10} />
        <PanelTitle title={title} />
        <SpinDial size={12} />
      </div>
      <div style={{ padding: 12 }}>
        {children}
      </div>
    </div>
  );
}
```

### Using MicroStrip as a section header

```tsx
import { MicroStrip } from "@micrographics-js/react";

<MicroStrip section="about" />
<MicroStrip section="projects" done />
```

### Building a HUD overlay

```tsx
import { CornerOrnament, CoordLabel, RadarSweep, MissionStatus } from "@micrographics-js/react";

function HUD() {
  return (
    <div style={{ position: "relative", padding: 40 }}>
      <CornerOrnament corner="tl" />
      <CornerOrnament corner="tr" />
      <CornerOrnament corner="bl" />
      <CornerOrnament corner="br" />
      <div style={{ display: "flex", gap: 20 }}>
        <RadarSweep size={100} />
        <div>
          <MissionStatus mission="ECHO-7" status="active" phase={3} total={5} />
          <CoordLabel x={12.4} y={-3.7} z={0} />
        </div>
      </div>
    </div>
  );
}
```

### Next.js App Router

All React components include `"use client"` — they work in Next.js without extra config:

```tsx
// app/dashboard/page.tsx
import { SignalMeter, PixelClock, DialGauge } from "@micrographics-js/react";

export default function DashboardPage() {
  return (
    <div className="bg-mg-bg p-8 font-mg">
      <SignalMeter />
      <PixelClock />
      <DialGauge value={72} />
    </div>
  );
}
```

---

## Browser Support

- Chrome 90+
- Firefox 90+
- Safari 15+
- Edge 90+

All components use standard SVG 1.1, CSS custom properties, and `requestAnimationFrame`. No WebGL or Canvas required.
