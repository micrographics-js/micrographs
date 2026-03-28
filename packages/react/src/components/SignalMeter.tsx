"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics/core";

export interface SignalMeterProps {
  bars?: number;
  color?: string;
  speed?: number;
  width?: number;
  height?: number;
}

export function SignalMeter({ bars = 5, color = "var(--accent)", speed = 180, width = 40, height = 24 }: SignalMeterProps) {
  const [tick, setTick] = useState(0);
  useEffect(() => createTicker(speed, () => setTick(t => t + 1)), [speed]);

  const barW = Math.floor(width / bars) - 1;
  return (
    <svg width={width} height={height} style={{ display: "block" }} shapeRendering="crispEdges">
      {Array.from({ length: bars }, (_, i) => {
        const phase = (tick / 8 + i * 0.4) % (Math.PI * 2);
        const h = Math.max(2, Math.round(((Math.sin(phase) + 1) / 2) * height));
        const x = i * (barW + 1);
        return (
          <rect
            key={i}
            x={x}
            y={height - h}
            width={barW}
            height={h}
            fill={color}
            opacity={0.7 + 0.3 * ((i + 1) / bars)}
          />
        );
      })}
    </svg>
  );
}
