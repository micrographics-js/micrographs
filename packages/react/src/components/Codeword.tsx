"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics-js/core";

export interface CodewordProps {
  word?: string;
  color?: string;
  classification?: string;
  animated?: boolean;
}

export function Codeword({
  word = "UMBRA",
  color = "var(--accent-red)",
  classification = "TOP SECRET",
  animated = false,
}: CodewordProps) {
  const [opacity, setOpacity] = useState(1);
  const [dir, setDir] = useState(-1);

  useEffect(() => {
    if (!animated) return;
    return createTicker(80, () => {
      setOpacity((v) => {
        const next = v + dir * 0.02;
        if (next <= 0.6) { setDir(1); return 0.6; }
        if (next >= 1)   { setDir(-1); return 1; }
        return next;
      });
    });
  }, [animated, dir]);

  return (
    <span
      style={{
        fontFamily: "monospace",
        display: "inline-flex",
        alignItems: "center",
        gap: 0,
        border: `1px solid ${color}`,
        opacity: animated ? opacity : 1,
        userSelect: "none",
      }}
    >
      <span
        style={{
          fontSize: "8px",
          fontWeight: "bold",
          color,
          padding: "2px 6px",
          letterSpacing: "0.1em",
          borderRight: `1px solid ${color}`,
          background: "var(--bg-secondary)",
        }}
      >
        {classification}
      </span>
      <span
        style={{
          fontSize: "8px",
          color: "var(--fg-dimmer)",
          padding: "2px 6px",
          letterSpacing: "0.08em",
        }}
      >
        //
      </span>
      <span
        style={{
          fontSize: "8px",
          color: "var(--fg-dim)",
          padding: "2px 0",
          letterSpacing: "0.08em",
        }}
      >
        CODEWORD:
      </span>
      <span
        style={{
          fontSize: "9px",
          fontWeight: "bold",
          color: "var(--accent-amber)",
          padding: "2px 6px 2px 4px",
          letterSpacing: "0.12em",
        }}
      >
        {word}
      </span>
    </span>
  );
}
