"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics-js/core";

const CHARS = "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉ01";

export interface MatrixRainProps {
  cols?: number;
  rows?: number;
  speed?: number;
  color?: string;
}

export function MatrixRain({ cols = 8, rows = 6, speed = 100, color = "var(--accent)" }: MatrixRainProps) {
  const [grid, setGrid] = useState<{ char: string; bright: boolean }[][]>(() =>
    Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({ char: " ", bright: false })),
    ),
  );
  const [heads, setHeads] = useState<number[]>(() => Array.from({ length: cols }, () => -1));

  useEffect(() =>
    createTicker(speed, () => {
      setHeads(prev => prev.map((h) => {
        if (h === -1 && Math.random() < 0.1) return 0;
        if (h >= rows + 3) return -1;
        return h === -1 ? -1 : h + 1;
      }));
      setGrid(prev => {
        const next = prev.map(row => row.map(c => ({
          ...c,
          bright: false,
          char: Math.random() < 0.05 ? CHARS[Math.floor(Math.random() * CHARS.length)] : c.char,
        })));
        return next;
      });
    }), [cols, rows, speed]);

  useEffect(() => {
    setGrid(prev => {
      const next = prev.map(row => row.map(c => ({ ...c })));
      heads.forEach((h, col) => {
        if (h >= 0 && h < rows) {
          next[h][col] = { char: CHARS[Math.floor(Math.random() * CHARS.length)], bright: true };
        }
      });
      return next;
    });
  }, [heads, rows]);

  return (
    <div style={{ fontFamily: "monospace", fontSize: "11px", lineHeight: "1.4", userSelect: "none" }}>
      {grid.map((row, ri) => (
        <div key={ri} style={{ display: "flex", gap: "2px" }}>
          {row.map((cell, ci) => (
            <span key={ci} style={{
              color: cell.bright ? "#ffffff" : color,
              opacity: cell.char === " " ? 0 : cell.bright ? 1 : 0.6,
              width: "12px",
              display: "inline-block",
              textAlign: "center",
            }}>
              {cell.char}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
