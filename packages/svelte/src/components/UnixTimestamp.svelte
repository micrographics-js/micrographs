<script lang="ts">
let { color = "var(--fg-dim)" } = $props();
let ts = $state(Math.floor(Date.now() / 1000));
$effect(() => {
  const id = setInterval(() => { ts = Math.floor(Date.now() / 1000); }, 1000);
  return () => clearInterval(id);
});
</script>
<span style="font-family:monospace; font-size:11px; color:{color}; letter-spacing:0.05em">{ts}</span>
