<script lang="ts">
let { value = 65, min = 0, max = 100, width = 12, height = 60, unit = "\u00b0C", color = "var(--accent)" } = $props();
const pct = $derived(Math.max(0, Math.min(1, (value - min) / (max - min))));
const barH = $derived(height - 18);
const filled = $derived(Math.round(pct * barH));
const barY = $derived(barH - filled);
const gradId = $derived(`temp-grad-${height}`);
const activeColor = $derived(value > max * 0.75 ? "var(--accent-red)" : value > max * 0.5 ? "var(--accent-amber)" : color);
const tickMarks = [0, 0.25, 0.5, 0.75, 1];
</script>
<svg {width} {height} style="display:block" shape-rendering="crispEdges">
  <defs>
    <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="var(--accent-red)" />
      <stop offset="50%" stop-color="var(--accent-amber)" />
      <stop offset="100%" stop-color={color} />
    </linearGradient>
  </defs>
  <circle cx={width / 2} cy={barH + 6} r="5" fill={activeColor} />
  <rect x={width / 2 - 3} y="0" width="6" height={barH + 3} fill="var(--bg-secondary)" stroke="var(--border)" stroke-width="1" />
  {#if filled > 0}
    <rect x={width / 2 - 2} y={barY + 1} width="4" height={filled + 2} fill="url(#{gradId})" />
  {/if}
  {#each tickMarks as t}
    <line x1={width / 2 + 3} y1={barH * (1 - t)} x2={width / 2 + 5} y2={barH * (1 - t)} stroke="var(--fg-dimmer)" stroke-width="1" />
  {/each}
  <text x={width / 2} y={height - 1} text-anchor="middle" fill="var(--fg-dim)" font-size="7" font-family="monospace">{value}{unit}</text>
</svg>
