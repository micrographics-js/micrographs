"use client";
import { useEffect, useRef, useState } from "react";

export interface ScrollingTextProps {
  text?: string;
  speed?: number;
  width?: number;
  color?: string;
  separator?: string;
}

export function ScrollingText({ text = "SYSTEM ONLINE · DATA STREAM ACTIVE · ALL NODES NOMINAL", speed = 40, width = 120, color = "var(--fg-dim)", separator = " ·── " }: ScrollingTextProps) {
  const [offset, setOffset] = useState(0);
  const rafRef = useRef<number>(0);
  const lastRef = useRef<number>(0);
  const fullText = text + separator;

  useEffect(() => {
    const charW = 6.5;
    const totalW = fullText.length * charW;

    const tick = (ts: number) => {
      if (lastRef.current === 0) lastRef.current = ts;
      const delta = ts - lastRef.current;
      if (delta >= speed) {
        setOffset(o => (o + 1) % Math.ceil(totalW));
        lastRef.current = ts;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [speed, fullText]);

  const charW = 6.5;
  const totalW = fullText.length * charW;
  const doubled = fullText + fullText;
  const x = -offset;

  return (
    <div style={{ width: `${width}px`, overflow: "hidden", display: "inline-block" }}>
      <svg width={width} height={12} style={{ display: "block" }}>
        <text
          x={x}
          y={9}
          fill={color}
          fontSize="9"
          fontFamily="monospace"
          style={{ whiteSpace: "pre" }}
        >
          {doubled}
        </text>
      </svg>
    </div>
  );
}
