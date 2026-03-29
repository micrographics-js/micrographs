<script lang="ts">
let { target = 1337, duration = 1500, color = "var(--fg)", prefix = "", suffix = "" } = $props();
let value = $state(0);

$effect(() => {
  value = 0;
  const start = Date.now();
  const tick = () => {
    const elapsed = Date.now() - start;
    const progress = Math.min(elapsed / duration, 1);
    value = Math.round(progress * target);
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});
</script>
<span style="font-family:monospace; font-size:14px; color:{color}; letter-spacing:0.05em">{prefix}{value.toLocaleString()}{suffix}</span>
