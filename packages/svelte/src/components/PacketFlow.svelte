<script lang="ts">
import { createTicker } from "@micrographics/core";
let { width = 80, height = 12, color = "var(--accent)", packets = 4, speed = 40 } = $props();
let pkts = $state(
  Array.from({ length: packets }, (_, i) => ({
    id: i,
    x: (i / packets) * width,
    size: 4 + Math.floor(i % 3) * 2,
  }))
);
$effect(() => {
  return createTicker(speed, () => {
    pkts = pkts.map(p => ({ ...p, x: (p.x + 2) % (width + p.size + 4) }));
  });
});
const mid = $derived(height / 2);
</script>
<svg {width} {height} style="display:block" shape-rendering="crispEdges">
  <line x1="0" y1={mid} x2={width} y2={mid} stroke="var(--fg-dimmer)" stroke-width="1" />
  {#each pkts as p (p.id)}
    <rect x={p.x - p.size / 2} y={mid - 2} width={p.size} height="4" fill={color} opacity="0.85" />
  {/each}
</svg>
