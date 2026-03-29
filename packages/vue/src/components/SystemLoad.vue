<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { createTicker } from "@micrographics/core";

const props = withDefaults(defineProps<{
  cores?: number;
  width?: number;
  height?: number;
  color?: string;
  speed?: number;
}>(), { cores: 4, width: 60, height: 20, color: "var(--accent)", speed: 200 });

const loads = ref<number[]>(Array.from({ length: props.cores }, (_, i) => 0.3 + i * 0.1));

let cleanup: (() => void) | undefined;
onMounted(() => {
  cleanup = createTicker(props.speed, () => {
    loads.value = loads.value.map(v => {
      const delta = (Math.random() - 0.5) * 0.15;
      return Math.max(0.05, Math.min(0.98, v + delta));
    });
  });
});
onUnmounted(() => { cleanup?.(); });

const barH = computed(() => Math.floor((props.height - (props.cores - 1) * 1) / props.cores));

function barY(i: number) { return i * (barH.value + 1); }
function filled(v: number) { return Math.round(v * props.width); }
function barColor(v: number) {
  if (v > 0.8) return "var(--accent-red)";
  if (v > 0.6) return "var(--accent-amber)";
  return props.color;
}
</script>
<template>
  <svg :width="width" :height="height" style="display:block" shape-rendering="crispEdges">
    <g v-for="(v, i) in loads" :key="i">
      <rect :x="0" :y="barY(i)" :width="width" :height="barH" fill="var(--bg-secondary)" />
      <rect :x="0" :y="barY(i)" :width="filled(v)" :height="barH" :fill="barColor(v)" opacity="0.85" />
      <text :x="2" :y="barY(i) + barH - 1" fill="var(--bg)" font-size="5" font-family="monospace">C{{ i }}</text>
    </g>
  </svg>
</template>
