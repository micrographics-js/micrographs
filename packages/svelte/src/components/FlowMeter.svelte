<script lang="ts">
import { createTicker } from "@micrographics/core";
let { direction = "right" as "right" | "left", speed = 150, color = "var(--accent)", count = 5 } = $props();
let offset = $state(0);
$effect(() => {
  return createTicker(speed, () => { offset = (offset + 1) % count; });
});
const ch = $derived(direction === "right" ? ">" : "<");
</script>
<span style="font-family:monospace; font-size:12px; color:{color}; letter-spacing:0.05em">
  {#each Array.from({ length: count }, (_, i) => i) as i}
    <span style="opacity:{(i - offset + count) % count < 2 ? 1 : 0.25}">{ch}</span>
  {/each}
</span>
