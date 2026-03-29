<script lang="ts">
let { running = false, color = "var(--accent)" } = $props();
let elapsed = $state(0);
let startTime: number | null = null;
let acc = 0;
let rafId = 0;
$effect(() => {
  if (running) {
    startTime = performance.now();
    const tick = () => {
      if (startTime !== null) {
        elapsed = acc + (performance.now() - startTime);
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
  } else {
    if (startTime !== null) {
      acc += performance.now() - startTime;
      startTime = null;
    }
    cancelAnimationFrame(rafId);
  }
  return () => cancelAnimationFrame(rafId);
});
function pad2(n: number) { return String(n).padStart(2, "0"); }
const totalSecs = $derived(Math.floor(elapsed / 1000));
const hours = $derived(Math.floor(totalSecs / 3600));
const mins = $derived(Math.floor((totalSecs % 3600) / 60));
const secs = $derived(totalSecs % 60);
const millis = $derived(Math.floor((elapsed % 1000) / 10));
</script>
<span style="font-family:monospace; font-size:13px; color:{color}; letter-spacing:0.06em">{pad2(hours)}:{pad2(mins)}:{pad2(secs)}<span style="font-size:10px; color:var(--fg-dim); margin-left:1px">:{pad2(millis)}</span></span>
