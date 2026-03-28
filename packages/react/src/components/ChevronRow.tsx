"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics/core";

export interface ChevronRowProps {
  direction?: "right" | "left";
  color?: string;
  count?: number;
  speed?: number;
}

export function ChevronRow({ direction = "right", color = "var(--fg-dimmer)", count = 6, speed = 200 }: ChevronRowProps) {
  const [phase, setPhase] = useState(0);
  useEffect(() => createTicker(speed, () => setPhase(p => (p + 1) % count)), [speed, count]);

  const ch = direction === "right" ? ">" : "<";
  return (
    <span style={{ fontFamily: "monospace", fontSize: "12px", letterSpacing: "0.05em" }}>
      {Array.from({ length: count }, (_, i) => {
        const dist = direction === "right"
          ? (i - phase + count) % count
          : (phase - i + count) % count;
        return (
          <span key={i} style={{ color, opacity: 1 - dist * (0.8 / count) }}>{ch}</span>
        );
      })}
    </span>
  );
}
