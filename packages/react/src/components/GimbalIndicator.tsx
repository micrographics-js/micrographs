"use client";
import { useState, useEffect } from "react";

export interface GimbalIndicatorProps {
  pitch?: number;
  yaw?: number;
  zoom?: number;
  size?: number;
  color?: string;
}

export function GimbalIndicator({
  pitch = -30,
  yaw = 15,
  zoom = 4,
  size = 80,
  color = "var(--accent, #00ff41)",
}: GimbalIndicatorProps) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 8;
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  // Pitch arc: -90 to +90 (left semicircle)
  const pitchArcX = cx - r * 0.3;
  const pitchArcR = r * 0.7;
  const pitchStart = -90;
  const pitchEnd = 90;

  // Yaw arc: -180 to +180 (bottom arc)
  const yawArcY = cy + r * 0.15;

  // Pitch marker position
  const pitchAngle = toRad(((pitch + 90) / 180) * 180 - 90);
  const pitchMarkerX = pitchArcX + pitchArcR * Math.cos(pitchAngle);
  const pitchMarkerY = cy + pitchArcR * Math.sin(pitchAngle);

  // Yaw marker position
  const yawNorm = ((yaw + 180) / 360) * Math.PI; // 0 to PI
  const yawMarkerX = cx - r * 0.8 * Math.cos(yawNorm);
  const yawMarkerY = yawArcY - r * 0.4 * Math.sin(yawNorm);

  // Pitch arc path
  const pitchTicks = [-90, -60, -30, 0, 30, 60, 90];

  return (
    <svg width={size} height={size} style={{ display: "block" }} shapeRendering="crispEdges">
      {/* Background */}
      <rect x={0} y={0} width={size} height={size} fill="rgba(0,0,0,0.7)" rx={2} />

      {/* Pitch arc */}
      {pitchTicks.map((deg) => {
        const a = toRad(deg);
        const tx = cx * 0.35 + pitchArcR * 0.62 * Math.cos(a);
        const ty = cy + pitchArcR * 0.62 * Math.sin(a);
        const ex = cx * 0.35 + pitchArcR * 0.72 * Math.cos(a);
        const ey = cy + pitchArcR * 0.72 * Math.sin(a);
        return (
          <g key={deg}>
            <line x1={tx} y1={ty} x2={ex} y2={ey} stroke={color} strokeWidth={0.5} opacity={0.4} />
            <text x={tx - 2} y={ty + 2} fill={color} fontSize="4" fontFamily="monospace" opacity={0.3} textAnchor="end">
              {deg}
            </text>
          </g>
        );
      })}

      {/* Pitch arc line */}
      <path
        d={`M ${cx * 0.35 + pitchArcR * 0.67 * Math.cos(toRad(-90))},${cy + pitchArcR * 0.67 * Math.sin(toRad(-90))} A ${pitchArcR * 0.67},${pitchArcR * 0.67} 0 0,1 ${cx * 0.35 + pitchArcR * 0.67 * Math.cos(toRad(90))},${cy + pitchArcR * 0.67 * Math.sin(toRad(90))}`}
        fill="none"
        stroke={color}
        strokeWidth={0.5}
        opacity={0.3}
      />

      {/* Pitch marker */}
      <circle
        cx={cx * 0.35 + pitchArcR * 0.67 * Math.cos(toRad(pitch))}
        cy={cy + pitchArcR * 0.67 * Math.sin(toRad(pitch))}
        r={2.5}
        fill={color}
        opacity={0.9}
      />

      {/* Yaw indicator - horizontal bar */}
      <line x1={cx - r * 0.7} y1={cy + r * 0.6} x2={cx + r * 0.7} y2={cy + r * 0.6} stroke={color} strokeWidth={0.5} opacity={0.3} />
      {[-180, -90, 0, 90, 180].map((deg) => {
        const x = cx + (deg / 180) * r * 0.7;
        return (
          <g key={deg}>
            <line x1={x} y1={cy + r * 0.56} x2={x} y2={cy + r * 0.64} stroke={color} strokeWidth={0.5} opacity={0.4} />
            <text x={x} y={cy + r * 0.74} textAnchor="middle" fill={color} fontSize="4" fontFamily="monospace" opacity={0.3}>
              {deg}
            </text>
          </g>
        );
      })}

      {/* Yaw marker */}
      <polygon
        points={`${cx + (yaw / 180) * r * 0.7},${cy + r * 0.54} ${cx + (yaw / 180) * r * 0.7 - 2},${cy + r * 0.5} ${cx + (yaw / 180) * r * 0.7 + 2},${cy + r * 0.5}`}
        fill={color}
        opacity={0.9}
      />

      {/* Labels */}
      <text x={4} y={10} fill={color} fontSize="5" fontFamily="monospace" opacity={0.5}>
        PIT:{pitch}°
      </text>
      <text x={size - 4} y={10} textAnchor="end" fill={color} fontSize="5" fontFamily="monospace" opacity={0.5}>
        YAW:{yaw}°
      </text>

      {/* Zoom */}
      <text x={cx} y={cy - 2} textAnchor="middle" fill={color} fontSize="10" fontFamily="monospace" fontWeight="bold" opacity={0.8}>
        {zoom}x
      </text>
      <text x={cx} y={cy + 8} textAnchor="middle" fill={color} fontSize="5" fontFamily="monospace" opacity={0.4}>
        ZOOM
      </text>

      {/* Border */}
      <rect x={0} y={0} width={size} height={size} fill="none" stroke={color} strokeWidth={0.5} opacity={0.3} rx={2} />
    </svg>
  );
}
