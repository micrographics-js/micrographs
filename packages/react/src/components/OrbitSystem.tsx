"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics/core";

export interface OrbitSatellite {
  label: string;
  radius: number;
  speed: number;
  color?: string;
  size?: number;
  startAngle?: number;
}

export interface OrbitSystemProps {
  center?: string;
  satellites?: OrbitSatellite[];
  size?: number;
  showRings?: boolean;
  showLabels?: boolean;
  glowCenter?: boolean;
  color?: string;
}

const DEFAULT_SATELLITES: OrbitSatellite[] = [
  { label: "NODE·A", radius: 28, speed: 4000, color: "var(--accent)", startAngle: 0 },
  { label: "NODE·B", radius: 44, speed: 7000, color: "var(--fg-dim)", startAngle: 120 },
  { label: "NODE·C", radius: 58, speed: 11000, color: "var(--accent-amber)", startAngle: 240 },
];

export function OrbitSystem({
  center = "SYS",
  satellites = DEFAULT_SATELLITES,
  size = 140,
  showRings = true,
  showLabels = true,
  glowCenter = true,
  color = "var(--accent)",
}: OrbitSystemProps) {
  const [angles, setAngles] = useState<number[]>(() =>
    satellites.map((s) => s.startAngle ?? 0),
  );

  useEffect(() => {
    return createTicker(40, () => {
      setAngles((prev) =>
        prev.map((a, i) => (a + (360 / satellites[i].speed) * 40) % 360),
      );
    });
  }, [satellites]);

  const cx = size / 2;
  const cy = size / 2;

  return (
    <svg width={size} height={size} style={{ display: "block", overflow: "visible" }}>
      <defs>
        {glowCenter && (
          <filter id="orbit-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
        <filter id="sat-glow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Orbital rings */}
      {showRings &&
        satellites.map((sat, i) => (
          <circle
            key={`ring-${i}`}
            cx={cx}
            cy={cy}
            r={sat.radius}
            fill="none"
            stroke="var(--fg-dimmer)"
            strokeWidth={0.5}
            strokeDasharray="3 5"
          />
        ))}

      {/* Cross axes */}
      <line x1={cx - 6} y1={cy} x2={cx + 6} y2={cy} stroke="var(--fg-dimmer)" strokeWidth={0.5} />
      <line x1={cx} y1={cy - 6} x2={cx} y2={cy + 6} stroke="var(--fg-dimmer)" strokeWidth={0.5} />

      {/* Center dot */}
      <circle
        cx={cx}
        cy={cy}
        r={5}
        fill="none"
        stroke={color}
        strokeWidth={1}
        filter={glowCenter ? "url(#orbit-glow)" : undefined}
      />
      <circle cx={cx} cy={cy} r={2} fill={color} filter={glowCenter ? "url(#orbit-glow)" : undefined} />

      {/* Center label */}
      {showLabels && (
        <text
          x={cx}
          y={cy - 9}
          textAnchor="middle"
          fill={color}
          fontSize="6"
          fontFamily="monospace"
          letterSpacing="0.1em"
        >
          {center}
        </text>
      )}

      {/* Satellites */}
      {satellites.map((sat, i) => {
        const rad = (angles[i] * Math.PI) / 180;
        const sx = cx + sat.radius * Math.cos(rad);
        const sy = cy + sat.radius * Math.sin(rad);
        const satColor = sat.color ?? "var(--fg-dim)";
        const satSize = sat.size ?? 3;

        return (
          <g key={i} filter="url(#sat-glow)">
            {/* Tail trail */}
            {[0.4, 0.6, 0.8].map((t, ti) => {
              const trailAngle = angles[i] - (360 / satellites[i].speed) * 40 * (ti + 1) * 3;
              const tr = (trailAngle * Math.PI) / 180;
              const tx = cx + sat.radius * Math.cos(tr);
              const ty = cy + sat.radius * Math.sin(tr);
              return (
                <circle key={ti} cx={tx} cy={ty} r={satSize * (1 - t * 0.5)} fill={satColor} opacity={1 - t} />
              );
            })}
            {/* Satellite dot */}
            <circle cx={sx} cy={sy} r={satSize} fill={satColor} />
            {/* Label */}
            {showLabels && (
              <text
                x={sx + satSize + 3}
                y={sy + 3}
                fill={satColor}
                fontSize="6"
                fontFamily="monospace"
                letterSpacing="0.05em"
                opacity={0.85}
              >
                {sat.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
