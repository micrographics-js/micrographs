<script lang="ts">
let { size = 24, color = "var(--fg-dimmer)", label = undefined as string | undefined } = $props();
const cx = $derived(size / 2);
const cy = $derived(size / 2);
const r = $derived(size * 0.35);
</script>
<div style="display:inline-flex; flex-direction:column; align-items:center; gap:2px">
  <svg width={size} height={size} style="display:block">
    <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} stroke-width="0.75" />
    <line x1="0" y1={cy} x2={size} y2={cy} stroke={color} stroke-width="0.75" />
    <line x1={cx} y1="0" x2={cx} y2={size} stroke={color} stroke-width="0.75" />
  </svg>
  {#if label}
    <span style="font-family:monospace; font-size:7px; color:{color}; letter-spacing:0.1em">{label}</span>
  {/if}
</div>
