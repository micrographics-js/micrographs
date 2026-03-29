# Micrographics — Component Reference

84 components. Every prop, every default, every example.

---

## Theming (applies to all components)

All components use CSS custom properties. Override at any level:

```css
/* Global theme */
:root {
  --accent:        #3ecf8e;   /* primary color (green) */
  --accent-amber:  #f5a623;   /* warning */
  --accent-red:    #e05252;   /* error/alert */
  --bg:            #0d0e17;   /* background */
  --bg-secondary:  #13141f;   /* card background */
  --fg:            #e8e8e8;   /* primary text */
  --fg-dim:        #9a9aaa;   /* secondary text */
  --fg-dimmer:     #555566;   /* muted text */
  --border:        rgba(255,255,255,0.07);
  --border-strong: rgba(255,255,255,0.15);
}

/* Override per section */
.danger-zone { --accent: #e05252; }
.cool-zone   { --accent: #60cfff; }
```

Most components also accept a `color` prop for per-instance override:

```tsx
<SignalMeter color="#8b5cf6" />
<DialGauge color="var(--accent-amber)" />
```

---

## License Setup

```bash
npm install @micrographics-js/react @micrographics-js/core
```

Add this **once** in your app entry point:

```tsx
// Next.js: app/layout.tsx
// Vite: src/main.tsx
import { initLicense } from "@micrographics-js/core";
initLicense("your-license-key");
```

> **Note:** `initLicense()` is the recommended approach for all frameworks. Environment variables (`VITE_MICROGRAPHICS_KEY`) work in Vite but NOT in Next.js (env vars aren't accessible from `node_modules`).

---

## Pack 1 — Signals (23 components)

### SignalMeter
Animated EQ-style signal strength bars.
```tsx
<SignalMeter bars={5} color="var(--accent)" speed={180} width={40} height={24} />
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `bars` | number | 5 | Number of bars |
| `color` | string | `var(--accent)` | Bar color |
| `speed` | number | 180 | Animation speed (ms) |
| `width` | number | 40 | SVG width |
| `height` | number | 24 | SVG height |

### PulseTag
Blinking status dot with label.
```tsx
<PulseTag label="LIVE" color="var(--accent)" speed={800} />
<PulseTag label="RECORDING" color="var(--accent-red)" speed={400} />
```
| Prop | Type | Default |
|------|------|---------|
| `label` | string | `"LIVE"` |
| `color` | string | `var(--accent)` |
| `speed` | number | 800 |

### StatusLight
Color-coded blinking status square.
```tsx
<StatusLight status="ok" />
<StatusLight status="warn" speed={500} />
<StatusLight status="error" />
<StatusLight status="idle" />
```
| Prop | Type | Default |
|------|------|---------|
| `status` | `"ok" \| "warn" \| "error" \| "idle"` | `"ok"` |
| `speed` | number | 1000 |

### HeartbeatLine
ECG-style heartbeat waveform.
```tsx
<HeartbeatLine width={80} height={24} color="var(--accent)" speed={1200} />
<HeartbeatLine width={120} color="var(--accent-red)" speed={800} />
```
| Prop | Type | Default |
|------|------|---------|
| `width` | number | 80 |
| `height` | number | 24 |
| `color` | string | `var(--accent)` |
| `speed` | number | 1200 |

### LoadBar
Segmented loading progress bar.
```tsx
<LoadBar segments={12} color="var(--accent)" duration={1200} width={96} height={8} />
```
| Prop | Type | Default |
|------|------|---------|
| `segments` | number | 12 |
| `color` | string | `var(--accent)` |
| `duration` | number | 1200 |
| `width` | number | 96 |
| `height` | number | 8 |

### BootSequence
Animated boot text: "SYS·BOOTING" → "SYS·READY".
```tsx
<BootSequence delay={2000} color="var(--accent)" />
```
| Prop | Type | Default |
|------|------|---------|
| `delay` | number | 2000 |
| `color` | string | `var(--accent)` |

### BatteryMeter
Battery gauge with charge animation.
```tsx
<BatteryMeter level={0.75} charging={false} />
<BatteryMeter level={0.15} />           {/* shows red */}
<BatteryMeter level={0.5} charging />   {/* animated charge */}
```
| Prop | Type | Default |
|------|------|---------|
| `level` | number (0-1) | 0.75 |
| `charging` | boolean | false |
| `width` | number | 28 |
| `height` | number | 14 |

### Uptime
Live uptime counter (HH:MM:SS).
```tsx
<Uptime color="var(--fg)" />
<Uptime startMs={Date.now() - 86400000} />  {/* start from 24h ago */}
```
| Prop | Type | Default |
|------|------|---------|
| `startMs` | number | now |
| `color` | string | `var(--fg)` |

### PingIndicator
Ping latency display with blinking dot.
```tsx
<PingIndicator ms={24} color="var(--accent)" speed={2000} />
```
| Prop | Type | Default |
|------|------|---------|
| `ms` | number | 42 |
| `color` | string | `var(--accent)` |
| `speed` | number | 2000 |

### ConnectionStatus
Connected/disconnected text badge.
```tsx
<ConnectionStatus connected={true} />    {/* CONN·OK (green) */}
<ConnectionStatus connected={false} />   {/* CONN·LOST (red) */}
```

### AlertBanner
Flashing warning banner.
```tsx
<AlertBanner message="THRESHOLD EXCEEDED" speed={600} />
```
| Prop | Type | Default |
|------|------|---------|
| `message` | string | `"WARNING"` |
| `speed` | number | 600 |

### ReadyBadge
"READY" status badge.
```tsx
<ReadyBadge color="var(--accent)" />
```

### ScanLine
Vertical scanning line animation.
```tsx
<ScanLine width={60} height={40} color="var(--accent)" speed={60} />
```

### NetworkPulse
Network up/down activity display.
```tsx
<NetworkPulse upKbps={128} downKbps={512} speed={500} />
```

### CPUSparkline
Mini CPU usage chart with percentage.
```tsx
<CPUSparkline color="var(--accent)" speed={500} bars={16} height={24} />
```

### ErrorRate
Error count display.
```tsx
<ErrorRate count={3} speed={1500} />
```

### MemoryBar
Memory usage bar with label.
```tsx
<MemoryBar used={6.4} total={16} unit="GB" segments={10} color="var(--accent)" />
```

### SpinDial
Rotating dial indicator / checkmark when done.
```tsx
<SpinDial done={false} color="var(--accent)" size={16} />
<SpinDial done={true} />  {/* shows checkmark */}
```

### ScanBeam
Horizontal scanning beam with gradient.
```tsx
<ScanBeam width={80} height={4} color="var(--accent)" speed={50} />
```

### SystemLoad
Multi-core CPU load bars.
```tsx
<SystemLoad cores={4} width={60} height={20} color="var(--accent)" speed={200} />
```

### EventTicker
Scrolling event text display.
```tsx
<EventTicker events={["SYS_INIT", "PKT_RECV", "AUTH_OK"]} speed={1800} color="var(--fg)" width={100} />
```

### SignalQuality
5-bar cellular signal strength (like phone signal).
```tsx
<SignalQuality quality={4} width={24} height={16} color="var(--accent)" />
```
| Prop | Type | Default |
|------|------|---------|
| `quality` | number (0-5) | 3 |

### WatchdogTimer
Countdown arc that resets automatically.
```tsx
<WatchdogTimer interval={5000} color="var(--accent)" onBark={() => console.log("bark!")} />
```

---

## Pack 2 — Data Visualization (11 components)

### DotChart
Mini scatter-plot with connecting lines.
```tsx
<DotChart width={9} height={32} color="var(--accent)" speed={180} seed={42} />
```

### BarSparkline
Animated bar chart.
```tsx
<BarSparkline bars={12} color="var(--accent)" height={32} speed={200} />
```

### FrequencyBars
Audio-style frequency analyzer.
```tsx
<FrequencyBars bars={8} color="var(--accent)" height={32} speed={80} />
```

### BinaryStream
Animated 0/1 grid with random bit flips.
```tsx
<BinaryStream cols={8} rows={5} speed={120} color="var(--fg-dimmer)" />
```

### VUMeter
Dual-channel VU meter with colored segments.
```tsx
<VUMeter color="var(--accent)" speed={80} height={40} />
```

### HexDump
Animated hex data display.
```tsx
<HexDump rows={4} cols={8} speed={200} color="var(--fg-dimmer)" seed={42} />
```

### WaveformLine
Oscilloscope-style sine waveform.
```tsx
<WaveformLine width={80} height={30} color="var(--accent)" amplitude={0.35} frequency={2} speed={60} />
```
| Prop | Type | Default |
|------|------|---------|
| `amplitude` | number | 0.35 |
| `frequency` | number | 2 |

### RadarSweep
Circular radar with sweeping arm and random pings.
```tsx
<RadarSweep size={60} color="var(--accent)" speed={40} pings={3} />
```

### PacketFlow
Animated data packets moving along a line.
```tsx
<PacketFlow width={80} height={12} color="var(--accent)" packets={4} speed={40} />
```

### HeatGrid
2D heat map grid with animated cells.
```tsx
<HeatGrid cols={8} rows={4} cellSize={6} speed={120} />
```

### ThermalBar
Horizontal gradient bar (cool → hot).
```tsx
<ThermalBar value={65} width={80} height={8} min={0} max={100} />
```

---

## Pack 3 — Terminal Text (12 components)

### GlitchCycler
Cycles text with glitch transition.
```tsx
<GlitchCycler sentences={["SYSTEM ONLINE", "ALL CLEAR", "STANDBY"]} pauseMs={2000} color="var(--accent)" />
```

### Typewriter
Character-by-character text reveal.
```tsx
<Typewriter text="SYSTEM·ONLINE" speed={50} color="var(--fg)" loop={true} />
<Typewriter text="Hello World" loop={false} />
```

### GlitchText
Text with random distortion.
```tsx
<GlitchText text="MICROGRAPHICS" intensity={0.15} speed={200} color="var(--fg)" />
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `intensity` | number (0-1) | 0.15 | Glitch strength |

### LogStream
Scrolling terminal log output.
```tsx
<LogStream speed={800} color="var(--fg-dim)" maxLines={5} />
```

### CounterUp
Animated number counter.
```tsx
<CounterUp target={9999} duration={1500} prefix="$" suffix=" ops" color="var(--fg)" />
```

### BootLog
Sequential boot log messages.
```tsx
<BootLog delay={300} color="var(--fg-dim)" />
<BootLog lines={["INIT", "LOAD", "READY"]} delay={500} />
```

### MatrixRain
Matrix-style falling characters.
```tsx
<MatrixRain cols={8} rows={6} speed={100} color="var(--accent)" />
```

### KanaTag
Katakana ID label (e.g. "ジコ─001").
```tsx
<KanaTag section="about" color="var(--fg-dim)" />
<KanaTag section="projects" />
<KanaTag section="blog" />
```
| Sections | Output |
|----------|--------|
| `about` | ジコ─001 |
| `projects` | プロ─002 |
| `blog` | ログ─003 |
| `contact` | コム─004 |
| `home` | ホム─000 |

### MicroStrip
Composite header: Barcode + KanaTag + DataLabel + SpinDial.
```tsx
<MicroStrip section="home" done={false} />
<MicroStrip section="about" done={true} />
```

### WeatherStrip
Weather display with scan animation.
```tsx
<WeatherStrip done={false} />            {/* scanning... */}
<WeatherStrip done={true} temp={22} unit="C" condition="CLEAR" />
```

### ScrollingText
Horizontal ticker/marquee.
```tsx
<ScrollingText text="SYSTEM ONLINE · ALL STATIONS NOMINAL" speed={40} width={120} color="var(--fg-dim)" />
```

### BinaryCounter
Binary number display with optional auto-count.
```tsx
<BinaryCounter value={42} bits={8} color="var(--accent)" />
<BinaryCounter bits={8} animated speed={400} />  {/* auto-counts */}
```

---

## Pack 4 — Decorative Chrome (11 components)

### CornerOrnament
L-shaped bracket for panel corners.
```tsx
<CornerOrnament corner="tl" size={16} color="var(--fg-dimmer)" thickness={1.5} />
<CornerOrnament corner="tr" />
<CornerOrnament corner="bl" />
<CornerOrnament corner="br" />
```

### Barcode
Seeded barcode pattern.
```tsx
<Barcode seed={42} width={60} height={20} color="var(--fg-dim)" />
```

### PanelTitle
Centered title with horizontal rules.
```tsx
<PanelTitle title="SYSTEM STATUS" color="var(--fg-dim)" accent="var(--accent)" />
```

### PixelDiamond
SVG diamond shape with optional glow.
```tsx
<PixelDiamond size={2} color="var(--accent)" glow={true} />
```

### ChevronRow
Animated chevron arrows.
```tsx
<ChevronRow direction="right" color="var(--fg-dimmer)" count={6} speed={200} />
<ChevronRow direction="left" color="var(--accent-amber)" />
```

### DataLabel
Two-tone `[LABEL|VALUE]` badge.
```tsx
<DataLabel label="STATUS" value="ACTIVE" color="var(--fg-dimmer)" valueColor="var(--fg)" />
<DataLabel label="MODE" value="AUTO" />
```

### SectorBadge
Sector/zone identifier.
```tsx
<SectorBadge sector="A7" zone={3} />
```

### RulerTick
SVG ruler with tick marks.
```tsx
<RulerTick width={120} height={16} color="var(--fg-dim)" divisions={10} showLabels={true} />
```

### CoordLabel
X/Y/Z coordinate display.
```tsx
<CoordLabel x={12.4} y={-3.7} z={0} color="var(--fg)" precision={2} />
```

### WireFrame
Isometric wireframe box.
```tsx
<WireFrame width={40} height={30} color="var(--accent)" depth={15} animated={false} />
<WireFrame animated />  {/* slowly rotates */}
```

### HexGrid
Decorative hexagonal grid.
```tsx
<HexGrid cols={5} rows={3} size={10} color="var(--accent)" animated={true} speed={300} />
```

---

## Pack 5 — Time & Clocks (6 components)

### PixelClock
Digital clock display (HH:MM:SS).
```tsx
<PixelClock color="var(--accent)" showSeconds={true} />
<PixelClock showSeconds={false} />
```

### UnixTimestamp
Live Unix epoch time.
```tsx
<UnixTimestamp color="var(--fg-dim)" />
```

### DayProgress
Percentage of day/year/month elapsed.
```tsx
<DayProgress unit="day" color="var(--fg-dim)" accentColor="var(--accent)" />
<DayProgress unit="year" />
<DayProgress unit="month" />
```

### CountdownTimer
Countdown in MM:SS format. Turns red when below alertAt.
```tsx
<CountdownTimer from={300} alertAt={60} color="var(--accent)" onEnd={() => alert("done!")} />
```

### StopwatchDisplay
HH:MM:SS:ms stopwatch.
```tsx
<StopwatchDisplay running={true} color="var(--accent)" />
<StopwatchDisplay running={false} />  {/* paused */}
```

### TimezoneBar
Multiple timezone display.
```tsx
<TimezoneBar zones={[
  { label: "UTC", offset: 0 },
  { label: "NYC", offset: -5 },
  { label: "TYO", offset: 9 },
]} color="var(--fg)" />
```

---

## Pack 6 — Industrial Gauges (8 components)

### DialGauge
Semicircular dial gauge with needle.
```tsx
<DialGauge value={72} min={0} max={100} label="RPM" color="var(--accent)" width={80} height={50} />
<DialGauge value={90} color="var(--accent-red)" label="TEMP" />
```

### TankLevel
Vertical tank fill indicator with wave animation.
```tsx
<TankLevel level={0.6} color="var(--accent)" label="FUEL" width={24} height={48} animated={true} />
<TankLevel level={0.15} color="var(--accent-red)" label="OIL" />
```

### FlowMeter
Animated flow arrows.
```tsx
<FlowMeter direction="right" speed={150} color="var(--accent)" count={5} />
<FlowMeter direction="left" color="var(--accent-amber)" />
```

### PressureGauge
Circular pressure dial.
```tsx
<PressureGauge value={65} min={0} max={100} size={60} color="var(--accent)" unit="PSI" />
```

### VoltageDisplay
Vertical LED-style voltage bar.
```tsx
<VoltageDisplay voltage={4.2} min={0} max={12} width={16} height={40} unit="V" />
```

### TemperatureBar
Vertical thermometer bar.
```tsx
<TemperatureBar value={65} min={0} max={100} width={12} height={60} unit="°C" color="var(--accent)" />
```

### CompassRose
N/E/S/W compass with rotating needle.
```tsx
<CompassRose heading={45} size={60} color="var(--accent)" animated={false} />
<CompassRose animated speed={80} />  {/* slowly rotates */}
```

### Speedometer
Half-circle speed dial.
```tsx
<Speedometer value={60} max={100} size={80} color="var(--accent)" unit="km/h" animated={false} />
<Speedometer animated />  {/* fluctuates */}
```

---

## Pack 7 — Interaction (5 components)

### CopyButton
Click-to-copy with confirmation.
```tsx
<CopyButton text="npm install @micrographics-js/react" color="var(--fg-dim)" />
```

### RatingDots
Diamond dot rating.
```tsx
<RatingDots value={3} max={5} color="var(--accent)" emptyColor="var(--fg-dimmer)" />
```

### ToggleSwitch
Industrial toggle switch.
```tsx
<ToggleSwitch on={false} onChange={(v) => console.log(v)} color="var(--accent)" label="ACTIVE" />
```

### NumericStepper
Terminal-style [−] 042 [+] stepper.
```tsx
<NumericStepper value={42} min={0} max={999} step={1} onChange={(v) => console.log(v)} color="var(--accent)" />
```

### SegmentedBar
Discrete segmented progress bar.
```tsx
<SegmentedBar value={60} segments={10} width={80} height={8} color="var(--accent)" showLabel={false} />
```

---

## Pack 8 — Orbit & Navigation (8 components)

### OrbitSystem
Orbital system with rotating satellites.
```tsx
<OrbitSystem center="SYS" size={140} showRings showLabels glowCenter satellites={[
  { label: "A", radius: 32, speed: 3500, color: "var(--accent)", startAngle: 0 },
  { label: "B", radius: 50, speed: 8000, color: "var(--accent-amber)", startAngle: 180 },
]} />
```

### TargetReticle
Animated targeting reticle.
```tsx
<TargetReticle size={64} rings={2} crosshair label="TGT·01" animate color="var(--accent)" />
```

### PriorityBadge
Priority level badge (A/B/C).
```tsx
<PriorityBadge level="A" label="PRIORITY" blink={false} />
<PriorityBadge level="B" label="CLASS" />
<PriorityBadge level="C" label="TIER" />
```

### RegistrationMark
Print registration crosshair.
```tsx
<RegistrationMark size={24} color="var(--fg-dimmer)" label="REG" />
```

### ArchiveTag
Archive metadata tag with seeded dates.
```tsx
<ArchiveTag id="NAS-001" label="INTERNAL" seed={42} color="var(--fg-dim)" />
<ArchiveTag id="NASG-T001" label="CLASSIFIED" seed={99} />
```

### RadarReticle
Full radar screen with target tracking.
```tsx
<RadarReticle size={80} color="var(--accent)" speed={35} targets={4} />
```

### CrosshairTarget
Targeting crosshair overlay.
```tsx
<CrosshairTarget size={40} color="var(--accent)" animated locked={false} />
<CrosshairTarget locked color="var(--accent-red)" />  {/* target locked */}
```

### MissionStatus
Mission status board with phase progress.
```tsx
<MissionStatus mission="ECHO-7" status="active" phase={3} total={5} color="var(--accent)" />
<MissionStatus mission="DELTA-3" status="failed" phase={2} total={4} />
```
| `status` values | Color |
|-----------------|-------|
| `"active"` | green |
| `"standby"` | amber |
| `"complete"` | green |
| `"failed"` | red |

---

## Color Quick Reference

```tsx
// Preset CSS variables
color="var(--accent)"        // green (#3ecf8e)
color="var(--accent-amber)"  // amber (#f5a623)
color="var(--accent-red)"    // red (#e05252)
color="var(--fg)"            // white (#e8e8e8)
color="var(--fg-dim)"        // gray (#9a9aaa)
color="var(--fg-dimmer)"     // dark gray (#555566)

// Custom colors
color="#8b5cf6"              // violet
color="#60cfff"              // ice blue
color="#ff6b6b"              // coral
color="rgb(255, 100, 50)"   // any CSS color
```

## Changing Theme for All Components at Once

```css
/* Violet theme */
.my-section {
  --accent: #8b5cf6;
  --accent-amber: #f59e0b;
  --accent-red: #ef4444;
  --bg: #0a0520;
  --fg: #e0d8f0;
  --fg-dim: #a090c0;
  --fg-dimmer: #605080;
}
```

```tsx
<div className="my-section">
  <SignalMeter />     {/* all render in violet */}
  <DialGauge />
  <RadarSweep />
</div>
```
