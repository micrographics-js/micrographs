<script lang="ts">
let { value = 50, width = 80, height = 8, min = 0, max = 100 } = $props();
const pct = $derived(Math.max(0, Math.min(1, (value - min) / (max - min))));
const filled = $derived(Math.round(pct * width));
const gradId = $derived(`thermal-grad-${width}`);
</script>
<svg {width} {height} style="display:block" shape-rendering="crispEdges">
  <defs>
    <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#4488ff" />
      <stop offset="30%" stop-color="#44cc88" />
      <stop offset="65%" stop-color="var(--accent-amber)" />
      <stop offset="100%" stop-color="var(--accent-red)" />
    </linearGradient>
  </defs>
  <rect x="0" y="0" {width} {height} fill="var(--bg-secondary)" />
  <rect x="0" y="0" width={filled} {height} fill="url(#{gradId})" />
  <rect x="0" y="0" {width} {height} fill="none" stroke="var(--border)" stroke-width="1" />
</svg>
