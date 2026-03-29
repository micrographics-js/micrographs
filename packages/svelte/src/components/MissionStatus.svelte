<script lang="ts">
let { mission = "MSN-001", status = "active", phase = 2, total = 5, color = "var(--accent)" }: { mission?: string; status?: "active" | "standby" | "complete" | "failed"; phase?: number; total?: number; color?: string } = $props();
const STATUS_COLORS: Record<string, string> = {
  active: "var(--accent)",
  standby: "var(--accent-amber)",
  complete: "var(--accent)",
  failed: "var(--accent-red)",
};
const STATUS_LABELS: Record<string, string> = {
  active: "ACTIVE",
  standby: "STANDBY",
  complete: "COMPLETE",
  failed: "FAILED",
};
const statusColor = $derived(STATUS_COLORS[status] ?? color);
const statusLabel = $derived(STATUS_LABELS[status] ?? status.toUpperCase());
const barW = 80;
</script>
<div style="display:inline-flex; flex-direction:column; gap:4px; font-family:monospace">
  <div style="display:flex; gap:6px; align-items:center">
    <span style="font-size:10px; color:var(--fg-dim); letter-spacing:0.06em">{mission}</span>
    <span style="font-size:8px; color:{statusColor}; padding:1px 4px; border:1px solid {statusColor}; letter-spacing:0.08em">{statusLabel}</span>
  </div>
  <div style="display:flex; align-items:center; gap:4px">
    <span style="font-size:8px; color:var(--fg-dimmer)">PH</span>
    <svg width={barW} height="6" style="display:block" shape-rendering="crispEdges">
      {#each Array.from({ length: total }) as _, i}
        {@const segW = Math.floor((barW - (total - 1)) / total)}
        <rect x={i * (segW + 1)} y="0" width={segW} height="6" fill={i < phase ? statusColor : "var(--fg-dimmer)"} opacity={i < phase ? 0.85 : 0.2} />
      {/each}
    </svg>
    <span style="font-size:8px; color:var(--fg-dim)">{phase}/{total}</span>
  </div>
</div>
