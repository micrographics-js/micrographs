<script lang="ts">
const ZONE_COLORS = ["var(--accent)", "var(--accent-amber)", "var(--accent-red)", "var(--fg-dim)", "var(--accent)"];
let { sector = "A7", zone = 3, color }: { sector?: string; zone?: number; color?: string } = $props();
const zoneColor = $derived(color ?? ZONE_COLORS[zone % ZONE_COLORS.length]);
const label = $derived(`SEC\u00b7${sector.toUpperCase()}\u00b7Z${String(zone).padStart(2, "0")}`);
</script>
<span style="font-family:monospace; font-size:9px; color:{zoneColor}; padding:1px 5px; border:1px solid {zoneColor}; letter-spacing:0.1em; display:inline-block; opacity:0.9">{label}</span>
