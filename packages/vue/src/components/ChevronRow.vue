<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { createTicker } from "@micrographics/core";

const props = withDefaults(defineProps<{ direction?: string; color?: string; count?: number; speed?: number }>(),
  { direction: "right", color: "var(--fg-dimmer)", count: 6, speed: 200 });

const phase = ref(0);
let cleanup: (() => void) | null = null;
onMounted(() => { cleanup = createTicker(props.speed, () => { phase.value = (phase.value + 1) % props.count; }); });
onUnmounted(() => cleanup?.());
const opacity = (i: number) => {
  const dist = props.direction === "right" ? (i - phase.value + props.count) % props.count : (phase.value - i + props.count) % props.count;
  return 1 - dist * (0.8 / props.count);
};
</script>
<template>
  <span :style="{ fontFamily: 'monospace', fontSize: '12px', letterSpacing: '0.05em' }">
    <span v-for="i in count" :key="i" :style="{ color: props.color, opacity: opacity(i-1) }">{{ props.direction === 'right' ? '>' : '<' }}</span>
  </span>
</template>
