"use client";
import { useEffect, useState } from "react";

export interface TypewriterProps {
  text?: string;
  speed?: number;
  color?: string;
  loop?: boolean;
}

export function Typewriter({ text = "SYSTEM·ONLINE", speed = 50, color = "var(--fg)", loop = true }: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let i = 0;
    setDisplayed("");

    const tick = () => {
      if (cancelled) return;
      i++;
      setDisplayed(text.slice(0, i));
      if (i < text.length) {
        setTimeout(tick, speed);
      } else if (loop) {
        setTimeout(() => {
          if (!cancelled) { i = 0; setDisplayed(""); setTimeout(tick, speed); }
        }, 1500);
      }
    };
    setTimeout(tick, speed);
    return () => { cancelled = true; };
  }, [text, speed, loop]);

  useEffect(() => {
    const id = setInterval(() => setCursor(v => !v), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <span style={{ fontFamily: "monospace", fontSize: "11px", color }}>
      {displayed}
      <span style={{ opacity: cursor ? 1 : 0 }}>█</span>
    </span>
  );
}
