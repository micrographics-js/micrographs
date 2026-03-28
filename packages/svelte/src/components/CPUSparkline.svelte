<script lang="ts">
import { createTicker } from "@micrographics/core";
let { color = "var(--accent)", speed = 500, bars = 16, height = 24 } = $props();
let values = $state(Array.from({length:bars}, () => Math.random()*0.8+0.1));
$effect(() => {
  return createTicker(speed, () => {
    values = [...values.slice(1), Math.max(0.05, Math.min(1, values[values.length-1]+(Math.random()-0.5)*0.4))];
  });
});
const svgW = $derived(bars*4-1);
const last = $derived(Math.round((values[values.length-1]??0)*100));
const barColor = (v: number) => v > 0.8 ? "var(--accent-red)" : v > 0.6 ? "var(--accent-amber)" : color;
</script>
<div style="display:flex; flex-direction:column; gap:2px">
  <span style="font-family:monospace; font-size:9px; color:var(--fg-dimmer)">CPU {last}%</span>
  <svg width={svgW} {height} style="display:block" shape-rendering="crispEdges">
    {#each values as v, i}
      <rect x={i*4} y={height-Math.max(1,Math.round(v*height))} width="3" height={Math.max(1,Math.round(v*height))} fill={barColor(v)}/>
    {/each}
  </svg>
</div>
