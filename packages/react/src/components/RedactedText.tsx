"use client";
import { useEffect, useState, useMemo } from "react";
import { createTicker, SeededRandom } from "@micrographics-js/core";

export interface RedactedTextProps {
  text?: string;
  redactRatio?: number;
  color?: string;
  barColor?: string;
}

const DEFAULT_TEXT = "The operation was conducted at [REDACTED] on the orders of [REDACTED]";

export function RedactedText({
  text = DEFAULT_TEXT,
  redactRatio = 0.35,
  color = "var(--fg)",
  barColor = "var(--fg)",
}: RedactedTextProps) {
  const [shimmerOffset, setShimmerOffset] = useState(0);

  useEffect(() =>
    createTicker(120, () => setShimmerOffset((v) => (v + 1) % 40)),
    [],
  );

  const words = useMemo(() => text.split(" "), [text]);
  const redacted = useMemo(() => {
    const r = new SeededRandom(text.length * 7);
    return words.map(() => r.next() < redactRatio);
  }, [words, redactRatio, text]);

  return (
    <span style={{ fontFamily: "monospace", fontSize: "11px", lineHeight: 1.6, color }}>
      {words.map((word, i) => {
        if (redacted[i]) {
          const barWidth = word.length * 6.6;
          return (
            <span key={i} style={{ display: "inline-block", position: "relative", margin: "0 2px", verticalAlign: "middle" }}>
              <svg width={barWidth} height={13} style={{ display: "inline-block", verticalAlign: "middle" }} shapeRendering="crispEdges">
                <rect x={0} y={1} width={barWidth} height={11} fill={barColor} rx={0} />
                <rect
                  x={shimmerOffset - 10}
                  y={1}
                  width={10}
                  height={11}
                  fill="white"
                  opacity={0.06}
                />
              </svg>
            </span>
          );
        }
        return <span key={i}>{i > 0 ? " " : ""}{word} </span>;
      })}
    </span>
  );
}
