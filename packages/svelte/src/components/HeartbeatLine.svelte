<script lang="ts">
import { createTicker } from "@micrographics-js/core";
let { width = 80, height = 24, color = "var(--accent)", speed = 1200 } = $props();
let phase = $state(0);
$effect(() => { return createTicker(speed / 20, () => { phase = (phase + 1) % 20; }); });
const points = $derived((() => {
  const mid = height / 2, step = width / 20;
  return Array.from({length:20}, (_, i) => {
    let y = mid;
    const rel = (i - phase + 20) % 20;
    if (rel === 8) y = mid - height * 0.4;
    else if (rel === 9) y = mid + height * 0.5;
    else if (rel === 10) y = mid - height * 0.15;
    return `${i*step},${y}`;
  }).join(" ");
})());
</script>
<svg {width} {height} style="display:block">
  <polyline points={points} fill="none" stroke={color} stroke-width="1.5" />
</svg>
