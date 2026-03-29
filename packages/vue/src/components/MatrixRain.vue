<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { createTicker } from "@micrographics-js/core";

const CHARS = "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉ01";
const props = withDefaults(defineProps<{ cols?: number; rows?: number; speed?: number; color?: string }>(),
  { cols: 8, rows: 6, speed: 100, color: "var(--accent)" });

const grid = ref(Array.from({ length: props.rows }, () => Array.from({ length: props.cols }, () => ({ char: " ", bright: false }))));
const heads = ref(Array.from({ length: props.cols }, () => -1));
let cleanup: (() => void) | null = null;
onMounted(() => {
  cleanup = createTicker(props.speed, () => {
    heads.value = heads.value.map(h => {
      if (h === -1 && Math.random() < 0.1) return 0;
      if (h >= props.rows + 3) return -1;
      return h === -1 ? -1 : h + 1;
    });
    const next = grid.value.map(row => row.map(c => ({
      char: Math.random() < 0.05 ? CHARS[Math.floor(Math.random() * CHARS.length)] : c.char,
      bright: false,
    })));
    heads.value.forEach((h, col) => { if (h >= 0 && h < props.rows) next[h][col] = { char: CHARS[Math.floor(Math.random() * CHARS.length)], bright: true }; });
    grid.value = next;
  });
});
onUnmounted(() => cleanup?.());
</script>
<template>
  <div :style="{ fontFamily: 'monospace', fontSize: '11px', lineHeight: '1.4', userSelect: 'none' }">
    <div v-for="(row, ri) in grid" :key="ri" style="display:flex; gap:2px">
      <span v-for="(cell, ci) in row" :key="ci"
        :style="{ color: cell.bright ? '#ffffff' : props.color, opacity: cell.char === ' ' ? 0 : cell.bright ? 1 : 0.6, width: '12px', display: 'inline-block', textAlign: 'center' }">
        {{ cell.char }}
      </span>
    </div>
  </div>
</template>
