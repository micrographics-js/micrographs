"use client";

export interface DeclassifiedProps {
  date?: string;
  authority?: string;
  color?: string;
  size?: number;
}

export function Declassified({
  date = "2024-01-15",
  authority = "EO 13526",
  color = "var(--accent)",
  size = 140,
}: DeclassifiedProps) {
  const r = size / 2;
  const cx = r;
  const cy = r;
  const innerR = r * 0.85;
  const fontSize = size * 0.1;
  const subFont = size * 0.055;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ display: "inline-block", overflow: "visible" }}
      shapeRendering="crispEdges"
    >
      <g opacity={0.6}>
        {/* Outer circle */}
        <circle cx={cx} cy={cy} r={r - 2} fill="none" stroke={color} strokeWidth={2.5} />
        {/* Inner circle */}
        <circle cx={cx} cy={cy} r={innerR} fill="none" stroke={color} strokeWidth={1} />
        {/* Main text */}
        <text
          x={cx}
          y={cy - fontSize * 0.3}
          textAnchor="middle"
          fontFamily="monospace"
          fontSize={fontSize}
          fontWeight="bold"
          fill={color}
          letterSpacing="0.12em"
        >
          DECLASSIFIED
        </text>
        {/* Date */}
        <text
          x={cx}
          y={cy + fontSize * 0.8}
          textAnchor="middle"
          fontFamily="monospace"
          fontSize={subFont}
          fill={color}
          letterSpacing="0.08em"
        >
          DATE: {date}
        </text>
        {/* Authority */}
        <text
          x={cx}
          y={cy + fontSize * 1.6}
          textAnchor="middle"
          fontFamily="monospace"
          fontSize={subFont}
          fill={color}
          opacity={0.7}
          letterSpacing="0.08em"
        >
          AUTH: {authority}
        </text>
        {/* Horizontal lines for worn look */}
        <line x1={cx - innerR * 0.7} y1={cy - fontSize * 0.7} x2={cx + innerR * 0.7} y2={cy - fontSize * 0.7} stroke={color} strokeWidth={0.5} opacity={0.3} />
        <line x1={cx - innerR * 0.7} y1={cy + fontSize * 2.1} x2={cx + innerR * 0.7} y2={cy + fontSize * 2.1} stroke={color} strokeWidth={0.5} opacity={0.3} />
        {/* Worn speckle */}
        {Array.from({ length: 6 }, (_, i) => (
          <rect
            key={i}
            x={cx + Math.cos(i * 1.1) * innerR * 0.5 - 3}
            y={cy + Math.sin(i * 1.7) * innerR * 0.3}
            width={7 + (i * 3) % 10}
            height={1}
            fill="var(--bg)"
            opacity={0.5}
          />
        ))}
      </g>
    </svg>
  );
}
