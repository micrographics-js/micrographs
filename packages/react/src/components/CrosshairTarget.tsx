"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics/core";

export interface CrosshairTargetProps {
  size?: number;
  color?: string;
  animated?: boolean;
  locked?: boolean;
}

export function CrosshairTarget({ size = 40, color = "var(--accent)", animated = false, locked = false }: CrosshairTargetProps) {
  const [rotation, setRotation] = useState(0);
  useEffect(() => {
    if (!animated) return;
    return createTicker(60, () => setRotation(r => (r + 1) % 360));
  }, [animated]);

  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 2;
  const gap = r * 0.3;
  const lineLen = r * 0.45;
  const innerR = r * 0.22;

  const centerColor = locked ? "var(--accent-red)" : "none";

  return (
    <svg width={size} height={size} style={{ display: "block" }}>
      {/* outer rotating ring segments */}
      <g transform={`rotate(${rotation}, ${cx}, ${cy})`}>
        {[0, 90, 180, 270].map((a, i) => {
          const rad = (a * Math.PI) / 180;
          const x1 = cx + (innerR + gap * 0.5) * Math.cos(rad);
          const y1 = cy + (innerR + gap * 0.5) * Math.sin(rad);
          const x2 = cx + r * Math.cos(rad);
          const y2 = cy + r * Math.sin(rad);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={1.5} />;
        })}
        {/* corner arcs at 45-deg positions */}
        {[45, 135, 225, 315].map((a, i) => {
          const rad = (a * Math.PI) / 180;
          const px = cx + r * Math.cos(rad);
          const py = cy + r * Math.sin(rad);
          const arcLen = 12;
          const a1 = ((a - arcLen / 2) * Math.PI) / 180;
          const a2 = ((a + arcLen / 2) * Math.PI) / 180;
          const ax1 = cx + r * Math.cos(a1);
          const ay1 = cy + r * Math.sin(a1);
          const ax2 = cx + r * Math.cos(a2);
          const ay2 = cy + r * Math.sin(a2);
          return <path key={i} d={`M ${ax1} ${ay1} A ${r} ${r} 0 0 1 ${ax2} ${ay2}`} fill="none" stroke={color} strokeWidth={1} opacity={0.5} />;
        })}
      </g>
      {/* static cross lines */}
      <line x1={cx - r} y1={cy} x2={cx - innerR} y2={cy} stroke={color} strokeWidth={1} />
      <line x1={cx + innerR} y1={cy} x2={cx + r} y2={cy} stroke={color} strokeWidth={1} />
      <line x1={cx} y1={cy - r} x2={cx} y2={cy - innerR} stroke={color} strokeWidth={1} />
      <line x1={cx} y1={cy + innerR} x2={cx} y2={cy + r} stroke={color} strokeWidth={1} />
      {/* center */}
      <circle cx={cx} cy={cy} r={innerR} fill={centerColor} stroke={color} strokeWidth={1} opacity={locked ? 0.8 : 1} />
      {locked && <circle cx={cx} cy={cy} r={2} fill="var(--bg)" />}
    </svg>
  );
}
