<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { createTicker } from "@micrographics/core";

const props = withDefaults(defineProps<{
  bars?: number;
  color?: string;
  speed?: number;
  width?: number;
  height?: number;
}>(), { bars: 5, color: "var(--accent)", speed: 180, width: 40, height: 24 });

const tick = ref(0);
let cleanup: (() => void) | null = null;
onMounted(() => { cleanup = createTicker(props.speed, () => tick.value++); });
onUnmounted(() => cleanup?.());

function barHeight(i: number) {
  const phase = (tick.value / 8 + i * 0.4) % (Math.PI * 2);
  return Math.max(2, Math.round(((Math.sin(phase) + 1) / 2) * props.height));
}
</script>
<template>
  <svg :width="width" :height="height" style="display:block" shape-rendering="crispEdges">
    <rect
      v-for="i in bars" :key="i"
      :x="(i-1) * (Math.floor(width / bars) - 1 + 1)"
      :y="height - barHeight(i-1)"
      :width="Math.floor(width / bars) - 1"
      :height="barHeight(i-1)"
      :fill="color"
      :opacity="0.7 + 0.3 * (i / bars)"
    />
  </svg>
</template>
