<script lang="ts">
import { createTicker } from "@micrographics-js/core";
let { cols = 8, rows = 5, speed = 120, color = "var(--fg-dimmer)" } = $props();
let grid = $state<string[][]>(Array.from({ length: rows }, () => Array.from({ length: cols }, () => (Math.random() > 0.5 ? "1" : "0"))));
$effect(() => {
  return createTicker(speed, () => {
    const col = Math.floor(Math.random() * cols);
    const row = Math.floor(Math.random() * rows);
    const next = grid.map(r => [...r]);
    next[row][col] = next[row][col] === "0" ? "1" : "0";
    grid = next;
  });
});
</script>
<div style="font-family:monospace; font-size:10px; color:{color}; line-height:1.4; user-select:none">
  {#each grid as row}
    <div>{row.join(" ")}</div>
  {/each}
</div>
