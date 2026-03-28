<script lang="ts">
let { color = "var(--accent)", delay = 80 } = $props();
const SEGS = ["["," ","R","E","A","D","Y"," ","]"];
let visible = $state(0);
$effect(() => {
  visible = 0;
  const ids = SEGS.map((_, i) => setTimeout(() => { visible = i + 1; }, delay * (i + 1)));
  return () => ids.forEach(clearTimeout);
});
const displayed = $derived(SEGS.slice(0, visible).join(""));
</script>
<span style="font-family:monospace; font-size:12px; color:{color}; letter-spacing:0.05em">{displayed}</span>
