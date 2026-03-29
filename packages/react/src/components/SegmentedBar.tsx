"use client";

export interface SegmentedBarProps {
  value?: number;
  segments?: number;
  width?: number;
  height?: number;
  color?: string;
  showLabel?: boolean;
}

export function SegmentedBar({ value = 60, segments = 10, width = 80, height = 8, color = "var(--accent)", showLabel = false }: SegmentedBarProps) {
  const filled = Math.round((value / 100) * segments);
  const segW = Math.floor((width - (segments - 1)) / segments);
  const totalW = segments * segW + (segments - 1);

  return (
    <div style={{ display: "inline-flex", flexDirection: "column", gap: "2px" }}>
      <svg width={totalW} height={height} style={{ display: "block" }} shapeRendering="crispEdges">
        {Array.from({ length: segments }, (_, i) => (
          <rect
            key={i}
            x={i * (segW + 1)}
            y={0}
            width={segW}
            height={height}
            fill={i < filled ? color : "var(--fg-dimmer)"}
            opacity={i < filled ? 0.9 : 0.2}
          />
        ))}
      </svg>
      {showLabel && (
        <span style={{ fontFamily: "monospace", fontSize: "8px", color: "var(--fg-dim)", textAlign: "right" }}>
          {value}%
        </span>
      )}
    </div>
  );
}
