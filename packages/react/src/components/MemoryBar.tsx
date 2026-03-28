export interface MemoryBarProps {
  used?: number;
  total?: number;
  unit?: string;
  segments?: number;
  color?: string;
  width?: number;
  height?: number;
}

export function MemoryBar({ used = 6.4, total = 16, unit = "GB", segments = 10, color = "var(--accent)", width = 80, height = 8 }: MemoryBarProps) {
  const pct = used / total;
  const filled = Math.round(pct * segments);
  const segW = Math.floor(width / segments) - 1;
  const barColor = pct > 0.85 ? "var(--accent-red)" : pct > 0.65 ? "var(--accent-amber)" : color;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
      <svg width={width} height={height} style={{ display: "block" }} shapeRendering="crispEdges">
        {Array.from({ length: segments }, (_, i) => (
          <rect
            key={i}
            x={i * (segW + 1)}
            y={0}
            width={segW}
            height={height}
            fill={i < filled ? barColor : "var(--fg-dimmer)"}
            opacity={i < filled ? 1 : 0.2}
          />
        ))}
      </svg>
      <span style={{ fontFamily: "monospace", fontSize: "9px", color: "var(--fg-dimmer)" }}>
        {used}{unit} / {total}{unit}
      </span>
    </div>
  );
}
