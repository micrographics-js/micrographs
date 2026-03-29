"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics-js/core";

export interface StatusLightProps {
  status?: "ok" | "warn" | "error" | "idle";
  speed?: number;
}

const STATUS_COLORS: Record<string, string> = {
  ok: "var(--accent)",
  warn: "var(--accent-amber)",
  error: "var(--accent-red)",
  idle: "var(--fg-dimmer)",
};

export function StatusLight({ status = "ok", speed = 1000 }: StatusLightProps) {
  const [on, setOn] = useState(true);
  useEffect(() => createTicker(speed, () => setOn(v => !v)), [speed]);
  const color = STATUS_COLORS[status] ?? "var(--fg-dimmer)";
  return (
    <svg width={10} height={10} style={{ display: "block" }} shapeRendering="crispEdges">
      <rect x={1} y={1} width={8} height={8} fill={color} opacity={on ? 1 : 0.2} />
    </svg>
  );
}
