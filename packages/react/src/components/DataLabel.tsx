export interface DataLabelProps {
  label?: string;
  value?: string;
  color?: string;
  valueColor?: string;
}

export function DataLabel({ label = "STATUS", value = "ACTIVE", color = "var(--fg-dimmer)", valueColor = "var(--fg)" }: DataLabelProps) {
  return (
    <span style={{
      fontFamily: "monospace",
      fontSize: "10px",
      display: "inline-flex",
      alignItems: "center",
      gap: "0",
      border: "1px solid var(--border)",
    }}>
      <span style={{ color, padding: "1px 4px", borderRight: "1px solid var(--border)", background: "var(--bg-secondary)" }}>{label}</span>
      <span style={{ color: valueColor, padding: "1px 4px" }}>{value}</span>
    </span>
  );
}
