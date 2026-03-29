<script lang="ts">
let { text = "SYSTEM ONLINE \u00b7 DATA STREAM ACTIVE \u00b7 ALL NODES NOMINAL", speed = 40, width = 120, color = "var(--fg-dim)", separator = " \u00b7\u2500\u2500 " } = $props();
let offset = $state(0);
let rafId = 0;
let lastTs = 0;
const fullText = $derived(text + separator);
const doubled = $derived(fullText + fullText);
const charW = 6.5;
$effect(() => {
  const totalW = fullText.length * charW;
  lastTs = 0;
  const tick = (ts: number) => {
    if (lastTs === 0) lastTs = ts;
    const delta = ts - lastTs;
    if (delta >= speed) {
      offset = (offset + 1) % Math.ceil(totalW);
      lastTs = ts;
    }
    rafId = requestAnimationFrame(tick);
  };
  rafId = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(rafId);
});
</script>
<div style="width:{width}px; overflow:hidden; display:inline-block">
  <svg {width} height="12" style="display:block">
    <text x={-offset} y="9" fill={color} font-size="9" font-family="monospace" style="white-space:pre">{doubled}</text>
  </svg>
</div>
