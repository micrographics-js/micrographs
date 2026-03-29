"use client";

export interface CoordLabelProps {
  x?: number;
  y?: number;
  z?: number;
  color?: string;
  precision?: number;
}

export function CoordLabel({ x = 1.23, y = 45.67, z = -2.1, color = "var(--fg)", precision = 2 }: CoordLabelProps) {
  const fmt = (n: number) => {
    const sign = n < 0 ? "−" : " ";
    const abs = Math.abs(n).toFixed(precision);
    const [int, dec] = abs.split(".");
    return `${sign}${int.padStart(3, "0")}.${dec}`;
  };

  return (
    <span style={{ fontFamily: "monospace", fontSize: "10px", display: "inline-flex", gap: "6px" }}>
      <span><span style={{ color: "var(--fg-dimmer)" }}>X:</span><span style={{ color }}>{fmt(x)}</span></span>
      <span><span style={{ color: "var(--fg-dimmer)" }}>Y:</span><span style={{ color }}>{fmt(y)}</span></span>
      <span><span style={{ color: "var(--fg-dimmer)" }}>Z:</span><span style={{ color }}>{fmt(z)}</span></span>
    </span>
  );
}
