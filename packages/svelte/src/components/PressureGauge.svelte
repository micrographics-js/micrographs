<script lang="ts">
let { value = 50, min = 0, max = 100, size = 60, color = "var(--accent)", unit = "PSI" } = $props();
const cx = $derived(size / 2);
const cy = $derived(size / 2);
const r = $derived(size / 2 - 5);
const pct = $derived(Math.max(0, Math.min(1, (value - min) / (max - min))));
const startAngle = 135;
const totalArc = 270;
const endAngle = $derived(startAngle + pct * totalArc);
function toRad(deg: number) { return (deg * Math.PI) / 180; }
function arcPath(r2: number, start: number, end: number) {
  const s = toRad(start);
  const e = toRad(end);
  const x1 = cx + r2 * Math.cos(s);
  const y1 = cy + r2 * Math.sin(s);
  const x2 = cx + r2 * Math.cos(e);
  const y2 = cy + r2 * Math.sin(e);
  const large = end - start > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r2} ${r2} 0 ${large} 1 ${x2} ${y2}`;
}
const trackPath = $derived(arcPath(r, startAngle, startAngle + totalArc));
const fillPath = $derived(arcPath(r, startAngle, endAngle));
const ticks = $derived(Array.from({ length: 9 }, (_, i) => {
  const a = toRad(startAngle + (i / 8) * totalArc);
  const inner = r - 4;
  const outer = r + 1;
  return { x1: cx + inner * Math.cos(a), y1: cy + inner * Math.sin(a), x2: cx + outer * Math.cos(a), y2: cy + outer * Math.sin(a) };
}));
</script>
<svg width={size} height={size} style="display:block">
  <path d={trackPath} fill="none" stroke="var(--fg-dimmer)" stroke-width="3" stroke-linecap="square" />
  {#if pct > 0}
    <path d={fillPath} fill="none" stroke={color} stroke-width="3" stroke-linecap="square" />
  {/if}
  {#each ticks as t}
    <line x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="var(--fg-dimmer)" stroke-width="0.75" />
  {/each}
  <text x={cx} y={cy + 2} text-anchor="middle" fill={color} font-size="10" font-family="monospace" font-weight="bold">{value}</text>
  <text x={cx} y={cy + 10} text-anchor="middle" fill="var(--fg-dimmer)" font-size="7" font-family="monospace">{unit}</text>
</svg>
