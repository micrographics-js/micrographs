"use client";

export interface VoltageDisplayProps {
  voltage?: number;
  min?: number;
  max?: number;
  width?: number;
  height?: number;
  unit?: string;
}

export function VoltageDisplay({ voltage = 5, min = 0, max = 12, width = 16, height = 40, unit = "V" }: VoltageDisplayProps) {
  const pct = Math.max(0, Math.min(1, (voltage - min) / (max - min)));
  const segments = 8;
  const segH = Math.floor((height - 14) / segments) - 1;
  const filled = Math.round(pct * segments);
  const segY = (i: number) => height - 14 - (i + 1) * (segH + 1);

  const segColor = (i: number) => {
    const ratio = i / segments;
    if (ratio > 0.75) return "var(--accent-red)";
    if (ratio > 0.5) return "var(--accent-amber)";
    return "var(--accent)";
  };

  return (
    <svg width={width} height={height} style={{ display: "block" }} shapeRendering="crispEdges">
      <rect x={0} y={0} width={width} height={height - 10} fill="var(--bg-secondary)" stroke="var(--border)" strokeWidth={1} />
      {Array.from({ length: segments }, (_, i) => (
        <rect
          key={i}
          x={2}
          y={segY(i)}
          width={width - 4}
          height={segH}
          fill={i < filled ? segColor(i) : "var(--fg-dimmer)"}
          opacity={i < filled ? 0.9 : 0.15}
        />
      ))}
      <text x={width / 2} y={height - 1} textAnchor="middle" fill="var(--fg-dim)" fontSize="7" fontFamily="monospace">
        {voltage}{unit}
      </text>
    </svg>
  );
}
