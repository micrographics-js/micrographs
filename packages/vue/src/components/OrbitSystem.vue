<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { createTicker } from "@micrographics/core";

interface Satellite { label: string; radius: number; speed: number; color?: string; size?: number; startAngle?: number; }
const props = withDefaults(defineProps<{ center?: string; satellites?: Satellite[]; size?: number; showRings?: boolean; showLabels?: boolean; glowCenter?: boolean; color?: string }>(),
  { center: "SYS", satellites: () => [{ label: "NODE·A", radius: 28, speed: 4000, color: "var(--accent)", startAngle: 0 }, { label: "NODE·B", radius: 44, speed: 7000, color: "var(--fg-dim)", startAngle: 120 }, { label: "NODE·C", radius: 58, speed: 11000, color: "var(--accent-amber)", startAngle: 240 }], size: 140, showRings: true, showLabels: true, glowCenter: true, color: "var(--accent)" });

const angles = ref<number[]>(props.satellites.map(s => s.startAngle ?? 0));
let cleanup: (() => void) | null = null;
onMounted(() => {
  cleanup = createTicker(40, () => {
    angles.value = angles.value.map((a, i) => (a + (360 / props.satellites[i].speed) * 40) % 360);
  });
});
onUnmounted(() => cleanup?.());
const cx = () => props.size / 2;
const cy = () => props.size / 2;
const satX = (i: number) => cx() + props.satellites[i].radius * Math.cos(angles.value[i] * Math.PI / 180);
const satY = (i: number) => cy() + props.satellites[i].radius * Math.sin(angles.value[i] * Math.PI / 180);
</script>
<template>
  <svg :width="size" :height="size" style="display:block; overflow:visible">
    <defs>
      <filter id="vorbit-glow" x="-200%" y="-200%" width="500%" height="500%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <circle v-if="showRings" v-for="(sat, i) in satellites" :key="`ring-${i}`"
      :cx="cx()" :cy="cy()" :r="sat.radius" fill="none" stroke="var(--fg-dimmer)" stroke-width="0.5" stroke-dasharray="3 5"/>
    <line :x1="cx()-6" :y1="cy()" :x2="cx()+6" :y2="cy()" stroke="var(--fg-dimmer)" stroke-width="0.5"/>
    <line :x1="cx()" :y1="cy()-6" :x2="cx()" :y2="cy()+6" stroke="var(--fg-dimmer)" stroke-width="0.5"/>
    <circle :cx="cx()" :cy="cy()" r="5" fill="none" :stroke="color" stroke-width="1" :filter="glowCenter ? 'url(#vorbit-glow)' : undefined"/>
    <circle :cx="cx()" :cy="cy()" r="2" :fill="color" :filter="glowCenter ? 'url(#vorbit-glow)' : undefined"/>
    <text v-if="showLabels" :x="cx()" :y="cy()-9" text-anchor="middle" :fill="color" font-size="6" font-family="monospace" letter-spacing="0.1em">{{ center }}</text>
    <g v-for="(sat, i) in satellites" :key="i" filter="url(#vorbit-glow)">
      <circle :cx="satX(i)" :cy="satY(i)" r="3" :fill="sat.color ?? 'var(--fg-dim)'"/>
      <text v-if="showLabels" :x="satX(i)+6" :y="satY(i)+3" :fill="sat.color ?? 'var(--fg-dim)'" font-size="6" font-family="monospace">{{ sat.label }}</text>
    </g>
  </svg>
</template>
