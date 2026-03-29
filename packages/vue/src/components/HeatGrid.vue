<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { createTicker } from "@micrographics-js/core";

const props = withDefaults(defineProps<{
  cols?: number;
  rows?: number;
  cellSize?: number;
  speed?: number;
}>(), { cols: 8, rows: 4, cellSize: 6, speed: 120 });

const total = computed(() => props.cols * props.rows);
const values = ref<number[]>(Array.from({ length: total.value }, (_, i) => 0.2 + (i % 5) * 0.15));
const tick = ref(0);

let cleanup: (() => void) | undefined;
onMounted(() => {
  cleanup = createTicker(props.speed, () => { tick.value++; });
});
onUnmounted(() => { cleanup?.(); });

watch(tick, () => {
  values.value = values.value.map((v, i) => {
    const target = 0.1 + Math.abs(Math.sin(tick.value * 0.05 + i * 0.7)) * 0.9;
    return v + (target - v) * 0.12;
  });
});

const gap = 1;
const w = computed(() => props.cols * props.cellSize + (props.cols - 1) * gap);
const h = computed(() => props.rows * props.cellSize + (props.rows - 1) * gap);

function colorForValue(v: number) {
  if (v < 0.66) return "var(--accent-amber)";
  return "var(--accent-red)";
}
function cellX(i: number) { return (i % props.cols) * (props.cellSize + gap); }
function cellY(i: number) { return Math.floor(i / props.cols) * (props.cellSize + gap); }
</script>
<template>
  <svg :width="w" :height="h" style="display:block" shape-rendering="crispEdges">
    <rect
      v-for="(v, i) in values" :key="i"
      :x="cellX(i)"
      :y="cellY(i)"
      :width="cellSize"
      :height="cellSize"
      :fill="colorForValue(v)"
      :opacity="0.15 + v * 0.85"
    />
  </svg>
</template>
