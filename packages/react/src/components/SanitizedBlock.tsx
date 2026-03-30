"use client";
import { useMemo } from "react";
import { SeededRandom } from "@micrographics-js/core";

export interface SanitizedBlockProps {
  lines?: number;
  wordsPerLine?: number;
  redactChance?: number;
  seed?: number;
  color?: string;
}

const FILLER_WORDS = [
  "the", "operation", "was", "conducted", "under", "authority",
  "of", "directive", "issued", "by", "department", "section",
  "personnel", "deployed", "to", "location", "during", "period",
  "report", "indicates", "subject", "observed", "at", "facility",
  "asset", "confirmed", "contact", "with", "foreign", "national",
  "surveillance", "revealed", "movement", "toward", "border",
  "intelligence", "suggests", "ongoing", "activity", "in", "region",
];

export function SanitizedBlock({
  lines = 6,
  wordsPerLine = 8,
  redactChance = 0.3,
  seed = 42,
  color = "var(--fg)",
}: SanitizedBlockProps) {
  const content = useMemo(() => {
    const rng = new SeededRandom(seed);
    const result: string[][] = [];
    for (let l = 0; l < lines; l++) {
      const line: string[] = [];
      for (let w = 0; w < wordsPerLine; w++) {
        if (rng.next() < redactChance) {
          const barLen = rng.nextInt(3, 8);
          line.push("\u2588".repeat(barLen));
        } else {
          const word = FILLER_WORDS[rng.nextInt(0, FILLER_WORDS.length - 1)];
          line.push(word);
        }
      }
      result.push(line);
    }
    return result;
  }, [lines, wordsPerLine, redactChance, seed]);

  return (
    <div
      style={{
        fontFamily: "monospace",
        fontSize: "10px",
        lineHeight: 1.8,
        color,
        userSelect: "none",
      }}
    >
      {content.map((line, i) => (
        <div key={i} style={{ letterSpacing: "0.03em" }}>
          {line.join(" ")}
        </div>
      ))}
    </div>
  );
}
