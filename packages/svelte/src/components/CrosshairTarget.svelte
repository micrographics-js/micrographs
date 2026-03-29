<script lang="ts">
import { createTicker } from "@micrographics/core";
let { size = 40, color = "var(--accent)", animated = false, locked = false } = $props();
let rotation = $state(0);
$effect(() => {
  if (!animated) return;
  return createTicker(60, () => { rotation = (rotation + 1) % 360; });
});
const cx = $derived(size / 2);
const cy = $derived(size / 2);
const r = $derived(size / 2 - 2);
const innerR = $derived(r * 0.22);
const centerColor = $derived(locked ? "var(--accent-red)" : "none");
const rotatingLines = $derived([0, 90, 180, 270].map(a => {
  const rad = (a * Math.PI) / 180;
  return {
    x1: cx + (innerR + r * 0.3 * 0.5) * Math.cos(rad),
    y1: cy + (innerR + r * 0.3 * 0.5) * Math.sin(rad),
    x2: cx + r * Math.cos(rad),
    y2: cy + r * Math.sin(rad),
  };
}));
const cornerArcs = $derived([45, 135, 225, 315].map(a => {
  const arcLen = 12;
  const a1 = ((a - arcLen / 2) * Math.PI) / 180;
  const a2 = ((a + arcLen / 2) * Math.PI) / 180;
  const ax1 = cx + r * Math.cos(a1);
  const ay1 = cy + r * Math.sin(a1);
  const ax2 = cx + r * Math.cos(a2);
  const ay2 = cy + r * Math.sin(a2);
  return `M ${ax1} ${ay1} A ${r} ${r} 0 0 1 ${ax2} ${ay2}`;
}));
</script>
<svg width={size} height={size} style="display:block">
  <g transform="rotate({rotation}, {cx}, {cy})">
    {#each rotatingLines as l}
      <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={color} stroke-width="1.5" />
    {/each}
    {#each cornerArcs as d}
      <path {d} fill="none" stroke={color} stroke-width="1" opacity="0.5" />
    {/each}
  </g>
  <line x1={cx - r} y1={cy} x2={cx - innerR} y2={cy} stroke={color} stroke-width="1" />
  <line x1={cx + innerR} y1={cy} x2={cx + r} y2={cy} stroke={color} stroke-width="1" />
  <line x1={cx} y1={cy - r} x2={cx} y2={cy - innerR} stroke={color} stroke-width="1" />
  <line x1={cx} y1={cy + innerR} x2={cx} y2={cy + r} stroke={color} stroke-width="1" />
  <circle cx={cx} cy={cy} r={innerR} fill={centerColor} stroke={color} stroke-width="1" opacity={locked ? 0.8 : 1} />
  {#if locked}
    <circle cx={cx} cy={cy} r="2" fill="var(--bg)" />
  {/if}
</svg>
