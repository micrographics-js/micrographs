<script lang="ts">
import { createTicker } from "@micrographics/core";
let { value = 60, max = 100, size = 80, color = "var(--accent)", unit = "km/h", animated = false } = $props();
let current = $state(value);
let dir = 1;
$effect(() => { current = value; });
$effect(() => {
  if (!animated) return;
  return createTicker(100, () => {
    const next = current + dir * 1.5;
    if (next >= max) dir = -1;
    if (next <= 0) dir = 1;
    current = Math.max(0, Math.min(max, next));
  });
});
const cx = $derived(size / 2);
const cy = $derived(size * 0.6);
const r = $derived(size / 2 - 5);
const startAngle = 180;
const totalArc = 180;
const pct = $derived(Math.max(0, Math.min(1, current / max)));
function toRad(deg: number) { return (deg * Math.PI) / 180; }
function arcPath(radius: number, start: number, sweep: number) {
  const s = toRad(start);
  const e = toRad(start + sweep);
  const x1 = cx + radius * Math.cos(s);
  const y1 = cy + radius * Math.sin(s);
  const x2 = cx + radius * Math.cos(e);
  const y2 = cy + radius * Math.sin(e);
  const large = sweep > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2}`;
}
const trackPath = $derived(arcPath(r, startAngle, totalArc));
const fillPath = $derived(arcPath(r, startAngle, pct * totalArc));
const needleAngle = $derived(toRad(startAngle + pct * totalArc));
const nx = $derived(cx + r * 0.75 * Math.cos(needleAngle));
const ny = $derived(cy + r * 0.75 * Math.sin(needleAngle));
const nbAngle = $derived(needleAngle + Math.PI);
const nbx = $derived(cx + r * 0.18 * Math.cos(nbAngle));
const nby = $derived(cy + r * 0.18 * Math.sin(nbAngle));
const isHigh = $derived(pct > 0.8);
const activeColor = $derived(isHigh ? "var(--accent-red)" : pct > 0.6 ? "var(--accent-amber)" : color);
const ticks = $derived(Array.from({ length: 11 }, (_, i) => {
  const a = toRad(startAngle + (i / 10) * totalArc);
  const inner = r - 5;
  return { x1: cx + inner * Math.cos(a), y1: cy + inner * Math.sin(a), x2: cx + (r + 1) * Math.cos(a), y2: cy + (r + 1) * Math.sin(a), isMajor: i % 5 === 0 };
}));
</script>
<svg width={size} height={size * 0.65} style="display:block">
  <path d={trackPath} fill="none" stroke="var(--fg-dimmer)" stroke-width="4" stroke-linecap="square" />
  {#if pct > 0}
    <path d={fillPath} fill="none" stroke={activeColor} stroke-width="4" stroke-linecap="square" />
  {/if}
  {#each ticks as t}
    <line x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="var(--fg-dimmer)" stroke-width={t.isMajor ? 1.5 : 0.75} />
  {/each}
  <line x1={nbx} y1={nby} x2={nx} y2={ny} stroke={activeColor} stroke-width="1.5" stroke-linecap="square" />
  <circle cx={cx} cy={cy} r="3" fill={activeColor} />
  <text x={cx} y={cy - 6} text-anchor="middle" fill={activeColor} font-size="11" font-family="monospace" font-weight="bold">{Math.round(current)}</text>
  <text x={cx} y={cy + 3} text-anchor="middle" fill="var(--fg-dimmer)" font-size="7" font-family="monospace">{unit}</text>
</svg>
