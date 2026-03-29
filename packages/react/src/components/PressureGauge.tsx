"use client";

export interface PressureGaugeProps {
  value?: number;
  min?: number;
  max?: number;
  size?: number;
  color?: string;
  unit?: string;
}

export function PressureGauge({ value = 50, min = 0, max = 100, size = 60, color = "var(--accent)", unit = "PSI" }: PressureGaugeProps) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 5;
  const pct = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const startAngle = 135;
  const totalArc = 270;
  const endAngle = startAngle + pct * totalArc;

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const arcPath = (r2: number, start: number, end: number) => {
    const s = toRad(start);
    const e = toRad(end);
    const x1 = cx + r2 * Math.cos(s);
    const y1 = cy + r2 * Math.sin(s);
    const x2 = cx + r2 * Math.cos(e);
    const y2 = cy + r2 * Math.sin(e);
    const large = end - start > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r2} ${r2} 0 ${large} 1 ${x2} ${y2}`;
  };

  return (
    <svg width={size} height={size} style={{ display: "block" }}>
      {/* Track */}
      <path d={arcPath(r, startAngle, startAngle + totalArc)} fill="none" stroke="var(--fg-dimmer)" strokeWidth={3} strokeLinecap="square" />
      {/* Filled arc */}
      {pct > 0 && (
        <path d={arcPath(r, startAngle, endAngle)} fill="none" stroke={color} strokeWidth={3} strokeLinecap="square" />
      )}
      {/* Tick marks */}
      {Array.from({ length: 9 }, (_, i) => {
        const a = toRad(startAngle + (i / 8) * totalArc);
        const inner = r - 4;
        const outer = r + 1;
        return (
          <line
            key={i}
            x1={cx + inner * Math.cos(a)}
            y1={cy + inner * Math.sin(a)}
            x2={cx + outer * Math.cos(a)}
            y2={cy + outer * Math.sin(a)}
            stroke="var(--fg-dimmer)"
            strokeWidth={0.75}
          />
        );
      })}
      {/* Center value */}
      <text x={cx} y={cy + 2} textAnchor="middle" fill={color} fontSize="10" fontFamily="monospace" fontWeight="bold">
        {value}
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill="var(--fg-dimmer)" fontSize="7" fontFamily="monospace">
        {unit}
      </text>
    </svg>
  );
}
