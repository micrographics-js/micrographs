"use client";
import { ScanBeam } from "./ScanBeam.js";

export interface WeatherStripProps {
  done?: boolean;
  temp?: number;
  unit?: string;
  condition?: string;
}

export function WeatherStrip({ done = false, temp = 22, unit = "C", condition = "CLEAR" }: WeatherStripProps) {
  if (!done) {
    return (
      <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "monospace", fontSize: "9px", color: "var(--fg-dim)" }}>
        <span>WX</span>
        <ScanBeam width={60} height={4} color="var(--accent)" speed={50} />
      </div>
    );
  }
  return (
    <span style={{
      fontFamily: "monospace",
      fontSize: "10px",
      color: "var(--fg)",
      letterSpacing: "0.04em",
    }}>
      <span style={{ color: "var(--accent-amber)" }}>{temp}°{unit}</span>
      <span style={{ color: "var(--fg-dimmer)" }}> · </span>
      <span style={{ color: "var(--fg-dim)" }}>{condition}</span>
    </span>
  );
}
