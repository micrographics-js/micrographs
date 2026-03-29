"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics/core";

export interface SystemLoadProps {
  cores?: number;
  width?: number;
  height?: number;
  color?: string;
  speed?: number;
}

export function SystemLoad({ cores = 4, width = 60, height = 20, color = "var(--accent)", speed = 200 }: SystemLoadProps) {
  const [loads, setLoads] = useState<number[]>(() => Array.from({ length: cores }, (_, i) => 0.3 + i * 0.1));

  useEffect(() => {
    return createTicker(speed, () => {
      setLoads(prev => prev.map(v => {
        const delta = (Math.random() - 0.5) * 0.15;
        return Math.max(0.05, Math.min(0.98, v + delta));
      }));
    });
  }, [speed, cores]);

  const barH = Math.floor((height - (cores - 1) * 1) / cores);
  const barW = width;

  return (
    <svg width={width} height={height} style={{ display: "block" }} shapeRendering="crispEdges">
      {loads.map((v, i) => {
        const y = i * (barH + 1);
        const filled = Math.round(v * barW);
        const isHigh = v > 0.8;
        const barColor = isHigh ? "var(--accent-red)" : v > 0.6 ? "var(--accent-amber)" : color;
        return (
          <g key={i}>
            <rect x={0} y={y} width={barW} height={barH} fill="var(--bg-secondary)" />
            <rect x={0} y={y} width={filled} height={barH} fill={barColor} opacity={0.85} />
            <text x={2} y={y + barH - 1} fill="var(--bg)" fontSize="5" fontFamily="monospace">
              {`C${i}`}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
