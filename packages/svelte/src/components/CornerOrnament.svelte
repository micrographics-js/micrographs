<script lang="ts">
let { corner = "tl" as "tl" | "tr" | "bl" | "br", size = 16, color = "var(--fg-dimmer)", thickness = 1.5 } = $props();

type Line = { x1: number; y1: number; x2: number; y2: number };
const lines = $derived<Line[]>((() => {
  const s = size;
  if (corner === "tl") return [{ x1: 0, y1: s, x2: 0, y2: 0 }, { x1: 0, y1: 0, x2: s, y2: 0 }];
  if (corner === "tr") return [{ x1: 0, y1: 0, x2: s, y2: 0 }, { x1: s, y1: 0, x2: s, y2: s }];
  if (corner === "bl") return [{ x1: 0, y1: 0, x2: 0, y2: s }, { x1: 0, y1: s, x2: s, y2: s }];
  return [{ x1: s, y1: 0, x2: s, y2: s }, { x1: 0, y1: s, x2: s, y2: s }];
})());
</script>
<svg width={size + thickness} height={size + thickness} style="display:block" shape-rendering="crispEdges">
  {#each lines as l}
    <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={color} stroke-width={thickness} />
  {/each}
</svg>
