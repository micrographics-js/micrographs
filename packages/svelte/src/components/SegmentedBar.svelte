<script lang="ts">
let { value = 60, segments = 10, width = 80, height = 8, color = "var(--accent)", showLabel = false } = $props();
const filled = $derived(Math.round((value / 100) * segments));
const segW = $derived(Math.floor((width - (segments - 1)) / segments));
const totalW = $derived(segments * segW + (segments - 1));
</script>
<div style="display:inline-flex; flex-direction:column; gap:2px">
  <svg width={totalW} {height} style="display:block" shape-rendering="crispEdges">
    {#each Array.from({ length: segments }) as _, i}
      <rect x={i * (segW + 1)} y="0" width={segW} {height} fill={i < filled ? color : "var(--fg-dimmer)"} opacity={i < filled ? 0.9 : 0.2} />
    {/each}
  </svg>
  {#if showLabel}
    <span style="font-family:monospace; font-size:8px; color:var(--fg-dim); text-align:right">{value}%</span>
  {/if}
</div>
