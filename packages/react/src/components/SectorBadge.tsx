"use client";

export interface SectorBadgeProps {
  sector?: string;
  zone?: number;
  color?: string;
}

const ZONE_COLORS = [
  "var(--accent)",
  "var(--accent-amber)",
  "var(--accent-red)",
  "var(--fg-dim)",
  "var(--accent)",
];

export function SectorBadge({ sector = "A7", zone = 3, color }: SectorBadgeProps) {
  const zoneColor = color ?? ZONE_COLORS[zone % ZONE_COLORS.length];
  const label = `SEC·${sector.toUpperCase()}·Z${String(zone).padStart(2, "0")}`;

  return (
    <span style={{
      fontFamily: "monospace",
      fontSize: "9px",
      color: zoneColor,
      padding: "1px 5px",
      border: `1px solid ${zoneColor}`,
      letterSpacing: "0.1em",
      display: "inline-block",
      opacity: 0.9,
    }}>
      {label}
    </span>
  );
}
