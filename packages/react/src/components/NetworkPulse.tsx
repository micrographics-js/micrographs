"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics-js/core";

export interface NetworkPulseProps {
  upKbps?: number;
  downKbps?: number;
  speed?: number;
}

export function NetworkPulse({ upKbps = 128, downKbps = 512, speed = 500 }: NetworkPulseProps) {
  const [up, setUp] = useState(upKbps);
  const [down, setDown] = useState(downKbps);
  useEffect(() =>
    createTicker(speed, () => {
      setUp(Math.max(0, upKbps + Math.round((Math.random() - 0.5) * 30)));
      setDown(Math.max(0, downKbps + Math.round((Math.random() - 0.5) * 80)));
    }), [upKbps, downKbps, speed]);

  return (
    <div style={{ fontFamily: "monospace", fontSize: "10px", display: "flex", flexDirection: "column", gap: "2px" }}>
      <span style={{ color: "var(--accent)" }}>▲ {up} KB/s</span>
      <span style={{ color: "var(--fg-dim)" }}>▼ {down} KB/s</span>
    </div>
  );
}
