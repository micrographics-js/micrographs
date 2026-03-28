"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics/core";

const DEFAULT_ENTRIES = [
  "[INFO]  kernel: loaded modules ok",
  "[INFO]  net: interface eth0 up",
  "[WARN]  disk: usage at 87%",
  "[INFO]  svc: auth service started",
  "[INFO]  svc: api gateway ready",
  "[DEBUG] req: GET /health 200 2ms",
  "[INFO]  cron: job triggered",
  "[WARN]  mem: gc pressure detected",
  "[INFO]  sync: upstream ok",
  "[DEBUG] req: POST /event 201 8ms",
];

export interface LogStreamProps {
  entries?: string[];
  speed?: number;
  color?: string;
  maxLines?: number;
}

export function LogStream({ entries = DEFAULT_ENTRIES, speed = 800, color = "var(--fg-dim)", maxLines = 5 }: LogStreamProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [idx, setIdx] = useState(0);

  useEffect(() =>
    createTicker(speed, () => {
      setLines(prev => [...prev.slice(-(maxLines - 1)), entries[idx % entries.length]]);
      setIdx(i => i + 1);
    }), [entries, speed, maxLines, idx]);

  return (
    <div style={{ fontFamily: "monospace", fontSize: "10px", color, lineHeight: "1.5", width: "200px", overflow: "hidden" }}>
      {lines.map((line, i) => (
        <div key={i} style={{ opacity: 0.5 + 0.5 * ((i + 1) / lines.length) }}>{line}</div>
      ))}
    </div>
  );
}
