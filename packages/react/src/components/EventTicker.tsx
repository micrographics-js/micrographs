"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics/core";

export interface EventTickerProps {
  events?: string[];
  speed?: number;
  color?: string;
  width?: number;
}

const DEFAULT_EVENTS = ["SYS_INIT", "PKT_RECV", "AUTH_OK", "SYNC", "PROC_RUN"];

export function EventTicker({
  events = DEFAULT_EVENTS,
  speed = 1800,
  color = "var(--fg)",
  width = 100,
}: EventTickerProps) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(1);

  useEffect(() => {
    return createTicker(speed, () => {
      setFade(0);
      const timer = setTimeout(() => {
        setIndex(i => (i + 1) % events.length);
        setFade(1);
      }, 200);
      return () => clearTimeout(timer);
    });
  }, [speed, events.length]);

  const current = events[index] ?? "";

  return (
    <div style={{
      fontFamily: "monospace",
      fontSize: "10px",
      color,
      width: `${width}px`,
      overflow: "hidden",
      whiteSpace: "nowrap",
      display: "flex",
      alignItems: "center",
      gap: "4px",
    }}>
      <span style={{ color: "var(--fg-dimmer)" }}>›</span>
      <span style={{
        opacity: fade,
        transition: "opacity 0.18s ease",
        letterSpacing: "0.06em",
      }}>
        {current}
      </span>
    </div>
  );
}
