"use client";
import { useMemo } from "react";
import { SeededRandom } from "@micrographics-js/core";

export interface SignatureRedactProps {
  width?: number;
  color?: string;
  witnessCount?: number;
}

function generateSignaturePath(w: number, seed: number): string {
  const rng = new SeededRandom(seed);
  const points: string[] = [`M 4 16`];
  let x = 4;
  const y = 16;
  while (x < w - 8) {
    const dx = rng.nextInt(6, 14);
    const dy = rng.nextInt(-8, 8);
    const cx1 = x + dx * 0.3;
    const cy1 = y + dy * 1.2;
    x += dx;
    points.push(`Q ${cx1} ${cy1} ${Math.min(x, w - 8)} ${y + rng.nextInt(-3, 3)}`);
  }
  return points.join(" ");
}

export function SignatureRedact({
  width = 180,
  color = "var(--fg)",
  witnessCount = 0,
}: SignatureRedactProps) {
  const sigPath = useMemo(() => generateSignaturePath(width, 99), [width]);
  const lineH = 32;
  const totalH = lineH + 16 + witnessCount * 24;

  return (
    <svg
      width={width}
      height={totalH}
      viewBox={`0 0 ${width} ${totalH}`}
      style={{ display: "inline-block" }}
      shapeRendering="crispEdges"
    >
      {/* Signature line */}
      <line x1={4} y1={lineH - 4} x2={width - 4} y2={lineH - 4} stroke="var(--border)" strokeWidth={1} />
      {/* Fake signature (behind bar) */}
      <path d={sigPath} fill="none" stroke="var(--fg-dimmer)" strokeWidth={1} opacity={0.3} />
      {/* Redaction bar covering signature */}
      <rect x={4} y={6} width={width - 8} height={18} fill={color} />
      {/* Label */}
      <text
        x={width / 2}
        y={lineH + 10}
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="7px"
        fill="var(--fg-dimmer)"
        letterSpacing="0.12em"
      >
        SIGNATURE REDACTED
      </text>

      {/* Witness lines */}
      {Array.from({ length: witnessCount }, (_, i) => {
        const wy = lineH + 20 + i * 24;
        return (
          <g key={i}>
            <line x1={4} y1={wy + 14} x2={width - 4} y2={wy + 14} stroke="var(--border)" strokeWidth={1} />
            <rect x={4} y={wy + 2} width={width * 0.6} height={10} fill={color} />
            <text
              x={4}
              y={wy + 22}
              fontFamily="monospace"
              fontSize="6px"
              fill="var(--fg-dimmer)"
              letterSpacing="0.1em"
            >
              WITNESS {i + 1} — REDACTED
            </text>
          </g>
        );
      })}
    </svg>
  );
}
