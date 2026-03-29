<script lang="ts">
import { createTicker } from "@micrographics-js/core";
let { from = 300, color = "var(--accent)", alertAt = 60, onEnd }: { from?: number; color?: string; alertAt?: number; onEnd?: () => void } = $props();
let remaining = $state(from);
$effect(() => { remaining = from; });
$effect(() => {
  if (remaining <= 0) {
    onEnd?.();
    return;
  }
  return createTicker(1000, () => { remaining = Math.max(0, remaining - 1); });
});
const mins = $derived(Math.floor(remaining / 60));
const secs = $derived(remaining % 60);
const display = $derived(`${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`);
const isAlert = $derived(remaining <= alertAt);
const activeColor = $derived(isAlert ? "var(--accent-red)" : color);
</script>
<span style="font-family:monospace; font-size:14px; color:{activeColor}; letter-spacing:0.1em; font-variant-numeric:tabular-nums">{display}</span>
