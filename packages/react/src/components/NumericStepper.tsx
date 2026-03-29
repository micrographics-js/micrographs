"use client";
import { useState } from "react";

export interface NumericStepperProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (v: number) => void;
  color?: string;
}

export function NumericStepper({ value = 0, min = 0, max = 999, step = 1, onChange, color = "var(--accent)" }: NumericStepperProps) {
  const [val, setVal] = useState(value);

  const decrement = () => {
    const next = Math.max(min, val - step);
    setVal(next);
    onChange?.(next);
  };

  const increment = () => {
    const next = Math.min(max, val + step);
    setVal(next);
    onChange?.(next);
  };

  const btnStyle = (disabled: boolean) => ({
    fontFamily: "monospace",
    fontSize: "11px",
    color: disabled ? "var(--fg-dimmer)" : color,
    background: "var(--bg-secondary)",
    border: `1px solid ${disabled ? "var(--border)" : "var(--border-strong)"}`,
    padding: "1px 5px",
    cursor: disabled ? "default" : "pointer",
    userSelect: "none" as const,
    lineHeight: 1.4,
  });

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "0", fontFamily: "monospace" }}>
      <button onClick={decrement} disabled={val <= min} style={btnStyle(val <= min)}>−</button>
      <span style={{
        fontSize: "11px",
        color,
        padding: "1px 6px",
        background: "var(--bg)",
        border: "1px solid var(--border)",
        borderLeft: "none",
        borderRight: "none",
        minWidth: "32px",
        textAlign: "center",
        letterSpacing: "0.1em",
      }}>
        {String(val).padStart(3, "0")}
      </span>
      <button onClick={increment} disabled={val >= max} style={btnStyle(val >= max)}>+</button>
    </div>
  );
}
