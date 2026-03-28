<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { createTicker } from "@micrographics/core";

const props = withDefaults(defineProps<{ cols?: number; rows?: number; speed?: number; color?: string }>(),
  { cols: 8, rows: 5, speed: 120, color: "var(--fg-dimmer)" });

const grid = ref<string[][]>(Array.from({ length: props.rows }, () => Array.from({ length: props.cols }, () => Math.random() > 0.5 ? "1" : "0")));
let cleanup: (() => void) | null = null;
onMounted(() => {
  cleanup = createTicker(props.speed, () => {
    const next = grid.value.map(r => [...r]);
    const col = Math.floor(Math.random() * props.cols);
    const row = Math.floor(Math.random() * props.rows);
    next[row][col] = next[row][col] === "0" ? "1" : "0";
    grid.value = next;
  });
});
onUnmounted(() => cleanup?.());
</script>
<template>
  <div :style="{ fontFamily: 'monospace', fontSize: '10px', color: props.color, lineHeight: '1.4', userSelect: 'none' }">
    <div v-for="(row, ri) in grid" :key="ri">{{ row.join(" ") }}</div>
  </div>
</template>
