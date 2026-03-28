export interface CornerOrnamentProps {
  corner?: "tl" | "tr" | "bl" | "br";
  size?: number;
  color?: string;
  thickness?: number;
}

export function CornerOrnament({ corner = "tl", size = 16, color = "var(--fg-dimmer)", thickness = 1.5 }: CornerOrnamentProps) {
  const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
  const s = size;
  const t = thickness;

  if (corner === "tl") {
    lines.push({ x1: 0, y1: s, x2: 0, y2: 0 }, { x1: 0, y1: 0, x2: s, y2: 0 });
  } else if (corner === "tr") {
    lines.push({ x1: 0, y1: 0, x2: s, y2: 0 }, { x1: s, y1: 0, x2: s, y2: s });
  } else if (corner === "bl") {
    lines.push({ x1: 0, y1: 0, x2: 0, y2: s }, { x1: 0, y1: s, x2: s, y2: s });
  } else {
    lines.push({ x1: s, y1: 0, x2: s, y2: s }, { x1: 0, y1: s, x2: s, y2: s });
  }

  return (
    <svg width={s + t} height={s + t} style={{ display: "block" }} shapeRendering="crispEdges">
      {lines.map((l, i) => (
        <line key={i} {...l} stroke={color} strokeWidth={t} />
      ))}
    </svg>
  );
}
