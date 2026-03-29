<script lang="ts">
let { width = 120, height = 16, color = "var(--fg-dim)", divisions = 10, showLabels = true } = $props();
const majorH = $derived(Math.floor(height * 0.65));
const minorH = $derived(Math.floor(height * 0.35));
const subdivisions = 5;
const totalTicks = $derived(divisions * subdivisions);
const tickSpacing = $derived((width - 1) / totalTicks);
</script>
<svg {width} {height} style="display:block" shape-rendering="crispEdges">
  <line x1="0" y1="0" x2={width} y2="0" stroke={color} stroke-width="1" />
  {#each Array.from({ length: totalTicks + 1 }) as _, i}
    {@const x = Math.round(i * tickSpacing)}
    {@const isMajor = i % subdivisions === 0}
    {@const tickH = isMajor ? majorH : minorH}
    <line x1={x} y1="0" x2={x} y2={tickH} stroke={color} stroke-width={isMajor ? 1 : 0.5} />
    {#if showLabels && isMajor}
      <text {x} y={height - 1} text-anchor="middle" fill={color} font-size="6" font-family="monospace" opacity="0.7">{i / subdivisions}</text>
    {/if}
  {/each}
</svg>
