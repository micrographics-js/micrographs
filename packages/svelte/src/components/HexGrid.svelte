<script lang="ts">
import { createTicker } from "@micrographics/core";
let { cols = 5, rows = 3, size = 10, color = "var(--accent)", animated = true, speed = 300 } = $props();
const total = $derived(cols * rows);
let tick = $state(0);
let opacities = $state(Array.from({ length: cols * rows }, (_, i) => 0.15 + (i % 4) * 0.08));
$effect(() => {
  if (!animated) return;
  return createTicker(speed, () => { tick++; });
});
$effect(() => {
  if (!animated) return;
  void tick;
  opacities = opacities.map((v, i) => {
    const target = 0.1 + Math.abs(Math.sin(tick * 0.15 + i * 1.1)) * 0.75;
    return v + (target - v) * 0.2;
  });
});
const r = $derived(size);
const hexW = $derived(r * Math.sqrt(3));
const hexH = $derived(r * 2);
const colSpacing = $derived(hexW);
const rowSpacing = $derived(hexH * 0.75);
const svgW = $derived(cols * colSpacing + hexW * 0.5 + 2);
const svgH = $derived(rows * rowSpacing + hexH * 0.25 + 2);
function hexPoints(cx: number, cy: number, hr: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (i * 60 - 30) * (Math.PI / 180);
    return `${cx + hr * Math.cos(a)},${cy + hr * Math.sin(a)}`;
  }).join(" ");
}
</script>
<svg width={svgW} height={svgH} style="display:block">
  {#each Array.from({ length: rows }) as _, row}
    {#each Array.from({ length: cols }) as _, col}
      {@const idx = row * cols + col}
      {@const offsetX = row % 2 === 1 ? hexW / 2 : 0}
      {@const cx = col * colSpacing + hexW / 2 + offsetX + 1}
      {@const cy = row * rowSpacing + hexH / 2 + 1}
      <polygon points={hexPoints(cx, cy, r - 1)} fill={color} stroke={color} stroke-width="0.5" fill-opacity={opacities[idx] ?? 0.15} stroke-opacity="0.3" />
    {/each}
  {/each}
</svg>
