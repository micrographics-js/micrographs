# Micrographics — Website Integration Guide

How to add a live Micrographics demo section to your website.

---

## 1. Install

```bash
# For a React/Next.js site
npm install @micrographics/react @micrographics/core

# Optional: Tailwind integration
npm install @micrographics/tailwind
```

## 2. Add CSS Variables

If NOT using the Tailwind plugin, add these variables to your global CSS:

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

If using Tailwind, the plugin handles this automatically.

## 3. Import the Font

Micrographics looks best with JetBrains Mono:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
```

## 4. Create a Demo Section

### Option A — Full-page showcase

```tsx
// components/MicrographicsDemo.tsx
"use client";
import {
  SignalMeter, PulseTag, StatusLight, HeartbeatLine, BatteryMeter,
  DialGauge, TankLevel, Speedometer, CompassRose, PressureGauge,
  RadarSweep, OrbitSystem, TargetReticle, MissionStatus,
  PixelClock, CountdownTimer, DayProgress,
  WaveformLine, HeatGrid, PacketFlow, FrequencyBars,
  Typewriter, GlitchText, MatrixRain, ScrollingText,
  Barcode, DataLabel, CornerOrnament, CoordLabel, RulerTick,
  CopyButton, ToggleSwitch, SegmentedBar,
} from "@micrographics/react";

function DemoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: "var(--bg-secondary)",
      border: "1px solid var(--border)",
      padding: 16,
      display: "flex",
      flexDirection: "column",
      gap: 10,
    }}>
      <span style={{
        fontFamily: "JetBrains Mono, monospace",
        fontSize: 9,
        color: "var(--fg-dimmer)",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      }}>{title}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        {children}
      </div>
    </div>
  );
}

export default function MicrographicsDemo() {
  return (
    <section style={{
      background: "var(--bg)",
      color: "var(--fg)",
      fontFamily: "JetBrains Mono, monospace",
      padding: "60px 40px",
    }}>
      {/* Header */}
      <div style={{ marginBottom: 40, borderBottom: "1px solid var(--border-strong)", paddingBottom: 20 }}>
        <h2 style={{ fontSize: 24, color: "var(--accent)", letterSpacing: "0.1em", margin: 0 }}>
          MICROGRAPHICS
        </h2>
        <p style={{ fontSize: 11, color: "var(--fg-dimmer)", margin: "6px 0 0" }}>
          84 animated micro-UI components for React, Vue, Svelte & Vanilla
        </p>
        <div style={{ display: "flex", gap: 16, marginTop: 12, alignItems: "center" }}>
          <PulseTag label="LIVE DEMO" />
          <PixelClock showSeconds={false} />
        </div>
      </div>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: 12,
      }}>
        <DemoCard title="Signal Meter">
          <SignalMeter bars={5} speed={180} />
        </DemoCard>

        <DemoCard title="Status Lights">
          <StatusLight status="ok" />
          <StatusLight status="warn" />
          <StatusLight status="error" />
          <PulseTag label="ONLINE" />
        </DemoCard>

        <DemoCard title="Heartbeat">
          <HeartbeatLine width={120} speed={1200} />
        </DemoCard>

        <DemoCard title="Battery">
          <BatteryMeter level={0.75} />
        </DemoCard>

        <DemoCard title="Dial Gauge">
          <DialGauge value={72} />
        </DemoCard>

        <DemoCard title="Tank Level">
          <TankLevel level={0.6} label="FUEL" />
        </DemoCard>

        <DemoCard title="Speedometer">
          <Speedometer value={60} size={80} />
        </DemoCard>

        <DemoCard title="Compass">
          <CompassRose heading={45} size={60} animated />
        </DemoCard>

        <DemoCard title="Pressure">
          <PressureGauge value={65} size={60} />
        </DemoCard>

        <DemoCard title="Radar">
          <RadarSweep size={70} />
        </DemoCard>

        <DemoCard title="Orbit System">
          <OrbitSystem center="SYS" size={100} />
        </DemoCard>

        <DemoCard title="Target Reticle">
          <TargetReticle size={64} />
        </DemoCard>

        <DemoCard title="Mission">
          <MissionStatus mission="ECHO-7" status="active" phase={3} total={5} />
        </DemoCard>

        <DemoCard title="Waveform">
          <WaveformLine width={120} height={30} />
        </DemoCard>

        <DemoCard title="Heat Grid">
          <HeatGrid cols={8} rows={4} />
        </DemoCard>

        <DemoCard title="Frequency">
          <FrequencyBars bars={10} />
        </DemoCard>

        <DemoCard title="Packet Flow">
          <PacketFlow />
        </DemoCard>

        <DemoCard title="Typewriter">
          <Typewriter text="SYSTEM ONLINE" loop />
        </DemoCard>

        <DemoCard title="Glitch">
          <GlitchText text="MICROGRAPHICS" intensity={0.15} />
        </DemoCard>

        <DemoCard title="Matrix Rain">
          <MatrixRain cols={6} rows={4} />
        </DemoCard>

        <DemoCard title="Ticker">
          <ScrollingText text="MICROGRAPHICS · SYSTEM ONLINE · ALL STATIONS NOMINAL" width={160} />
        </DemoCard>

        <DemoCard title="Countdown">
          <CountdownTimer from={300} />
        </DemoCard>

        <DemoCard title="Day Progress">
          <DayProgress unit="day" />
        </DemoCard>

        <DemoCard title="Barcode + Label">
          <Barcode seed={42} width={60} height={16} />
          <DataLabel label="STATUS" value="ACTIVE" />
        </DemoCard>

        <DemoCard title="Coordinates">
          <CoordLabel x={12.4} y={-3.7} z={0} />
        </DemoCard>

        <DemoCard title="Ruler">
          <RulerTick width={140} divisions={10} />
        </DemoCard>

        <DemoCard title="Copy Button">
          <CopyButton text="npm install @micrographics/react" />
        </DemoCard>

        <DemoCard title="Toggle">
          <ToggleSwitch label="ACTIVE" />
        </DemoCard>

        <DemoCard title="Progress">
          <SegmentedBar value={60} segments={10} />
        </DemoCard>
      </div>

      {/* CTA */}
      <div style={{ marginTop: 40, textAlign: "center" }}>
        <p style={{ fontSize: 11, color: "var(--fg-dimmer)", letterSpacing: "0.1em" }}>
          84 COMPONENTS · REACT · VUE · SVELTE · VANILLA
        </p>
        <a
          href="https://micrographics.lemonsqueezy.com"
          style={{
            display: "inline-block",
            marginTop: 12,
            padding: "8px 24px",
            border: "1px solid var(--accent)",
            color: "var(--accent)",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 12,
            letterSpacing: "0.1em",
            textDecoration: "none",
          }}
        >
          GET MICROGRAPHICS →
        </a>
      </div>
    </section>
  );
}
```

### Option B — Inline widget (embed in existing page)

```tsx
import { SignalMeter, PulseTag, DialGauge, RadarSweep, PixelClock } from "@micrographics/react";

function MiniWidget() {
  return (
    <div style={{
      background: "#0d0e17",
      border: "1px solid rgba(255,255,255,0.1)",
      padding: 20,
      fontFamily: "JetBrains Mono, monospace",
      display: "inline-flex",
      gap: 16,
      alignItems: "center",
    }}>
      <RadarSweep size={50} />
      <div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
          <PulseTag label="LIVE" />
          <PixelClock showSeconds={false} />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <SignalMeter bars={4} />
          <DialGauge value={72} size={40} />
        </div>
      </div>
    </div>
  );
}
```

### Option C — Vanilla Web Components (any site, no framework)

```html
<script type="module">
  import "https://unpkg.com/@micrographics/vanilla";
</script>

<style>
  .mg-demo {
    --bg: #0d0e17;
    --fg: #e8e8e8;
    --fg-dimmer: #555566;
    --accent: #3ecf8e;
    --border: rgba(255,255,255,0.07);
    background: var(--bg);
    padding: 24px;
    font-family: "JetBrains Mono", monospace;
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }
</style>

<div class="mg-demo">
  <mg-signal-meter bars="5" speed="180"></mg-signal-meter>
  <mg-dial-gauge value="72" size="60"></mg-dial-gauge>
  <mg-radar-sweep size="60"></mg-radar-sweep>
  <mg-pulse-tag label="LIVE"></mg-pulse-tag>
  <mg-pixel-clock></mg-pixel-clock>
</div>
```

---

## 5. Next.js Specific Notes

- All React components have `"use client"` — no RSC issues
- Use dynamic import if you want to lazy-load:

```tsx
import dynamic from "next/dynamic";
const MicrographicsDemo = dynamic(() => import("./MicrographicsDemo"), { ssr: false });
```

- For Tailwind in Next.js, add the preset to `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";
import micrographicsPreset from "@micrographics/tailwind/preset";

const config: Config = {
  presets: [micrographicsPreset],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
};
export default config;
```

---

## 6. Performance

- Components are **lightweight**: each is a single function/class, no virtual DOM library
- SVG rendering is GPU-accelerated in all modern browsers
- Animations use `setInterval` (not `requestAnimationFrame`) for predictable timing
- Cleanup functions prevent memory leaks on unmount
- Typical bundle contribution: **~1-3 KB per component** (minified, no gzip)

---

## 7. Accessibility

- All SVG elements accept `role` and `aria-label` props
- StatusLight and PulseTag use semantic color coding
- Interactive components (ToggleSwitch, NumericStepper) support keyboard events
- Animations respect `prefers-reduced-motion` when configured via CSS:

```css
@media (prefers-reduced-motion: reduce) {
  :root { --mg-animation-speed: 0; }
}
```
