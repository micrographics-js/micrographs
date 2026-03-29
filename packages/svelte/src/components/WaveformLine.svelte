<script lang="ts">
import { createTicker } from "@micrographics/core";
let { width = 80, height = 30, color = "var(--accent)", speed = 60, amplitude = 0.35, frequency = 2 } = $props();
let phase = $state(0);
$effect(() => { return createTicker(speed, () => { phase = (phase + 0.15) % (Math.PI * 2); }); });
const mid = $derived(height / 2);
const amp = $derived(mid * amplitude * 2);
const pts = $derived((() => {
  const result: string[] = [];
  for (let i = 0; i <= width; i++) {
    const t = (i / width) * Math.PI * 2 * frequency + phase;
    const y = mid + Math.sin(t) * amp;
    result.push(`${i},${y.toFixed(2)}`);
  }
  return result.join(" ");
})());
</script>
<svg {width} {height} style="display:block">
  <line x1="0" y1={mid} x2={width} y2={mid} stroke="var(--fg-dimmer)" stroke-width="0.5" stroke-dasharray="2 3" />
  <polyline points={pts} fill="none" stroke={color} stroke-width="1.5" stroke-linejoin="round" />
</svg>
