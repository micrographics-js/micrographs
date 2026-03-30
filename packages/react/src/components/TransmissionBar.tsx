"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics-js/core";

export interface TransmissionBarProps {
  quality?: number;
  delay?: number;
  encrypted?: boolean;
  color?: string;
}

export function TransmissionBar({ quality = 85, delay = 42, encrypted = true, color = "var(--fg)" }: TransmissionBarProps) {
  const [q, setQ] = useState(quality);
  const [d, setD] = useState(delay);

  useEffect(() => {
    return createTicker(1000, () => {
      setQ(Math.max(0, Math.min(100, quality + (Math.random() - 0.5) * 10)));
      setD(Math.max(10, delay + Math.floor((Math.random() - 0.5) * 20)));
    });
  }, [quality, delay]);

  const bars = 5;
  const filled = Math.ceil((q / 100) * bars);
  const qColor = q > 70 ? "var(--accent)" : q > 40 ? "var(--accent-amber)" : "var(--accent-red)";

  return (
    <div style={{ fontFamily: "monospace", fontSize: "9px", display: "inline-flex", alignItems: "center", gap: "8px" }}>
      <span style={{ color: "var(--fg-dimmer)" }}>TX</span>
      <svg width={24} height={12} style={{ display: "block" }} shapeRendering="crispEdges">
        {Array.from({ length: bars }, (_, i) => (
          <rect key={i} x={i * 5} y={12 - (i + 1) * 2.2} width={3} height={(i + 1) * 2.2}
            fill={i < filled ? qColor : "var(--fg-dimmer)"} opacity={i < filled ? 1 : 0.3} />
        ))}
      </svg>
      <span style={{ color: qColor }}>{Math.round(q)}%</span>
      <span style={{ color: "var(--fg-dimmer)" }}>{d}ms</span>
      {encrypted && <span style={{ color: "var(--accent)", fontSize: "8px" }}>ENC</span>}
    </div>
  );
}
