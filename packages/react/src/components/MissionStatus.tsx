"use client";

export interface MissionStatusProps {
  mission?: string;
  status?: "active" | "standby" | "complete" | "failed";
  phase?: number;
  total?: number;
  color?: string;
}

const STATUS_COLORS: Record<string, string> = {
  active:   "var(--accent)",
  standby:  "var(--accent-amber)",
  complete: "var(--accent)",
  failed:   "var(--accent-red)",
};

const STATUS_LABELS: Record<string, string> = {
  active:   "ACTIVE",
  standby:  "STANDBY",
  complete: "COMPLETE",
  failed:   "FAILED",
};

export function MissionStatus({ mission = "MSN-001", status = "active", phase = 2, total = 5, color = "var(--accent)" }: MissionStatusProps) {
  const statusColor = STATUS_COLORS[status] ?? color;
  const statusLabel = STATUS_LABELS[status] ?? status.toUpperCase();
  const pct = total > 0 ? phase / total : 0;
  const barW = 80;
  const filled = Math.round(pct * barW);

  return (
    <div style={{ display: "inline-flex", flexDirection: "column", gap: "4px", fontFamily: "monospace" }}>
      {/* Header row */}
      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
        <span style={{ fontSize: "10px", color: "var(--fg-dim)", letterSpacing: "0.06em" }}>{mission}</span>
        <span style={{
          fontSize: "8px",
          color: statusColor,
          padding: "1px 4px",
          border: `1px solid ${statusColor}`,
          letterSpacing: "0.08em",
        }}>
          {statusLabel}
        </span>
      </div>
      {/* Phase bar */}
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <span style={{ fontSize: "8px", color: "var(--fg-dimmer)" }}>PH</span>
        <svg width={barW} height={6} style={{ display: "block" }} shapeRendering="crispEdges">
          {Array.from({ length: total }, (_, i) => {
            const segW = Math.floor((barW - (total - 1)) / total);
            return (
              <rect
                key={i}
                x={i * (segW + 1)}
                y={0}
                width={segW}
                height={6}
                fill={i < phase ? statusColor : "var(--fg-dimmer)"}
                opacity={i < phase ? 0.85 : 0.2}
              />
            );
          })}
        </svg>
        <span style={{ fontSize: "8px", color: "var(--fg-dim)" }}>{phase}/{total}</span>
      </div>
    </div>
  );
}
