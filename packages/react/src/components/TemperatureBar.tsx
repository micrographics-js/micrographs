"use client";

export interface TemperatureBarProps {
  value?: number;
  min?: number;
  max?: number;
  width?: number;
  height?: number;
  unit?: string;
  color?: string;
}

export function TemperatureBar({ value = 65, min = 0, max = 100, width = 12, height = 60, unit = "°C", color = "var(--accent)" }: TemperatureBarProps) {
  const pct = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const barH = height - 18;
  const filled = Math.round(pct * barH);
  const barY = barH - filled;
  const gradId = `temp-grad-${height}`;
  const activeColor = value > max * 0.75 ? "var(--accent-red)" : value > max * 0.5 ? "var(--accent-amber)" : color;

  return (
    <svg width={width} height={height} style={{ display: "block" }} shapeRendering="crispEdges">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent-red)" />
          <stop offset="50%" stopColor="var(--accent-amber)" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      {/* bulb */}
      <circle cx={width / 2} cy={barH + 6} r={5} fill={activeColor} />
      {/* tube track */}
      <rect x={width / 2 - 3} y={0} width={6} height={barH + 3} fill="var(--bg-secondary)" stroke="var(--border)" strokeWidth={1} />
      {/* fill */}
      {filled > 0 && (
        <rect x={width / 2 - 2} y={barY + 1} width={4} height={filled + 2} fill={`url(#${gradId})`} />
      )}
      {/* tick marks */}
      {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
        <line key={i} x1={width / 2 + 3} y1={barH * (1 - t)} x2={width / 2 + 5} y2={barH * (1 - t)} stroke="var(--fg-dimmer)" strokeWidth={1} />
      ))}
      {/* label */}
      <text x={width / 2} y={height - 1} textAnchor="middle" fill="var(--fg-dim)" fontSize="7" fontFamily="monospace">
        {value}{unit}
      </text>
    </svg>
  );
}
