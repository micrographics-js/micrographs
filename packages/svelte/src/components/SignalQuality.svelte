<script lang="ts">
let { quality = 3, width = 24, height = 16, color = "var(--accent)" } = $props();
const bars = 5;
const barW = $derived(Math.floor((width - (bars - 1) * 2) / bars));
const clampedQ = $derived(Math.max(0, Math.min(bars, quality)));
</script>
<svg {width} {height} style="display:block" shape-rendering="crispEdges">
  {#each Array.from({ length: bars }) as _, i}
    {@const barH = Math.round(height * (0.2 + (i / (bars - 1)) * 0.8))}
    {@const x = i * (barW + 2)}
    {@const y = height - barH}
    {@const active = i < clampedQ}
    <rect {x} {y} width={barW} height={barH} fill={active ? color : "var(--fg-dimmer)"} opacity={active ? 0.9 : 0.2} />
  {/each}
</svg>
