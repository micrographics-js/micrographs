"use client";

export interface ClassifiedStampProps {
  level?: "confidential" | "secret" | "top-secret" | "eyes-only";
  angle?: number;
  color?: string;
  size?: number;
}

const LEVEL_LABELS: Record<string, string> = {
  "confidential": "CONFIDENTIAL",
  "secret": "SECRET",
  "top-secret": "TOP SECRET",
  "eyes-only": "EYES ONLY",
};

export function ClassifiedStamp({
  level = "top-secret",
  angle = -12,
  color = "var(--accent-red)",
  size = 180,
}: ClassifiedStampProps) {
  const label = LEVEL_LABELS[level] ?? level.toUpperCase();
  const h = size * 0.35;
  const fontSize = Math.max(10, size * 0.1);
  const borderW = Math.max(2, size * 0.018);
  const cx = size / 2;
  const cy = h / 2;

  return (
    <svg
      width={size}
      height={h}
      viewBox={`0 0 ${size} ${h}`}
      style={{ display: "inline-block", overflow: "visible" }}
      shapeRendering="crispEdges"
    >
      <g transform={`rotate(${angle}, ${cx}, ${cy})`}>
        {/* Outer border */}
        <rect
          x={borderW}
          y={borderW}
          width={size - borderW * 2}
          height={h - borderW * 2}
          fill="none"
          stroke={color}
          strokeWidth={borderW}
          opacity={0.75}
        />
        {/* Inner border */}
        <rect
          x={borderW * 3}
          y={borderW * 3}
          width={size - borderW * 6}
          height={h - borderW * 6}
          fill="none"
          stroke={color}
          strokeWidth={borderW * 0.5}
          opacity={0.5}
        />
        {/* Label text */}
        <text
          x={cx}
          y={cy + fontSize * 0.35}
          textAnchor="middle"
          fontFamily="monospace"
          fontSize={fontSize}
          fontWeight="bold"
          fill={color}
          opacity={0.8}
          letterSpacing="0.15em"
        >
          {label}
        </text>
        {/* Worn speckle overlay */}
        {Array.from({ length: 8 }, (_, i) => (
          <rect
            key={i}
            x={((i * 31 + 7) % (size - 10))}
            y={((i * 17 + 3) % (h - 4))}
            width={((i * 13) % 20) + 4}
            height={1}
            fill="var(--bg)"
            opacity={0.4}
          />
        ))}
      </g>
    </svg>
  );
}
