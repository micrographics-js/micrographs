<script lang="ts">
let { startMs = undefined as number | undefined, color = "var(--fg)" } = $props();
const mount = Date.now();
let elapsed = $state(0);
$effect(() => {
  const start = startMs ?? mount;
  const id = setInterval(() => { elapsed = Date.now() - start; }, 1000);
  return () => clearInterval(id);
});
function fmt(ms: number) {
  const s = Math.floor(ms/1000), d=Math.floor(s/86400), h=Math.floor((s%86400)/3600), m=Math.floor((s%3600)/60), sec=s%60;
  return [d,h,m,sec].map(v=>String(v).padStart(2,"0")).join(":");
}
</script>
<span style="font-family:monospace; font-size:11px; color:{color}; letter-spacing:0.08em">{fmt(elapsed)}</span>
