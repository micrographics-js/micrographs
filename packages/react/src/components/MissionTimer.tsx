"use client";
import { useEffect, useState } from "react";

export interface MissionTimerProps {
  elapsed?: boolean;
  color?: string;
  label?: string;
}

export function MissionTimer({ elapsed = true, color = "var(--fg)", label = "OP NIGHTFALL" }: MissionTimerProps) {
  const [start] = useState(Date.now());
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    if (!elapsed) return;
    const id = setInterval(() => {
      const diff = Math.floor((Date.now() - start) / 1000);
      const h = String(Math.floor(diff / 3600)).padStart(2, "0");
      const m = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
      const s = String(diff % 60).padStart(2, "0");
      setTime(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(id);
  }, [elapsed, start]);

  return (
    <div style={{ fontFamily: "monospace", display: "inline-flex", flexDirection: "column", gap: "2px" }}>
      <span style={{ fontSize: "8px", color: "var(--fg-dimmer)", letterSpacing: "0.15em" }}>{label}</span>
      <span style={{ fontSize: "14px", color, letterSpacing: "0.1em", fontWeight: "bold" }}>
        MISSION TIME {time}
      </span>
    </div>
  );
}
