<script lang="ts">
import { createTicker } from "@micrographics-js/core";
let { level = 0.75, charging = false, width = 28, height = 14 } = $props();
let animLevel = $state(charging ? 0 : level);
$effect(() => {
  if (!charging) { animLevel = level; return; }
  return createTicker(400, () => { animLevel = (animLevel + 0.2) % 1.2; });
});
const segments = 5;
const bodyW = $derived(width - 4);
const segW = $derived(Math.floor((bodyW - segments + 1) / segments));
const filled = $derived(Math.round(Math.min(animLevel, 1) * segments));
const color = $derived(level < 0.2 ? "var(--accent-red)" : level < 0.4 ? "var(--accent-amber)" : "var(--accent)");
</script>
<svg {width} {height} style="display:block" shape-rendering="crispEdges">
  <rect x="0" y="1" width={bodyW} height={height-2} fill="none" stroke="var(--fg-dim)" stroke-width="1"/>
  <rect x={bodyW} y={Math.floor(height/4)} width="4" height={Math.floor(height/2)} fill="var(--fg-dim)"/>
  {#each Array.from({length:segments},(_,i)=>i) as i}
    <rect x={2+i*(segW+1)} y="3" width={segW} height={height-6}
      fill={i < filled ? color : "none"} stroke={i < filled ? "none" : "var(--fg-dimmer)"} stroke-width="0.5"/>
  {/each}
</svg>
