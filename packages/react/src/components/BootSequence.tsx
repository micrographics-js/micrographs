"use client";
import { useEffect, useState } from "react";

export interface BootSequenceProps {
  delay?: number;
  color?: string;
}

export function BootSequence({ delay = 2000, color = "var(--accent)" }: BootSequenceProps) {
  const [ready, setReady] = useState(false);
  const [blink, setBlink] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), delay);
    const id = setInterval(() => setBlink(v => !v), 400);
    return () => { clearTimeout(t); clearInterval(id); };
  }, [delay]);
  return (
    <span style={{ fontFamily: "monospace", fontSize: "11px", color, letterSpacing: "0.05em" }}>
      {ready
        ? "SYS·READY"
        : <span style={{ opacity: blink ? 1 : 0.4 }}>SYS·BOOTING</span>}
    </span>
  );
}
