"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics/core";

export interface AlertBannerProps {
  message?: string;
  speed?: number;
}

export function AlertBanner({ message = "WARNING", speed = 600 }: AlertBannerProps) {
  const [on, setOn] = useState(true);
  useEffect(() => createTicker(speed, () => setOn(v => !v)), [speed]);

  return (
    <div style={{
      fontFamily: "monospace",
      fontSize: "11px",
      color: "var(--accent-amber)",
      padding: "3px 8px",
      border: "1px solid var(--accent-amber)",
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      opacity: on ? 1 : 0.5,
      transition: "opacity 0.1s",
      letterSpacing: "0.05em",
    }}>
      <span>!</span>
      <span>{message}</span>
    </div>
  );
}
