"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics/core";

export interface PriorityBadgeProps {
  level?: "A" | "B" | "C" | "D" | "X";
  label?: string;
  blink?: boolean;
  speed?: number;
}

const LEVEL_COLORS: Record<string, string> = {
  A: "var(--accent-red)",
  B: "var(--accent-amber)",
  C: "var(--accent)",
  D: "var(--fg-dim)",
  X: "var(--fg-dimmer)",
};

export function PriorityBadge({ level = "A", label = "PRIORITY", blink = false, speed = 800 }: PriorityBadgeProps) {
  const [on, setOn] = useState(true);
  useEffect(() => {
    if (!blink) return;
    return createTicker(speed, () => setOn((v) => !v));
  }, [blink, speed]);

  const color = LEVEL_COLORS[level] ?? "var(--fg-dim)";

  return (
    <div
      style={{
        fontFamily: "monospace",
        display: "inline-flex",
        border: `1px solid ${color}`,
        opacity: blink ? (on ? 1 : 0.3) : 1,
        transition: "opacity 0.1s",
        userSelect: "none",
      }}
    >
      <div
        style={{
          fontSize: "8px",
          color: "var(--fg-dimmer)",
          padding: "2px 5px",
          borderRight: `1px solid ${color}`,
          display: "flex",
          alignItems: "center",
          letterSpacing: "0.1em",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          color,
          padding: "0 8px",
          lineHeight: 1.1,
        }}
      >
        {level}
      </div>
    </div>
  );
}
