<script lang="ts">
import { createTicker } from "@micrographics/core";
const DEFAULT_ENTRIES = [
  "[INFO]  kernel: loaded modules ok",
  "[INFO]  net: interface eth0 up",
  "[WARN]  disk: usage at 87%",
  "[INFO]  svc: auth service started",
  "[INFO]  svc: api gateway ready",
  "[DEBUG] req: GET /health 200 2ms",
  "[INFO]  cron: job triggered",
  "[WARN]  mem: gc pressure detected",
  "[INFO]  sync: upstream ok",
  "[DEBUG] req: POST /event 201 8ms",
];
let { entries = DEFAULT_ENTRIES, speed = 800, color = "var(--fg-dim)", maxLines = 5 } = $props();
let lines = $state<string[]>([]);
let idx = $state(0);

$effect(() => {
  return createTicker(speed, () => {
    lines = [...lines.slice(-(maxLines - 1)), entries[idx % entries.length]];
    idx = idx + 1;
  });
});
</script>
<div style="font-family:monospace; font-size:10px; color:{color}; line-height:1.5; width:200px; overflow:hidden">
  {#each lines as line, i}
    <div style="opacity:{0.5 + 0.5 * ((i + 1) / lines.length)}">{line}</div>
  {/each}
</div>
