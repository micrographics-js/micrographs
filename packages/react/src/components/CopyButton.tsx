"use client";
import { useState } from "react";

export interface CopyButtonProps {
  text?: string;
  color?: string;
}

export function CopyButton({ text = "copy me", color = "var(--fg-dim)" }: CopyButtonProps) {
  const [state, setState] = useState<"idle" | "copied">("idle");

  const handleClick = () => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setState("copied");
    setTimeout(() => setState("idle"), 2000);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        fontFamily: "monospace",
        fontSize: "10px",
        color: state === "copied" ? "var(--accent)" : color,
        background: "none",
        border: `1px solid ${state === "copied" ? "var(--accent)" : color}`,
        padding: "2px 6px",
        cursor: "pointer",
        letterSpacing: "0.05em",
        transition: "color 0.1s, border-color 0.1s",
      }}
    >
      {state === "copied" ? "[COPIED ✓]" : "[COPY]"}
    </button>
  );
}
