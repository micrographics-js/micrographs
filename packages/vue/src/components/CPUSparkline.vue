<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { createTicker } from "@micrographics-js/core";

const props = withDefaults(defineProps<{ color?: string; speed?: number; bars?: number; height?: number }>(),
  { color: "var(--accent)", speed: 500, bars: 16, height: 24 });

const values = ref<number[]>(Array.from({ length: props.bars }, () => Math.random() * 0.8 + 0.1));
let cleanup: (() => void) | null = null;
onMounted(() => {
  cleanup = createTicker(props.speed, () => {
    values.value = [...values.value.slice(1), Math.max(0.05, Math.min(1, values.value[values.value.length - 1] + (Math.random() - 0.5) * 0.4))];
  });
});
onUnmounted(() => cleanup?.());

const svgW = computed(() => props.bars * 4 - 1);
const barColor = (v: number) => v > 0.8 ? "var(--accent-red)" : v > 0.6 ? "var(--accent-amber)" : props.color;
const lastVal = computed(() => Math.round((values.value[values.value.length - 1] ?? 0) * 100));
</script>
<template>
  <div style="display:flex; flex-direction:column; gap:2px">
    <span style="font-family:monospace; font-size:9px; color:var(--fg-dimmer)">CPU {{ lastVal }}%</span>
    <svg :width="svgW" :height="height" style="display:block" shape-rendering="crispEdges">
      <rect v-for="(v, i) in values" :key="i"
        :x="i * 4" :y="height - Math.max(1, Math.round(v * height))"
        width="3" :height="Math.max(1, Math.round(v * height))"
        :fill="barColor(v)"
      />
    </svg>
  </div>
</template>
