<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { createTicker } from "@micrographics/core";

const props = withDefaults(defineProps<{ width?: number; height?: number; color?: string; speed?: number }>(),
  { width: 80, height: 24, color: "var(--accent)", speed: 1200 });

const phase = ref(0);
let cleanup: (() => void) | null = null;
onMounted(() => { cleanup = createTicker(props.speed / 20, () => { phase.value = (phase.value + 1) % 20; }); });
onUnmounted(() => cleanup?.());

const points = computed(() => {
  const mid = props.height / 2;
  const step = props.width / 20;
  return Array.from({ length: 20 }, (_, i) => {
    const x = i * step;
    let y = mid;
    const rel = (i - phase.value + 20) % 20;
    if (rel === 8) y = mid - props.height * 0.4;
    else if (rel === 9) y = mid + props.height * 0.5;
    else if (rel === 10) y = mid - props.height * 0.15;
    return `${x},${y}`;
  }).join(" ");
});
</script>
<template>
  <svg :width="width" :height="height" style="display:block">
    <polyline :points="points" fill="none" :stroke="color" stroke-width="1.5" />
  </svg>
</template>
