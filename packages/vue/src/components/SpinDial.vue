<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { createTicker } from "@micrographics/core";

const props = withDefaults(defineProps<{
  done?: boolean;
  color?: string;
  size?: number;
}>(), { done: false, color: "var(--accent)", size: 16 });

const angle = ref(0);
let cleanup: (() => void) | undefined;
onMounted(() => {
  if (props.done) return;
  cleanup = createTicker(40, () => { angle.value = (angle.value + 18) % 360; });
});
onUnmounted(() => { cleanup?.(); });

const cx = computed(() => props.size / 2);
const cy = computed(() => props.size / 2);
const r = computed(() => props.size / 2 - 1.5);
const rad = computed(() => (angle.value * Math.PI) / 180);
const x2 = computed(() => cx.value + r.value * 0.65 * Math.cos(rad.value));
const y2 = computed(() => cy.value + r.value * 0.65 * Math.sin(rad.value));
const checkPts = computed(() =>
  `${cx.value - r.value * 0.35},${cy.value} ${cx.value - r.value * 0.1},${cy.value + r.value * 0.35} ${cx.value + r.value * 0.45},${cy.value - r.value * 0.35}`
);
</script>
<template>
  <svg v-if="done" :width="size" :height="size" style="display:block" shape-rendering="crispEdges">
    <circle :cx="cx" :cy="cy" :r="r" fill="none" :stroke="color" stroke-width="1.5" />
    <polyline :points="checkPts" fill="none" :stroke="color" stroke-width="1.5" stroke-linejoin="round" />
  </svg>
  <svg v-else :width="size" :height="size" style="display:block" shape-rendering="crispEdges">
    <circle :cx="cx" :cy="cy" :r="r" fill="none" stroke="var(--fg-dimmer)" stroke-width="1" stroke-dasharray="3 2" />
    <line :x1="cx" :y1="cy" :x2="x2" :y2="y2" :stroke="color" stroke-width="1.5" stroke-linecap="square" />
    <rect :x="cx - 1" :y="cy - 1" width="2" height="2" :fill="color" />
  </svg>
</template>
