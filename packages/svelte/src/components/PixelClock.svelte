<script lang="ts">
let { color = "var(--accent)", showSeconds = true } = $props();
let time = $state(new Date());
$effect(() => {
  const id = setInterval(() => { time = new Date(); }, 1000);
  return () => clearInterval(id);
});
const hh = $derived(String(time.getHours()).padStart(2, "0"));
const mm = $derived(String(time.getMinutes()).padStart(2, "0"));
const ss = $derived(String(time.getSeconds()).padStart(2, "0"));
</script>
<span style="font-family:monospace; font-size:18px; color:{color}; letter-spacing:0.1em; font-weight:bold">{hh}:{mm}{showSeconds ? `:${ss}` : ""}</span>
