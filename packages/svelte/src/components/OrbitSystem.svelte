<script lang="ts">
import { createTicker } from "@micrographics-js/core";

interface OrbitSatellite {
  label: string;
  radius: number;
  speed: number;
  color?: string;
  size?: number;
  startAngle?: number;
}

const DEFAULT_SATELLITES: OrbitSatellite[] = [
  { label: "NODE·A", radius: 28, speed: 4000, color: "var(--accent)", startAngle: 0 },
  { label: "NODE·B", radius: 44, speed: 7000, color: "var(--fg-dim)", startAngle: 120 },
  { label: "NODE·C", radius: 58, speed: 11000, color: "var(--accent-amber)", startAngle: 240 },
];

let {
  center = "SYS",
  satellites = DEFAULT_SATELLITES,
  size = 140,
  showRings = true,
  showLabels = true,
  glowCenter = true,
  color = "var(--accent)",
} = $props();

let angles = $state<number[]>(satellites.map(s => s.startAngle ?? 0));

$effect(() => {
  return createTicker(40, () => {
    angles = angles.map((a, i) => (a + (360 / satellites[i].speed) * 40) % 360);
  });
});

const cx = $derived(size / 2);
const cy = $derived(size / 2);
</script>
<svg width={size} height={size} style="display:block; overflow:visible">
  <defs>
    {#if glowCenter}
      <filter id="orbit-glow" x="-200%" y="-200%" width="500%" height="500%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    {/if}
    <filter id="sat-glow" x="-200%" y="-200%" width="500%" height="500%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  {#if showRings}
    {#each satellites as sat}
      <circle cx={cx} cy={cy} r={sat.radius} fill="none" stroke="var(--fg-dimmer)" stroke-width="0.5" stroke-dasharray="3 5" />
    {/each}
  {/if}

  <line x1={cx - 6} y1={cy} x2={cx + 6} y2={cy} stroke="var(--fg-dimmer)" stroke-width="0.5" />
  <line x1={cx} y1={cy - 6} x2={cx} y2={cy + 6} stroke="var(--fg-dimmer)" stroke-width="0.5" />

  <circle cx={cx} cy={cy} r="5" fill="none" stroke={color} stroke-width="1" filter={glowCenter ? "url(#orbit-glow)" : undefined} />
  <circle cx={cx} cy={cy} r="2" fill={color} filter={glowCenter ? "url(#orbit-glow)" : undefined} />

  {#if showLabels}
    <text x={cx} y={cy - 9} text-anchor="middle" fill={color} font-size="6" font-family="monospace" letter-spacing="0.1em">{center}</text>
  {/if}

  {#each satellites as sat, i}
    {@const rad = (angles[i] * Math.PI) / 180}
    {@const sx = cx + sat.radius * Math.cos(rad)}
    {@const sy = cy + sat.radius * Math.sin(rad)}
    {@const satColor = sat.color ?? "var(--fg-dim)"}
    {@const satSize = sat.size ?? 3}
    <g filter="url(#sat-glow)">
      {#each [0.4, 0.6, 0.8] as t, ti}
        {@const trailAngle = angles[i] - (360 / sat.speed) * 40 * (ti + 1) * 3}
        {@const tr = (trailAngle * Math.PI) / 180}
        {@const tx = cx + sat.radius * Math.cos(tr)}
        {@const ty = cy + sat.radius * Math.sin(tr)}
        <circle cx={tx} cy={ty} r={satSize * (1 - t * 0.5)} fill={satColor} opacity={1 - t} />
      {/each}
      <circle cx={sx} cy={sy} r={satSize} fill={satColor} />
      {#if showLabels}
        <text x={sx + satSize + 3} y={sy + 3} fill={satColor} font-size="6" font-family="monospace" letter-spacing="0.05em" opacity="0.85">{sat.label}</text>
      {/if}
    </g>
  {/each}
</svg>
