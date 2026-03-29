"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics-js/core";

export interface CompassRoseProps {
  heading?: number;
  size?: number;
  color?: string;
  animated?: boolean;
  speed?: number;
}

export function CompassRose({ heading = 0, size = 60, color = "var(--accent)", animated = false, speed = 80 }: CompassRoseProps) {
  const [current, setCurrent] = useState(heading);

  useEffect(() => {
    setCurrent(heading);
  }, [heading]);

  useEffect(() => {
    if (!animated) return;
    return createTicker(speed, () => setCurrent(h => (h + 1) % 360));
  }, [animated, speed]);

  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 4;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const needleAngle = toRad(current - 90);

  const dirs = ["N", "E", "S", "W"];
  const dirAngles = [0, 90, 180, 270];

  return (
    <svg width={size} height={size} style={{ display: "block" }}>
      {/* outer ring */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--border)" strokeWidth={1} />
      <circle cx={cx} cy={cy} r={r * 0.6} fill="none" stroke="var(--fg-dimmer)" strokeWidth={0.5} opacity={0.4} />
      {/* tick marks */}
      {Array.from({ length: 36 }, (_, i) => {
        const a = toRad(i * 10);
        const isMajor = i % 9 === 0;
        const inner = r - (isMajor ? 5 : 2);
        return (
          <line
            key={i}
            x1={cx + inner * Math.cos(a)}
            y1={cy + inner * Math.sin(a)}
            x2={cx + r * Math.cos(a)}
            y2={cy + r * Math.sin(a)}
            stroke="var(--fg-dimmer)"
            strokeWidth={isMajor ? 1 : 0.5}
          />
        );
      })}
      {/* direction labels */}
      {dirs.map((d, i) => {
        const a = toRad(dirAngles[i] - 90);
        const labelR = r - 9;
        return (
          <text
            key={d}
            x={cx + labelR * Math.cos(a)}
            y={cy + labelR * Math.sin(a) + 3}
            textAnchor="middle"
            fill={d === "N" ? "var(--accent-red)" : "var(--fg-dim)"}
            fontSize="7"
            fontFamily="monospace"
            fontWeight="bold"
          >
            {d}
          </text>
        );
      })}
      {/* needle */}
      <line
        x1={cx - (r * 0.4) * Math.cos(needleAngle)}
        y1={cy - (r * 0.4) * Math.sin(needleAngle)}
        x2={cx + (r * 0.65) * Math.cos(needleAngle)}
        y2={cy + (r * 0.65) * Math.sin(needleAngle)}
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="square"
      />
      <line
        x1={cx}
        y1={cy}
        x2={cx - (r * 0.3) * Math.cos(needleAngle)}
        y2={cy - (r * 0.3) * Math.sin(needleAngle)}
        stroke="var(--accent-red)"
        strokeWidth={1.5}
        strokeLinecap="square"
      />
      <circle cx={cx} cy={cy} r={2.5} fill="var(--bg)" stroke={color} strokeWidth={1} />
    </svg>
  );
}
