"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics-js/core";

export interface CountdownTimerProps {
  from?: number;
  color?: string;
  alertAt?: number;
  onEnd?: () => void;
}

export function CountdownTimer({ from = 300, color = "var(--accent)", alertAt = 60, onEnd }: CountdownTimerProps) {
  const [remaining, setRemaining] = useState(from);

  useEffect(() => {
    setRemaining(from);
  }, [from]);

  useEffect(() => {
    if (remaining <= 0) {
      onEnd?.();
      return;
    }
    return createTicker(1000, () => setRemaining(r => Math.max(0, r - 1)));
  }, [remaining <= 0]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const display = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  const isAlert = remaining <= alertAt;
  const activeColor = isAlert ? "var(--accent-red)" : color;

  return (
    <span style={{
      fontFamily: "monospace",
      fontSize: "14px",
      color: activeColor,
      letterSpacing: "0.1em",
      fontVariantNumeric: "tabular-nums",
    }}>
      {display}
    </span>
  );
}
