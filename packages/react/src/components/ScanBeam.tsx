"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics/core";

export interface ScanBeamProps {
  width?: number;
  height?: number;
  color?: string;
  speed?: number;
}

export function ScanBeam({ width = 80, height = 4, color = "var(--accent)", speed = 50 }: ScanBeamProps) {
  const [pos, setPos] = useState(0);
  useEffect(() => createTicker(speed, () => setPos(p => (p + 1) % (width + 20))), [speed, width]);

  const beamW = 16;
  const gradId = `sb-grad-${width}-${height}`;

  return (
    <svg width={width} height={height} style={{ display: "block" }} shapeRendering="crispEdges">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="40%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="1" />
        </linearGradient>
      </defs>
      <rect x={0} y={0} width={width} height={height} fill="var(--bg-secondary)" />
      <rect
        x={pos - beamW}
        y={0}
        width={beamW}
        height={height}
        fill={`url(#${gradId})`}
        clipPath={`inset(0 ${Math.max(0, pos - width)}px 0 ${Math.max(0, -pos + beamW)}px)`}
      />
      <rect x={Math.min(pos, width - 1)} y={0} width={1} height={height} fill={color} opacity={0.9} />
    </svg>
  );
}
