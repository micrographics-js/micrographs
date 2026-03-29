<script lang="ts">
import { createTicker, seeded } from "@micrographics/core";
let { rows = 4, cols = 8, speed = 200, color = "var(--fg-dimmer)", seed = 42 } = $props();
let cells = $state<string[][]>(
  Array.from({ length: rows }, (_, ri) =>
    Array.from({ length: cols }, (_, ci) =>
      Math.floor(seeded(seed + ri * cols + ci) * 256).toString(16).toUpperCase().padStart(2, "0")
    )
  )
);
let flashCell = $state<[number, number] | null>(null);
$effect(() => {
  return createTicker(speed, () => {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    const val = Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, "0");
    const next = cells.map(row => [...row]);
    next[r][c] = val;
    cells = next;
    flashCell = [r, c];
    setTimeout(() => { flashCell = null; }, 150);
  });
});
</script>
<div style="font-family:monospace; font-size:10px; color:{color}; line-height:1.6">
  {#each cells as row, ri}
    <div style="display:flex; gap:4px">
      <span style="color:var(--fg-dimmer); opacity:0.5">{(ri * cols).toString(16).toUpperCase().padStart(4, "0")}:</span>
      {#each row as cell, ci}
        <span style="color:{flashCell && flashCell[0] === ri && flashCell[1] === ci ? 'var(--accent)' : color}; transition:color 0.1s">{cell}</span>
      {/each}
    </div>
  {/each}
</div>
