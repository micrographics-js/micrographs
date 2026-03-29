<script lang="ts">
import { createTicker } from "@micrographics-js/core";
let { heading = 0, size = 60, color = "var(--accent)", animated = false, speed = 80 } = $props();
let current = $state(heading);
$effect(() => { current = heading; });
$effect(() => {
  if (!animated) return;
  return createTicker(speed, () => { current = (current + 1) % 360; });
});
const cx = $derived(size / 2);
const cy = $derived(size / 2);
const r = $derived(size / 2 - 4);
function toRad(deg: number) { return (deg * Math.PI) / 180; }
const needleAngle = $derived(toRad(current - 90));
const dirs = ["N", "E", "S", "W"];
const dirAngles = [0, 90, 180, 270];
const tickLines = $derived(Array.from({ length: 36 }, (_, i) => {
  const a = toRad(i * 10);
  const isMajor = i % 9 === 0;
  const inner = r - (isMajor ? 5 : 2);
  return { x1: cx + inner * Math.cos(a), y1: cy + inner * Math.sin(a), x2: cx + r * Math.cos(a), y2: cy + r * Math.sin(a), isMajor };
}));
const dirLabels = $derived(dirs.map((d, i) => {
  const a = toRad(dirAngles[i] - 90);
  const labelR = r - 9;
  return { d, x: cx + labelR * Math.cos(a), y: cy + labelR * Math.sin(a) + 3 };
}));
</script>
<svg width={size} height={size} style="display:block">
  <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--border)" stroke-width="1" />
  <circle cx={cx} cy={cy} r={r * 0.6} fill="none" stroke="var(--fg-dimmer)" stroke-width="0.5" opacity="0.4" />
  {#each tickLines as t}
    <line x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="var(--fg-dimmer)" stroke-width={t.isMajor ? 1 : 0.5} />
  {/each}
  {#each dirLabels as dl}
    <text x={dl.x} y={dl.y} text-anchor="middle" fill={dl.d === "N" ? "var(--accent-red)" : "var(--fg-dim)"} font-size="7" font-family="monospace" font-weight="bold">{dl.d}</text>
  {/each}
  <line x1={cx - (r * 0.4) * Math.cos(needleAngle)} y1={cy - (r * 0.4) * Math.sin(needleAngle)} x2={cx + (r * 0.65) * Math.cos(needleAngle)} y2={cy + (r * 0.65) * Math.sin(needleAngle)} stroke={color} stroke-width="1.5" stroke-linecap="square" />
  <line x1={cx} y1={cy} x2={cx - (r * 0.3) * Math.cos(needleAngle)} y2={cy - (r * 0.3) * Math.sin(needleAngle)} stroke="var(--accent-red)" stroke-width="1.5" stroke-linecap="square" />
  <circle cx={cx} cy={cy} r="2.5" fill="var(--bg)" stroke={color} stroke-width="1" />
</svg>
