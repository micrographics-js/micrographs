"use client";
import { useState } from "react";

export interface ToggleSwitchProps {
  on?: boolean;
  onChange?: (v: boolean) => void;
  color?: string;
  label?: string;
}

export function ToggleSwitch({ on = false, onChange, color = "var(--accent)", label }: ToggleSwitchProps) {
  const [state, setState] = useState(on);
  const trackW = 28;
  const trackH = 12;
  const blockW = 10;
  const blockX = state ? trackW - blockW - 2 : 2;

  const handleClick = () => {
    const next = !state;
    setState(next);
    onChange?.(next);
  };

  return (
    <div
      onClick={handleClick}
      style={{ display: "inline-flex", alignItems: "center", gap: "6px", cursor: "pointer", userSelect: "none" }}
    >
      <svg width={trackW} height={trackH} style={{ display: "block" }} shapeRendering="crispEdges">
        <rect x={0} y={0} width={trackW} height={trackH} fill={state ? color : "var(--bg-secondary)"} stroke={state ? color : "var(--border-strong)"} strokeWidth={1} />
        <rect x={blockX} y={2} width={blockW} height={trackH - 4} fill={state ? "var(--bg)" : "var(--fg-dim)"} />
        {!state && (
          <text x={trackW - 6} y={trackH - 3} fill="var(--fg-dimmer)" fontSize="5" fontFamily="monospace" textAnchor="middle">0</text>
        )}
        {state && (
          <text x={6} y={trackH - 3} fill="var(--bg)" fontSize="5" fontFamily="monospace" textAnchor="middle">1</text>
        )}
      </svg>
      {label && (
        <span style={{ fontFamily: "monospace", fontSize: "9px", color: "var(--fg-dim)" }}>{label}</span>
      )}
    </div>
  );
}
