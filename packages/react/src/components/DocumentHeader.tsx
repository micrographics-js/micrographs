"use client";

export interface DocumentHeaderProps {
  classification?: string;
  docId?: string;
  date?: string;
  department?: string;
  color?: string;
}

export function DocumentHeader({
  classification = "TOP SECRET",
  docId = "DOC-7291-ALPHA",
  date = "1963-11-22",
  department = "DIRECTORATE OF OPERATIONS",
  color = "var(--accent-red)",
}: DocumentHeaderProps) {
  return (
    <div
      style={{
        fontFamily: "monospace",
        display: "inline-flex",
        alignItems: "center",
        gap: "0",
        border: `1px solid var(--border)`,
        userSelect: "none",
      }}
    >
      {/* Classification */}
      <span
        style={{
          fontSize: "9px",
          fontWeight: "bold",
          color,
          padding: "3px 8px",
          borderRight: "1px solid var(--border)",
          letterSpacing: "0.1em",
          background: "var(--bg-secondary)",
        }}
      >
        {classification}
      </span>
      {/* Doc ID */}
      <span
        style={{
          fontSize: "8px",
          color: "var(--fg-dim)",
          padding: "3px 8px",
          borderRight: "1px solid var(--border)",
          letterSpacing: "0.06em",
        }}
      >
        {docId}
      </span>
      {/* Date */}
      <span
        style={{
          fontSize: "8px",
          color: "var(--fg-dimmer)",
          padding: "3px 8px",
          borderRight: "1px solid var(--border)",
          letterSpacing: "0.06em",
        }}
      >
        {date}
      </span>
      {/* Department */}
      <span
        style={{
          fontSize: "8px",
          color: "var(--fg-dimmer)",
          padding: "3px 8px",
          letterSpacing: "0.06em",
        }}
      >
        {department}
      </span>
    </div>
  );
}
