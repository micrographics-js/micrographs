"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics-js/core";

export interface ScanLineProps {
  width?: number;
  height?: number;
  color?: string;
  speed?: number;
}

export function ScanLine({ width = 60, height = 40, color = "var(--accent)", speed = 60 }: ScanLineProps) {
  const [y, setY] = useState(0);
  useEffect(() =>
    createTicker(speed, () => setY(v => (v + 1) % height)), [speed, height]);

  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      <rect x={0} y={0} width={width} height={height} fill="none" stroke="var(--fg-dimmer)" strokeWidth={0.5} />
      <rect x={0} y={y} width={width} height={2} fill={color} opacity={0.8} />
      <rect x={0} y={y - 4} width={width} height={6} fill={color} opacity={0.15} />
    </svg>
  );
}
