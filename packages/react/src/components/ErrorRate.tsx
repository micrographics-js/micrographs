"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics-js/core";

export interface ErrorRateProps {
  count?: number;
  speed?: number;
}

export function ErrorRate({ count = 7, speed = 1500 }: ErrorRateProps) {
  const [on, setOn] = useState(true);
  const [current, setCurrent] = useState(count);
  useEffect(() => {
    const t = createTicker(speed, () => {
      setOn(v => !v);
      if (Math.random() < 0.3) setCurrent(c => c + 1);
    });
    return t;
  }, [speed, count]);

  return (
    <span style={{ fontFamily: "monospace", fontSize: "11px", color: "var(--accent-red)", opacity: on ? 1 : 0.4, transition: "opacity 0.1s" }}>
      ERR:{current}
    </span>
  );
}
