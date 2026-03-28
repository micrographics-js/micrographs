"use client";
import { useEffect, useState } from "react";

export interface LoadBarProps {
  segments?: number;
  color?: string;
  duration?: number;
  width?: number;
  height?: number;
}

export function LoadBar({ segments = 12, color = "var(--accent)", duration = 1200, width = 96, height = 8 }: LoadBarProps) {
  const [filled, setFilled] = useState(0);
  useEffect(() => {
    setFilled(0);
    const step = duration / segments;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setFilled(i);
      if (i >= segments) clearInterval(id);
    }, step);
    return () => clearInterval(id);
  }, [segments, duration]);

  const segW = Math.floor(width / segments) - 1;
  return (
    <svg width={width} height={height} style={{ display: "block" }} shapeRendering="crispEdges">
      {Array.from({ length: segments }, (_, i) => (
        <rect
          key={i}
          x={i * (segW + 1)}
          y={0}
          width={segW}
          height={height}
          fill={i < filled ? color : "var(--fg-dimmer)"}
          opacity={i < filled ? 1 : 0.2}
        />
      ))}
    </svg>
  );
}
