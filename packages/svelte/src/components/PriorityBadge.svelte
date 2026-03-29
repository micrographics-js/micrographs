<script lang="ts">
import { createTicker } from "@micrographics/core";
const LEVEL_COLORS: Record<string, string> = {
  A: "var(--accent-red)",
  B: "var(--accent-amber)",
  C: "var(--accent)",
  D: "var(--fg-dim)",
  X: "var(--fg-dimmer)",
};
let { level = "A" as "A" | "B" | "C" | "D" | "X", label = "PRIORITY", blink = false, speed = 800 } = $props();
let on = $state(true);
$effect(() => {
  if (!blink) return;
  return createTicker(speed, () => { on = !on; });
});
const color = $derived(LEVEL_COLORS[level] ?? "var(--fg-dim)");
</script>
<div style="font-family:monospace; display:inline-flex; border:1px solid {color}; opacity:{blink ? (on ? 1 : 0.3) : 1}; transition:opacity 0.1s; user-select:none">
  <div style="font-size:8px; color:var(--fg-dimmer); padding:2px 5px; border-right:1px solid {color}; display:flex; align-items:center; letter-spacing:0.1em">{label}</div>
  <div style="font-size:20px; font-weight:bold; color:{color}; padding:0 8px; line-height:1.1">{level}</div>
</div>
