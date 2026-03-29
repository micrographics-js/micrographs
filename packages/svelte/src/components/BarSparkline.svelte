<script lang="ts">
import { createTicker, seeded } from "@micrographics-js/core";
let { bars = 12, color = "var(--accent)", height = 32, speed = 200, seed = 7 } = $props();
let values = $state(Array.from({length:bars}, (_,i) => seeded(seed+i)));
$effect(() => { return createTicker(speed, () => { values = [...values.slice(1), Math.random()]; }); });
const svgW = $derived(bars*4-1);
</script>
<svg width={svgW} {height} style="display:block" shape-rendering="crispEdges">
  {#each values as v, i}
    <rect x={i*4} y={height-Math.max(1,Math.round(v*height))} width="3" height={Math.max(1,Math.round(v*height))} fill={color}/>
  {/each}
</svg>
