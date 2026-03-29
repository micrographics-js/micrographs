<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { createTicker } from "@micrographics/core";

const props = withDefaults(defineProps<{
  width?: number;
  height?: number;
  color?: string;
  depth?: number;
  animated?: boolean;
}>(), { width: 40, height: 30, color: "var(--accent)", depth: 15, animated: false });

const angle = ref(0);
let cleanup: (() => void) | undefined;
onMounted(() => {
  if (!props.animated) return;
  cleanup = createTicker(60, () => { angle.value = (angle.value + 1) % 360; });
});
onUnmounted(() => { cleanup?.(); });

function isoProject(x: number, y: number, z: number) {
  const rad = (angle.value * Math.PI) / 180;
  const rx = x * Math.cos(rad) - z * Math.sin(rad);
  const rz = x * Math.sin(rad) + z * Math.cos(rad);
  return { px: rx - rz * 0.5, py: -y + rz * 0.25 };
}

const svgW = computed(() => props.width + props.depth + 20);
const svgH = computed(() => props.height + props.depth * 0.5 + 20);
const ox = computed(() => svgW.value / 2);
const oy = computed(() => svgH.value * 0.6);

const hw = computed(() => props.width / 2);
const hh = computed(() => props.height / 2);
const hd = computed(() => props.depth / 2);

const corners: [number, number, number][] = [
  [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
  [-1, -1,  1], [1, -1,  1], [1, 1,  1], [-1, 1,  1],
];

const edges: [number, number][] = [
  [0,1],[1,2],[2,3],[3,0],
  [4,5],[5,6],[6,7],[7,4],
  [0,4],[1,5],[2,6],[3,7],
];

const projected = computed(() =>
  corners.map(([sx, sy, sz]) => {
    const { px, py } = isoProject(sx * hw.value, sy * hh.value, sz * hd.value);
    return [ox.value + px, oy.value + py];
  })
);

function isFront(a: number, b: number) { return a >= 4 || b >= 4; }
</script>
<template>
  <svg :width="svgW" :height="svgH" style="display:block">
    <line
      v-for="([a, b], i) in edges" :key="i"
      :x1="projected[a][0]" :y1="projected[a][1]"
      :x2="projected[b][0]" :y2="projected[b][1]"
      :stroke="color"
      :stroke-width="isFront(a, b) ? 1.5 : 0.75"
      :opacity="isFront(a, b) ? 0.85 : 0.4"
      :stroke-dasharray="isFront(a, b) ? undefined : '3 2'"
    />
    <circle
      v-for="(pt, i) in projected" :key="'p' + i"
      :cx="pt[0]" :cy="pt[1]" r="1" :fill="color" opacity="0.6"
    />
  </svg>
</template>
