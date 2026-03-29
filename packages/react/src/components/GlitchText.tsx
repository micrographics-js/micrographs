"use client";
import { useEffect, useState } from "react";
import { createTicker, glitchText } from "@micrographics-js/core";

export interface GlitchTextProps {
  text?: string;
  intensity?: number;
  speed?: number;
  color?: string;
}

export function GlitchText({ text = "MICROGRAPHICS", intensity = 0.15, speed = 200, color = "var(--fg)" }: GlitchTextProps) {
  const [displayed, setDisplayed] = useState(text);
  useEffect(() =>
    createTicker(speed, () => {
      if (Math.random() < 0.3) {
        setDisplayed(glitchText(text, intensity));
        setTimeout(() => setDisplayed(text), 80);
      }
    }), [text, intensity, speed]);

  return (
    <span style={{ fontFamily: "monospace", fontSize: "12px", color, letterSpacing: "0.05em" }}>
      {displayed}
    </span>
  );
}
