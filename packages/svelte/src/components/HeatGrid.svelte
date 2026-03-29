<script lang="ts">
import { createTicker } from "@micrographics-js/core";
let { cols = 8, rows = 4, cellSize = 6, speed = 120 } = $props();
const total = $derived(cols * rows);
let tick = $state(0);
let values = $state(Array.from({ length: cols * rows }, (_, i) => 0.2 + (i % 5) * 0.15));
$effect(() => { return createTicker(speed, () => { tick++; }); });
$effect(() => {
  void tick;
  values = values.map((v, i) => {
    const target = 0.1 + Math.abs(Math.sin(tick * 0.05 + i * 0.7)) * 0.9;
    return v + (target - v) * 0.12;
  });
});
const gap = 1;
const w = $derived(cols * cellSize + (cols - 1) * gap);
const h = $derived(rows * cellSize + (rows - 1) * gap);
function colorForValue(v: number) {
  if (v < 0.66) return "var(--accent-amber)";
  return "var(--accent-red)";
}
</script>
<svg width={w} height={h} style="display:block" shape-rendering="crispEdges">
  {#each values as v, i}
    {@const col = i % cols}
    {@const row = Math.floor(i / cols)}
    <rect x={col * (cellSize + gap)} y={row * (cellSize + gap)} width={cellSize} height={cellSize} fill={colorForValue(v)} opacity={0.15 + v * 0.85} />
  {/each}
</svg>
