<script lang="ts">
import { createTicker } from "@micrographics/core";
let { level = 0.6, color = "var(--accent)", width = 24, height = 48, label = "FUEL", animated = true } = $props();
let wave = $state(0);
$effect(() => {
  if (!animated) return;
  return createTicker(100, () => { wave = wave + 0.1; });
});
const fillH = $derived(Math.round(level * (height - 4)));
const waveOffset = $derived(Math.sin(wave) * 2);
</script>
<div style="display:inline-flex; flex-direction:column; align-items:center; gap:2px">
  <svg {width} {height} style="display:block" shape-rendering="crispEdges">
    <rect x="1" y="1" width={width - 2} height={height - 2} fill="none" stroke="var(--fg-dim)" stroke-width="1" />
    <rect x="2" y={height - 2 - fillH + waveOffset} width={width - 4} height={fillH} fill={color} opacity="0.8" />
  </svg>
  <span style="font-family:monospace; font-size:8px; color:var(--fg-dimmer)">{label}</span>
</div>
