"use client";

export interface ThermalBarProps {
  value?: number;
  width?: number;
  height?: number;
  min?: number;
  max?: number;
}

export function ThermalBar({ value = 50, width = 80, height = 8, min = 0, max = 100 }: ThermalBarProps) {
  const pct = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const filled = Math.round(pct * width);
  const gradId = `thermal-grad-${width}`;
  const pctLabel = `${Math.round(pct * 100)}%`;

  return (
    <svg width={width} height={height} style={{ display: "block" }} shapeRendering="crispEdges">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4488ff" />
          <stop offset="30%" stopColor="#44cc88" />
          <stop offset="65%" stopColor="var(--accent-amber)" />
          <stop offset="100%" stopColor="var(--accent-red)" />
        </linearGradient>
      </defs>
      <rect x={0} y={0} width={width} height={height} fill="var(--bg-secondary)" />
      <rect x={0} y={0} width={filled} height={height} fill={`url(#${gradId})`} />
      <rect x={0} y={0} width={width} height={height} fill="none" stroke="var(--border)" strokeWidth={1} />
    </svg>
  );
}
