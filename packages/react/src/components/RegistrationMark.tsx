export interface RegistrationMarkProps {
  size?: number;
  color?: string;
  label?: string;
}

export function RegistrationMark({ size = 24, color = "var(--fg-dimmer)", label }: RegistrationMarkProps) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.35;

  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
      <svg width={size} height={size} style={{ display: "block" }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={0.75} />
        <line x1={0} y1={cy} x2={size} y2={cy} stroke={color} strokeWidth={0.75} />
        <line x1={cx} y1={0} x2={cx} y2={size} stroke={color} strokeWidth={0.75} />
      </svg>
      {label && (
        <span style={{ fontFamily: "monospace", fontSize: "7px", color, letterSpacing: "0.1em" }}>{label}</span>
      )}
    </div>
  );
}
