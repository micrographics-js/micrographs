<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { createTicker } from "@micrographics-js/core";

const props = withDefaults(defineProps<{
  width?: number;
  height?: number;
  color?: string;
  speed?: number;
}>(), { width: 80, height: 4, color: "var(--accent)", speed: 50 });

const pos = ref(0);
let cleanup: (() => void) | undefined;
onMounted(() => {
  cleanup = createTicker(props.speed, () => { pos.value = (pos.value + 1) % (props.width + 20); });
});
onUnmounted(() => { cleanup?.(); });

const beamW = 16;
const gradId = computed(() => `sb-grad-${props.width}-${props.height}`);
const clipPath = computed(() =>
  `inset(0 ${Math.max(0, pos.value - props.width)}px 0 ${Math.max(0, -pos.value + beamW)}px)`
);
const headX = computed(() => Math.min(pos.value, props.width - 1));
</script>
<template>
  <svg :width="width" :height="height" style="display:block" shape-rendering="crispEdges">
    <defs>
      <linearGradient :id="gradId" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" :stop-color="color" stop-opacity="0" />
        <stop offset="40%" :stop-color="color" stop-opacity="0.4" />
        <stop offset="100%" :stop-color="color" stop-opacity="1" />
      </linearGradient>
    </defs>
    <rect :x="0" :y="0" :width="width" :height="height" fill="var(--bg-secondary)" />
    <rect
      :x="pos - beamW"
      :y="0"
      :width="beamW"
      :height="height"
      :fill="`url(#${gradId})`"
      :clip-path="clipPath"
    />
    <rect :x="headX" :y="0" width="1" :height="height" :fill="color" opacity="0.9" />
  </svg>
</template>
