<script lang="ts">
import { createTicker } from "@micrographics-js/core";
let { upKbps = 128, downKbps = 512, speed = 500 } = $props();
let up = $state(upKbps), down = $state(downKbps);
$effect(() => {
  return createTicker(speed, () => {
    up = Math.max(0, upKbps + Math.round((Math.random()-0.5)*30));
    down = Math.max(0, downKbps + Math.round((Math.random()-0.5)*80));
  });
});
</script>
<div style="font-family:monospace; font-size:10px; display:flex; flex-direction:column; gap:2px">
  <span style="color:var(--accent)">▲ {up} KB/s</span>
  <span style="color:var(--fg-dim)">▼ {down} KB/s</span>
</div>
