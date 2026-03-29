"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics-js/core";

export interface WaveformLineProps {
  width?: number;
  height?: number;
  color?: string;
  speed?: number;
  amplitude?: number;
  frequency?: number;
}

export function WaveformLine({
  width = 80,
  height = 30,
  color = "var(--accent)",
  speed = 60,
  amplitude = 0.35,
  frequency = 2,
}: WaveformLineProps) {
  const [phase, setPhase] = useState(0);
  useEffect(() => createTicker(speed, () => setPhase(p => (p + 0.15) % (Math.PI * 2))), [speed]);

  const mid = height / 2;
  const amp = mid * amplitude * 2;
  const pts: string[] = [];
  const steps = width;
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2 * frequency + phase;
    const y = mid + Math.sin(t) * amp;
    pts.push(`${i},${y.toFixed(2)}`);
  }

  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      <line x1={0} y1={mid} x2={width} y2={mid} stroke="var(--fg-dimmer)" strokeWidth={0.5} strokeDasharray="2 3" />
      <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
    </svg>
  );
}
