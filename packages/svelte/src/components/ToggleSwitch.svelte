<script lang="ts">
let { on = false, onChange, color = "var(--accent)", label }: { on?: boolean; onChange?: (v: boolean) => void; color?: string; label?: string } = $props();
let state = $state(on);
const trackW = 28;
const trackH = 12;
const blockW = 10;
const blockX = $derived(state ? trackW - blockW - 2 : 2);
function handleClick() {
  state = !state;
  onChange?.(state);
}
</script>
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div onclick={handleClick} style="display:inline-flex; align-items:center; gap:6px; cursor:pointer; user-select:none">
  <svg width={trackW} height={trackH} style="display:block" shape-rendering="crispEdges">
    <rect x="0" y="0" width={trackW} height={trackH} fill={state ? color : "var(--bg-secondary)"} stroke={state ? color : "var(--border-strong)"} stroke-width="1" />
    <rect x={blockX} y="2" width={blockW} height={trackH - 4} fill={state ? "var(--bg)" : "var(--fg-dim)"} />
    {#if !state}
      <text x={trackW - 6} y={trackH - 3} fill="var(--fg-dimmer)" font-size="5" font-family="monospace" text-anchor="middle">0</text>
    {:else}
      <text x="6" y={trackH - 3} fill="var(--bg)" font-size="5" font-family="monospace" text-anchor="middle">1</text>
    {/if}
  </svg>
  {#if label}
    <span style="font-family:monospace; font-size:9px; color:var(--fg-dim)">{label}</span>
  {/if}
</div>
