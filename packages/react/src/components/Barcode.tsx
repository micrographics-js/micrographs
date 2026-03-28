import { seeded } from "@micrographics/core";

export interface BarcodeProps {
  seed?: number;
  width?: number;
  height?: number;
  color?: string;
}

export function Barcode({ seed = 42, width = 60, height = 20, color = "var(--fg-dim)" }: BarcodeProps) {
  const bars = Array.from({ length: Math.floor(width / 2) }, (_, i) => ({
    x: i * 2,
    w: seeded(seed + i) > 0.5 ? 2 : 1,
    h: Math.round(height * (0.6 + seeded(seed + i + 100) * 0.4)),
  }));

  return (
    <svg width={width} height={height} style={{ display: "block" }} shapeRendering="crispEdges">
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={height - b.h} width={b.w} height={b.h} fill={color} />
      ))}
    </svg>
  );
}
