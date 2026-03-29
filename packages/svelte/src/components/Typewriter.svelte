<script lang="ts">
let { text = "SYSTEM·ONLINE", speed = 50, color = "var(--fg)", loop = true } = $props();
let displayed = $state("");
let cursor = $state(true);

$effect(() => {
  let cancelled = false;
  let i = 0;
  displayed = "";

  const tick = () => {
    if (cancelled) return;
    i++;
    displayed = text.slice(0, i);
    if (i < text.length) {
      setTimeout(tick, speed);
    } else if (loop) {
      setTimeout(() => {
        if (!cancelled) { i = 0; displayed = ""; setTimeout(tick, speed); }
      }, 1500);
    }
  };
  setTimeout(tick, speed);
  return () => { cancelled = true; };
});

$effect(() => {
  const id = setInterval(() => { cursor = !cursor; }, 530);
  return () => clearInterval(id);
});
</script>
<span style="font-family:monospace; font-size:11px; color:{color}">
  {displayed}<span style="opacity:{cursor ? 1 : 0}">█</span>
</span>
