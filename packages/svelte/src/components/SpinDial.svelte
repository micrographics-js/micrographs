<script lang="ts">
import { createTicker } from "@micrographics-js/core";
let { done = false, color = "var(--accent)", size = 16 } = $props();
let angle = $state(0);
$effect(() => {
  if (done) return;
  return createTicker(40, () => { angle = (angle + 18) % 360; });
});
const cx = $derived(size / 2);
const cy = $derived(size / 2);
const r = $derived(size / 2 - 1.5);
const rad = $derived((angle * Math.PI) / 180);
const x2 = $derived(cx + r * 0.65 * Math.cos(rad));
const y2 = $derived(cy + r * 0.65 * Math.sin(rad));
const checkPts = $derived(`${cx - r * 0.35},${cy} ${cx - r * 0.1},${cy + r * 0.35} ${cx + r * 0.45},${cy - r * 0.35}`);
</script>
{#if done}
<svg width={size} height={size} style="display:block" shape-rendering="crispEdges">
  <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} stroke-width="1.5" />
  <polyline points={checkPts} fill="none" stroke={color} stroke-width="1.5" stroke-linejoin="round" />
</svg>
{:else}
<svg width={size} height={size} style="display:block" shape-rendering="crispEdges">
  <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--fg-dimmer)" stroke-width="1" stroke-dasharray="3 2" />
  <line x1={cx} y1={cy} x2={x2} y2={y2} stroke={color} stroke-width="1.5" stroke-linecap="square" />
  <rect x={cx - 1} y={cy - 1} width="2" height="2" fill={color} />
</svg>
{/if}
