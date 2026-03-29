<script lang="ts">
import { pixelDiamondPath } from "@micrographics-js/core";
let { size = 2, color = "var(--accent)", glow = true } = $props();
const margin = $derived(size * 4);
const svgSize = $derived(size * 6 + margin * 2);
const cx = $derived(svgSize / 2);
const cy = $derived(svgSize / 2);
const dPath = $derived(pixelDiamondPath(cx, cy, size));
</script>
<svg width={svgSize} height={svgSize} style="display:block" shape-rendering="crispEdges">
  {#if glow}
    <defs>
      <filter id="diamond-glow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
  {/if}
  <path d={dPath} fill={color} filter={glow ? "url(#diamond-glow)" : undefined} />
</svg>
