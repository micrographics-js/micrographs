"use client";
import { useEffect, useState } from "react";

const DEFAULT_LINES = [
  "BIOS v2.4.1 .......... [OK]",
  "Loading kernel ........ [OK]",
  "Init drivers .......... [OK]",
  "Mount filesystems ..... [OK]",
  "Start services ........ [OK]",
  "SYS READY",
];

export interface BootLogProps {
  lines?: string[];
  delay?: number;
  color?: string;
}

export function BootLog({ lines = DEFAULT_LINES, delay = 300, color = "var(--fg-dim)" }: BootLogProps) {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    setVisible(0);
    const ids: ReturnType<typeof setTimeout>[] = [];
    lines.forEach((_, i) => {
      ids.push(setTimeout(() => setVisible(i + 1), delay * (i + 1)));
    });
    return () => ids.forEach(clearTimeout);
  }, [lines, delay]);

  return (
    <div style={{ fontFamily: "monospace", fontSize: "10px", color, lineHeight: "1.6" }}>
      {lines.slice(0, visible).map((line, i) => (
        <div key={i} style={{ color: line === "SYS READY" ? "var(--accent)" : color }}>{line}</div>
      ))}
    </div>
  );
}
