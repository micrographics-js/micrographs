"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics/core";

export interface HeartbeatLineProps {
  width?: number;
  height?: number;
  color?: string;
  speed?: number;
}

export function HeartbeatLine({ width = 80, height = 24, color = "var(--accent)", speed = 1200 }: HeartbeatLineProps) {
  const [phase, setPhase] = useState(0);
  useEffect(() => createTicker(speed / 20, () => setPhase(p => (p + 1) % 20)), [speed]);

  const mid = height / 2;
  const pts: [number, number][] = [];
  const step = width / 20;
  for (let i = 0; i < 20; i++) {
    const x = i * step;
    let y = mid;
    const rel = (i - phase + 20) % 20;
    if (rel === 8) y = mid - height * 0.4;
    else if (rel === 9) y = mid + height * 0.5;
    else if (rel === 10) y = mid - height * 0.15;
    pts.push([x, y]);
  }

  const pointsStr = pts.map(([x, y]) => `${x},${y}`).join(" ");

  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      <polyline points={pointsStr} fill="none" stroke={color} strokeWidth={1.5} />
    </svg>
  );
}
