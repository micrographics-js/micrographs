"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics/core";

export interface BinaryStreamProps {
  cols?: number;
  rows?: number;
  speed?: number;
  color?: string;
}

export function BinaryStream({ cols = 8, rows = 5, speed = 120, color = "var(--fg-dimmer)" }: BinaryStreamProps) {
  const [grid, setGrid] = useState<string[][]>(() =>
    Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => (Math.random() > 0.5 ? "1" : "0")),
    ),
  );
  useEffect(() =>
    createTicker(speed, () =>
      setGrid(prev => {
        const next = prev.map(row => [...row]);
        const col = Math.floor(Math.random() * cols);
        const row = Math.floor(Math.random() * rows);
        next[row][col] = next[row][col] === "0" ? "1" : "0";
        return next;
      }),
    ), [cols, rows, speed]);

  return (
    <div style={{ fontFamily: "monospace", fontSize: "10px", color, lineHeight: "1.4", userSelect: "none" }}>
      {grid.map((row, ri) => (
        <div key={ri}>{row.join(" ")}</div>
      ))}
    </div>
  );
}
