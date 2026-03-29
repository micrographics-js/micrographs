<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { createTicker, seeded } from "@micrographics-js/core";

const props = withDefaults(defineProps<{ bars?: number; color?: string; height?: number; speed?: number; seed?: number }>(),
  { bars: 12, color: "var(--accent)", height: 32, speed: 200, seed: 7 });

const values = ref<number[]>(Array.from({ length: props.bars }, (_, i) => seeded(props.seed + i)));
let cleanup: (() => void) | null = null;
onMounted(() => { cleanup = createTicker(props.speed, () => { values.value = [...values.value.slice(1), Math.random()]; }); });
onUnmounted(() => cleanup?.());
const svgW = computed(() => props.bars * 4 - 1);
</script>
<template>
  <svg :width="svgW" :height="height" style="display:block" shape-rendering="crispEdges">
    <rect v-for="(v, i) in values" :key="i"
      :x="i * 4" :y="height - Math.max(1, Math.round(v * height))"
      width="3" :height="Math.max(1, Math.round(v * height))"
      :fill="color"
    />
  </svg>
</template>
