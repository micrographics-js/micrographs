"use client";
import { useEffect, useState } from "react";

export interface CounterUpProps {
  target?: number;
  duration?: number;
  color?: string;
  prefix?: string;
  suffix?: string;
}

export function CounterUp({ target = 1337, duration = 1500, color = "var(--fg)", prefix = "", suffix = "" }: CounterUpProps) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      setValue(Math.round(progress * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);

  return (
    <span style={{ fontFamily: "monospace", fontSize: "14px", color, letterSpacing: "0.05em" }}>
      {prefix}{value.toLocaleString()}{suffix}
    </span>
  );
}
