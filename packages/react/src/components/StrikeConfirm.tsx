"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics-js/core";

export interface StrikeConfirmProps {
  confirmed?: boolean;
  time?: string;
  bda?: string;
  color?: string;
  animated?: boolean;
}

export function StrikeConfirm({ confirmed = false, time, bda = "PENDING", color = "var(--accent)", animated = true }: StrikeConfirmProps) {
  const [flash, setFlash] = useState(false);
  const ts = time ?? new Date().toISOString().slice(11, 19) + "Z";

  useEffect(() => {
    if (!confirmed || !animated) return;
    setFlash(true);
    const t1 = setTimeout(() => setFlash(false), 200);
    const t2 = setTimeout(() => setFlash(true), 400);
    const t3 = setTimeout(() => setFlash(false), 600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [confirmed, animated]);

  const statusColor = confirmed ? "var(--accent-red)" : "var(--accent-amber)";
  const statusText = confirmed ? "STRIKE CONFIRMED" : "AWAITING CONFIRMATION";

  return (
    <div style={{
      fontFamily: "monospace", fontSize: "10px",
      border: `1px solid ${statusColor}`,
      padding: "6px 10px",
      display: "inline-flex", flexDirection: "column", gap: "3px",
      background: flash ? "rgba(224,82,82,0.15)" : "transparent",
      transition: "background 0.1s",
    }}>
      <span style={{ color: statusColor, fontWeight: "bold", letterSpacing: "0.1em", fontSize: "11px" }}>
        {statusText}
      </span>
      <div style={{ display: "flex", gap: "12px", color: "var(--fg-dimmer)" }}>
        <span>TIME {ts}</span>
        <span>BDA: <span style={{ color: confirmed ? "var(--accent)" : "var(--accent-amber)" }}>{confirmed ? "CONFIRMED" : bda}</span></span>
      </div>
    </div>
  );
}
