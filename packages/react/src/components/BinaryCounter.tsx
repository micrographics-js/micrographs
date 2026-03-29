"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics/core";

export interface BinaryCounterProps {
  value?: number;
  bits?: number;
  color?: string;
  speed?: number;
  animated?: boolean;
}

export function BinaryCounter({ value = 0, bits = 8, color = "var(--accent)", speed = 400, animated = false }: BinaryCounterProps) {
  const [current, setCurrent] = useState(value);
  const maxVal = Math.pow(2, bits) - 1;

  useEffect(() => setCurrent(value), [value]);

  useEffect(() => {
    if (!animated) return;
    return createTicker(speed, () => setCurrent(v => (v + 1) % (maxVal + 1)));
  }, [animated, speed, maxVal]);

  const binary = current.toString(2).padStart(bits, "0").slice(-bits);
  const bitW = 10;
  const bitH = 14;
  const gap = 2;
  const groupGap = bits > 4 ? 4 : 0;
  const groups = bits > 4 ? Math.ceil(bits / 4) : 1;
  const totalW = bits * (bitW + gap) - gap + (groups - 1) * groupGap;

  return (
    <svg width={totalW} height={bitH + 8} style={{ display: "block" }} shapeRendering="crispEdges">
      {binary.split("").map((bit, i) => {
        const group = Math.floor(i / 4);
        const x = i * (bitW + gap) + group * groupGap;
        const isOne = bit === "1";
        return (
          <g key={i}>
            <rect x={x} y={0} width={bitW} height={bitH} fill={isOne ? color : "var(--bg-secondary)"} stroke={isOne ? color : "var(--border)"} strokeWidth={1} opacity={isOne ? 0.9 : 0.5} />
            <text x={x + bitW / 2} y={bitH - 3} textAnchor="middle" fill={isOne ? "var(--bg)" : "var(--fg-dimmer)"} fontSize="8" fontFamily="monospace">
              {bit}
            </text>
          </g>
        );
      })}
      {/* bit labels */}
      {bits <= 8 && binary.split("").map((_, i) => {
        const group = Math.floor(i / 4);
        const x = i * (bitW + gap) + group * groupGap;
        const bitPos = bits - 1 - i;
        return (
          <text key={i} x={x + bitW / 2} y={bitH + 7} textAnchor="middle" fill="var(--fg-dimmer)" fontSize="6" fontFamily="monospace">
            {bitPos}
          </text>
        );
      })}
    </svg>
  );
}
