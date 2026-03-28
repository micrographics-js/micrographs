"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics/core";

export interface PulseTagProps {
  label?: string;
  color?: string;
  speed?: number;
}

export function PulseTag({ label = "LIVE", color = "var(--accent)", speed = 800 }: PulseTagProps) {
  const [on, setOn] = useState(true);
  useEffect(() => createTicker(speed, () => setOn(v => !v)), [speed]);
  return (
    <span style={{ fontFamily: "monospace", fontSize: "11px", color, display: "inline-flex", alignItems: "center", gap: "4px" }}>
      <span style={{ opacity: on ? 1 : 0, transition: "opacity 0.1s" }}>◆</span>
      <span>{label}</span>
    </span>
  );
}
