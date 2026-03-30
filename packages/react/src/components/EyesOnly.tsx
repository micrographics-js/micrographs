"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics-js/core";

export interface EyesOnlyProps {
  recipients?: string[];
  color?: string;
  animated?: boolean;
}

const DEFAULT_RECIPIENTS = ["POTUS", "DNI", "D/CIA", "NSA/CSS"];

export function EyesOnly({
  recipients = DEFAULT_RECIPIENTS,
  color = "var(--accent-red)",
  animated = false,
}: EyesOnlyProps) {
  const [dotOn, setDotOn] = useState(true);

  useEffect(() => {
    if (!animated) return;
    return createTicker(900, () => setDotOn((v) => !v));
  }, [animated]);

  return (
    <div
      style={{
        fontFamily: "monospace",
        display: "inline-flex",
        flexDirection: "column",
        gap: 4,
        userSelect: "none",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <svg width={8} height={8} shapeRendering="crispEdges">
          <rect
            x={0}
            y={0}
            width={8}
            height={8}
            fill={color}
            opacity={animated ? (dotOn ? 1 : 0.2) : 1}
          />
        </svg>
        <span
          style={{
            fontSize: "11px",
            fontWeight: "bold",
            color,
            letterSpacing: "0.15em",
          }}
        >
          EYES ONLY
        </span>
      </div>
      {/* Distribution line */}
      <div style={{ fontSize: "7px", color: "var(--fg-dimmer)", letterSpacing: "0.1em", paddingLeft: 14 }}>
        DISTRIBUTION:
      </div>
      {/* Recipients */}
      <div style={{ display: "flex", flexDirection: "column", gap: 2, paddingLeft: 14 }}>
        {recipients.map((r, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: "8px", color: "var(--fg-dim)", letterSpacing: "0.06em", minWidth: 50 }}>
              {r}
            </span>
            <svg width={60} height={8} shapeRendering="crispEdges">
              <rect x={0} y={0} width={60} height={8} fill="var(--fg)" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
