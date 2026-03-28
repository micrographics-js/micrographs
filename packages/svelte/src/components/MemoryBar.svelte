<script lang="ts">
let { used = 6.4, total = 16, unit = "GB", segments = 10, color = "var(--accent)", width = 80, height = 8 } = $props();
const pct = $derived(used / total);
const filled = $derived(Math.round(pct * segments));
const segW = $derived(Math.floor(width / segments) - 1);
const barColor = $derived(pct > 0.85 ? "var(--accent-red)" : pct > 0.65 ? "var(--accent-amber)" : color);
</script>
<div style="display:flex; flex-direction:column; gap:2px">
  <svg {width} {height} style="display:block" shape-rendering="crispEdges">
    {#each Array.from({length:segments},(_,i)=>i) as i}
      <rect x={i*(segW+1)} y="0" width={segW} {height}
        fill={i < filled ? barColor : "var(--fg-dimmer)"} opacity={i < filled ? 1 : 0.2}/>
    {/each}
  </svg>
  <span style="font-family:monospace; font-size:9px; color:var(--fg-dimmer)">{used}{unit} / {total}{unit}</span>
</div>
