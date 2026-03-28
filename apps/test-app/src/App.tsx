import {
  // Pack 1
  SignalMeter, PulseTag, StatusLight, HeartbeatLine, LoadBar, BootSequence,
  BatteryMeter, Uptime, PingIndicator, ConnectionStatus, AlertBanner,
  ReadyBadge, ScanLine, NetworkPulse, CPUSparkline, ErrorRate, MemoryBar,
  // Pack 2
  DotChart, BarSparkline, FrequencyBars, BinaryStream, VUMeter, HexDump,
  // Pack 3
  GlitchCycler, Typewriter, GlitchText, LogStream, CounterUp, BootLog, MatrixRain,
  // Pack 4
  CornerOrnament, Barcode, PanelTitle, PixelDiamond, ChevronRow, DataLabel,
  // Pack 5
  PixelClock, UnixTimestamp, DayProgress,
  // Pack 6
  DialGauge, TankLevel, FlowMeter,
  // Pack 7
  CopyButton, RatingDots,
} from "@micrographics/react";

interface ComponentEntry {
  name: string;
  element: React.ReactNode;
}

interface Pack {
  name: string;
  components: ComponentEntry[];
}

const packs: Pack[] = [
  {
    name: "Pack 1 — Signal & Status",
    components: [
      { name: "SignalMeter", element: <SignalMeter /> },
      { name: "PulseTag", element: <PulseTag label="LIVE" /> },
      { name: "StatusLight (ok)", element: <StatusLight status="ok" /> },
      { name: "StatusLight (warn)", element: <StatusLight status="warn" /> },
      { name: "StatusLight (error)", element: <StatusLight status="error" /> },
      { name: "HeartbeatLine", element: <HeartbeatLine /> },
      { name: "LoadBar", element: <LoadBar /> },
      { name: "BootSequence", element: <BootSequence /> },
      { name: "BatteryMeter", element: <BatteryMeter level={0.75} /> },
      { name: "BatteryMeter (low)", element: <BatteryMeter level={0.15} /> },
      { name: "Uptime", element: <Uptime /> },
      { name: "PingIndicator", element: <PingIndicator ms={24} /> },
      { name: "ConnectionStatus", element: <ConnectionStatus connected={true} /> },
      { name: "ConnectionStatus (lost)", element: <ConnectionStatus connected={false} /> },
      { name: "AlertBanner", element: <AlertBanner message="THRESHOLD EXCEEDED" /> },
      { name: "ReadyBadge", element: <ReadyBadge /> },
      { name: "ScanLine", element: <ScanLine /> },
      { name: "NetworkPulse", element: <NetworkPulse /> },
      { name: "CPUSparkline", element: <CPUSparkline /> },
      { name: "ErrorRate", element: <ErrorRate count={3} /> },
      { name: "MemoryBar", element: <MemoryBar used={6.4} total={16} /> },
    ],
  },
  {
    name: "Pack 2 — Data Micro-Viz",
    components: [
      { name: "DotChart", element: <DotChart width={12} /> },
      { name: "BarSparkline", element: <BarSparkline bars={16} /> },
      { name: "FrequencyBars", element: <FrequencyBars bars={10} /> },
      { name: "BinaryStream", element: <BinaryStream /> },
      { name: "VUMeter", element: <VUMeter /> },
      { name: "HexDump", element: <HexDump rows={3} cols={6} /> },
    ],
  },
  {
    name: "Pack 3 — Terminal Text Effects",
    components: [
      { name: "GlitchCycler", element: <GlitchCycler /> },
      { name: "Typewriter", element: <Typewriter text="SYSTEM·ONLINE" loop /> },
      { name: "GlitchText", element: <GlitchText text="MICROGRAPHICS" /> },
      { name: "LogStream", element: <LogStream maxLines={4} /> },
      { name: "CounterUp", element: <CounterUp target={9999} suffix=" ops" /> },
      { name: "BootLog", element: <BootLog /> },
      { name: "MatrixRain", element: <MatrixRain cols={7} rows={5} /> },
    ],
  },
  {
    name: "Pack 4 — Decorative Chrome",
    components: [
      { name: "CornerOrnament (TL)", element: <CornerOrnament corner="tl" /> },
      { name: "CornerOrnament (TR)", element: <CornerOrnament corner="tr" /> },
      { name: "CornerOrnament (BL)", element: <CornerOrnament corner="bl" /> },
      { name: "CornerOrnament (BR)", element: <CornerOrnament corner="br" /> },
      { name: "Barcode", element: <Barcode seed={7} /> },
      { name: "PanelTitle", element: <PanelTitle title="SUBSYSTEM A" /> },
      { name: "PixelDiamond", element: <PixelDiamond /> },
      { name: "ChevronRow (right)", element: <ChevronRow direction="right" /> },
      { name: "ChevronRow (left)", element: <ChevronRow direction="left" /> },
      { name: "DataLabel", element: <DataLabel label="MODE" value="ACTIVE" /> },
    ],
  },
  {
    name: "Pack 5 — Time & Clocks",
    components: [
      { name: "PixelClock", element: <PixelClock /> },
      { name: "UnixTimestamp", element: <UnixTimestamp /> },
      { name: "DayProgress (day)", element: <DayProgress unit="day" /> },
      { name: "DayProgress (year)", element: <DayProgress unit="year" /> },
      { name: "DayProgress (month)", element: <DayProgress unit="month" /> },
    ],
  },
  {
    name: "Pack 6 — Industrial Gauges",
    components: [
      { name: "DialGauge", element: <DialGauge value={65} label="RPM" /> },
      { name: "DialGauge (high)", element: <DialGauge value={92} label="TEMP" color="var(--accent-red)" /> },
      { name: "TankLevel", element: <TankLevel level={0.6} label="FUEL" /> },
      { name: "TankLevel (low)", element: <TankLevel level={0.15} color="var(--accent-red)" label="OIL" /> },
      { name: "FlowMeter (right)", element: <FlowMeter direction="right" /> },
      { name: "FlowMeter (left)", element: <FlowMeter direction="left" color="var(--accent-amber)" /> },
    ],
  },
  {
    name: "Pack 7 — Interaction",
    components: [
      { name: "CopyButton", element: <CopyButton text="npm install @micrographics/react" /> },
      { name: "RatingDots (3/5)", element: <RatingDots value={3} /> },
      { name: "RatingDots (5/5)", element: <RatingDots value={5} /> },
    ],
  },
];

export default function App() {
  return (
    <div className="gallery">
      <div className="gallery-header">
        <div className="gallery-title">MICROGRAPHICS</div>
        <div className="gallery-subtitle">
          Component Gallery · {packs.reduce((n, p) => n + p.components.length, 0)} components · v0.1.0
        </div>
      </div>

      {packs.map(pack => (
        <div key={pack.name} className="pack">
          <div className="pack-title">{pack.name}</div>
          <div className="components-grid">
            {pack.components.map(comp => (
              <div key={comp.name} className="component-card">
                <div className="component-name">{comp.name}</div>
                <div className="component-preview">{comp.element}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
