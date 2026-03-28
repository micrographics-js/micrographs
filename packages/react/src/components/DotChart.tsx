"use client";
import { useEffect, useState } from "react";
import { createTicker, seeded } from "@micrographics/core";

export interface DotChartProps {
  width?: number;
  seed?: number;
  color?: string;
  height?: number;
  speed?: number;
}

export function DotChart({ width = 9, seed = 42, color = "var(--accent)", height = 32, speed = 180 }: DotChartProps) {
  const [values, setValues] = useState<number[]>(() =>
    Array.from({ length: width }, (_, i) => seeded(seed + i)),
  );
  useEffect(() =>
    createTicker(speed, () =>
      setValues(prev => [...prev.slice(1), Math.random()])
    ), [speed]);

  const dotSize = 3;
  const svgW = width * (dotSize + 2) - 2;

  return (
    <svg width={svgW} height={height} style={{ display: "block" }} shapeRendering="crispEdges">
      {values.map((v, i) => {
        const x = i * (dotSize + 2);
        const y = Math.round((1 - v) * (height - dotSize));
        return <rect key={i} x={x} y={y} width={dotSize} height={dotSize} fill={color} />;
      })}
    </svg>
  );
}
