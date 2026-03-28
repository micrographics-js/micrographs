"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics/core";

export interface FlowMeterProps {
  direction?: "right" | "left";
  speed?: number;
  color?: string;
  count?: number;
}

export function FlowMeter({ direction = "right", speed = 150, color = "var(--accent)", count = 5 }: FlowMeterProps) {
  const [offset, setOffset] = useState(0);
  useEffect(() =>
    createTicker(speed, () =>
      setOffset(o => (o + 1) % count)
    ), [speed, count]);

  return (
    <span style={{ fontFamily: "monospace", fontSize: "12px", color, letterSpacing: "0.05em" }}>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} style={{ opacity: (i - offset + count) % count < 2 ? 1 : 0.25 }}>
          {direction === "right" ? ">" : "<"}
        </span>
      ))}
    </span>
  );
}
