<script lang="ts">
import { createTicker } from "@micrographics/core";
let { label = "LIVE", color = "var(--accent)", speed = 800 } = $props();
let on = $state(true);
$effect(() => { return createTicker(speed, () => { on = !on; }); });
</script>
<span style="font-family:monospace; font-size:11px; color:{color}; display:inline-flex; align-items:center; gap:4px">
  <span style="opacity:{on ? 1 : 0}; transition:opacity 0.1s">◆</span>
  <span>{label}</span>
</span>
