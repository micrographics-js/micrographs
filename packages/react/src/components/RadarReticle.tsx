"use client";
import { useEffect, useRef, useState } from "react";
import { createTicker } from "@micrographics-js/core";

export interface RadarReticleProps {
  size?: number;
  color?: string;
  speed?: number;
  targets?: number;
}

interface Target {
  id: number;
  x: number;
  y: number;
  age: number;
  maxAge: number;
}

let _tid = 0;

export function RadarReticle({ size = 80, color = "var(--accent)", speed = 35, targets = 4 }: RadarReticleProps) {
  const [angle, setAngle] = useState(0);
  const targetsRef = useRef<Target[]>([]);
  const [, forceRender] = useState(0);

  useEffect(() => {
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - 6;
    return createTicker(speed, () => {
      setAngle(a => {
        const next = (a + 2) % 360;
        if (targetsRef.current.length < targets && Math.random() < 0.015) {
          const dist = 0.25 + Math.random() * 0.65;
          const ta = (next * Math.PI) / 180;
          targetsRef.current = [
            ...targetsRef.current,
            { id: _tid++, x: cx + dist * r * Math.cos(ta), y: cy + dist * r * Math.sin(ta), age: 0, maxAge: 80 + Math.random() * 60 },
          ];
        }
        targetsRef.current = targetsRef.current.map(t => ({ ...t, age: t.age + 1 })).filter(t => t.age < t.maxAge);
        forceRender(n => n + 1);
        return next;
      });
    });
  }, [speed, targets, size]);

  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 6;
  const rad = (angle * Math.PI) / 180;

  return (
    <svg width={size} height={size} style={{ display: "block" }}>
      {/* BG */}
      <rect x={0} y={0} width={size} height={size} fill="var(--bg-secondary)" />
      {/* Rings */}
      {[0.3, 0.6, 1].map((f, i) => (
        <circle key={i} cx={cx} cy={cy} r={r * f} fill="none" stroke={color} strokeWidth={0.5} opacity={0.2} />
      ))}
      {/* Cross */}
      <line x1={0} y1={cy} x2={size} y2={cy} stroke={color} strokeWidth={0.5} opacity={0.2} />
      <line x1={cx} y1={0} x2={cx} y2={size} stroke={color} strokeWidth={0.5} opacity={0.2} />
      {/* Diagonals */}
      <line x1={cx - r * 0.7} y1={cy - r * 0.7} x2={cx + r * 0.7} y2={cy + r * 0.7} stroke={color} strokeWidth={0.3} opacity={0.12} />
      <line x1={cx + r * 0.7} y1={cy - r * 0.7} x2={cx - r * 0.7} y2={cy + r * 0.7} stroke={color} strokeWidth={0.3} opacity={0.12} />
      {/* Targets */}
      {targetsRef.current.map(t => {
        const opacity = Math.max(0, 1 - t.age / t.maxAge);
        return (
          <g key={t.id} opacity={opacity}>
            <rect x={t.x - 3} y={t.y - 3} width={6} height={6} fill="none" stroke={color} strokeWidth={1} />
            <circle cx={t.x} cy={t.y} r={1} fill={color} />
          </g>
        );
      })}
      {/* Sweep */}
      <line x1={cx} y1={cy} x2={cx + r * Math.cos(rad)} y2={cy + r * Math.sin(rad)} stroke={color} strokeWidth={1.5} opacity={0.8} />
      <circle cx={cx} cy={cy} r={2} fill={color} />
      {/* border */}
      <rect x={0} y={0} width={size} height={size} fill="none" stroke="var(--border)" strokeWidth={1} />
    </svg>
  );
}
