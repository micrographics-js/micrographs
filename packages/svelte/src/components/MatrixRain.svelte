<script lang="ts">
import { createTicker } from "@micrographics/core";
const CHARS = "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉ01";
let { cols = 8, rows = 6, speed = 100, color = "var(--accent)" } = $props();

type Cell = { char: string; bright: boolean };
let grid = $state<Cell[][]>(Array.from({ length: rows }, () => Array.from({ length: cols }, () => ({ char: " ", bright: false }))));
let heads = $state<number[]>(Array.from({ length: cols }, () => -1));

$effect(() => {
  return createTicker(speed, () => {
    heads = heads.map(h => {
      if (h === -1 && Math.random() < 0.1) return 0;
      if (h >= rows + 3) return -1;
      return h === -1 ? -1 : h + 1;
    });
    const next = grid.map(row => row.map(c => ({
      ...c,
      bright: false,
      char: Math.random() < 0.05 ? CHARS[Math.floor(Math.random() * CHARS.length)] : c.char,
    })));
    heads.forEach((h, col) => {
      if (h >= 0 && h < rows) {
        next[h][col] = { char: CHARS[Math.floor(Math.random() * CHARS.length)], bright: true };
      }
    });
    grid = next;
  });
});
</script>
<div style="font-family:monospace; font-size:11px; line-height:1.4; user-select:none">
  {#each grid as row}
    <div style="display:flex; gap:2px">
      {#each row as cell}
        <span style="color:{cell.bright ? '#ffffff' : color}; opacity:{cell.char === ' ' ? 0 : cell.bright ? 1 : 0.6}; width:12px; display:inline-block; text-align:center">{cell.char}</span>
      {/each}
    </div>
  {/each}
</div>
