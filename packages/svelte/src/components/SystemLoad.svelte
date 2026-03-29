<script lang="ts">
import { createTicker } from "@micrographics/core";
let { cores = 4, width = 60, height = 20, color = "var(--accent)", speed = 200 } = $props();
let loads = $state(Array.from({ length: cores }, (_, i) => 0.3 + i * 0.1));
$effect(() => {
  return createTicker(speed, () => {
    loads = loads.map(v => {
      const delta = (Math.random() - 0.5) * 0.15;
      return Math.max(0.05, Math.min(0.98, v + delta));
    });
  });
});
const barH = $derived(Math.floor((height - (cores - 1) * 1) / cores));
</script>
<svg {width} {height} style="display:block" shape-rendering="crispEdges">
  {#each loads as v, i}
    {@const y = i * (barH + 1)}
    {@const filled = Math.round(v * width)}
    {@const barColor = v > 0.8 ? "var(--accent-red)" : v > 0.6 ? "var(--accent-amber)" : color}
    <rect x="0" {y} {width} height={barH} fill="var(--bg-secondary)" />
    <rect x="0" {y} width={filled} height={barH} fill={barColor} opacity="0.85" />
    <text x="2" y={y + barH - 1} fill="var(--bg)" font-size="5" font-family="monospace">C{i}</text>
  {/each}
</svg>
