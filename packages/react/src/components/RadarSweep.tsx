"use client";
import { useEffect, useState, useRef } from "react";
import { createTicker } from "@micrographics/core";

export interface RadarSweepProps {
  size?: number;
  color?: string;
  speed?: number;
  pings?: number;
}

interface Ping {
  x: number;
  y: number;
  age: number;
}

export function RadarSweep({ size = 60, color = "var(--accent)", speed = 40, pings = 3 }: RadarSweepProps) {
  const [angle, setAngle] = useState(0);
  const pingsRef = useRef<Ping[]>([]);
  const [, forceRender] = useState(0);

  useEffect(() => {
    const r = size / 2 - 4;
    const cx = size / 2;
    const cy = size / 2;
    return createTicker(speed, () => {
      setAngle(a => {
        const next = (a + 3) % 360;
        if (Math.random() < 0.03) {
          const dist = Math.random() * r * 0.85;
          const pingAngle = next * (Math.PI / 180);
          pingsRef.current = [
            ...pingsRef.current.slice(-(pings - 1)),
            { x: cx + dist * Math.cos(pingAngle), y: cy + dist * Math.sin(pingAngle), age: 0 },
          ];
        }
        pingsRef.current = pingsRef.current.map(p => ({ ...p, age: p.age + 1 })).filter(p => p.age < 60);
        forceRender(n => n + 1);
        return next;
      });
    });
  }, [speed, pings, size]);

  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 4;
  const rad = (angle * Math.PI) / 180;
  const x2 = cx + r * Math.cos(rad);
  const y2 = cy + r * Math.sin(rad);

  // sweep gradient
  const gradId = `radar-sweep-${size}`;
  const sweepStart = ((angle - 60 + 360) % 360) * (Math.PI / 180);
  const sweepEnd = rad;
  const sweepX1 = cx + r * Math.cos(sweepStart);
  const sweepY1 = cy + r * Math.sin(sweepStart);

  return (
    <svg width={size} height={size} style={{ display: "block" }}>
      <defs>
        <radialGradient id={gradId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* background */}
      <circle cx={cx} cy={cy} r={r} fill="var(--bg-secondary)" stroke="var(--border)" strokeWidth={1} />
      {/* rings */}
      {[0.33, 0.66, 1].map((f, i) => (
        <circle key={i} cx={cx} cy={cy} r={r * f} fill="none" stroke="var(--fg-dimmer)" strokeWidth={0.5} opacity={0.4} />
      ))}
      {/* cross lines */}
      <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke="var(--fg-dimmer)" strokeWidth={0.5} opacity={0.3} />
      <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} stroke="var(--fg-dimmer)" strokeWidth={0.5} opacity={0.3} />
      {/* sweep fill */}
      <circle cx={cx} cy={cy} r={r} fill={`url(#${gradId})`} opacity={0.6} />
      {/* pings */}
      {pingsRef.current.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={1.5} fill={color} opacity={Math.max(0, 1 - p.age / 60)} />
      ))}
      {/* sweep arm */}
      <line x1={cx} y1={cy} x2={x2} y2={y2} stroke={color} strokeWidth={1.5} opacity={0.9} />
      <circle cx={cx} cy={cy} r={2} fill={color} />
    </svg>
  );
}
