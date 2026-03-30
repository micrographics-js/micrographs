"use client";

export interface WatermarkProps {
  text?: string;
  opacity?: number;
  angle?: number;
  color?: string;
  width?: number;
  height?: number;
}

export function Watermark({
  text = "CLASSIFIED",
  opacity = 0.08,
  angle = -30,
  color = "var(--fg)",
  width = 240,
  height = 160,
}: WatermarkProps) {
  const patId = `wm-${text.length}-${angle}`;
  const spacing = text.length * 8 + 40;
  const lineSpacing = 28;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ display: "inline-block" }}
      shapeRendering="crispEdges"
    >
      <defs>
        <pattern
          id={patId}
          width={spacing}
          height={lineSpacing * 2}
          patternUnits="userSpaceOnUse"
          patternTransform={`rotate(${angle})`}
        >
          <text
            x={0}
            y={lineSpacing * 0.7}
            fontFamily="monospace"
            fontSize="11px"
            fontWeight="bold"
            fill={color}
            opacity={opacity}
            letterSpacing="0.15em"
          >
            {text}
          </text>
          <text
            x={spacing * 0.5}
            y={lineSpacing * 1.7}
            fontFamily="monospace"
            fontSize="11px"
            fontWeight="bold"
            fill={color}
            opacity={opacity}
            letterSpacing="0.15em"
          >
            {text}
          </text>
        </pattern>
      </defs>
      <rect width={width} height={height} fill={`url(#${patId})`} />
    </svg>
  );
}
