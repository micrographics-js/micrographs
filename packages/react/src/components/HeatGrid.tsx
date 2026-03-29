"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics/core";

export interface HeatGridProps {
  cols?: number;
  rows?: number;
  cellSize?: number;
  speed?: number;
}

export function HeatGrid({ cols = 8, rows = 4, cellSize = 6, speed = 120 }: HeatGridProps) {
  const total = cols * rows;
  const [values, setValues] = useState<number[]>(() =>
    Array.from({ length: total }, (_, i) => 0.2 + (i % 5) * 0.15)
  );
  const [tick, setTick] = useState(0);

  useEffect(() => createTicker(speed, () => setTick(t => t + 1)), [speed]);

  useEffect(() => {
    setValues(prev => prev.map((v, i) => {
      const target = 0.1 + Math.abs(Math.sin(tick * 0.05 + i * 0.7)) * 0.9;
      return v + (target - v) * 0.12;
    }));
  }, [tick]);

  const gap = 1;
  const w = cols * cellSize + (cols - 1) * gap;
  const h = rows * cellSize + (rows - 1) * gap;

  const colorForValue = (v: number) => {
    if (v < 0.33) return `var(--accent-amber)`;
    if (v < 0.66) return `var(--accent-amber)`;
    return `var(--accent-red)`;
  };

  return (
    <svg width={w} height={h} style={{ display: "block" }} shapeRendering="crispEdges">
      {values.map((v, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        return (
          <rect
            key={i}
            x={col * (cellSize + gap)}
            y={row * (cellSize + gap)}
            width={cellSize}
            height={cellSize}
            fill={colorForValue(v)}
            opacity={0.15 + v * 0.85}
          />
        );
      })}
    </svg>
  );
}
