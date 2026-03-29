<script lang="ts">
import { createTicker } from "@micrographics/core";
let { size = 80, color = "var(--accent)", speed = 35, targets: maxTargets = 4 } = $props();
let angle = $state(0);
let tid = 0;
let targetList: { id: number; x: number; y: number; age: number; maxAge: number }[] = $state([]);
$effect(() => {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 6;
  return createTicker(speed, () => {
    angle = (angle + 2) % 360;
    if (targetList.length < maxTargets && Math.random() < 0.015) {
      const dist = 0.25 + Math.random() * 0.65;
      const ta = (angle * Math.PI) / 180;
      targetList = [
        ...targetList,
        { id: tid++, x: cx + dist * r * Math.cos(ta), y: cy + dist * r * Math.sin(ta), age: 0, maxAge: 80 + Math.random() * 60 },
      ];
    }
    targetList = targetList.map(t => ({ ...t, age: t.age + 1 })).filter(t => t.age < t.maxAge);
  });
});
const cx = $derived(size / 2);
const cy = $derived(size / 2);
const r = $derived(size / 2 - 6);
const rad = $derived((angle * Math.PI) / 180);
</script>
<svg width={size} height={size} style="display:block">
  <rect x="0" y="0" width={size} height={size} fill="var(--bg-secondary)" />
  {#each [0.3, 0.6, 1] as f}
    <circle cx={cx} cy={cy} r={r * f} fill="none" stroke={color} stroke-width="0.5" opacity="0.2" />
  {/each}
  <line x1="0" y1={cy} x2={size} y2={cy} stroke={color} stroke-width="0.5" opacity="0.2" />
  <line x1={cx} y1="0" x2={cx} y2={size} stroke={color} stroke-width="0.5" opacity="0.2" />
  <line x1={cx - r * 0.7} y1={cy - r * 0.7} x2={cx + r * 0.7} y2={cy + r * 0.7} stroke={color} stroke-width="0.3" opacity="0.12" />
  <line x1={cx + r * 0.7} y1={cy - r * 0.7} x2={cx - r * 0.7} y2={cy + r * 0.7} stroke={color} stroke-width="0.3" opacity="0.12" />
  {#each targetList as t (t.id)}
    {@const opacity = Math.max(0, 1 - t.age / t.maxAge)}
    <g {opacity}>
      <rect x={t.x - 3} y={t.y - 3} width="6" height="6" fill="none" stroke={color} stroke-width="1" />
      <circle cx={t.x} cy={t.y} r="1" fill={color} />
    </g>
  {/each}
  <line x1={cx} y1={cy} x2={cx + r * Math.cos(rad)} y2={cy + r * Math.sin(rad)} stroke={color} stroke-width="1.5" opacity="0.8" />
  <circle cx={cx} cy={cy} r="2" fill={color} />
  <rect x="0" y="0" width={size} height={size} fill="none" stroke="var(--border)" stroke-width="1" />
</svg>
