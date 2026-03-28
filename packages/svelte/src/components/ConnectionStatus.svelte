<script lang="ts">
let { connected = true } = $props();
let flicker = $state(false);
$effect(() => {
  flicker = true;
  const t = setTimeout(() => { flicker = false; }, 300);
  return () => clearTimeout(t);
});
const color = $derived(connected ? "var(--accent)" : "var(--accent-red)");
</script>
<span style="font-family:monospace; font-size:11px; color:{color}; opacity:{flicker ? 0.2 : 1}; transition:opacity 0.05s; letter-spacing:0.05em">
  {connected ? "CONN·OK" : "CONN·LOST"}
</span>
