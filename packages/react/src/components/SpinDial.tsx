"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics/core";

export interface SpinDialProps {
  done?: boolean;
  color?: string;
  size?: number;
}

export function SpinDial({ done = false, color = "var(--accent)", size = 16 }: SpinDialProps) {
  const [angle, setAngle] = useState(0);
  useEffect(() => {
    if (done) return;
    return createTicker(40, () => setAngle(a => (a + 18) % 360));
  }, [done]);

  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 1.5;
  const rad = (angle * Math.PI) / 180;
  const x2 = cx + r * 0.65 * Math.cos(rad);
  const y2 = cy + r * 0.65 * Math.sin(rad);

  if (done) {
    const checkPts = `${cx - r * 0.35},${cy} ${cx - r * 0.1},${cy + r * 0.35} ${cx + r * 0.45},${cy - r * 0.35}`;
    return (
      <svg width={size} height={size} style={{ display: "block" }} shapeRendering="crispEdges">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={1.5} />
        <polyline points={checkPts} fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg width={size} height={size} style={{ display: "block" }} shapeRendering="crispEdges">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--fg-dimmer)" strokeWidth={1} strokeDasharray="3 2" />
      <line x1={cx} y1={cy} x2={x2} y2={y2} stroke={color} strokeWidth={1.5} strokeLinecap="square" />
      <rect x={cx - 1} y={cy - 1} width={2} height={2} fill={color} />
    </svg>
  );
}
