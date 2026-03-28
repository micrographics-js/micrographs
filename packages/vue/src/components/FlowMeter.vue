<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { createTicker } from "@micrographics/core";

const props = withDefaults(defineProps<{ direction?: string; speed?: number; color?: string; count?: number }>(),
  { direction: "right", speed: 150, color: "var(--accent)", count: 5 });

const offset = ref(0);
let cleanup: (() => void) | null = null;
onMounted(() => { cleanup = createTicker(props.speed, () => { offset.value = (offset.value + 1) % props.count; }); });
onUnmounted(() => cleanup?.());
const opacity = (i: number) => (i - offset.value + props.count) % props.count < 2 ? 1 : 0.25;
</script>
<template>
  <span :style="{ fontFamily: 'monospace', fontSize: '12px', color: props.color, letterSpacing: '0.05em' }">
    <span v-for="i in count" :key="i" :style="{ opacity: opacity(i-1) }">{{ props.direction === 'right' ? '>' : '<' }}</span>
  </span>
</template>
