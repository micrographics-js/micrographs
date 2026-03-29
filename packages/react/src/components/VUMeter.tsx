"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics-js/core";

export interface VUMeterProps {
  color?: string;
  speed?: number;
  height?: number;
}

export function VUMeter({ color = "var(--accent)", speed = 80, height = 40 }: VUMeterProps) {
  const [levels, setLevels] = useState([0.7, 0.5]);
  useEffect(() =>
    createTicker(speed, () =>
      setLevels(prev => prev.map(v => Math.max(0.05, Math.min(1, v + (Math.random() - 0.5) * 0.25)))
      ),
    ), [speed]);

  const segments = 8;
  const barW = 8;
  const gap = 2;
  const svgW = 2 * barW + gap + 4;
  const segH = Math.floor(height / segments) - 1;

  return (
    <svg width={svgW} height={height} style={{ display: "block" }} shapeRendering="crispEdges">
      {levels.map((lv, col) => {
        const filled = Math.round(lv * segments);
        return Array.from({ length: segments }, (_, i) => {
          const seg = segments - 1 - i;
          const x = col * (barW + gap + 2);
          const y = i * (segH + 1);
          const active = seg < filled;
          const segColor = seg >= segments - 2 ? "var(--accent-red)" : seg >= segments - 4 ? "var(--accent-amber)" : color;
          return (
            <rect
              key={`${col}-${i}`}
              x={x}
              y={y}
              width={barW}
              height={segH}
              fill={active ? segColor : "var(--fg-dimmer)"}
              opacity={active ? 1 : 0.2}
            />
          );
        });
      })}
    </svg>
  );
}
