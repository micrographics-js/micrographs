<script lang="ts">
import { createTicker, seeded } from "@micrographics/core";
let { width = 9, seed = 42, color = "var(--accent)", height = 32, speed = 180 } = $props();
let values = $state(Array.from({length:width}, (_,i) => seeded(seed+i)));
$effect(() => { return createTicker(speed, () => { values = [...values.slice(1), Math.random()]; }); });
const svgW = $derived(width*5-2);
</script>
<svg width={svgW} {height} style="display:block" shape-rendering="crispEdges">
  {#each values as v, i}
    <rect x={i*5} y={Math.round((1-v)*(height-3))} width="3" height="3" fill={color}/>
  {/each}
</svg>
