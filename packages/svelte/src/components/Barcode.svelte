<script lang="ts">
import { seeded } from "@micrographics/core";
let { seed = 42, width = 60, height = 20, color = "var(--fg-dim)" } = $props();
const bars = $derived(Array.from({ length: Math.floor(width / 2) }, (_, i) => ({
  x: i * 2,
  w: seeded(seed + i) > 0.5 ? 2 : 1,
  h: Math.round(height * (0.6 + seeded(seed + i + 100) * 0.4)),
})));
</script>
<svg {width} {height} style="display:block" shape-rendering="crispEdges">
  {#each bars as b}
    <rect x={b.x} y={height - b.h} width={b.w} height={b.h} fill={color} />
  {/each}
</svg>
