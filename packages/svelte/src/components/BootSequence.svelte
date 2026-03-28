<script lang="ts">
let { delay = 2000, color = "var(--accent)" } = $props();
let ready = $state(false);
let blink = $state(true);
$effect(() => {
  const t = setTimeout(() => { ready = true; }, delay);
  const id = setInterval(() => { blink = !blink; }, 400);
  return () => { clearTimeout(t); clearInterval(id); };
});
</script>
<span style="font-family:monospace; font-size:11px; color:{color}; letter-spacing:0.05em">
  {#if ready}SYS·READY{:else}<span style="opacity:{blink ? 1 : 0.4}">SYS·BOOTING</span>{/if}
</span>
