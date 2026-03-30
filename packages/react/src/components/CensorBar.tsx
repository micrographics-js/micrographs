"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics-js/core";

export interface CensorBarProps {
  width?: number;
  height?: number;
  animated?: boolean;
  color?: string;
  label?: string;
}

export function CensorBar({
  width = 120,
  height = 16,
  animated = false,
  color = "var(--fg)",
  label = "REDACTED",
}: CensorBarProps) {
  const [scanX, setScanX] = useState(0);

  useEffect(() => {
    if (!animated) return;
    return createTicker(60, () => setScanX((v) => (v + 2) % (width + 30)));
  }, [animated, width]);

  const fontSize = Math.max(6, height * 0.45);

  return (
    <svg
      width={width}
      height={height}
      style={{ display: "inline-block", verticalAlign: "middle" }}
      shapeRendering="crispEdges"
    >
      {/* Main bar */}
      <rect x={0} y={0} width={width} height={height} fill={color} />
      {/* Scan-line shimmer */}
      {animated && (
        <rect
          x={scanX - 15}
          y={0}
          width={15}
          height={height}
          fill="white"
          opacity={0.07}
        />
      )}
      {/* Label text */}
      {label && (
        <text
          x={width / 2}
          y={height / 2 + fontSize * 0.35}
          textAnchor="middle"
          fontFamily="monospace"
          fontSize={fontSize}
          fill="var(--fg-dimmer)"
          opacity={0.35}
          letterSpacing="0.12em"
        >
          {label}
        </text>
      )}
    </svg>
  );
}
