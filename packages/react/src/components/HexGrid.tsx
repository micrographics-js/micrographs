"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics-js/core";

export interface HexGridProps {
  cols?: number;
  rows?: number;
  size?: number;
  color?: string;
  animated?: boolean;
  speed?: number;
}

function hexPoints(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (i * 60 - 30) * (Math.PI / 180);
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
}

export function HexGrid({ cols = 5, rows = 3, size = 10, color = "var(--accent)", animated = true, speed = 300 }: HexGridProps) {
  const total = cols * rows;
  const [opacities, setOpacities] = useState<number[]>(() => Array.from({ length: total }, (_, i) => 0.15 + (i % 4) * 0.08));
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!animated) return;
    return createTicker(speed, () => setTick(t => t + 1));
  }, [animated, speed]);

  useEffect(() => {
    if (!animated) return;
    setOpacities(prev => prev.map((v, i) => {
      const target = 0.1 + Math.abs(Math.sin(tick * 0.15 + i * 1.1)) * 0.75;
      return v + (target - v) * 0.2;
    }));
  }, [tick, animated]);

  const r = size;
  const hexW = r * Math.sqrt(3);
  const hexH = r * 2;
  const colSpacing = hexW;
  const rowSpacing = hexH * 0.75;
  const svgW = cols * colSpacing + hexW * 0.5 + 2;
  const svgH = rows * rowSpacing + hexH * 0.25 + 2;

  return (
    <svg width={svgW} height={svgH} style={{ display: "block" }}>
      {Array.from({ length: rows }, (_, row) =>
        Array.from({ length: cols }, (_, col) => {
          const idx = row * cols + col;
          const offset = row % 2 === 1 ? hexW / 2 : 0;
          const cx = col * colSpacing + hexW / 2 + offset + 1;
          const cy = row * rowSpacing + hexH / 2 + 1;
          return (
            <polygon
              key={idx}
              points={hexPoints(cx, cy, r - 1)}
              fill={color}
              stroke={color}
              strokeWidth={0.5}
              fillOpacity={opacities[idx] ?? 0.15}
              strokeOpacity={0.3}
            />
          );
        })
      )}
    </svg>
  );
}
