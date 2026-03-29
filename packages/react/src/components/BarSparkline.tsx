"use client";
import { useEffect, useState } from "react";
import { createTicker, seeded } from "@micrographics-js/core";

export interface BarSparklineProps {
  bars?: number;
  color?: string;
  height?: number;
  speed?: number;
  seed?: number;
}

export function BarSparkline({ bars = 12, color = "var(--accent)", height = 32, speed = 200, seed = 7 }: BarSparklineProps) {
  const [values, setValues] = useState<number[]>(() =>
    Array.from({ length: bars }, (_, i) => seeded(seed + i)),
  );
  useEffect(() =>
    createTicker(speed, () =>
      setValues(prev => [...prev.slice(1), Math.random()])
    ), [speed]);

  const barW = 3;
  const gap = 1;
  const svgW = bars * (barW + gap) - gap;

  return (
    <svg width={svgW} height={height} style={{ display: "block" }} shapeRendering="crispEdges">
      {values.map((v, i) => {
        const h = Math.max(1, Math.round(v * height));
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
