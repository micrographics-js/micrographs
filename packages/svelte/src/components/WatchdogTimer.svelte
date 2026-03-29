<script lang="ts">
import { createTicker } from "@micrographics/core";
let { interval = 5000, color = "var(--accent)", onBark }: { interval?: number; color?: string; onBark?: () => void } = $props();
let remaining = $state(interval);
let pulse = $state(false);
let startTime = $state(Date.now());
$effect(() => {
  startTime = Date.now();
  remaining = interval;
  return createTicker(50, () => {
    const elapsed = Date.now() - startTime;
    const left = Math.max(0, interval - elapsed);
    remaining = left;
    if (left === 0) {
      onBark?.();
      pulse = true;
      setTimeout(() => {
        startTime = Date.now();
        remaining = interval;
        pulse = false;
      }, 300);
    }
  });
});
const pct = $derived(remaining / interval);
const size = 32;
const cx = size / 2;
const cy = size / 2;
const r = size / 2 - 3;
const startAngle = -90;
const totalArc = 360;
const sweep = $derived(pct * totalArc);
function toRad(deg: number) { return (deg * Math.PI) / 180; }
function arcPath(start: number, end: number) {
  if (Math.abs(end - start) >= 359.9) {
    return `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r}`;
  }
  const s = toRad(start);
  const e = toRad(end);
  const x1 = cx + r * Math.cos(s);
  const y1 = cy + r * Math.sin(s);
  const x2 = cx + r * Math.cos(e);
  const y2 = cy + r * Math.sin(e);
  const large = end - start > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
}
const secs = $derived((remaining / 1000).toFixed(1));
const heartbeatColor = $derived(pulse ? "var(--accent-red)" : color);
const arcD = $derived(arcPath(startAngle, startAngle + sweep));
const arcColor = $derived(pct < 0.25 ? "var(--accent-red)" : heartbeatColor);
const textColor = $derived(pct < 0.25 ? "var(--accent-red)" : color);
</script>
<div style="display:inline-flex; align-items:center; gap:6px">
  <svg width={size} height={size} style="display:block">
    <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--fg-dimmer)" stroke-width="2" opacity="0.3" />
    {#if pct > 0}
      <path d={arcD} fill="none" stroke={arcColor} stroke-width="2" stroke-linecap="square" />
    {/if}
    <circle cx={cx} cy={cy} r="3" fill={heartbeatColor} opacity={pulse ? 1 : 0.5} />
  </svg>
  <span style="font-family:monospace; font-size:10px; color:{textColor}; letter-spacing:0.06em; min-width:30px">{secs}s</span>
</div>
