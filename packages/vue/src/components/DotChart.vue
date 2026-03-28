<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { createTicker, seeded } from "@micrographics/core";

const props = withDefaults(defineProps<{ width?: number; seed?: number; color?: string; height?: number; speed?: number }>(),
  { width: 9, seed: 42, color: "var(--accent)", height: 32, speed: 180 });

const values = ref<number[]>(Array.from({ length: props.width }, (_, i) => seeded(props.seed + i)));
let cleanup: (() => void) | null = null;
onMounted(() => { cleanup = createTicker(props.speed, () => { values.value = [...values.value.slice(1), Math.random()]; }); });
onUnmounted(() => cleanup?.());
const svgW = computed(() => props.width * 5 - 2);
</script>
<template>
  <svg :width="svgW" :height="height" style="display:block" shape-rendering="crispEdges">
    <rect v-for="(v, i) in values" :key="i"
      :x="i * 5" :y="Math.round((1 - v) * (height - 3))"
      width="3" height="3" :fill="color"
    />
  </svg>
</template>
