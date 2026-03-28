<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { createTicker, seeded } from "@micrographics/core";

const props = withDefaults(defineProps<{ rows?: number; cols?: number; speed?: number; color?: string; seed?: number }>(),
  { rows: 4, cols: 8, speed: 200, color: "var(--fg-dimmer)", seed: 42 });

const cells = ref<string[][]>(Array.from({ length: props.rows }, (_, ri) =>
  Array.from({ length: props.cols }, (_, ci) => Math.floor(seeded(props.seed + ri * props.cols + ci) * 256).toString(16).toUpperCase().padStart(2, "0"))
));
const flashCell = ref<[number, number] | null>(null);
let cleanup: (() => void) | null = null;
onMounted(() => {
  cleanup = createTicker(props.speed, () => {
    const r = Math.floor(Math.random() * props.rows);
    const c = Math.floor(Math.random() * props.cols);
    const next = cells.value.map(row => [...row]);
    next[r][c] = Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, "0");
    cells.value = next;
    flashCell.value = [r, c];
    setTimeout(() => { flashCell.value = null; }, 150);
  });
});
onUnmounted(() => cleanup?.());
const isFlash = (r: number, c: number) => flashCell.value?.[0] === r && flashCell.value?.[1] === c;
</script>
<template>
  <div :style="{ fontFamily: 'monospace', fontSize: '10px', color: props.color, lineHeight: '1.6' }">
    <div v-for="(row, ri) in cells" :key="ri" style="display:flex; gap:4px">
      <span style="color:var(--fg-dimmer); opacity:0.5">{{ (ri * props.cols).toString(16).toUpperCase().padStart(4, '0') }}:</span>
      <span v-for="(cell, ci) in row" :key="ci"
        :style="{ color: isFlash(ri, ci) ? 'var(--accent)' : props.color, transition: 'color 0.1s' }">
        {{ cell }}
      </span>
    </div>
  </div>
</template>
