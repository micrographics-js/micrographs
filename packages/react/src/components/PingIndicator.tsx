"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics/core";

export interface PingIndicatorProps {
  ms?: number;
  color?: string;
  speed?: number;
}

export function PingIndicator({ ms = 42, color = "var(--accent)", speed = 2000 }: PingIndicatorProps) {
  const [active, setActive] = useState(false);
  useEffect(() =>
    createTicker(speed, () => {
      setActive(true);
      setTimeout(() => setActive(false), 200);
    }), [speed]);

  return (
    <span style={{ fontFamily: "monospace", fontSize: "11px", color, display: "inline-flex", alignItems: "center", gap: "5px" }}>
      <span style={{
        display: "inline-block",
        width: "6px",
        height: "6px",
        background: active ? color : "transparent",
        border: `1px solid ${color}`,
        borderRadius: "0",
        transition: "background 0.1s",
      }} />
      {ms}ms
    </span>
  );
}
