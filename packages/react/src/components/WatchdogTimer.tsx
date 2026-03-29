"use client";
import { useEffect, useRef, useState } from "react";
import { createTicker } from "@micrographics/core";

export interface WatchdogTimerProps {
  interval?: number;
  color?: string;
  onBark?: () => void;
}

export function WatchdogTimer({ interval = 5000, color = "var(--accent)", onBark }: WatchdogTimerProps) {
  const [remaining, setRemaining] = useState(interval);
  const [pulse, setPulse] = useState(false);
  const startRef = useRef(Date.now());

  useEffect(() => {
    startRef.current = Date.now();
    setRemaining(interval);
    return createTicker(50, () => {
      const elapsed = Date.now() - startRef.current;
      const left = Math.max(0, interval - elapsed);
      setRemaining(left);
      if (left === 0) {
        onBark?.();
        setPulse(true);
        setTimeout(() => {
          startRef.current = Date.now();
          setRemaining(interval);
          setPulse(false);
        }, 300);
      }
    });
  }, [interval]);

  const pct = remaining / interval;
  const size = 32;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 3;
  const startAngle = -90;
  const totalArc = 360;
  const sweep = pct * totalArc;
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const arcPath = (start: number, end: number) => {
    if (Math.abs(end - start) >= 359.9) {
      return `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r}`;
    }
    const s = toRad(start);
    const e = toRad(end);
    const x1 = cx + r * Math.cos(s);
    const y1 = cy + r * Math.sin(s);
    const x2 = cx + r * Math.cos(e);
    const y2 = cy + r * Math.sin(e);
    const large = end - start > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  };

  const secs = (remaining / 1000).toFixed(1);
  const heartbeatColor = pulse ? "var(--accent-red)" : color;

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
      <svg width={size} height={size} style={{ display: "block" }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--fg-dimmer)" strokeWidth={2} opacity={0.3} />
        {pct > 0 && (
          <path
            d={arcPath(startAngle, startAngle + sweep)}
            fill="none"
            stroke={pct < 0.25 ? "var(--accent-red)" : heartbeatColor}
            strokeWidth={2}
            strokeLinecap="square"
          />
        )}
        <circle cx={cx} cy={cy} r={3} fill={heartbeatColor} opacity={pulse ? 1 : 0.5} />
      </svg>
      <span style={{
        fontFamily: "monospace",
        fontSize: "10px",
        color: pct < 0.25 ? "var(--accent-red)" : color,
        letterSpacing: "0.06em",
        minWidth: "30px",
      }}>
        {secs}s
      </span>
    </div>
  );
}
