"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics-js/core";

export interface LatLongDisplayProps {
  lat?: number;
  lon?: number;
  alt?: number;
  color?: string;
  animated?: boolean;
}

function toDMS(deg: number, isLat: boolean): string {
  const dir = isLat ? (deg >= 0 ? "N" : "S") : (deg >= 0 ? "E" : "W");
  const abs = Math.abs(deg);
  const d = Math.floor(abs);
  const m = Math.floor((abs - d) * 60);
  const s = ((abs - d - m / 60) * 3600).toFixed(1);
  return `${dir} ${d}\u00B0${String(m).padStart(2, "0")}'${s.padStart(4, "0")}"`;
}

export function LatLongDisplay({ lat = 34.0522, lon = -118.2437, alt = 120, color = "var(--fg)", animated = false }: LatLongDisplayProps) {
  const [drift, setDrift] = useState(0);

  useEffect(() => {
    if (!animated) return;
    return createTicker(500, () => setDrift((Math.random() - 0.5) * 0.0002));
  }, [animated]);

  return (
    <div style={{ fontFamily: "monospace", fontSize: "10px", display: "inline-flex", flexDirection: "column", gap: "1px" }}>
      <span style={{ color, letterSpacing: "0.05em" }}>{toDMS(lat + (animated ? drift : 0), true)}</span>
      <span style={{ color, letterSpacing: "0.05em" }}>{toDMS(lon + (animated ? drift * 0.8 : 0), false)}</span>
      <span style={{ color: "var(--fg-dimmer)", letterSpacing: "0.05em" }}>ALT {alt.toFixed(0)}m</span>
    </div>
  );
}
