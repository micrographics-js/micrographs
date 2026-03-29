<script lang="ts">
import { createTicker } from "@micrographics-js/core";
let { size = 60, color = "var(--accent)", speed = 40, pings: maxPings = 3 } = $props();
let angle = $state(0);
let pingList: { x: number; y: number; age: number }[] = $state([]);
$effect(() => {
  const r = size / 2 - 4;
  const cx = size / 2;
  const cy = size / 2;
  return createTicker(speed, () => {
    angle = (angle + 3) % 360;
    if (Math.random() < 0.03) {
      const dist = Math.random() * r * 0.85;
      const pingAngle = (angle * Math.PI) / 180;
      pingList = [
        ...pingList.slice(-(maxPings - 1)),
        { x: cx + dist * Math.cos(pingAngle), y: cy + dist * Math.sin(pingAngle), age: 0 },
      ];
    }
    pingList = pingList.map(p => ({ ...p, age: p.age + 1 })).filter(p => p.age < 60);
  });
});
const cx = $derived(size / 2);
const cy = $derived(size / 2);
const r = $derived(size / 2 - 4);
const rad = $derived((angle * Math.PI) / 180);
const x2 = $derived(cx + r * Math.cos(rad));
const y2 = $derived(cy + r * Math.sin(rad));
const gradId = $derived(`radar-sweep-${size}`);
</script>
<svg width={size} height={size} style="display:block">
  <defs>
    <radialGradient id={gradId} cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color={color} stop-opacity="0.15" />
      <stop offset="100%" stop-color={color} stop-opacity="0" />
    </radialGradient>
  </defs>
  <circle cx={cx} cy={cy} r={r} fill="var(--bg-secondary)" stroke="var(--border)" stroke-width="1" />
  {#each [0.33, 0.66, 1] as f}
    <circle cx={cx} cy={cy} r={r * f} fill="none" stroke="var(--fg-dimmer)" stroke-width="0.5" opacity="0.4" />
  {/each}
  <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke="var(--fg-dimmer)" stroke-width="0.5" opacity="0.3" />
  <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} stroke="var(--fg-dimmer)" stroke-width="0.5" opacity="0.3" />
  <circle cx={cx} cy={cy} r={r} fill="url(#{gradId})" opacity="0.6" />
  {#each pingList as p}
    <circle cx={p.x} cy={p.y} r="1.5" fill={color} opacity={Math.max(0, 1 - p.age / 60)} />
  {/each}
  <line x1={cx} y1={cy} x2={x2} y2={y2} stroke={color} stroke-width="1.5" opacity="0.9" />
  <circle cx={cx} cy={cy} r="2" fill={color} />
</svg>
