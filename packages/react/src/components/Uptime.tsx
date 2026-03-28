"use client";
import { useEffect, useState } from "react";

export interface UptimeProps {
  startMs?: number;
  color?: string;
}

function format(ms: number): string {
  const s = Math.floor(ms / 1000);
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;
  return `${String(days).padStart(2, "0")}:${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

const MOUNT_TIME = Date.now();

export function Uptime({ startMs, color = "var(--fg)" }: UptimeProps) {
  const start = startMs ?? MOUNT_TIME;
  const [elapsed, setElapsed] = useState(Date.now() - start);
  useEffect(() => {
    const id = setInterval(() => setElapsed(Date.now() - start), 1000);
    return () => clearInterval(id);
  }, [start]);
  return (
    <span style={{ fontFamily: "monospace", fontSize: "11px", color, letterSpacing: "0.08em" }}>
      {format(elapsed)}
    </span>
  );
}
