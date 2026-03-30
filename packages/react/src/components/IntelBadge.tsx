"use client";

export interface IntelBadgeProps {
  agency?: string;
  clearance?: string;
  holder?: string;
  color?: string;
}

export function IntelBadge({
  agency = "CIA",
  clearance = "TS/SCI",
  holder = "JOHN \u2588\u2588\u2588\u2588\u2588\u2588",
  color = "var(--accent)",
}: IntelBadgeProps) {
  return (
    <div
      style={{
        fontFamily: "monospace",
        display: "inline-flex",
        flexDirection: "column",
        border: `1px solid var(--border)`,
        minWidth: 160,
        userSelect: "none",
        overflow: "hidden",
      }}
    >
      {/* Accent stripe */}
      <div style={{ height: 3, background: color }} />
      {/* Agency */}
      <div
        style={{
          padding: "6px 10px 2px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <span
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            color,
            letterSpacing: "0.15em",
          }}
        >
          {agency}
        </span>
        <span
          style={{
            fontSize: "7px",
            color: "var(--fg-dimmer)",
            letterSpacing: "0.08em",
          }}
        >
          ID BADGE
        </span>
      </div>
      {/* Clearance */}
      <div style={{ padding: "2px 10px" }}>
        <span style={{ fontSize: "7px", color: "var(--fg-dimmer)", letterSpacing: "0.1em" }}>
          CLEARANCE{" "}
        </span>
        <span
          style={{
            fontSize: "9px",
            color: "var(--accent-amber)",
            fontWeight: "bold",
            letterSpacing: "0.08em",
          }}
        >
          {clearance}
        </span>
      </div>
      {/* Holder */}
      <div
        style={{
          padding: "4px 10px 6px",
          borderTop: "1px solid var(--border)",
          marginTop: 4,
        }}
      >
        <div style={{ fontSize: "7px", color: "var(--fg-dimmer)", letterSpacing: "0.1em", marginBottom: 1 }}>
          HOLDER
        </div>
        <div style={{ fontSize: "10px", color: "var(--fg)", letterSpacing: "0.04em" }}>
          {holder}
        </div>
      </div>
    </div>
  );
}
