"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics/core";

export interface FrequencyBarsProps {
  bars?: number;
  color?: string;
  height?: number;
  speed?: number;
}

export function FrequencyBars({ bars = 8, color = "var(--accent)", height = 32, speed = 80 }: FrequencyBarsProps) {
  const [tick, setTick] = useState(0);
  useEffect(() => createTicker(speed, () => setTick(t => t + 1)), [speed]);

  const barW = 4;
  const gap = 2;
  const svgW = bars * (barW + gap) - gap;

  return (
    <svg width={svgW} height={height} style={{ display: "block" }} shapeRendering="crispEdges">
      {Array.from({ length: bars }, (_, i) => {
        const phase = (tick / 10 + i * 0.7) % (Math.PI * 2);
        const h = Math.max(2, Math.round(((Math.sin(phase) + 1) / 2) * height));
        return (
          <rect
            key={i}
            x={i * (barW + gap)}
            y={height - h}
            width={barW}
            height={h}
            fill={color}
          />
        );
      })}
    </svg>
  );
}
