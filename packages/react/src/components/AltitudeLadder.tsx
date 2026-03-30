"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics-js/core";

export interface AltitudeLadderProps {
  altitude?: number;
  unit?: string;
  color?: string;
  height?: number;
  animated?: boolean;
}

export function AltitudeLadder({
  altitude = 120,
  unit = "m",
  color = "var(--accent, #00ff41)",
  height = 160,
  animated = false,
}: AltitudeLadderProps) {
  const [current, setCurrent] = useState(altitude);

  useEffect(() => {
    setCurrent(altitude);
  }, [altitude]);

  useEffect(() => {
    if (!animated) return;
    return createTicker(100, () => {
      setCurrent((a) => a + Math.sin(Date.now() * 0.001) * 0.15);
    });
  }, [animated]);

  const width = 52;
  const ladderX = 30;
  const ladderTop = 10;
  const ladderBottom = height - 10;
  const ladderH = ladderBottom - ladderTop;
  const step = 10;
  const visibleSteps = 9;
  const centerY = ladderTop + ladderH / 2;

  const baseAlt = Math.round(current / step) * step;

  return (
    <svg width={width} height={height} style={{ display: "block" }} shapeRendering="crispEdges">
      {/* Ladder rail */}
      <line x1={ladderX} y1={ladderTop} x2={ladderX} y2={ladderBottom} stroke={color} strokeWidth={0.5} opacity={0.3} />

      {/* Tick marks and values */}
      {Array.from({ length: visibleSteps }, (_, i) => {
        const offset = i - Math.floor(visibleSteps / 2);
        const val = baseAlt - offset * step;
        const pixelOffset = ((current - baseAlt) / step) * (ladderH / (visibleSteps - 1));
        const y = centerY + offset * (ladderH / (visibleSteps - 1)) + pixelOffset;
        if (y < ladderTop - 5 || y > ladderBottom + 5) return null;
        const isMajor = val % 50 === 0;
        return (
          <g key={i}>
            <line
              x1={ladderX - (isMajor ? 8 : 4)}
              y1={y}
              x2={ladderX}
              y2={y}
              stroke={color}
              strokeWidth={isMajor ? 1 : 0.5}
              opacity={0.5}
            />
            <text
              x={ladderX - (isMajor ? 10 : 6)}
              y={y + 3}
              textAnchor="end"
              fill={color}
              fontSize={isMajor ? "7" : "6"}
              fontFamily="monospace"
              opacity={isMajor ? 0.8 : 0.4}
            >
              {val.toFixed(0)}
            </text>
          </g>
        );
      })}

      {/* Current altitude indicator - arrow */}
      <polygon
        points={`${ladderX + 2},${centerY - 5} ${ladderX + 10},${centerY} ${ladderX + 2},${centerY + 5}`}
        fill={color}
        opacity={0.9}
      />
      <rect x={ladderX + 10} y={centerY - 6} width={width - ladderX - 12} height={12} fill="rgba(0,0,0,0.8)" stroke={color} strokeWidth={0.5} />
      <text x={ladderX + 12} y={centerY + 3} fill={color} fontSize="8" fontFamily="monospace" fontWeight="bold">
        {current.toFixed(0)}
      </text>

      {/* Unit label */}
      <text x={width - 2} y={height - 2} textAnchor="end" fill={color} fontSize="6" fontFamily="monospace" opacity={0.4}>
        {unit}
      </text>
    </svg>
  );
}
