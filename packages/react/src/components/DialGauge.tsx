export interface DialGaugeProps {
  value?: number;
  min?: number;
  max?: number;
  label?: string;
  color?: string;
  width?: number;
  height?: number;
}

export function DialGauge({ value = 65, min = 0, max = 100, label = "RPM", color = "var(--accent)", width = 80, height = 50 }: DialGaugeProps) {
  const cx = width / 2;
  const cy = height - 8;
  const r = Math.min(cx - 4, cy - 4);
  const startAngle = -180;
  const endAngle = 0;
  const pct = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const angle = startAngle + pct * (endAngle - startAngle);
  const rad = (angle * Math.PI) / 180;
  const nx = cx + r * 0.75 * Math.cos(rad);
  const ny = cy + r * 0.75 * Math.sin(rad);

  const arcPath = (radius: number, start: number, end: number) => {
    const startRad = (start * Math.PI) / 180;
    const endRad = (end * Math.PI) / 180;
    const x1 = cx + radius * Math.cos(startRad);
    const y1 = cy + radius * Math.sin(startRad);
    const x2 = cx + radius * Math.cos(endRad);
    const y2 = cy + radius * Math.sin(endRad);
    return `M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}`;
  };

  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      <path d={arcPath(r, -180, 0)} fill="none" stroke="var(--fg-dimmer)" strokeWidth={2} />
      <path d={arcPath(r, -180, startAngle + pct * 180)} fill="none" stroke={color} strokeWidth={2} />
      <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={color} strokeWidth={1.5} />
      <circle cx={cx} cy={cy} r={3} fill={color} />
      <text x={cx} y={cy - r - 4} textAnchor="middle" fill="var(--fg-dim)" fontSize="8" fontFamily="monospace">{label}</text>
      <text x={cx} y={height - 2} textAnchor="middle" fill={color} fontSize="9" fontFamily="monospace">{value}</text>
    </svg>
  );
}
