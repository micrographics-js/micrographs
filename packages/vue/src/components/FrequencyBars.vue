<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { createTicker } from "@micrographics-js/core";

const props = withDefaults(defineProps<{ bars?: number; color?: string; height?: number; speed?: number }>(),
  { bars: 8, color: "var(--accent)", height: 32, speed: 80 });

const tick = ref(0);
let cleanup: (() => void) | null = null;
onMounted(() => { cleanup = createTicker(props.speed, () => tick.value++); });
onUnmounted(() => cleanup?.());
const barH = (i: number) => Math.max(2, Math.round(((Math.sin((tick.value / 10 + i * 0.7) % (Math.PI * 2)) + 1) / 2) * props.height));
const svgW = () => props.bars * 6 - 2;
</script>
<template>
  <svg :width="svgW()" :height="height" style="display:block" shape-rendering="crispEdges">
    <rect v-for="i in bars" :key="i"
      :x="(i-1) * 6" :y="height - barH(i-1)"
      width="4" :height="barH(i-1)"
      :fill="color"
    />
  </svg>
</template>
