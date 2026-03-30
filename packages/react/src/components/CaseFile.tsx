"use client";

export interface CaseFileProps {
  caseId?: string;
  subject?: string;
  status?: "open" | "closed" | "classified";
  priority?: "low" | "medium" | "high" | "critical";
  color?: string;
}

const STATUS_COLORS: Record<string, string> = {
  open: "var(--accent)",
  closed: "var(--fg-dim)",
  classified: "var(--accent-red)",
};

const PRIORITY_COLORS: Record<string, string> = {
  low: "var(--fg-dimmer)",
  medium: "var(--accent-amber)",
  high: "var(--accent-red)",
  critical: "var(--accent-red)",
};

const PRIORITY_LABELS: Record<string, string> = {
  low: "LOW",
  medium: "MED",
  high: "HIGH",
  critical: "CRIT",
};

export function CaseFile({
  caseId = "CF-2891-DELTA",
  subject = "ASSET NIGHTINGALE",
  status = "open",
  priority = "high",
  color = "var(--fg)",
}: CaseFileProps) {
  const statusColor = STATUS_COLORS[status] ?? color;
  const priorityColor = PRIORITY_COLORS[priority] ?? color;
  const priorityLabel = PRIORITY_LABELS[priority] ?? priority.toUpperCase();

  return (
    <div
      style={{
        fontFamily: "monospace",
        display: "inline-flex",
        flexDirection: "column",
        border: `1px solid var(--border)`,
        minWidth: 200,
        userSelect: "none",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "4px 8px",
          borderBottom: "1px solid var(--border)",
          background: "var(--bg-secondary)",
        }}
      >
        <span style={{ fontSize: "9px", color: "var(--fg-dim)", letterSpacing: "0.08em" }}>
          {caseId}
        </span>
        <span
          style={{
            fontSize: "7px",
            color: priorityColor,
            border: `1px solid ${priorityColor}`,
            padding: "1px 4px",
            letterSpacing: "0.1em",
            fontWeight: "bold",
          }}
        >
          {priorityLabel}
        </span>
      </div>
      {/* Subject */}
      <div style={{ padding: "6px 8px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ fontSize: "7px", color: "var(--fg-dimmer)", letterSpacing: "0.1em", marginBottom: 2 }}>
          SUBJECT
        </div>
        <div style={{ fontSize: "10px", color, letterSpacing: "0.04em" }}>
          {subject}
        </div>
      </div>
      {/* Status */}
      <div style={{ padding: "4px 8px", display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: "7px", color: "var(--fg-dimmer)", letterSpacing: "0.1em" }}>STATUS</span>
        <span
          style={{
            fontSize: "8px",
            color: statusColor,
            fontWeight: "bold",
            letterSpacing: "0.1em",
          }}
        >
          {status.toUpperCase()}
        </span>
        <svg width={6} height={6} shapeRendering="crispEdges" style={{ marginLeft: "auto" }}>
          <rect x={0} y={0} width={6} height={6} fill={statusColor} opacity={0.8} />
        </svg>
      </div>
    </div>
  );
}
