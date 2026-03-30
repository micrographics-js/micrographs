"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics-js/core";

export interface TargetLockProps {
  status?: "searching" | "tracking" | "locked";
  size?: number;
  color?: string;
  targetId?: string;
}

export function TargetLock({
  status = "searching",
  size = 80,
  color = "var(--accent, #00ff41)",
  targetId = "TGT-001",
}: TargetLockProps) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    return createTicker(50, () => setTick((t) => t + 1));
  }, []);

  const cx = size / 2;
  const cy = size / 2;
  const bracketLen = size * 0.2;

  const statusColor =
    status === "locked"
      ? "var(--accent-red, #ff0040)"
      : status === "tracking"
      ? "var(--accent-amber, #ffaa00)"
      : color;

  // Bracket offset: searching = rotating and far, tracking = closing in, locked = tight
  const rotation = status === "searching" ? tick * 3 : 0;
  const bracketDist =
    status === "searching"
      ? size * 0.38
      : status === "tracking"
      ? size * 0.3 + Math.sin(tick * 0.1) * size * 0.05
      : size * 0.28;

  const pulse = status === "locked" ? 0.5 + 0.5 * Math.abs(Math.sin(tick * 0.08)) : 1;

  // Corner bracket positions
  const corners = [
    { dx: -1, dy: -1, hx: 1, hy: 0, vx: 0, vy: 1 },
    { dx: 1, dy: -1, hx: -1, hy: 0, vx: 0, vy: 1 },
    { dx: 1, dy: 1, hx: -1, hy: 0, vx: 0, vy: -1 },
    { dx: -1, dy: 1, hx: 1, hy: 0, vx: 0, vy: -1 },
  ];

  return (
    <svg width={size} height={size} style={{ display: "block" }} shapeRendering="crispEdges">
      {/* Rotating group for searching mode */}
      <g transform={`rotate(${rotation}, ${cx}, ${cy})`}>
        {corners.map((c, i) => {
          const bx = cx + c.dx * bracketDist;
          const by = cy + c.dy * bracketDist;
          return (
            <g key={i}>
              <line
                x1={bx}
                y1={by}
                x2={bx + c.hx * bracketLen}
                y2={by + c.hy * bracketLen}
                stroke={statusColor}
                strokeWidth={status === "locked" ? 2 : 1.5}
                opacity={pulse}
              />
              <line
                x1={bx}
                y1={by}
                x2={bx + c.vx * bracketLen}
                y2={by + c.vy * bracketLen}
                stroke={statusColor}
                strokeWidth={status === "locked" ? 2 : 1.5}
                opacity={pulse}
              />
            </g>
          );
        })}
      </g>

      {/* Center crosshair */}
      <line x1={cx - 4} y1={cy} x2={cx + 4} y2={cy} stroke={statusColor} strokeWidth={0.5} opacity={0.6} />
      <line x1={cx} y1={cy - 4} x2={cx} y2={cy + 4} stroke={statusColor} strokeWidth={0.5} opacity={0.6} />

      {/* Status text */}
      {status === "locked" && (
        <text
          x={cx}
          y={cy + size * 0.42}
          textAnchor="middle"
          fill={statusColor}
          fontSize="7"
          fontFamily="monospace"
          fontWeight="bold"
          opacity={pulse}
        >
          TGT LOCK
        </text>
      )}
      {status === "tracking" && (
        <text
          x={cx}
          y={cy + size * 0.42}
          textAnchor="middle"
          fill={statusColor}
          fontSize="6"
          fontFamily="monospace"
          opacity={0.7}
        >
          TRACKING
        </text>
      )}
      {status === "searching" && (
        <text
          x={cx}
          y={cy + size * 0.42}
          textAnchor="middle"
          fill={statusColor}
          fontSize="6"
          fontFamily="monospace"
          opacity={0.5 + 0.3 * Math.abs(Math.sin(tick * 0.05))}
        >
          SEARCH
        </text>
      )}

      {/* Target ID */}
      <text
        x={cx}
        y={size - 4}
        textAnchor="middle"
        fill={statusColor}
        fontSize="5"
        fontFamily="monospace"
        opacity={0.4}
      >
        {targetId}
      </text>
    </svg>
  );
}
