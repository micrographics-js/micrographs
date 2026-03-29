<script lang="ts">
import { createTicker } from "@micrographics-js/core";
const DEFAULT_EVENTS = ["SYS_INIT", "PKT_RECV", "AUTH_OK", "SYNC", "PROC_RUN"];
let { events = DEFAULT_EVENTS, speed = 1800, color = "var(--fg)", width = 100 } = $props();
let index = $state(0);
let fade = $state(1);
$effect(() => {
  return createTicker(speed, () => {
    fade = 0;
    const timer = setTimeout(() => {
      index = (index + 1) % events.length;
      fade = 1;
    }, 200);
    return () => clearTimeout(timer);
  });
});
const current = $derived(events[index] ?? "");
</script>
<div style="font-family:monospace; font-size:10px; color:{color}; width:{width}px; overflow:hidden; white-space:nowrap; display:flex; align-items:center; gap:4px">
  <span style="color:var(--fg-dimmer)">&rsaquo;</span>
  <span style="opacity:{fade}; transition:opacity 0.18s ease; letter-spacing:0.06em">{current}</span>
</div>
