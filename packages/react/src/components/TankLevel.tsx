"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics-js/core";

export interface TankLevelProps {
  level?: number;
  color?: string;
  width?: number;
  height?: number;
  label?: string;
  animated?: boolean;
}

export function TankLevel({ level = 0.6, color = "var(--accent)", width = 24, height = 48, label = "FUEL", animated = true }: TankLevelProps) {
  const [wave, setWave] = useState(0);
  useEffect(() => {
    if (!animated) return;
    return createTicker(100, () => setWave(w => w + 0.1));
  }, [animated]);

  const fillH = Math.round(level * (height - 4));
  const waveOffset = Math.sin(wave) * 2;

  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
      <svg width={width} height={height} style={{ display: "block" }} shapeRendering="crispEdges">
        <rect x={1} y={1} width={width - 2} height={height - 2} fill="none" stroke="var(--fg-dim)" strokeWidth={1} />
        <rect
          x={2}
          y={height - 2 - fillH + waveOffset}
          width={width - 4}
          height={fillH}
          fill={color}
          opacity={0.8}
        />
      </svg>
      <span style={{ fontFamily: "monospace", fontSize: "8px", color: "var(--fg-dimmer)" }}>{label}</span>
    </div>
  );
}
