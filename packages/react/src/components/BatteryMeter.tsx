"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics-js/core";

export interface BatteryMeterProps {
  level?: number;
  charging?: boolean;
  width?: number;
  height?: number;
}

export function BatteryMeter({ level = 0.75, charging = false, width = 28, height = 14 }: BatteryMeterProps) {
  const [animLevel, setAnimLevel] = useState(charging ? 0 : level);
  useEffect(() => {
    if (!charging) { setAnimLevel(level); return; }
    return createTicker(400, () => setAnimLevel(v => (v + 0.2) % 1.2));
  }, [level, charging]);

  const segments = 5;
  const bodyW = width - 4;
  const segW = Math.floor((bodyW - segments + 1) / segments);
  const color = level < 0.2 ? "var(--accent-red)" : level < 0.4 ? "var(--accent-amber)" : "var(--accent)";
  const filled = Math.round(Math.min(animLevel, 1) * segments);

  return (
    <svg width={width} height={height} style={{ display: "block" }} shapeRendering="crispEdges">
      {/* body */}
      <rect x={0} y={1} width={bodyW} height={height - 2} fill="none" stroke="var(--fg-dim)" strokeWidth={1} />
      {/* tip */}
      <rect x={bodyW} y={Math.floor(height / 4)} width={4} height={Math.floor(height / 2)} fill="var(--fg-dim)" />
      {/* segments */}
      {Array.from({ length: segments }, (_, i) => (
        <rect
          key={i}
          x={2 + i * (segW + 1)}
          y={3}
          width={segW}
          height={height - 6}
          fill={i < filled ? color : "none"}
          stroke={i < filled ? "none" : "var(--fg-dimmer)"}
          strokeWidth={0.5}
        />
      ))}
    </svg>
  );
}
