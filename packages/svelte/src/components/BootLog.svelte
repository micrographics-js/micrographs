<script lang="ts">
const DEFAULT_LINES = [
  "BIOS v2.4.1 .......... [OK]",
  "Loading kernel ........ [OK]",
  "Init drivers .......... [OK]",
  "Mount filesystems ..... [OK]",
  "Start services ........ [OK]",
  "SYS READY",
];
let { lines = DEFAULT_LINES, delay = 300, color = "var(--fg-dim)" } = $props();
let visible = $state(0);

$effect(() => {
  visible = 0;
  const ids: ReturnType<typeof setTimeout>[] = [];
  lines.forEach((_, i) => {
    ids.push(setTimeout(() => { visible = i + 1; }, delay * (i + 1)));
  });
  return () => ids.forEach(clearTimeout);
});
</script>
<div style="font-family:monospace; font-size:10px; color:{color}; line-height:1.6">
  {#each lines.slice(0, visible) as line}
    <div style="color:{line === 'SYS READY' ? 'var(--accent)' : color}">{line}</div>
  {/each}
</div>
