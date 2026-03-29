<script lang="ts">
import { createTicker } from "@micrographics-js/core";
let { width = 80, height = 4, color = "var(--accent)", speed = 50 } = $props();
let pos = $state(0);
$effect(() => { return createTicker(speed, () => { pos = (pos + 1) % (width + 20); }); });
const beamW = 16;
const gradId = $derived(`sb-grad-${width}-${height}`);
const clipPath = $derived(`inset(0 ${Math.max(0, pos - width)}px 0 ${Math.max(0, -pos + beamW)}px)`);
</script>
<svg {width} {height} style="display:block" shape-rendering="crispEdges">
  <defs>
    <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color={color} stop-opacity="0" />
      <stop offset="40%" stop-color={color} stop-opacity="0.4" />
      <stop offset="100%" stop-color={color} stop-opacity="1" />
    </linearGradient>
  </defs>
  <rect x="0" y="0" {width} {height} fill="var(--bg-secondary)" />
  <rect x={pos - beamW} y="0" width={beamW} {height} fill="url(#{gradId})" clip-path={clipPath} />
  <rect x={Math.min(pos, width - 1)} y="0" width="1" {height} fill={color} opacity="0.9" />
</svg>
