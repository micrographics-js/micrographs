import { useState, useCallback } from "react";
import {
  // Pack 1 — Signal & Status
  SignalMeter, PulseTag, StatusLight, HeartbeatLine, LoadBar, BootSequence,
  BatteryMeter, Uptime, PingIndicator, ConnectionStatus, AlertBanner,
  ReadyBadge, ScanLine, NetworkPulse, CPUSparkline, ErrorRate, MemoryBar,
  SpinDial, ScanBeam, SystemLoad, EventTicker, SignalQuality, WatchdogTimer,
  // Pack 2 — Data Micro-Viz
  DotChart, BarSparkline, FrequencyBars, BinaryStream, VUMeter, HexDump,
  WaveformLine, RadarSweep, PacketFlow, HeatGrid, ThermalBar,
  // Pack 3 — Terminal Text
  GlitchCycler, Typewriter, GlitchText, LogStream, CounterUp, BootLog, MatrixRain,
  KanaTag, MicroStrip, WeatherStrip, ScrollingText, BinaryCounter,
  // Pack 4 — Decorative Chrome
  CornerOrnament, Barcode, PanelTitle, PixelDiamond, ChevronRow, DataLabel,
  SectorBadge, RulerTick, CoordLabel, WireFrame, HexGrid,
  // Pack 5 — Time & Clocks
  PixelClock, UnixTimestamp, DayProgress,
  CountdownTimer, StopwatchDisplay, TimezoneBar,
  // Pack 6 — Industrial Gauges
  DialGauge, TankLevel, FlowMeter,
  PressureGauge, VoltageDisplay, TemperatureBar, CompassRose, Speedometer,
  // Orbit & Editorial
  OrbitSystem, TargetReticle, PriorityBadge, RegistrationMark, ArchiveTag,
  RadarReticle, CrosshairTarget, MissionStatus,
  // Pack 7 — Interaction
  CopyButton, RatingDots,
  ToggleSwitch, NumericStepper, SegmentedBar,
} from "@micrographics/react";

// ─── Theme System ────────────────────────────────────────────────────────────

const THEMES = {
  "Phosphor":  { "--accent": "#3ecf8e", "--accent-amber": "#f5a623", "--accent-red": "#e05252", "--bg": "#0d0e17", "--fg": "#e8e8e8" },
  "Amber":     { "--accent": "#f5a623", "--accent-amber": "#e05252", "--accent-red": "#e05252", "--bg": "#0f0c00", "--fg": "#f0d080" },
  "Crimson":   { "--accent": "#e05252", "--accent-amber": "#f5a623", "--accent-red": "#ff2244", "--bg": "#110010", "--fg": "#e8d0d0" },
  "Ice":       { "--accent": "#60cfff", "--accent-amber": "#f5a623", "--accent-red": "#e05252", "--bg": "#050d17", "--fg": "#d0e8f5" },
  "Violet":    { "--accent": "#a78bfa", "--accent-amber": "#f5a623", "--accent-red": "#e05252", "--bg": "#090717", "--fg": "#e0d8f0" },
  "Mono":      { "--accent": "#cccccc", "--accent-amber": "#aaaaaa", "--accent-red": "#888888", "--bg": "#0a0a0a", "--fg": "#dddddd" },
} as const;

type ThemeName = keyof typeof THEMES;

function ThemeCustomizer({ onThemeChange }: { onThemeChange: (vars: Record<string, string>) => void }) {
  const [active, setActive] = useState<ThemeName>("Phosphor");
  const [customAccent, setCustomAccent] = useState("#3ecf8e");
  const [open, setOpen] = useState(false);

  function applyTheme(name: ThemeName) {
    setActive(name);
    setCustomAccent(THEMES[name]["--accent"]);
    onThemeChange(THEMES[name]);
  }

  function applyCustomAccent(v: string) {
    setCustomAccent(v);
    onThemeChange({ ...THEMES[active], "--accent": v });
  }

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          background: "none", border: "1px solid var(--border-strong)",
          color: "var(--fg-dim)", fontFamily: "monospace", fontSize: "9px",
          letterSpacing: "0.1em", padding: "3px 8px", cursor: "pointer",
          display: "flex", alignItems: "center", gap: "6px",
        }}
      >
        <span style={{ width: 8, height: 8, background: "var(--accent)", display: "inline-block", flexShrink: 0 }} />
        THEME: {active}
        <span style={{ color: "var(--fg-dimmer)" }}>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", right: 0,
          background: "var(--bg-secondary)", border: "1px solid var(--border-strong)",
          padding: "12px", zIndex: 100, minWidth: "200px", display: "flex", flexDirection: "column", gap: "8px",
        }}>
          <div style={{ fontSize: "8px", color: "var(--fg-dimmer)", letterSpacing: "0.15em", marginBottom: "4px" }}>PRESET THEMES</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {(Object.keys(THEMES) as ThemeName[]).map(name => (
              <button
                key={name}
                onClick={() => applyTheme(name)}
                style={{
                  background: active === name ? "var(--accent)" : "none",
                  color: active === name ? "var(--bg)" : "var(--fg-dim)",
                  border: `1px solid ${active === name ? "var(--accent)" : "var(--border-strong)"}`,
                  fontFamily: "monospace", fontSize: "8px", letterSpacing: "0.08em",
                  padding: "2px 6px", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: "4px",
                }}
              >
                <span style={{ width: 6, height: 6, background: THEMES[name]["--accent"], display: "inline-block", flexShrink: 0 }} />
                {name}
              </button>
            ))}
          </div>
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "8px" }}>
            <div style={{ fontSize: "8px", color: "var(--fg-dimmer)", letterSpacing: "0.15em", marginBottom: "4px" }}>CUSTOM ACCENT</div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="color"
                value={customAccent}
                onChange={e => applyCustomAccent(e.target.value)}
                style={{ width: 28, height: 20, border: "none", background: "none", cursor: "pointer", padding: 0 }}
              />
              <span style={{ fontFamily: "monospace", fontSize: "9px", color: "var(--fg-dim)" }}>{customAccent}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Editable Prop System ────────────────────────────────────────────────────

type PropDef =
  | { key: string; type: "number"; label?: string; min: number; max: number; step?: number; default: number }
  | { key: string; type: "boolean"; label?: string; default: boolean }
  | { key: string; type: "select"; label?: string; options: string[]; default: string };

interface ComponentEntry {
  name: string;
  render: (props: Record<string, unknown>) => React.ReactNode;
  defaultProps: Record<string, unknown>;
  editableProps?: PropDef[];
}

interface Pack {
  name: string;
  components: ComponentEntry[];
}

function PropControl({ def, value, onChange }: { def: PropDef; value: unknown; onChange: (v: unknown) => void }) {
  if (def.type === "number") {
    return (
      <div className="prop-control">
        <span className="prop-label">{def.label ?? def.key}</span>
        <input
          type="range" min={def.min} max={def.max} step={def.step ?? 1}
          value={value as number}
          onChange={(e) => onChange(Number(e.target.value))}
          className="prop-range"
        />
        <span className="prop-value">{(value as number).toFixed(def.step && def.step < 1 ? 2 : 0)}</span>
      </div>
    );
  }
  if (def.type === "boolean") {
    return (
      <div className="prop-control">
        <span className="prop-label">{def.label ?? def.key}</span>
        <button className={`prop-toggle ${value ? "active" : ""}`} onClick={() => onChange(!value)}>
          {value ? "ON" : "OFF"}
        </button>
      </div>
    );
  }
  if (def.type === "select") {
    return (
      <div className="prop-control">
        <span className="prop-label">{def.label ?? def.key}</span>
        <select className="prop-select" value={value as string} onChange={(e) => onChange(e.target.value)}>
          {def.options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    );
  }
  return null;
}

function ComponentCard({ entry }: { entry: ComponentEntry }) {
  const [props, setProps] = useState<Record<string, unknown>>(entry.defaultProps);
  const [open, setOpen] = useState(false);
  const setProp = useCallback((key: string, value: unknown) => setProps((p) => ({ ...p, [key]: value })), []);
  const hasEditable = entry.editableProps && entry.editableProps.length > 0;

  return (
    <div className={`component-card ${open ? "open" : ""}`}>
      <div className="component-name">
        {entry.name}
        {hasEditable && (
          <button className={`edit-toggle ${open ? "active" : ""}`} onClick={() => setOpen((v) => !v)} title="Edit props">
            ⚙
          </button>
        )}
      </div>
      <div className="component-preview">{entry.render(props)}</div>
      {open && hasEditable && (
        <div className="props-panel">
          {entry.editableProps!.map((def) => (
            <PropControl key={def.key} def={def} value={props[def.key] ?? def.default} onChange={(v) => setProp(def.key, v)} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Packs ────────────────────────────────────────────────────────────────────

const packs: Pack[] = [
  {
    name: "Orbit & Editorial",
    components: [
      {
        name: "OrbitSystem",
        render: (p) => (
          <OrbitSystem
            center="SYS"
            size={(p.size as number) ?? 140}
            showRings={(p.showRings as boolean) ?? true}
            showLabels={(p.showLabels as boolean) ?? true}
            glowCenter={(p.glowCenter as boolean) ?? true}
          />
        ),
        defaultProps: { size: 140, showRings: true, showLabels: true, glowCenter: true },
        editableProps: [
          { key: "size", type: "number", label: "size", min: 80, max: 200, step: 10, default: 140 },
          { key: "showRings", type: "boolean", label: "rings", default: true },
          { key: "showLabels", type: "boolean", label: "labels", default: true },
          { key: "glowCenter", type: "boolean", label: "glow", default: true },
        ],
      },
      {
        name: "OrbitSystem (2 sat)",
        render: (p) => (
          <OrbitSystem
            center="NODE"
            size={(p.size as number) ?? 120}
            satellites={[
              { label: "A", radius: 32, speed: 3500, color: "var(--accent)", startAngle: 0 },
              { label: "B", radius: 50, speed: 8000, color: "var(--accent-amber)", startAngle: 180 },
            ]}
            showRings={(p.showRings as boolean) ?? true}
          />
        ),
        defaultProps: { size: 120, showRings: true },
        editableProps: [
          { key: "size", type: "number", label: "size", min: 80, max: 200, step: 10, default: 120 },
          { key: "showRings", type: "boolean", label: "rings", default: true },
        ],
      },
      {
        name: "TargetReticle",
        render: (p) => (
          <TargetReticle
            size={(p.size as number) ?? 64}
            rings={(p.rings as number) ?? 2}
            crosshair={(p.crosshair as boolean) ?? true}
            animate={(p.animate as boolean) ?? true}
            label="TGT·01"
          />
        ),
        defaultProps: { size: 64, rings: 2, crosshair: true, animate: true },
        editableProps: [
          { key: "size", type: "number", label: "size", min: 40, max: 120, step: 8, default: 64 },
          { key: "rings", type: "number", label: "rings", min: 1, max: 4, step: 1, default: 2 },
          { key: "crosshair", type: "boolean", label: "crosshair", default: true },
          { key: "animate", type: "boolean", label: "animate", default: true },
        ],
      },
      {
        name: "TargetReticle (amber)",
        render: (p) => (
          <TargetReticle size={56} color="var(--accent-amber)" label="LOCK" rings={3} animate={(p.animate as boolean) ?? true} />
        ),
        defaultProps: { animate: true },
        editableProps: [{ key: "animate", type: "boolean", label: "animate", default: true }],
      },
      {
        name: "PriorityBadge A",
        render: (p) => (
          <PriorityBadge level="A" label="PRIORITY" blink={(p.blink as boolean) ?? false} />
        ),
        defaultProps: { blink: false },
        editableProps: [{ key: "blink", type: "boolean", label: "blink", default: false }],
      },
      { name: "PriorityBadge B", render: () => <PriorityBadge level="B" label="CLASS" />, defaultProps: {} },
      { name: "PriorityBadge C", render: () => <PriorityBadge level="C" label="TIER" />, defaultProps: {} },
      {
        name: "RegistrationMark",
        render: (p) => <RegistrationMark size={(p.size as number) ?? 28} label="REG" />,
        defaultProps: { size: 28 },
        editableProps: [{ key: "size", type: "number", label: "size", min: 16, max: 60, step: 4, default: 28 }],
      },
      {
        name: "ArchiveTag",
        render: (p) => <ArchiveTag id="NAS-001" label={(p.label as string) ?? "INTERNAL"} seed={42} />,
        defaultProps: { label: "INTERNAL" },
        editableProps: [
          { key: "label", type: "select", label: "type", options: ["INTERNAL", "CLASSIFIED", "RESTRICTED", "PUBLIC"], default: "INTERNAL" },
        ],
      },
      { name: "ArchiveTag (B)", render: () => <ArchiveTag id="NASG-T001" label="PROFESSIONAL" seed={99} />, defaultProps: {} },
    ],
  },
  {
    name: "Pack 1 — Signal & Status",
    components: [
      {
        name: "SignalMeter",
        render: (p) => <SignalMeter bars={(p.bars as number) ?? 5} speed={(p.speed as number) ?? 180} />,
        defaultProps: { bars: 5, speed: 180 },
        editableProps: [
          { key: "bars", type: "number", label: "bars", min: 3, max: 12, step: 1, default: 5 },
          { key: "speed", type: "number", label: "speed ms", min: 60, max: 600, step: 20, default: 180 },
        ],
      },
      {
        name: "PulseTag",
        render: (p) => <PulseTag label="LIVE" speed={(p.speed as number) ?? 800} />,
        defaultProps: { speed: 800 },
        editableProps: [{ key: "speed", type: "number", label: "speed ms", min: 200, max: 2000, step: 100, default: 800 }],
      },
      { name: "StatusLight OK", render: () => <StatusLight status="ok" />, defaultProps: {} },
      { name: "StatusLight WARN", render: () => <StatusLight status="warn" />, defaultProps: {} },
      { name: "StatusLight ERR", render: () => <StatusLight status="error" />, defaultProps: {} },
      {
        name: "HeartbeatLine",
        render: (p) => <HeartbeatLine width={(p.width as number) ?? 80} speed={(p.speed as number) ?? 1200} />,
        defaultProps: { width: 80, speed: 1200 },
        editableProps: [
          { key: "width", type: "number", label: "width", min: 40, max: 140, step: 10, default: 80 },
          { key: "speed", type: "number", label: "speed ms", min: 400, max: 3000, step: 100, default: 1200 },
        ],
      },
      {
        name: "LoadBar",
        render: (p) => <LoadBar segments={(p.segments as number) ?? 12} duration={(p.duration as number) ?? 1200} />,
        defaultProps: { segments: 12, duration: 1200 },
        editableProps: [
          { key: "segments", type: "number", label: "segments", min: 4, max: 24, step: 1, default: 12 },
          { key: "duration", type: "number", label: "duration ms", min: 300, max: 3000, step: 100, default: 1200 },
        ],
      },
      { name: "BootSequence", render: () => <BootSequence />, defaultProps: {} },
      {
        name: "BatteryMeter",
        render: (p) => <BatteryMeter level={(p.level as number) ?? 0.75} charging={(p.charging as boolean) ?? false} />,
        defaultProps: { level: 0.75, charging: false },
        editableProps: [
          { key: "level", type: "number", label: "level", min: 0, max: 1, step: 0.05, default: 0.75 },
          { key: "charging", type: "boolean", label: "charging", default: false },
        ],
      },
      { name: "Uptime", render: () => <Uptime />, defaultProps: {} },
      {
        name: "PingIndicator",
        render: (p) => <PingIndicator ms={(p.ms as number) ?? 24} />,
        defaultProps: { ms: 24 },
        editableProps: [{ key: "ms", type: "number", label: "ms", min: 1, max: 999, step: 1, default: 24 }],
      },
      { name: "ConnStatus OK", render: () => <ConnectionStatus connected={true} />, defaultProps: {} },
      { name: "ConnStatus LOST", render: () => <ConnectionStatus connected={false} />, defaultProps: {} },
      { name: "AlertBanner", render: () => <AlertBanner message="THRESHOLD EXCEEDED" />, defaultProps: {} },
      { name: "ReadyBadge", render: () => <ReadyBadge />, defaultProps: {} },
      {
        name: "ScanLine",
        render: (p) => <ScanLine width={(p.width as number) ?? 60} height={(p.height as number) ?? 40} />,
        defaultProps: { width: 60, height: 40 },
        editableProps: [
          { key: "width", type: "number", label: "width", min: 40, max: 120, step: 8, default: 60 },
          { key: "height", type: "number", label: "height", min: 24, max: 80, step: 8, default: 40 },
        ],
      },
      { name: "NetworkPulse", render: () => <NetworkPulse />, defaultProps: {} },
      { name: "CPUSparkline", render: () => <CPUSparkline />, defaultProps: {} },
      { name: "ErrorRate", render: () => <ErrorRate count={3} />, defaultProps: {} },
      {
        name: "MemoryBar",
        render: (p) => <MemoryBar used={(p.used as number) ?? 6.4} total={16} />,
        defaultProps: { used: 6.4 },
        editableProps: [{ key: "used", type: "number", label: "used GB", min: 0, max: 16, step: 0.1, default: 6.4 }],
      },
      { name: "SpinDial", render: (p) => <SpinDial done={(p.done as boolean) ?? false} size={(p.size as number) ?? 16} />, defaultProps: { done: false, size: 16 }, editableProps: [{ key: "done", type: "boolean", label: "done", default: false }, { key: "size", type: "number", label: "size", min: 12, max: 32, step: 2, default: 16 }] },
      { name: "ScanBeam", render: (p) => <ScanBeam width={(p.width as number) ?? 80} height={(p.height as number) ?? 4} />, defaultProps: { width: 80, height: 4 }, editableProps: [{ key: "width", type: "number", label: "width", min: 40, max: 160, step: 10, default: 80 }, { key: "height", type: "number", label: "height", min: 2, max: 12, step: 1, default: 4 }] },
      { name: "SystemLoad", render: (p) => <SystemLoad cores={(p.cores as number) ?? 4} />, defaultProps: { cores: 4 }, editableProps: [{ key: "cores", type: "number", label: "cores", min: 2, max: 8, step: 1, default: 4 }] },
      { name: "EventTicker", render: () => <EventTicker />, defaultProps: {} },
      { name: "SignalQuality", render: (p) => <SignalQuality quality={(p.quality as number) ?? 4} />, defaultProps: { quality: 4 }, editableProps: [{ key: "quality", type: "number", label: "quality", min: 0, max: 5, step: 1, default: 4 }] },
      { name: "WatchdogTimer", render: (p) => <WatchdogTimer interval={(p.interval as number) ?? 5000} />, defaultProps: { interval: 5000 }, editableProps: [{ key: "interval", type: "number", label: "interval ms", min: 2000, max: 10000, step: 500, default: 5000 }] },
    ],
  },
  {
    name: "Pack 2 — Data Micro-Viz",
    components: [
      {
        name: "DotChart",
        render: (p) => <DotChart width={(p.width as number) ?? 12} speed={(p.speed as number) ?? 180} height={(p.height as number) ?? 32} />,
        defaultProps: { width: 12, speed: 180, height: 32 },
        editableProps: [
          { key: "width", type: "number", label: "dots", min: 6, max: 24, step: 1, default: 12 },
          { key: "speed", type: "number", label: "speed ms", min: 60, max: 600, step: 20, default: 180 },
          { key: "height", type: "number", label: "height", min: 16, max: 60, step: 4, default: 32 },
        ],
      },
      {
        name: "BarSparkline",
        render: (p) => <BarSparkline bars={(p.bars as number) ?? 16} />,
        defaultProps: { bars: 16 },
        editableProps: [{ key: "bars", type: "number", label: "bars", min: 6, max: 32, step: 1, default: 16 }],
      },
      {
        name: "FrequencyBars",
        render: (p) => <FrequencyBars bars={(p.bars as number) ?? 10} />,
        defaultProps: { bars: 10 },
        editableProps: [{ key: "bars", type: "number", label: "bars", min: 4, max: 20, step: 1, default: 10 }],
      },
      {
        name: "BinaryStream",
        render: (p) => <BinaryStream cols={(p.cols as number) ?? 8} rows={(p.rows as number) ?? 5} />,
        defaultProps: { cols: 8, rows: 5 },
        editableProps: [
          { key: "cols", type: "number", label: "cols", min: 4, max: 16, step: 1, default: 8 },
          { key: "rows", type: "number", label: "rows", min: 2, max: 8, step: 1, default: 5 },
        ],
      },
      {
        name: "VUMeter",
        render: (p) => <VUMeter height={(p.height as number) ?? 40} />,
        defaultProps: { height: 40 },
        editableProps: [{ key: "height", type: "number", label: "height", min: 24, max: 80, step: 8, default: 40 }],
      },
      {
        name: "HexDump",
        render: (p) => <HexDump rows={(p.rows as number) ?? 3} cols={(p.cols as number) ?? 6} />,
        defaultProps: { rows: 3, cols: 6 },
        editableProps: [
          { key: "rows", type: "number", label: "rows", min: 2, max: 8, step: 1, default: 3 },
          { key: "cols", type: "number", label: "cols", min: 4, max: 12, step: 1, default: 6 },
        ],
      },
      { name: "WaveformLine", render: (p) => <WaveformLine width={(p.width as number) ?? 80} height={(p.height as number) ?? 30} amplitude={(p.amplitude as number) ?? 0.35} />, defaultProps: { width: 80, height: 30, amplitude: 0.35 }, editableProps: [{ key: "width", type: "number", label: "width", min: 40, max: 160, step: 10, default: 80 }, { key: "amplitude", type: "number", label: "amp", min: 0.1, max: 0.9, step: 0.05, default: 0.35 }] },
      { name: "RadarSweep", render: (p) => <RadarSweep size={(p.size as number) ?? 60} />, defaultProps: { size: 60 }, editableProps: [{ key: "size", type: "number", label: "size", min: 40, max: 100, step: 10, default: 60 }] },
      { name: "PacketFlow", render: () => <PacketFlow />, defaultProps: {} },
      { name: "HeatGrid", render: (p) => <HeatGrid cols={(p.cols as number) ?? 8} rows={(p.rows as number) ?? 4} />, defaultProps: { cols: 8, rows: 4 }, editableProps: [{ key: "cols", type: "number", label: "cols", min: 4, max: 16, step: 1, default: 8 }, { key: "rows", type: "number", label: "rows", min: 2, max: 8, step: 1, default: 4 }] },
      { name: "ThermalBar", render: (p) => <ThermalBar value={(p.value as number) ?? 65} />, defaultProps: { value: 65 }, editableProps: [{ key: "value", type: "number", label: "value", min: 0, max: 100, step: 1, default: 65 }] },
    ],
  },
  {
    name: "Pack 3 — Terminal Text Effects",
    components: [
      { name: "GlitchCycler", render: () => <GlitchCycler />, defaultProps: {} },
      { name: "Typewriter", render: () => <Typewriter text="SYSTEM·ONLINE" loop />, defaultProps: {} },
      {
        name: "GlitchText",
        render: (p) => <GlitchText text="MICROGRAPHICS" intensity={(p.intensity as number) ?? 0.15} />,
        defaultProps: { intensity: 0.15 },
        editableProps: [{ key: "intensity", type: "number", label: "intensity", min: 0, max: 0.8, step: 0.05, default: 0.15 }],
      },
      { name: "LogStream", render: () => <LogStream maxLines={4} />, defaultProps: {} },
      {
        name: "CounterUp",
        render: (p) => <CounterUp target={(p.target as number) ?? 9999} suffix=" ops" />,
        defaultProps: { target: 9999 },
        editableProps: [{ key: "target", type: "number", label: "target", min: 100, max: 99999, step: 100, default: 9999 }],
      },
      { name: "BootLog", render: () => <BootLog />, defaultProps: {} },
      {
        name: "MatrixRain",
        render: (p) => <MatrixRain cols={(p.cols as number) ?? 7} rows={(p.rows as number) ?? 5} />,
        defaultProps: { cols: 7, rows: 5 },
        editableProps: [
          { key: "cols", type: "number", label: "cols", min: 4, max: 16, step: 1, default: 7 },
          { key: "rows", type: "number", label: "rows", min: 3, max: 10, step: 1, default: 5 },
        ],
      },
      { name: "KanaTag", render: (p) => <KanaTag section={(p.section as string) ?? "about"} />, defaultProps: { section: "about" }, editableProps: [{ key: "section", type: "select", label: "section", options: ["about", "projects", "blog", "contact", "home", "status", "docs"], default: "about" }] },
      { name: "MicroStrip", render: (p) => <MicroStrip section={(p.section as string) ?? "home"} done={(p.done as boolean) ?? false} />, defaultProps: { section: "home", done: false }, editableProps: [{ key: "section", type: "select", label: "section", options: ["home", "about", "projects", "blog", "contact"], default: "home" }, { key: "done", type: "boolean", label: "done", default: false }] },
      { name: "WeatherStrip", render: (p) => <WeatherStrip done={(p.done as boolean) ?? true} temp={22} condition="CLEAR" />, defaultProps: { done: true }, editableProps: [{ key: "done", type: "boolean", label: "done", default: true }] },
      { name: "ScrollingText", render: (p) => <ScrollingText text={(p.text as string) ?? "MICROGRAPHICS · SYSTEM ONLINE · ALL STATIONS NOMINAL"} width={(p.width as number) ?? 120} />, defaultProps: { text: "MICROGRAPHICS · SYSTEM ONLINE · ALL STATIONS NOMINAL", width: 120 }, editableProps: [{ key: "width", type: "number", label: "width", min: 60, max: 200, step: 10, default: 120 }] },
      { name: "BinaryCounter", render: (p) => <BinaryCounter bits={(p.bits as number) ?? 8} animated />, defaultProps: { bits: 8 }, editableProps: [{ key: "bits", type: "number", label: "bits", min: 4, max: 16, step: 1, default: 8 }] },
    ],
  },
  {
    name: "Pack 4 — Decorative Chrome",
    components: [
      {
        name: "CornerOrnament TL",
        render: (p) => <CornerOrnament corner="tl" size={(p.size as number) ?? 16} />,
        defaultProps: { size: 16 },
        editableProps: [{ key: "size", type: "number", label: "size", min: 8, max: 40, step: 4, default: 16 }],
      },
      { name: "CornerOrnament TR", render: () => <CornerOrnament corner="tr" />, defaultProps: {} },
      { name: "CornerOrnament BL", render: () => <CornerOrnament corner="bl" />, defaultProps: {} },
      { name: "CornerOrnament BR", render: () => <CornerOrnament corner="br" />, defaultProps: {} },
      {
        name: "Barcode",
        render: (p) => <Barcode seed={(p.seed as number) ?? 7} width={(p.width as number) ?? 60} />,
        defaultProps: { seed: 7, width: 60 },
        editableProps: [
          { key: "seed", type: "number", label: "seed", min: 1, max: 999, step: 1, default: 7 },
          { key: "width", type: "number", label: "width", min: 40, max: 120, step: 8, default: 60 },
        ],
      },
      { name: "PanelTitle", render: () => <PanelTitle title="SUBSYSTEM A" />, defaultProps: {} },
      {
        name: "PixelDiamond",
        render: (p) => <PixelDiamond size={(p.size as number) ?? 2} glow={(p.glow as boolean) ?? true} />,
        defaultProps: { size: 2, glow: true },
        editableProps: [
          { key: "size", type: "number", label: "unit size", min: 1, max: 5, step: 1, default: 2 },
          { key: "glow", type: "boolean", label: "glow", default: true },
        ],
      },
      { name: "ChevronRow →", render: () => <ChevronRow direction="right" />, defaultProps: {} },
      { name: "ChevronRow ←", render: () => <ChevronRow direction="left" color="var(--accent-amber)" />, defaultProps: {} },
      { name: "DataLabel", render: () => <DataLabel label="MODE" value="ACTIVE" />, defaultProps: {} },
      { name: "SectorBadge", render: () => <SectorBadge sector="A7" zone={3} />, defaultProps: {} },
      { name: "RulerTick", render: (p) => <RulerTick width={(p.width as number) ?? 120} divisions={(p.divisions as number) ?? 10} />, defaultProps: { width: 120, divisions: 10 }, editableProps: [{ key: "width", type: "number", label: "width", min: 60, max: 200, step: 10, default: 120 }, { key: "divisions", type: "number", label: "divs", min: 4, max: 20, step: 1, default: 10 }] },
      { name: "CoordLabel", render: (p) => <CoordLabel x={(p.x as number) ?? 1.23} y={(p.y as number) ?? 45.67} z={(p.z as number) ?? -2.1} />, defaultProps: { x: 1.23, y: 45.67, z: -2.1 }, editableProps: [{ key: "x", type: "number", label: "X", min: -99, max: 99, step: 0.5, default: 1.23 }, { key: "y", type: "number", label: "Y", min: -99, max: 99, step: 0.5, default: 45.67 }] },
      { name: "WireFrame", render: (p) => <WireFrame width={(p.width as number) ?? 40} height={(p.height as number) ?? 30} animated={(p.animated as boolean) ?? true} />, defaultProps: { width: 40, height: 30, animated: true }, editableProps: [{ key: "animated", type: "boolean", label: "animated", default: true }] },
      { name: "HexGrid", render: (p) => <HexGrid cols={(p.cols as number) ?? 5} rows={(p.rows as number) ?? 3} animated={(p.animated as boolean) ?? true} />, defaultProps: { cols: 5, rows: 3, animated: true }, editableProps: [{ key: "cols", type: "number", label: "cols", min: 3, max: 10, step: 1, default: 5 }, { key: "animated", type: "boolean", label: "animated", default: true }] },
    ],
  },
  {
    name: "Pack 5 — Time & Clocks",
    components: [
      {
        name: "PixelClock",
        render: (p) => <PixelClock showSeconds={(p.showSeconds as boolean) ?? true} />,
        defaultProps: { showSeconds: true },
        editableProps: [{ key: "showSeconds", type: "boolean", label: "seconds", default: true }],
      },
      { name: "UnixTimestamp", render: () => <UnixTimestamp />, defaultProps: {} },
      { name: "DayProgress day", render: () => <DayProgress unit="day" />, defaultProps: {} },
      { name: "DayProgress year", render: () => <DayProgress unit="year" />, defaultProps: {} },
      { name: "DayProgress month", render: () => <DayProgress unit="month" />, defaultProps: {} },
      { name: "CountdownTimer", render: (p) => <CountdownTimer from={(p.from as number) ?? 300} />, defaultProps: { from: 300 }, editableProps: [{ key: "from", type: "number", label: "seconds", min: 10, max: 600, step: 10, default: 300 }] },
      { name: "StopwatchDisplay", render: (p) => <StopwatchDisplay running={(p.running as boolean) ?? true} />, defaultProps: { running: true }, editableProps: [{ key: "running", type: "boolean", label: "running", default: true }] },
      { name: "TimezoneBar", render: () => <TimezoneBar />, defaultProps: {} },
    ],
  },
  {
    name: "Pack 6 — Industrial Gauges",
    components: [
      {
        name: "DialGauge",
        render: (p) => <DialGauge value={(p.value as number) ?? 65} label="RPM" />,
        defaultProps: { value: 65 },
        editableProps: [{ key: "value", type: "number", label: "value", min: 0, max: 100, step: 1, default: 65 }],
      },
      {
        name: "DialGauge (temp)",
        render: (p) => <DialGauge value={(p.value as number) ?? 92} label="TEMP" color="var(--accent-red)" />,
        defaultProps: { value: 92 },
        editableProps: [{ key: "value", type: "number", label: "value", min: 0, max: 100, step: 1, default: 92 }],
      },
      {
        name: "TankLevel",
        render: (p) => <TankLevel level={(p.level as number) ?? 0.6} label="FUEL" />,
        defaultProps: { level: 0.6 },
        editableProps: [{ key: "level", type: "number", label: "level", min: 0, max: 1, step: 0.05, default: 0.6 }],
      },
      {
        name: "TankLevel (low)",
        render: (p) => <TankLevel level={(p.level as number) ?? 0.15} color="var(--accent-red)" label="OIL" />,
        defaultProps: { level: 0.15 },
        editableProps: [{ key: "level", type: "number", label: "level", min: 0, max: 1, step: 0.05, default: 0.15 }],
      },
      {
        name: "FlowMeter →",
        render: (p) => <FlowMeter direction="right" speed={(p.speed as number) ?? 150} />,
        defaultProps: { speed: 150 },
        editableProps: [{ key: "speed", type: "number", label: "speed ms", min: 60, max: 600, step: 20, default: 150 }],
      },
      { name: "FlowMeter ←", render: () => <FlowMeter direction="left" color="var(--accent-amber)" />, defaultProps: {} },
      { name: "PressureGauge", render: (p) => <PressureGauge value={(p.value as number) ?? 50} size={(p.size as number) ?? 60} />, defaultProps: { value: 50, size: 60 }, editableProps: [{ key: "value", type: "number", label: "value", min: 0, max: 100, step: 1, default: 50 }] },
      { name: "VoltageDisplay", render: (p) => <VoltageDisplay voltage={(p.voltage as number) ?? 4.2} />, defaultProps: { voltage: 4.2 }, editableProps: [{ key: "voltage", type: "number", label: "volts", min: 0, max: 12, step: 0.1, default: 4.2 }] },
      { name: "TemperatureBar", render: (p) => <TemperatureBar value={(p.value as number) ?? 65} />, defaultProps: { value: 65 }, editableProps: [{ key: "value", type: "number", label: "value", min: 0, max: 100, step: 1, default: 65 }] },
      { name: "CompassRose", render: (p) => <CompassRose heading={(p.heading as number) ?? 45} size={(p.size as number) ?? 60} animated={(p.animated as boolean) ?? true} />, defaultProps: { heading: 45, size: 60, animated: true }, editableProps: [{ key: "heading", type: "number", label: "heading", min: 0, max: 359, step: 5, default: 45 }, { key: "animated", type: "boolean", label: "animated", default: true }] },
      { name: "Speedometer", render: (p) => <Speedometer value={(p.value as number) ?? 60} size={(p.size as number) ?? 80} animated={(p.animated as boolean) ?? true} />, defaultProps: { value: 60, size: 80, animated: true }, editableProps: [{ key: "value", type: "number", label: "value", min: 0, max: 100, step: 5, default: 60 }, { key: "animated", type: "boolean", label: "animated", default: true }] },
    ],
  },
  {
    name: "Pack 7 — Interaction",
    components: [
      { name: "CopyButton", render: () => <CopyButton text="npm install @micrographics/react" />, defaultProps: {} },
      {
        name: "RatingDots",
        render: (p) => <RatingDots value={(p.value as number) ?? 3} max={5} />,
        defaultProps: { value: 3 },
        editableProps: [{ key: "value", type: "number", label: "value", min: 0, max: 5, step: 1, default: 3 }],
      },
      { name: "ToggleSwitch", render: (p) => <ToggleSwitch on={(p.on as boolean) ?? false} label="ACTIVE" />, defaultProps: { on: false }, editableProps: [{ key: "on", type: "boolean", label: "on", default: false }] },
      { name: "NumericStepper", render: (p) => <NumericStepper value={(p.value as number) ?? 42} min={0} max={999} />, defaultProps: { value: 42 }, editableProps: [{ key: "value", type: "number", label: "value", min: 0, max: 999, step: 1, default: 42 }] },
      { name: "SegmentedBar", render: (p) => <SegmentedBar value={(p.value as number) ?? 60} segments={(p.segments as number) ?? 10} />, defaultProps: { value: 60, segments: 10 }, editableProps: [{ key: "value", type: "number", label: "value", min: 0, max: 100, step: 5, default: 60 }, { key: "segments", type: "number", label: "segments", min: 4, max: 20, step: 1, default: 10 }] },
    ],
  },
  {
    name: "Pack 8 — Radar & Navigation",
    components: [
      { name: "RadarReticle", render: (p) => <RadarReticle size={(p.size as number) ?? 80} targets={(p.targets as number) ?? 3} />, defaultProps: { size: 80, targets: 3 }, editableProps: [{ key: "size", type: "number", label: "size", min: 50, max: 120, step: 10, default: 80 }, { key: "targets", type: "number", label: "targets", min: 0, max: 6, step: 1, default: 3 }] },
      { name: "CrosshairTarget", render: (p) => <CrosshairTarget size={(p.size as number) ?? 40} animated={(p.animated as boolean) ?? true} locked={(p.locked as boolean) ?? false} />, defaultProps: { size: 40, animated: true, locked: false }, editableProps: [{ key: "size", type: "number", label: "size", min: 24, max: 80, step: 4, default: 40 }, { key: "animated", type: "boolean", label: "animated", default: true }, { key: "locked", type: "boolean", label: "locked", default: false }] },
      { name: "CrosshairTarget (locked)", render: () => <CrosshairTarget size={40} animated locked color="var(--accent-red)" />, defaultProps: {} },
      { name: "MissionStatus", render: (p) => <MissionStatus mission="ECHO-7" status={(p.status as "active" | "standby" | "complete" | "failed") ?? "active"} phase={(p.phase as number) ?? 3} total={5} />, defaultProps: { status: "active", phase: 3 }, editableProps: [{ key: "status", type: "select", label: "status", options: ["active", "standby", "complete", "failed"], default: "active" }, { key: "phase", type: "number", label: "phase", min: 0, max: 5, step: 1, default: 3 }] },
      { name: "MissionStatus (failed)", render: () => <MissionStatus mission="DELTA-3" status="failed" phase={2} total={4} />, defaultProps: {} },
    ],
  },
];

const total = packs.reduce((n, p) => n + p.components.length, 0);

export default function App() {
  function applyThemeVars(vars: Record<string, string>) {
    const root = document.documentElement;
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
    // Also set un-prefixed aliases used by components
    if (vars["--accent"]) root.style.setProperty("--accent", vars["--accent"]);
    if (vars["--bg"]) root.style.setProperty("--bg", vars["--bg"]);
    if (vars["--fg"]) root.style.setProperty("--fg", vars["--fg"]);
    if (vars["--accent-amber"]) root.style.setProperty("--accent-amber", vars["--accent-amber"]);
    if (vars["--accent-red"]) root.style.setProperty("--accent-red", vars["--accent-red"]);
  }

  return (
    <div className="gallery">
      <div className="gallery-header">
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <div className="gallery-title">MICROGRAPHICS</div>
            <div className="gallery-subtitle">
              Component Gallery · {total} components · click ⚙ to edit props live
            </div>
          </div>
          <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
            <ThemeCustomizer onThemeChange={applyThemeVars} />
            <PulseTag label="v0.1.0" />
            <PixelClock showSeconds={false} />
          </div>
        </div>
      </div>

      {packs.map((pack) => (
        <div key={pack.name} className="pack">
          <div className="pack-title">{pack.name}</div>
          <div className="components-grid">
            {pack.components.map((entry) => (
              <ComponentCard key={entry.name} entry={entry} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
