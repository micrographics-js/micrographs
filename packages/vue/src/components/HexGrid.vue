<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { createTicker } from "@micrographics/core";

const props = withDefaults(defineProps<{
  cols?: number;
  rows?: number;
  size?: number;
  color?: string;
  animated?: boolean;
  speed?: number;
}>(), { cols: 5, rows: 3, size: 10, color: "var(--accent)", animated: true, speed: 300 });

function hexPoints(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (i * 60 - 30) * (Math.PI / 180);
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
}

const total = computed(() => props.cols * props.rows);
const opacities = ref<number[]>(Array.from({ length: total.value }, (_, i) => 0.15 + (i % 4) * 0.08));
const tick = ref(0);

let cleanup: (() => void) | undefined;
onMounted(() => {
  if (!props.animated) return;
  cleanup = createTicker(props.speed, () => { tick.value++; });
});
onUnmounted(() => { cleanup?.(); });

watch(tick, () => {
  if (!props.animated) return;
  opacities.value = opacities.value.map((v, i) => {
    const target = 0.1 + Math.abs(Math.sin(tick.value * 0.15 + i * 1.1)) * 0.75;
    return v + (target - v) * 0.2;
  });
});

const r = computed(() => props.size);
const hexW = computed(() => r.value * Math.sqrt(3));
const hexH = computed(() => r.value * 2);
const colSpacing = computed(() => hexW.value);
const rowSpacing = computed(() => hexH.value * 0.75);
const svgW = computed(() => props.cols * colSpacing.value + hexW.value * 0.5 + 2);
const svgH = computed(() => props.rows * rowSpacing.value + hexH.value * 0.25 + 2);

function cellCx(row: number, col: number) {
  const offset = row % 2 === 1 ? hexW.value / 2 : 0;
  return col * colSpacing.value + hexW.value / 2 + offset + 1;
}
function cellCy(row: number) {
  return row * rowSpacing.value + hexH.value / 2 + 1;
}

const cells = computed(() => {
  const result: { idx: number; points: string; opacity: number }[] = [];
  for (let row = 0; row < props.rows; row++) {
    for (let col = 0; col < props.cols; col++) {
      const idx = row * props.cols + col;
      const cx = cellCx(row, col);
      const cy = cellCy(row);
      result.push({
        idx,
        points: hexPoints(cx, cy, r.value - 1),
        opacity: opacities.value[idx] ?? 0.15,
      });
    }
  }
  return result;
});
</script>
<template>
  <svg :width="svgW" :height="svgH" style="display:block">
    <polygon
      v-for="cell in cells" :key="cell.idx"
      :points="cell.points"
      :fill="color"
      :stroke="color"
      stroke-width="0.5"
      :fill-opacity="cell.opacity"
      stroke-opacity="0.3"
    />
  </svg>
</template>
