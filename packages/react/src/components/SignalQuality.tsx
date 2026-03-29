"use client";

export interface SignalQualityProps {
  quality?: number;
  width?: number;
  height?: number;
  color?: string;
}

export function SignalQuality({ quality = 3, width = 24, height = 16, color = "var(--accent)" }: SignalQualityProps) {
  const bars = 5;
  const barW = Math.floor((width - (bars - 1) * 2) / bars);
  const clampedQ = Math.max(0, Math.min(bars, quality));

  return (
    <svg width={width} height={height} style={{ display: "block" }} shapeRendering="crispEdges">
      {Array.from({ length: bars }, (_, i) => {
        const barH = Math.round(height * (0.2 + (i / (bars - 1)) * 0.8));
        const x = i * (barW + 2);
        const y = height - barH;
        const active = i < clampedQ;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={barW}
            height={barH}
            fill={active ? color : "var(--fg-dimmer)"}
            opacity={active ? 0.9 : 0.2}
          />
        );
      })}
    </svg>
  );
}
