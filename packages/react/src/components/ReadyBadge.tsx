"use client";
import { useEffect, useState } from "react";

export interface ReadyBadgeProps {
  color?: string;
  delay?: number;
}

const SEGMENTS = ["[", " ", "R", "E", "A", "D", "Y", " ", "]"];

export function ReadyBadge({ color = "var(--accent)", delay = 80 }: ReadyBadgeProps) {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    setVisible(0);
    const ids = SEGMENTS.map((_, i) => setTimeout(() => setVisible(i + 1), delay * (i + 1)));
    return () => ids.forEach(clearTimeout);
  }, [delay]);

  return (
    <span style={{ fontFamily: "monospace", fontSize: "12px", color, letterSpacing: "0.05em" }}>
      {SEGMENTS.slice(0, visible).join("")}
    </span>
  );
}
