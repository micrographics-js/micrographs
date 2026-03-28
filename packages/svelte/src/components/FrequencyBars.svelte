<script lang="ts">
import { createTicker } from "@micrographics/core";
let { bars = 8, color = "var(--accent)", height = 32, speed = 80 } = $props();
let tick = $state(0);
$effect(() => { return createTicker(speed, () => { tick++; }); });
const svgW = $derived(bars*6-2);
function barH(i: number) { return Math.max(2, Math.round(((Math.sin((tick/10+i*0.7)%(Math.PI*2))+1)/2)*height)); }
</script>
<svg width={svgW} {height} style="display:block" shape-rendering="crispEdges">
  {#each Array.from({length:bars},(_,i)=>i) as i}
    <rect x={i*6} y={height-barH(i)} width="4" height={barH(i)} fill={color}/>
  {/each}
</svg>
