"use client";

export interface RulerTickProps {
  width?: number;
  height?: number;
  color?: string;
  divisions?: number;
  showLabels?: boolean;
}

export function RulerTick({ width = 120, height = 16, color = "var(--fg-dim)", divisions = 10, showLabels = true }: RulerTickProps) {
  const majorH = Math.floor(height * 0.65);
  const minorH = Math.floor(height * 0.35);
  const subdivisions = 5;
  const totalTicks = divisions * subdivisions;
  const tickSpacing = (width - 1) / totalTicks;

  return (
    <svg width={width} height={height} style={{ display: "block" }} shapeRendering="crispEdges">
      {/* baseline */}
      <line x1={0} y1={0} x2={width} y2={0} stroke={color} strokeWidth={1} />
      {Array.from({ length: totalTicks + 1 }, (_, i) => {
        const x = Math.round(i * tickSpacing);
        const isMajor = i % subdivisions === 0;
        const tickH = isMajor ? majorH : minorH;
        const label = isMajor ? String(i / subdivisions) : null;
        return (
          <g key={i}>
            <line x1={x} y1={0} x2={x} y2={tickH} stroke={color} strokeWidth={isMajor ? 1 : 0.5} />
            {showLabels && label && (
              <text x={x} y={height - 1} textAnchor="middle" fill={color} fontSize="6" fontFamily="monospace" opacity={0.7}>
                {label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
