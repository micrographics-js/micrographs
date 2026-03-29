<script lang="ts">
import { createTicker } from "@micrographics-js/core";
let { count = 7, speed = 1500 } = $props();
let on = $state(true), current = $state(count);
$effect(() => {
  return createTicker(speed, () => { on = !on; if (Math.random()<0.3) current++; });
});
</script>
<span style="font-family:monospace; font-size:11px; color:var(--accent-red); opacity:{on ? 1 : 0.4}; transition:opacity 0.1s">ERR:{current}</span>
