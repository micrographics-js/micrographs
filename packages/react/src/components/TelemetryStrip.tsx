"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics-js/core";

export interface TelemetryStripProps {
  altitude?: number;
  speed?: number;
  heading?: number;
  lat?: number;
  lon?: number;
  color?: string;
  animated?: boolean;
}

export function TelemetryStrip({
  altitude = 120,
  speed = 45,
  heading = 270,
  lat = 34.0522,
  lon = -118.2437,
  color = "var(--accent, #00ff41)",
  animated = true,
}: TelemetryStripProps) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!animated) return;
    return createTicker(120, () => setTick((t) => t + 1));
  }, [animated]);

  const alt = animated ? (altitude + Math.sin(tick * 0.03) * 0.5).toFixed(1) : altitude.toFixed(1);
  const spd = animated ? (speed + Math.sin(tick * 0.05) * 0.3).toFixed(1) : speed.toFixed(1);
  const hdg = animated ? (((heading + tick * 0.15) % 360).toFixed(0)).padStart(3, "0") : heading.toFixed(0).padStart(3, "0");
  const latD = animated ? (lat + Math.sin(tick * 0.01) * 0.0001).toFixed(4) : lat.toFixed(4);
  const lonD = animated ? (lon + Math.cos(tick * 0.01) * 0.0001).toFixed(4) : lon.toFixed(4);

  const text = `ALT:${alt}m | SPD:${spd}kts | HDG:${hdg}\u00B0 | POS:${latD},${lonD}`;
  const width = text.length * 6.2 + 16;

  return (
    <svg width={width} height={16} style={{ display: "block" }} shapeRendering="crispEdges">
      <rect x={0} y={0} width={width} height={16} fill="rgba(0,0,0,0.7)" />
      <line x1={0} y1={0} x2={width} y2={0} stroke={color} strokeWidth={1} opacity={0.4} />
      <line x1={0} y1={15} x2={width} y2={15} stroke={color} strokeWidth={1} opacity={0.4} />
      <text
        x={8}
        y={11}
        fill={color}
        fontSize="8"
        fontFamily="monospace"
        letterSpacing="0.05em"
        opacity={0.9}
      >
        {text}
      </text>
    </svg>
  );
}
