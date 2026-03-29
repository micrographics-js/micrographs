<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { createTicker } from "@micrographics-js/core";

const props = withDefaults(defineProps<{ color?: string; speed?: number; height?: number }>(),
  { color: "var(--accent)", speed: 80, height: 40 });

const levels = ref([0.7, 0.5]);
let cleanup: (() => void) | null = null;
onMounted(() => {
  cleanup = createTicker(props.speed, () => {
    levels.value = levels.value.map(v => Math.max(0.05, Math.min(1, v + (Math.random() - 0.5) * 0.25)));
  });
});
onUnmounted(() => cleanup?.());
const segments = 8;
const segH = () => Math.floor(props.height / segments) - 1;
const segColor = (col: number, i: number) => {
  const seg = segments - 1 - i;
  if (seg >= segments - 2) return "var(--accent-red)";
  if (seg >= segments - 4) return "var(--accent-amber)";
  return props.color;
};
const filled = (col: number) => Math.round(levels.value[col] * segments);
</script>
<template>
  <svg :width="20" :height="height" style="display:block" shape-rendering="crispEdges">
    <template v-for="col in 2" :key="col">
      <rect v-for="i in segments" :key="`${col}-${i}`"
        :x="(col-1) * 11" :y="(i-1) * (segH() + 1)"
        width="8" :height="segH()"
        :fill="(segments - i) < filled(col-1) ? segColor(col-1, i-1) : 'var(--fg-dimmer)'"
        :opacity="(segments - i) < filled(col-1) ? 1 : 0.2"
      />
    </template>
  </svg>
</template>
