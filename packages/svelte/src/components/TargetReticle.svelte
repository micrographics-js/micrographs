<script lang="ts">
import { createTicker } from "@micrographics-js/core";
let {
  size = 64,
  color = "var(--accent)",
  label = undefined as string | undefined,
  animate = true,
  rings = 2,
  crosshair = true,
  speed = 3000,
} = $props();

let rotation = $state(0);
let pulse = $state(1);

$effect(() => {
  if (!animate) return;
  return createTicker(40, () => {
    rotation = (rotation + (360 / speed) * 40) % 360;
    pulse = 0.5 + 0.5 * Math.abs(Math.sin(Date.now() / 800));
  });
});

const cx = $derived(size / 2);
const cy = $derived(size / 2);
const gap = 8;
</script>
<svg width={size} height={size} style="display:block; overflow:visible">
  <defs>
    <filter id="reticle-glow" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  {#each Array.from({ length: rings }, (_, i) => i) as i}
    <circle cx={cx} cy={cy} r={cx - 2 - i * 8} fill="none" stroke={color} stroke-width="0.5" opacity={0.3 - i * 0.1} stroke-dasharray={i === 0 ? undefined : "4 8"} />
  {/each}

  {#each [0, 90, 180, 270] as baseAngle}
    {@const angle = baseAngle + rotation}
    {@const rad = (angle * Math.PI) / 180}
    {@const r = cx - 4}
    {@const bx = cx + r * Math.cos(rad)}
    {@const by = cy + r * Math.sin(rad)}
    {@const len = 6}
    {@const perpRad = rad + Math.PI / 2}
    <g filter="url(#reticle-glow)">
      <line x1={bx} y1={by} x2={bx + len * Math.cos(rad)} y2={by + len * Math.sin(rad)} stroke={color} stroke-width="1.5" />
      <line x1={bx} y1={by} x2={bx + len * Math.cos(perpRad)} y2={by + len * Math.sin(perpRad)} stroke={color} stroke-width="1.5" />
    </g>
  {/each}

  {#if crosshair}
    <line x1={2} y1={cy} x2={cx - gap} y2={cy} stroke={color} stroke-width="0.75" opacity="0.6" />
    <line x1={cx + gap} y1={cy} x2={size - 2} y2={cy} stroke={color} stroke-width="0.75" opacity="0.6" />
    <line x1={cx} y1={2} x2={cx} y2={cy - gap} stroke={color} stroke-width="0.75" opacity="0.6" />
    <line x1={cx} y1={cy + gap} x2={cx} y2={size - 2} stroke={color} stroke-width="0.75" opacity="0.6" />
  {/if}

  <circle cx={cx} cy={cy} r="2" fill={color} opacity={pulse} filter="url(#reticle-glow)" />

  {#if label}
    <text x={size - 2} y={cy + 3} text-anchor="end" fill={color} font-size="6" font-family="monospace" letter-spacing="0.1em" opacity="0.7">{label}</text>
  {/if}
</svg>
