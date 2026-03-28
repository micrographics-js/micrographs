"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics/core";

export interface CPUSparklineProps {
  color?: string;
  speed?: number;
  bars?: number;
  height?: number;
}

export function CPUSparkline({ color = "var(--accent)", speed = 500, bars = 16, height = 24 }: CPUSparklineProps) {
  const [values, setValues] = useState<number[]>(() => Array.from({ length: bars }, () => Math.random() * 0.8 + 0.1));
  useEffect(() =>
    createTicker(speed, () =>
      setValues(prev => [...prev.slice(1), Math.max(0.05, Math.min(1, prev[prev.length - 1] + (Math.random() - 0.5) * 0.4))])
    ), [speed, bars]);

  const barW = 3;
  const gap = 1;
  const svgW = bars * (barW + gap) - gap;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
      <span style={{ fontFamily: "monospace", fontSize: "9px", color: "var(--fg-dimmer)" }}>
        CPU {Math.round(values[values.length - 1] * 100)}%
      </span>
      <svg width={svgW} height={height} style={{ display: "block" }} shapeRendering="crispEdges">
        {values.map((v, i) => {
          const h = Math.max(1, Math.round(v * height));
          const barColor = v > 0.8 ? "var(--accent-red)" : v > 0.6 ? "var(--accent-amber)" : color;
          return <rect key={i} x={i * (barW + gap)} y={height - h} width={barW} height={h} fill={barColor} />;
        })}
      </svg>
    </div>
  );
}
