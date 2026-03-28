<script lang="ts">
import { createTicker } from "@micrographics/core";
let { bars = 5, color = "var(--accent)", speed = 180, width = 40, height = 24 } = $props();
let tick = $state(0);
$effect(() => { return createTicker(speed, () => { tick++; }); });
function barH(i: number) {
  const phase = (tick / 8 + i * 0.4) % (Math.PI * 2);
  return Math.max(2, Math.round(((Math.sin(phase) + 1) / 2) * height));
}
const barW = $derived(Math.floor(width / bars) - 1);
</script>
<svg {width} {height} style="display:block" shape-rendering="crispEdges">
  {#each Array.from({length: bars}, (_, i) => i) as i}
    <rect x={i * (barW + 1)} y={height - barH(i)} width={barW} height={barH(i)} fill={color} opacity={0.7 + 0.3 * ((i+1)/bars)} />
  {/each}
</svg>
