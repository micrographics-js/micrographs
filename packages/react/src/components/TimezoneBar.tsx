"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics-js/core";

export interface TimezoneBarProps {
  zones?: { label: string; offset: number }[];
  color?: string;
}

const DEFAULT_ZONES = [
  { label: "UTC", offset: 0 },
  { label: "NYC", offset: -5 },
  { label: "TYO", offset: 9 },
];

export function TimezoneBar({ zones = DEFAULT_ZONES, color = "var(--fg)" }: TimezoneBarProps) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => createTicker(1000, () => setNow(new Date())), []);

  const fmt = (zone: { label: string; offset: number }) => {
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const local = new Date(utc + zone.offset * 3600000);
    const h = String(local.getHours()).padStart(2, "0");
    const m = String(local.getMinutes()).padStart(2, "0");
    const s = String(local.getSeconds()).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div style={{ display: "flex", gap: "10px", fontFamily: "monospace", fontSize: "10px" }}>
      {zones.map(z => (
        <span key={z.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1px" }}>
          <span style={{ color: "var(--fg-dimmer)", fontSize: "8px" }}>{z.label}</span>
          <span style={{ color, letterSpacing: "0.04em" }}>{fmt(z)}</span>
        </span>
      ))}
    </div>
  );
}
