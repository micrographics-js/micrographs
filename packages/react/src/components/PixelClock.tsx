"use client";
import { useEffect, useState } from "react";

export interface PixelClockProps {
  color?: string;
  showSeconds?: boolean;
}

export function PixelClock({ color = "var(--accent)", showSeconds = true }: PixelClockProps) {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const hh = String(time.getHours()).padStart(2, "0");
  const mm = String(time.getMinutes()).padStart(2, "0");
  const ss = String(time.getSeconds()).padStart(2, "0");

  return (
    <span style={{ fontFamily: "monospace", fontSize: "18px", color, letterSpacing: "0.1em", fontWeight: "bold" }}>
      {hh}:{mm}{showSeconds ? `:${ss}` : ""}
    </span>
  );
}
