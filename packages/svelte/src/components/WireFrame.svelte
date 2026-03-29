<script lang="ts">
import { createTicker } from "@micrographics/core";
let { width = 40, height = 30, color = "var(--accent)", depth = 15, animated = false } = $props();
let angle = $state(0);
$effect(() => {
  if (!animated) return;
  return createTicker(60, () => { angle = (angle + 1) % 360; });
});
function isoProject(x: number, y: number, z: number) {
  const rad = (angle * Math.PI) / 180;
  const rx = x * Math.cos(rad) - z * Math.sin(rad);
  const rz = x * Math.sin(rad) + z * Math.cos(rad);
  return { px: rx - rz * 0.5, py: -y + rz * 0.25 };
}
const svgW = $derived(width + depth + 20);
const svgH = $derived(height + depth * 0.5 + 20);
const ox = $derived(svgW / 2);
const oy = $derived(svgH * 0.6);
const hw = $derived(width / 2);
const hh = $derived(height / 2);
const hd = $derived(depth / 2);
const corners = $derived<[number, number, number][]>([
  [-hw, -hh, -hd], [hw, -hh, -hd], [hw, hh, -hd], [-hw, hh, -hd],
  [-hw, -hh,  hd], [hw, -hh,  hd], [hw, hh,  hd], [-hw, hh,  hd],
]);
const edges: [number, number][] = [
  [0,1],[1,2],[2,3],[3,0],
  [4,5],[5,6],[6,7],[7,4],
  [0,4],[1,5],[2,6],[3,7],
];
const projected = $derived(corners.map(([x, y, z]) => {
  const { px, py } = isoProject(x, y, z);
  return [ox + px, oy + py];
}));
</script>
<svg width={svgW} height={svgH} style="display:block">
  {#each edges as [a, b], i}
    {@const isFront = a >= 4 || b >= 4}
    <line x1={projected[a][0]} y1={projected[a][1]} x2={projected[b][0]} y2={projected[b][1]} stroke={color} stroke-width={isFront ? 1.5 : 0.75} opacity={isFront ? 0.85 : 0.4} stroke-dasharray={isFront ? undefined : "3 2"} />
  {/each}
  {#each projected as [px, py]}
    <circle cx={px} cy={py} r="1" fill={color} opacity="0.6" />
  {/each}
</svg>
