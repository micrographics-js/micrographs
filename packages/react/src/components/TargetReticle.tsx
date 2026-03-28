"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics/core";

export interface TargetReticleProps {
  size?: number;
  color?: string;
  label?: string;
  animate?: boolean;
  rings?: number;
  crosshair?: boolean;
  speed?: number;
}

export function TargetReticle({
  size = 64,
  color = "var(--accent)",
  label,
  animate = true,
  rings = 2,
  crosshair = true,
  speed = 3000,
}: TargetReticleProps) {
  const [rotation, setRotation] = useState(0);
  const [pulse, setPulse] = useState(1);

  useEffect(() => {
    if (!animate) return;
    return createTicker(40, () => {
      setRotation((r) => (r + (360 / speed) * 40) % 360);
      setPulse((p) => 0.5 + 0.5 * Math.abs(Math.sin(Date.now() / 800)));
    });
  }, [animate, speed]);

  const cx = size / 2;
  const cy = size / 2;
  const gap = 8; // crosshair gap from center

  return (
    <svg width={size} height={size} style={{ display: "block", overflow: "visible" }}>
      <defs>
        <filter id="reticle-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer static rings */}
      {Array.from({ length: rings }, (_, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={cx - 2 - i * 8}
          fill="none"
          stroke={color}
          strokeWidth={0.5}
          opacity={0.3 - i * 0.1}
          strokeDasharray={i === 0 ? undefined : "4 8"}
        />
      ))}

      {/* Rotating bracket corners */}
      {[0, 90, 180, 270].map((baseAngle, qi) => {
        const angle = baseAngle + rotation;
        const rad = (angle * Math.PI) / 180;
        const r = cx - 4;
        const bx = cx + r * Math.cos(rad);
        const by = cy + r * Math.sin(rad);
        const len = 6;
        const perpRad = rad + Math.PI / 2;
        return (
          <g key={qi} filter="url(#reticle-glow)">
            <line
              x1={bx}
              y1={by}
              x2={bx + len * Math.cos(rad)}
              y2={by + len * Math.sin(rad)}
              stroke={color}
              strokeWidth={1.5}
            />
            <line
              x1={bx}
              y1={by}
              x2={bx + len * Math.cos(perpRad)}
              y2={by + len * Math.sin(perpRad)}
              stroke={color}
              strokeWidth={1.5}
            />
          </g>
        );
      })}

      {/* Crosshair */}
      {crosshair && (
        <>
          <line x1={cx - cx + 2} y1={cy} x2={cx - gap} y2={cy} stroke={color} strokeWidth={0.75} opacity={0.6} />
          <line x1={cx + gap} y1={cy} x2={cx + cx - 2} y2={cy} stroke={color} strokeWidth={0.75} opacity={0.6} />
          <line x1={cx} y1={cy - cy + 2} x2={cx} y2={cy - gap} stroke={color} strokeWidth={0.75} opacity={0.6} />
          <line x1={cx} y1={cy + gap} x2={cx} y2={cy + cy - 2} stroke={color} strokeWidth={0.75} opacity={0.6} />
        </>
      )}

      {/* Center dot */}
      <circle cx={cx} cy={cy} r={2} fill={color} opacity={pulse} filter="url(#reticle-glow)" />

      {/* Label */}
      {label && (
        <text
          x={cx + cx - 2}
          y={cy + 3}
          textAnchor="end"
          fill={color}
          fontSize="6"
          fontFamily="monospace"
          letterSpacing="0.1em"
          opacity={0.7}
        >
          {label}
        </text>
      )}
    </svg>
  );
}
