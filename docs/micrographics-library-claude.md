# CLAUDE.md — Micrographics UI Library

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Vision

**Micrographics** is a library of 100–200 tiny, animated terminal/industrial UI components — think signal meters, dot charts, pixel art indicators, glitch text, boot strips, corner ornaments, and more. The aesthetic is dark retro-terminal: phosphor green glows, crisp pixel edges, VHS grain, industrial readouts.

These are **not** general-purpose UI components. They are decorative-functional micro-elements meant to make a UI feel alive, technical, and handcrafted. Think the HUD overlays in a sci-fi film or the debug panels in a hacker movie — but tasteful enough to ship in a real product.

---

## Aesthetic Contract

Every component must follow these rules or it doesn't belong in the library:

- **Monospace only.** No serif, no rounded sans. `font-family: monospace` or JetBrains Mono.
- **Flat.** No drop shadows (except SVG phosphor glow via `feGaussianBlur`). No gradients.
- **Pixel-crisp or intentionally blurred.** Either `shapeRendering="crispEdges"` for sharp pixel art, or layered SVG blur for CRT glow. Nothing in between.
- **Subtle motion.** Animations are slow, looping, and never distracting. 60–180ms ticks, sine easing.
- **Dark-first, theme-aware.** All fills reference CSS custom properties (`var(--bg)`, `var(--fg)`, `var(--fg-dim)`, etc.). Never hardcode background colors.
- **No dependencies at runtime** beyond the framework adapter itself.

---

## Tech Stack

| Concern | Choice | Reason |
|---|---|---|
| Core logic | Vanilla TypeScript | Framework-agnostic, tree-shakeable |
| React adapter | React 18+ functional components | Widest user base |
| Vue adapter | Vue 3 Composition API (`<script setup>`) | Modern Vue idiom |
| Svelte adapter | Svelte 5 runes | Leanest output |
| Build | Vite + `vite-plugin-dts` | Fast, first-class library mode |
| Monorepo | pnpm workspaces | Shared types, single build pipeline |
| Package publish | npm (scoped: `@micrographics/*`) | Standard |
| Docs/demo | Astro (framework-agnostic) | Can embed all three adapters side by side |
| Testing | Vitest + Playwright for visual regression | Unit for logic, visual for pixel correctness |

---

## Repository Structure

```
micrographics/
  packages/
    core/               # Pure TS — animation logic, SVG path generators, seeded RNG
      src/
        utils/
          rng.ts        # seeded(n) LCG — deterministic random for SSR safety
          paths.ts      # pixelDiamondPath(), staircasePath(), etc.
          easing.ts     # sine, pulse helpers
        animations/
          glitch.ts     # glitchLine(), glitchText()
          typewriter.ts # async typeIn(), scramble()
          ticker.ts     # createTicker(interval, cb) — returns cleanup fn
        index.ts
    react/
      src/
        components/     # one file per component
        index.ts        # named exports
      package.json      # peerDeps: react >=18
    vue/
      src/
        components/
        index.ts
      package.json      # peerDeps: vue >=3.3
    svelte/
      src/
        components/
        index.ts
      package.json      # peerDeps: svelte >=5
  apps/
    docs/               # Astro site — component gallery + copy-paste code
  pnpm-workspace.yaml
```

---

## Architecture Pattern: Core → Adapters

All animation and rendering logic lives in `packages/core`. Framework packages are thin wrappers that:

1. Call core functions inside the framework's reactive primitive (`useEffect` / `onMounted` / `$effect`)
2. Return or render SVG/canvas output
3. Expose a consistent prop API across all three frameworks

**Example — the same component in each adapter:**

```ts
// core/src/animations/ticker.ts
export function createTicker(intervalMs: number, cb: () => void): () => void {
  const id = setInterval(cb, intervalMs);
  return () => clearInterval(id);
}
```

```tsx
// react: DotChart.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { createTicker } from "@micrographics/core";
import { seeded } from "@micrographics/core/utils/rng";

export function DotChart({ width = 9, seed = 42, color = "var(--fg-dimmer)" }) {
  const [values, setValues] = useState<number[]>(() =>
    Array.from({ length: width }, (_, i) => seeded(seed + i))
  );
  useEffect(() =>
    createTicker(180, () =>
      setValues(prev => [...prev.slice(1), Math.random()])
    ), []);
  // ... render SVG
}
```

```vue
<!-- vue: DotChart.vue -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { createTicker, seeded } from "@micrographics/core";
// identical logic, same prop API
</script>
```

```svelte
<!-- svelte: DotChart.svelte -->
<script lang="ts">
import { createTicker, seeded } from "@micrographics/core";
// identical logic via $effect rune
</script>
```

---

## Component Catalogue (Target: 150+)

Group components into thematic packs. Each pack is a logical unit for pricing/bundling.

### Pack 1 — Signal & Status (25 components)
- `SignalMeter` — N animated bars, sine wave, variable height
- `PulseTag` — blinking `◆` + label, configurable color and speed
- `StatusLight` — single dot, color-coded (green/amber/red), slow blink
- `HeartbeatLine` — ECG-style flat line with periodic spike
- `PingIndicator` — ms value with animated dot (like network ping)
- `LoadBar` — segmented horizontal bar fills left-to-right on mount
- `BootSequence` — `SYS·BOOTING` → `SYS·READY` with configurable delay
- `ConnectionStatus` — `CONN·OK` / `CONN·LOST` with flicker on state change
- `BatteryMeter` — pixel art battery segments, drain animation
- `TempGauge` — vertical bar thermometer style
- `MemoryBar` — segmented "used / total" readout
- `CPUSparkline` — tiny scrolling bar chart
- `DiskActivity` — rapid random blink like a drive LED
- `NetworkPulse` — up/down arrows with animated byte counts
- `RadioTower` — animated concentric arc rings
- `SatelliteSignal` — arc bars like mobile signal, fills on mount
- `Uptime` — live `DD:HH:MM:SS` counter
- `ProcessList` — 3–5 fake process rows with CPU%, scrolls slowly
- `QueueDepth` — animated fill showing queue fullness
- `ErrorRate` — small red blinking counter
- `ThroughputMeter` — KB/s readout with micro sparkline
- `ActiveConnections` — number that slowly increments/decrements
- `AlertBanner` — `! WARNING` text with slow amber blink
- `ReadyBadge` — `[ READY ]` bracket animation, segments appear one by one
- `ScanLine` — horizontal bar sweeps downward on loop (radar style)

### Pack 2 — Data Micro-Viz (25 components)
- `DotChart` — scrolling line chart with dot markers (our flagship)
- `BarSparkline` — vertical bar mini-chart, scrolls left
- `AreaSparkline` — filled area chart, minimal
- `ScatterDots` — static or animated random dot cluster
- `HeatRow` — single row of colored cells (log scale)
- `Histogram` — static distribution bars
- `PercentRing` — square pixel-art ring fill (not a smooth circle)
- `RadarMicro` — tiny 3–5 axis spider chart
- `CandleRow` — 5–8 OHLC candles
- `StepGraph` — step-function line chart
- `WaveformLine` — static or animating sine/square wave
- `BinaryStream` — scrolling `0 1 0 1` binary string columns
- `HexDump` — fake hex values, slowly refreshes one cell at a time
- `FrequencyBars` — audio-spectrum-style bars, sine-animated
- `LatencyHistogram` — bar chart with P50/P95/P99 markers
- `TimeseriesGhost` — two overlapping sparklines (current vs previous)
- `GeoCoords` — animating decimal lat/lng readout
- `AltitudeMeter` — vertical scrolling number
- `CompassRose` — rotating N/E/S/W indicator, pixel art
- `VUMeter` — classic VU style two-column bars
- `OscilloscopeTrace` — bouncing X/Y Lissajous dot
- `RollCounter` — slot-machine style digit roller
- `PieSliceMicro` — tiny pixel-art pie, one slice highlighted
- `DeltaBadge` — `▲ +3.2%` or `▼ -1.1%` with color
- `RangeSlider` — read-only, shows value on a notched track

### Pack 3 — Terminal Text Effects (20 components)
- `GlitchCycler` — cycles sentences with scramble + type-in (our existing one)
- `Typewriter` — types a string char by char, configurable speed
- `GlitchText` — static text with periodic random char corruption
- `ScanReveal` — text appears line by line with scan-bar effect
- `MatrixRain` — columnar falling chars (contained, not full-screen)
- `PromptLine` — `> ` prefix + blinking cursor, optionally type-in
- `CodeComment` — `// ...` or `/* */` style comment reveal
- `LogStream` — fake scrolling log lines, configurable entries
- `ErrorFlash` — text flashes red on mount, fades to normal
- `LoadingDots` — `...` growing dot sequence
- `CounterUp` — number counts up from 0 to target
- `CounterDown` — countdown to 0, then fires callback
- `CharsScramble` — one-time scramble → resolve to real text
- `TerminalPrompt` — full `user@host:~$` prompt with cursor
- `PasswordMask` — types then masks with `*` chars
- `BootLog` — multi-line boot log with staggered line reveal
- `VersionTag` — `v1.0.0` with occasional patch increment blink
- `BracketReveal` — `[ ........... ]` fills with `█` on mount
- `HexAddress` — animating hex address `0x3F2A...`
- `CipherText` — ROT13-style decode animation

### Pack 4 — Decorative Chrome (25 components)
- `CornerOrnament` — L-shaped corner bracket (TL/TR/BL/BR variants)
- `Barcode` — seeded vertical bar barcode (decorative only)
- `ScanBeam` — moving horizontal scan line inside a box
- `CRTVignette` — CSS-only dark vignette overlay for CRT feel
- `ScanlineOverlay` — thin horizontal line pattern overlay
- `NoiseTexture` — canvas static noise, configurable intensity
- `GridOverlay` — faint dot-grid or line-grid background
- `BorderPulse` — border that slowly pulses opacity
- `SegmentedBorder` — dashed border with segment-by-segment draw animation
- `GlitchFrame` — box that occasionally shifts/tears
- `PanelTitle` — label with flanking `──` lines and small barcode
- `StatusStrip` — bottom strip with coords + status + barcode
- `CrosshairOverlay` — centered crosshair lines with label
- `FilmStrip` — repeating frame markers along an edge
- `TapeLabel` — rotated label badge (like a VHS tape)
- `RulerTick` — horizontal ruler with tick marks and numbers
- `WaypointMarker` — circle + crosshair, map-pin style
- `DataLabel` — `KEY: VALUE` pair in a bordered chip
- `PacketFrame` — `┌──[PACKET]──┐` wrapper with child content
- `HorizonLine` — single rule with center label
- `FrequencyGrid` — static grid with faint dotted lines
- `PixelDiamond` — standalone diamond indicator (our timeline dot)
- `ChevronRow` — `>>> ` or `<<< ` animating chevron stream
- `GlyphBadge` — single large block glyph in a small box
- `StaticNoiseLine` — single-line horizontal noise bar

### Pack 5 — Time & Clocks (15 components)
- `PixelClock` — HH:MM:SS in pixel/segment font
- `BinaryClock` — time displayed as binary columns
- `AnalogDial` — minimal SVG dial with tick marks, no hands (just sectors)
- `UnixTimestamp` — live Unix epoch counter
- `DayProgress` — `DAY 73.4%` style progress for day/year
- `Stopwatch` — start/stop/reset, pixel font
- `CountdownTimer` — to a target date, shows D:H:M:S
- `CalendarWeek` — 7 tiny boxes, today highlighted
- `TimezoneStack` — 2–3 city times stacked
- `ElapsedBadge` — `+02:14 ago` style elapsed display
- `ProgressToDate` — visual year/quarter/month completion bar
- `SunriseSunset` — arc showing day/night position
- `PulseClock` — time displayed as pulse widths
- `CronExpression` — displays a cron string with next-run countdown
- `TickCounter` — raw frame or tick count incrementing

### Pack 6 — Industrial Gauges (20 components)
- `DialGauge` — arc gauge with needle, min/max/value
- `HorizontalSlider` — read-only notched track
- `VerticalSlider` — same, vertical
- `PressureGauge` — concentric rings filling from center
- `FlowMeter` — animated chevrons moving in one direction
- `ValveIndicator` — open/closed pixel art valve icon
- `TankLevel` — rectangular tank filling with fluid
- `PipelineStatus` — segmented pipe with flow direction arrow
- `ToggleSwitch` — pixel art flip switch, on/off state
- `CircuitBreaker` — pixel art breaker, trip animation
- `FuseIndicator` — blown/intact fuse pixel art
- `PowerReading` — watts/volts/amps readout panel
- `RPMMeter` — tachometer-style arc, animated
- `VoltageBar` — positive/negative split bar
- `AmpDraw` — row of block segments
- `TemperatureReadout` — C° / F° with trend arrow
- `HumidityCell` — droplet fill gauge
- `WindSpeed` — arrow with animated tail lines
- `BarometricTrend` — up/flat/down indicator with history dots
- `RadiationMeter` — slowly spinning fan blade pixel art

### Pack 7 — Interaction Micro-UX (15 components)
- `TooltipTerminal` — glitch-reveal tooltip (our existing pattern)
- `HoverReveal` — content hidden behind `[CLASSIFIED]` until hover
- `ClickRipple` — pixel art ripple on click
- `DragHandle` — `⣿` style drag affordance with hover state
- `CopyButton` — `[COPY]` → `[COPIED ✓]` with glitch transition
- `ExpandCollapse` — `[+]` / `[-]` toggle with height animation
- `LoadingButton` — button that shows `....` while loading
- `KeyboardShortcut` — `⌘K` or `CTRL+K` badge
- `ContextTag` — small `[TAG]` chip with hover color shift
- `SwipeHint` — animated `< swipe >` indicator
- `PinInput` — 4–6 block cells for PIN entry, pixel style
- `SearchPrompt` — `> _` search bar with type-in cursor
- `ModalHeader` — `┌──[ TITLE ]──────────────────────┐`
- `ProgressButton` — button border traces clockwise on loading
- `RatingDots` — 5 `◆` diamonds, filled to rating value

---

## CSS Custom Properties Contract

All components rely on these tokens. Consuming projects must define them:

```css
:root {
  --bg:          #0d0e17;   /* main background */
  --bg-secondary:#13141f;   /* panel / tooltip background */
  --fg:          #e8e8e8;   /* primary text / active elements */
  --fg-dim:      #9a9aaa;   /* secondary text */
  --fg-dimmer:   #555566;   /* tertiary / decorative */
  --border:      rgba(255,255,255,0.07);
  --border-strong: rgba(255,255,255,0.15);
  --accent:      #3ecf8e;   /* phosphor green — primary glow color */
  --accent-amber:#f5a623;   /* warning / alternate accent */
  --accent-red:  #e05252;   /* error / alert */
}
```

Light theme overrides swap `--bg`/`--fg` as needed. Components never hardcode colors — they only reference these tokens.

---

## Key Implementation Patterns

### Seeded RNG (for SSR safety)
Components that need deterministic random values (barcodes, initial chart values) use a simple LCG seeded by a prop, not `Math.random()`.

```ts
// packages/core/src/utils/rng.ts
export function seeded(n: number): number {
  const x = Math.sin(n + 1) * 10000;
  return x - Math.floor(x);
}
```

### Pixel Art SVG Paths
Diagonal lines in SVG anti-alias. For pixel-crisp diamonds, staircases, and blocky shapes, build paths from axis-aligned segments only, then add `shapeRendering="crispEdges"`.

```ts
// packages/core/src/utils/paths.ts
export function pixelDiamondPath(cx: number, cy: number, u = 2): string {
  return [
    `M ${cx-u},${cy-3*u}`, `L ${cx+u},${cy-3*u}`,
    `L ${cx+u},${cy-2*u}`, `L ${cx+2*u},${cy-2*u}`,
    `L ${cx+2*u},${cy-u}`, `L ${cx+3*u},${cy-u}`,
    `L ${cx+3*u},${cy+u}`, `L ${cx+2*u},${cy+u}`,
    `L ${cx+2*u},${cy+2*u}`, `L ${cx+u},${cy+2*u}`,
    `L ${cx+u},${cy+3*u}`, `L ${cx-u},${cy+3*u}`,
    `L ${cx-u},${cy+2*u}`, `L ${cx-2*u},${cy+2*u}`,
    `L ${cx-2*u},${cy+u}`, `L ${cx-3*u},${cy+u}`,
    `L ${cx-3*u},${cy-u}`, `L ${cx-2*u},${cy-u}`,
    `L ${cx-2*u},${cy-2*u}`, `L ${cx-u},${cy-2*u}`, "Z",
  ].join(" ");
}
```

### Phosphor Glow Filter
For border-only glow (fill stays clean), isolate stroke pixels via alpha morphology:

```svg
<filter id="glow" x="-300%" y="-300%" width="700%" height="700%">
  <!-- Extract just the stroke edge -->
  <feMorphology in="SourceAlpha" operator="erode" radius="1" result="inner"/>
  <feComposite in="SourceAlpha" in2="inner" operator="out" result="strokeAlpha"/>
  <!-- Colorise to accent -->
  <feFlood floodColor="var(--accent)" floodOpacity="1" result="color"/>
  <feComposite in="color" in2="strokeAlpha" operator="in" result="strokeColored"/>
  <!-- Blur layers -->
  <feGaussianBlur in="strokeColored" stdDeviation="5" result="halo"/>
  <feGaussianBlur in="strokeColored" stdDeviation="1.5" result="bloom"/>
  <feMerge>
    <feMergeNode in="halo"/>
    <feMergeNode in="bloom"/>
    <feMergeNode in="SourceGraphic"/>
  </feMerge>
</filter>
```

### Animation Pattern (async + cancellation)
All text/glitch animations use async generators with a cancellation flag to be safe in all three frameworks:

```ts
// packages/core/src/animations/typewriter.ts
export async function typeIn(
  text: string,
  onChar: (s: string) => void,
  isCancelled: () => boolean,
  charDelay = 20,
): Promise<void> {
  for (let i = 1; i <= text.length; i++) {
    if (isCancelled()) return;
    onChar(text.slice(0, i));
    await new Promise<void>(r => setTimeout(r, charDelay));
  }
}

export async function scramble(
  length: number,
  onFrame: (s: string) => void,
  isCancelled: () => boolean,
  rounds = 4,
  frameDelay = 40,
): Promise<void> {
  const CHARS = "█▓▒░▄▀■╗╔═║┼╱╲±×÷";
  for (let r = 0; r < rounds; r++) {
    if (isCancelled()) return;
    onFrame(Array.from({ length }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join(""));
    await new Promise<void>(r => setTimeout(r, frameDelay));
  }
}
```

### Canvas Pixel Art
For canvas-based components (noise, pixel plants, bitmap patterns):
- Logical canvas size is small (e.g., `200×100`)
- Scale up via CSS `width: 100%; image-rendering: pixelated`
- Draw with `ctx.fillRect(x, y, 1, 1)` — each logical pixel renders as a crisp block

---

## Build Configuration

```ts
// vite.config.ts (per adapter package)
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es", "cjs"],
      fileName: (fmt) => `index.${fmt === "es" ? "mjs" : "cjs"}`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "vue", "svelte"], // peer deps
    },
  },
  plugins: [dts({ rollupTypes: true })],
});
```

---

## Packaging & Selling

- **Scoped packages:** `@micrographics/react`, `@micrographics/vue`, `@micrographics/svelte`, `@micrographics/core`
- **Packs as optional installs:** e.g. `@micrographics/react-signals`, `@micrographics/react-gauges` — buyers can cherry-pick
- **License:** Commercial license per project (not per developer). Use Lemon Squeezy for payments.
- **Demo site:** Astro app at `micrographics.dev` (or similar) — every component rendered live in dark + light mode with copy-paste code snippets for all three frameworks
- **Docs pattern:** Each component page shows: preview → props table → React/Vue/Svelte tab with code → CSS variables used

---

## Commands

```bash
# Install all packages
pnpm install

# Build all packages
pnpm -r build

# Dev (docs site with live reload)
pnpm --filter docs dev

# Type check all
pnpm -r exec tsc --noEmit

# Test
pnpm -r test
```
