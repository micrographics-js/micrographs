"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics/core";

export interface SpeedometerProps {
  value?: number;
  max?: number;
  size?: number;
  color?: string;
  unit?: string;
  animated?: boolean;
}

export function Speedometer({ value = 60, max = 100, size = 80, color = "var(--accent)", unit = "km/h", animated = false }: SpeedometerProps) {
  const [current, setCurrent] = useState(value);

  useEffect(() => setCurrent(value), [value]);

  useEffect(() => {
    if (!animated) return;
    let dir = 1;
    return createTicker(100, () => {
      setCurrent(v => {
        const next = v + dir * 1.5;
        if (next >= max) dir = -1;
        if (next <= 0) dir = 1;
        return Math.max(0, Math.min(max, next));
      });
    });
  }, [animated, max]);

  const cx = size / 2;
  const cy = size * 0.6;
  const r = size / 2 - 5;
  const startAngle = 180;
  const totalArc = 180;
  const pct = Math.max(0, Math.min(1, current / max));
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const arcPath = (radius: number, start: number, sweep: number) => {
    const s = toRad(start);
    const e = toRad(start + sweep);
    const x1 = cx + radius * Math.cos(s);
    const y1 = cy + radius * Math.sin(s);
    const x2 = cx + radius * Math.cos(e);
    const y2 = cy + radius * Math.sin(e);
    const large = sweep > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2}`;
  };

  const needleAngle = toRad(startAngle + pct * totalArc);
  const nx = cx + r * 0.75 * Math.cos(needleAngle);
  const ny = cy + r * 0.75 * Math.sin(needleAngle);
  const nb = toRad(needleAngle + Math.PI);
  const nbx = cx + r * 0.18 * Math.cos(nb);
  const nby = cy + r * 0.18 * Math.sin(nb);

  const isHigh = pct > 0.8;
  const activeColor = isHigh ? "var(--accent-red)" : pct > 0.6 ? "var(--accent-amber)" : color;

  return (
    <svg width={size} height={size * 0.65} style={{ display: "block" }}>
      {/* Track */}
      <path d={arcPath(r, startAngle, totalArc)} fill="none" stroke="var(--fg-dimmer)" strokeWidth={4} strokeLinecap="square" />
      {/* Fill */}
      {pct > 0 && (
        <path d={arcPath(r, startAngle, pct * totalArc)} fill="none" stroke={activeColor} strokeWidth={4} strokeLinecap="square" />
      )}
      {/* Tick marks */}
      {Array.from({ length: 11 }, (_, i) => {
        const a = toRad(startAngle + (i / 10) * totalArc);
        const inner = r - 5;
        return (
          <line
            key={i}
            x1={cx + inner * Math.cos(a)}
            y1={cy + inner * Math.sin(a)}
            x2={cx + (r + 1) * Math.cos(a)}
            y2={cy + (r + 1) * Math.sin(a)}
            stroke="var(--fg-dimmer)"
            strokeWidth={i % 5 === 0 ? 1.5 : 0.75}
          />
        );
      })}
      {/* Needle */}
      <line x1={nbx} y1={nby} x2={nx} y2={ny} stroke={activeColor} strokeWidth={1.5} strokeLinecap="square" />
      <circle cx={cx} cy={cy} r={3} fill={activeColor} />
      {/* Value */}
      <text x={cx} y={cy - 6} textAnchor="middle" fill={activeColor} fontSize="11" fontFamily="monospace" fontWeight="bold">
        {Math.round(current)}
      </text>
      <text x={cx} y={cy + 3} textAnchor="middle" fill="var(--fg-dimmer)" fontSize="7" fontFamily="monospace">
        {unit}
      </text>
    </svg>
  );
}
