<script lang="ts">
let { segments = 12, color = "var(--accent)", duration = 1200, width = 96, height = 8 } = $props();
let filled = $state(0);
$effect(() => {
  filled = 0; let i = 0;
  const step = duration / segments;
  const id = setInterval(() => { i++; filled = i; if (i >= segments) clearInterval(id); }, step);
  return () => clearInterval(id);
});
const segW = $derived(Math.floor(width / segments) - 1);
</script>
<svg {width} {height} style="display:block" shape-rendering="crispEdges">
  {#each Array.from({length:segments}, (_,i) => i) as i}
    <rect x={i*(segW+1)} y="0" width={segW} {height}
      fill={i < filled ? color : "var(--fg-dimmer)"} opacity={i < filled ? 1 : 0.2} />
  {/each}
</svg>
