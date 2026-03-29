<script lang="ts">
import { createTicker } from "@micrographics-js/core";
let { color = "var(--accent)", speed = 80, height = 40 } = $props();
let levels = $state([0.7, 0.5]);
$effect(() => {
  return createTicker(speed, () => {
    levels = levels.map(v => Math.max(0.05, Math.min(1, v + (Math.random() - 0.5) * 0.25)));
  });
});
const segments = 8;
const barW = 8;
const gap = 2;
const svgW = $derived(2 * barW + gap + 4);
const segH = $derived(Math.floor(height / segments) - 1);
</script>
<svg width={svgW} {height} style="display:block" shape-rendering="crispEdges">
  {#each levels as lv, col}
    {@const filled = Math.round(lv * segments)}
    {#each Array.from({ length: segments }, (_, i) => i) as i}
      {@const seg = segments - 1 - i}
      {@const x = col * (barW + gap + 2)}
      {@const y = i * (segH + 1)}
      {@const active = seg < filled}
      {@const segColor = seg >= segments - 2 ? "var(--accent-red)" : seg >= segments - 4 ? "var(--accent-amber)" : color}
      <rect {x} {y} width={barW} height={segH} fill={active ? segColor : "var(--fg-dimmer)"} opacity={active ? 1 : 0.2} />
    {/each}
  {/each}
</svg>
