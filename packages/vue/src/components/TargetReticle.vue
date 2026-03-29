<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { createTicker } from "@micrographics-js/core";

const props = withDefaults(defineProps<{ size?: number; color?: string; label?: string; animate?: boolean; rings?: number; crosshair?: boolean; speed?: number }>(),
  { size: 64, color: "var(--accent)", animate: true, rings: 2, crosshair: true, speed: 3000 });

const rotation = ref(0);
const pulse = ref(1);
let cleanup: (() => void) | null = null;
onMounted(() => {
  if (!props.animate) return;
  cleanup = createTicker(40, () => {
    rotation.value = (rotation.value + (360 / props.speed) * 40) % 360;
    pulse.value = 0.5 + 0.5 * Math.abs(Math.sin(Date.now() / 800));
  });
});
onUnmounted(() => cleanup?.());
const cx = () => props.size / 2;
const cy = () => props.size / 2;
const gap = 8;
const bracketPt = (baseAngle: number) => {
  const angle = baseAngle + rotation.value;
  const rad = angle * Math.PI / 180;
  const r = cx() - 4, len = 6;
  const perpRad = rad + Math.PI / 2;
  const bx = cx() + r * Math.cos(rad), by = cy() + r * Math.sin(rad);
  return { bx, by, ex: bx + len * Math.cos(rad), ey: by + len * Math.sin(rad), px: bx + len * Math.cos(perpRad), py: by + len * Math.sin(perpRad) };
};
</script>
<template>
  <svg :width="size" :height="size" style="display:block; overflow:visible">
    <defs>
      <filter id="vreticle-glow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <circle v-for="i in rings" :key="i"
      :cx="cx()" :cy="cy()" :r="cx()-2-(i-1)*8" fill="none" :stroke="color"
      stroke-width="0.5" :opacity="0.3-(i-1)*0.1" :stroke-dasharray="i===1 ? undefined : '4 8'"/>
    <g v-for="(angle, qi) in [0,90,180,270]" :key="qi" filter="url(#vreticle-glow)">
      <line :x1="bracketPt(angle).bx" :y1="bracketPt(angle).by" :x2="bracketPt(angle).ex" :y2="bracketPt(angle).ey" :stroke="color" stroke-width="1.5"/>
      <line :x1="bracketPt(angle).bx" :y1="bracketPt(angle).by" :x2="bracketPt(angle).px" :y2="bracketPt(angle).py" :stroke="color" stroke-width="1.5"/>
    </g>
    <template v-if="crosshair">
      <line :x1="2" :y1="cy()" :x2="cx()-gap" :y2="cy()" :stroke="color" stroke-width="0.75" opacity="0.6"/>
      <line :x1="cx()+gap" :y1="cy()" :x2="size-2" :y2="cy()" :stroke="color" stroke-width="0.75" opacity="0.6"/>
      <line :x1="cx()" :y1="2" :x2="cx()" :y2="cy()-gap" :stroke="color" stroke-width="0.75" opacity="0.6"/>
      <line :x1="cx()" :y1="cy()+gap" :x2="cx()" :y2="size-2" :stroke="color" stroke-width="0.75" opacity="0.6"/>
    </template>
    <circle :cx="cx()" :cy="cy()" r="2" :fill="color" :opacity="pulse" filter="url(#vreticle-glow)"/>
    <text v-if="label" :x="size-2" :y="cy()+3" text-anchor="end" :fill="color" font-size="6" font-family="monospace" opacity="0.7">{{ label }}</text>
  </svg>
</template>
