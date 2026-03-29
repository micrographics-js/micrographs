"use client";
import { useEffect, useRef, useState } from "react";

export interface StopwatchDisplayProps {
  running?: boolean;
  color?: string;
}

export function StopwatchDisplay({ running = false, color = "var(--accent)" }: StopwatchDisplayProps) {
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const accRef = useRef(0);

  useEffect(() => {
    if (running) {
      startRef.current = performance.now();
      const tick = () => {
        if (startRef.current !== null) {
          setElapsed(accRef.current + (performance.now() - startRef.current));
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    } else {
      if (startRef.current !== null) {
        accRef.current += performance.now() - startRef.current;
        startRef.current = null;
      }
      cancelAnimationFrame(rafRef.current);
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [running]);

  const ms = elapsed;
  const totalSecs = Math.floor(ms / 1000);
  const hours = Math.floor(totalSecs / 3600);
  const mins = Math.floor((totalSecs % 3600) / 60);
  const secs = totalSecs % 60;
  const millis = Math.floor((ms % 1000) / 10);

  const pad2 = (n: number) => String(n).padStart(2, "0");

  return (
    <span style={{ fontFamily: "monospace", fontSize: "13px", color, letterSpacing: "0.06em" }}>
      {pad2(hours)}:{pad2(mins)}:{pad2(secs)}
      <span style={{ fontSize: "10px", color: "var(--fg-dim)", marginLeft: "1px" }}>:{pad2(millis)}</span>
    </span>
  );
}
