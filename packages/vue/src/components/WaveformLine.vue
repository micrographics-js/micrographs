<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { createTicker } from "@micrographics/core";

const props = withDefaults(defineProps<{
  width?: number;
  height?: number;
  color?: string;
  speed?: number;
  amplitude?: number;
  frequency?: number;
}>(), { width: 80, height: 30, color: "var(--accent)", speed: 60, amplitude: 0.35, frequency: 2 });

const phase = ref(0);
let cleanup: (() => void) | undefined;
onMounted(() => {
  cleanup = createTicker(props.speed, () => { phase.value = (phase.value + 0.15) % (Math.PI * 2); });
});
onUnmounted(() => { cleanup?.(); });

const mid = computed(() => props.height / 2);
const amp = computed(() => mid.value * props.amplitude * 2);

const points = computed(() => {
  const pts: string[] = [];
  for (let i = 0; i <= props.width; i++) {
    const t = (i / props.width) * Math.PI * 2 * props.frequency + phase.value;
    const y = mid.value + Math.sin(t) * amp.value;
    pts.push(`${i},${y.toFixed(2)}`);
  }
  return pts.join(" ");
});
</script>
<template>
  <svg :width="width" :height="height" style="display:block">
    <line :x1="0" :y1="mid" :x2="width" :y2="mid" stroke="var(--fg-dimmer)" stroke-width="0.5" stroke-dasharray="2 3" />
    <polyline :points="points" fill="none" :stroke="color" stroke-width="1.5" stroke-linejoin="round" />
  </svg>
</template>
