<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { createTicker } from "@micrographics-js/core";

const props = withDefaults(defineProps<{ width?: number; height?: number; color?: string; speed?: number }>(),
  { width: 60, height: 40, color: "var(--accent)", speed: 60 });

const y = ref(0);
let cleanup: (() => void) | null = null;
onMounted(() => { cleanup = createTicker(props.speed, () => { y.value = (y.value + 1) % props.height; }); });
onUnmounted(() => cleanup?.());
</script>
<template>
  <svg :width="width" :height="height" style="display:block">
    <rect x="0" y="0" :width="width" :height="height" fill="none" stroke="var(--fg-dimmer)" stroke-width="0.5" />
    <rect x="0" :y="y" :width="width" height="2" :fill="color" opacity="0.8" />
    <rect x="0" :y="y - 4" :width="width" height="6" :fill="color" opacity="0.15" />
  </svg>
</template>
