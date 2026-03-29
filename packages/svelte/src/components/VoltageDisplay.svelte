<script lang="ts">
let { voltage = 5, min = 0, max = 12, width = 16, height = 40, unit = "V" } = $props();
const pct = $derived(Math.max(0, Math.min(1, (voltage - min) / (max - min))));
const segments = 8;
const segH = $derived(Math.floor((height - 14) / segments) - 1);
const filled = $derived(Math.round(pct * segments));
function segY(i: number) { return height - 14 - (i + 1) * (segH + 1); }
function segColor(i: number) {
  const ratio = i / segments;
  if (ratio > 0.75) return "var(--accent-red)";
  if (ratio > 0.5) return "var(--accent-amber)";
  return "var(--accent)";
}
</script>
<svg {width} {height} style="display:block" shape-rendering="crispEdges">
  <rect x="0" y="0" {width} height={height - 10} fill="var(--bg-secondary)" stroke="var(--border)" stroke-width="1" />
  {#each Array.from({ length: segments }) as _, i}
    <rect x="2" y={segY(i)} width={width - 4} height={segH} fill={i < filled ? segColor(i) : "var(--fg-dimmer)"} opacity={i < filled ? 0.9 : 0.15} />
  {/each}
  <text x={width / 2} y={height - 1} text-anchor="middle" fill="var(--fg-dim)" font-size="7" font-family="monospace">{voltage}{unit}</text>
</svg>
