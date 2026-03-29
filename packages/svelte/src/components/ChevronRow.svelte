<script lang="ts">
import { createTicker } from "@micrographics/core";
let { direction = "right" as "right" | "left", color = "var(--fg-dimmer)", count = 6, speed = 200 } = $props();
let phase = $state(0);
$effect(() => { return createTicker(speed, () => { phase = (phase + 1) % count; }); });
const ch = $derived(direction === "right" ? ">" : "<");
</script>
<span style="font-family:monospace; font-size:12px; letter-spacing:0.05em">
  {#each Array.from({ length: count }, (_, i) => i) as i}
    {@const dist = direction === "right" ? (i - phase + count) % count : (phase - i + count) % count}
    <span style="color:{color}; opacity:{1 - dist * (0.8 / count)}">{ch}</span>
  {/each}
</span>
