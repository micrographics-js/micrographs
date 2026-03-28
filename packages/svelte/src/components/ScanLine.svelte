<script lang="ts">
import { createTicker } from "@micrographics/core";
let { width = 60, height = 40, color = "var(--accent)", speed = 60 } = $props();
let y = $state(0);
$effect(() => { return createTicker(speed, () => { y = (y + 1) % height; }); });
</script>
<svg {width} {height} style="display:block">
  <rect x="0" y="0" {width} {height} fill="none" stroke="var(--fg-dimmer)" stroke-width="0.5"/>
  <rect x="0" {y} {width} height="2" fill={color} opacity="0.8"/>
  <rect x="0" y={y-4} {width} height="6" fill={color} opacity="0.15"/>
</svg>
