"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics-js/core";

export interface WeaponStatusProps {
  status?: "safe" | "armed" | "firing";
  weapon?: string;
  rounds?: number;
  color?: string;
}

export function WeaponStatus({
  status = "safe",
  weapon = "HELLFIRE",
  rounds = 2,
  color = "var(--accent, #00ff41)",
}: WeaponStatusProps) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    return createTicker(80, () => setTick((t) => t + 1));
  }, []);

  const statusColor =
    status === "firing"
      ? "var(--accent-red, #ff0040)"
      : status === "armed"
      ? "var(--accent-amber, #ffaa00)"
      : "var(--accent-green, #00ff41)";

  const statusLabel = status === "firing" ? "FIRE" : status === "armed" ? "ARM" : "SAFE";

  const flashOpacity =
    status === "armed"
      ? tick % 12 < 6
        ? 1
        : 0.3
      : status === "firing"
      ? 0.5 + 0.5 * Math.abs(Math.sin(tick * 0.15))
      : 1;

  const maxRounds = 4;
  const filledBlocks = Math.min(rounds, maxRounds);
  const barChars = Array.from({ length: maxRounds }, (_, i) => (i < filledBlocks ? "\u2588" : "\u2591")).join("");

  const width = 180;
  const height = 20;

  return (
    <svg width={width} height={height} style={{ display: "block" }} shapeRendering="crispEdges">
      <rect x={0} y={0} width={width} height={height} fill="rgba(0,0,0,0.8)" />

      {/* Status indicator dot */}
      <circle cx={8} cy={height / 2} r={3} fill={statusColor} opacity={flashOpacity} />

      {/* Weapon name */}
      <text x={16} y={13} fill={color} fontSize="8" fontFamily="monospace" fontWeight="bold" opacity={0.8}>
        [{weapon}]
      </text>

      {/* Status label */}
      <text x={16 + (weapon.length + 2) * 5.2} y={13} fill={statusColor} fontSize="8" fontFamily="monospace" fontWeight="bold" opacity={flashOpacity}>
        {statusLabel}
      </text>

      {/* Rounds bar */}
      <text x={16 + (weapon.length + 2) * 5.2 + statusLabel.length * 5.2 + 4} y={13} fill={color} fontSize="8" fontFamily="monospace" opacity={0.7}>
        {barChars}
      </text>

      {/* Rounds count */}
      <text x={width - 6} y={13} textAnchor="end" fill={color} fontSize="8" fontFamily="monospace" opacity={0.6}>
        {rounds}/{maxRounds}
      </text>

      {/* Border */}
      <rect x={0} y={0} width={width} height={height} fill="none" stroke={statusColor} strokeWidth={0.5} opacity={0.4} />
    </svg>
  );
}
