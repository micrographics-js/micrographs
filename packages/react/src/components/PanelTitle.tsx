export interface PanelTitleProps {
  title?: string;
  color?: string;
  accent?: string;
}

export function PanelTitle({ title = "PANEL", color = "var(--fg-dim)", accent = "var(--accent)" }: PanelTitleProps) {
  return (
    <div style={{ fontFamily: "monospace", fontSize: "10px", color, display: "flex", alignItems: "center", gap: "6px", userSelect: "none" }}>
      <span style={{ flex: 1, height: "1px", background: color, opacity: 0.4 }} />
      <span style={{ color: accent, letterSpacing: "0.15em" }}>{title}</span>
      <span style={{ flex: 1, height: "1px", background: color, opacity: 0.4 }} />
    </div>
  );
}
