<script lang="ts">
import { createTicker } from "@micrographics-js/core";
let { message = "WARNING", speed = 600 } = $props();
let on = $state(true);
$effect(() => { return createTicker(speed, () => { on = !on; }); });
</script>
<div style="font-family:monospace; font-size:11px; color:var(--accent-amber); padding:3px 8px; border:1px solid var(--accent-amber); display:inline-flex; align-items:center; gap:6px; opacity:{on ? 1 : 0.5}; transition:opacity 0.1s; letter-spacing:0.05em">
  <span>!</span><span>{message}</span>
</div>
