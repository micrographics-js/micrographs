"use client";
import { useEffect, useState } from "react";
import { createTicker, seeded } from "@micrographics-js/core";

export interface HexDumpProps {
  rows?: number;
  cols?: number;
  speed?: number;
  color?: string;
  seed?: number;
}

export function HexDump({ rows = 4, cols = 8, speed = 200, color = "var(--fg-dimmer)", seed = 42 }: HexDumpProps) {
  const [cells, setCells] = useState<string[][]>(() =>
    Array.from({ length: rows }, (_, ri) =>
      Array.from({ length: cols }, (_, ci) =>
        Math.floor(seeded(seed + ri * cols + ci) * 256).toString(16).toUpperCase().padStart(2, "0"),
      ),
    ),
  );
  const [flashCell, setFlashCell] = useState<[number, number] | null>(null);

  useEffect(() =>
    createTicker(speed, () => {
      const r = Math.floor(Math.random() * rows);
      const c = Math.floor(Math.random() * cols);
      const val = Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, "0");
      setCells(prev => {
        const next = prev.map(row => [...row]);
        next[r][c] = val;
        return next;
      });
      setFlashCell([r, c]);
      setTimeout(() => setFlashCell(null), 150);
    }), [rows, cols, speed]);

  return (
    <div style={{ fontFamily: "monospace", fontSize: "10px", color, lineHeight: "1.6" }}>
      {cells.map((row, ri) => (
        <div key={ri} style={{ display: "flex", gap: "4px" }}>
          <span style={{ color: "var(--fg-dimmer)", opacity: 0.5 }}>
            {(ri * cols).toString(16).toUpperCase().padStart(4, "0")}:
          </span>
          {row.map((cell, ci) => (
            <span
              key={ci}
              style={{
                color: flashCell?.[0] === ri && flashCell?.[1] === ci ? "var(--accent)" : color,
                transition: "color 0.1s",
              }}
            >
              {cell}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
