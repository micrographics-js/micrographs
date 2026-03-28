<script lang="ts">
import { createTicker } from "@micrographics/core";
let { ms = 42, color = "var(--accent)", speed = 2000 } = $props();
let active = $state(false);
$effect(() => {
  return createTicker(speed, () => { active = true; setTimeout(() => { active = false; }, 200); });
});
</script>
<span style="font-family:monospace; font-size:11px; color:{color}; display:inline-flex; align-items:center; gap:5px">
  <span style="display:inline-block; width:6px; height:6px; background:{active ? color : 'transparent'}; border:1px solid {color}; transition:background 0.1s"/>
  {ms}ms
</span>
