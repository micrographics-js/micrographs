<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { createTicker } from "@micrographics-js/core";

const props = withDefaults(defineProps<{
  size?: number;
  color?: string;
  speed?: number;
  targets?: number;
}>(), { size: 80, color: "var(--accent)", speed: 35, targets: 4 });

interface Target { id: number; x: number; y: number; age: number; maxAge: number; }

let _tid = 0;
const angle = ref(0);
const targetsList = ref<Target[]>([]);

let cleanup: (() => void) | undefined;
onMounted(() => {
  const cx = props.size / 2;
  const cy = props.size / 2;
  const r = props.size / 2 - 6;
  cleanup = createTicker(props.speed, () => {
    const next = (angle.value + 2) % 360;
    if (targetsList.value.length < props.targets && Math.random() < 0.015) {
      const dist = 0.25 + Math.random() * 0.65;
      const ta = (next * Math.PI) / 180;
      targetsList.value = [
        ...targetsList.value,
        { id: _tid++, x: cx + dist * r * Math.cos(ta), y: cy + dist * r * Math.sin(ta), age: 0, maxAge: 80 + Math.random() * 60 },
      ];
    }
    targetsList.value = targetsList.value.map(t => ({ ...t, age: t.age + 1 })).filter(t => t.age < t.maxAge);
    angle.value = next;
  });
});
onUnmounted(() => { cleanup?.(); });

const cx = computed(() => props.size / 2);
const cy = computed(() => props.size / 2);
const r = computed(() => props.size / 2 - 6);
const rad = computed(() => (angle.value * Math.PI) / 180);
const rings = [0.3, 0.6, 1];
</script>
<template>
  <svg :width="size" :height="size" style="display:block">
    <rect :x="0" :y="0" :width="size" :height="size" fill="var(--bg-secondary)" />
    <circle v-for="(f, i) in rings" :key="i" :cx="cx" :cy="cy" :r="r * f" fill="none" :stroke="color" stroke-width="0.5" opacity="0.2" />
    <line :x1="0" :y1="cy" :x2="size" :y2="cy" :stroke="color" stroke-width="0.5" opacity="0.2" />
    <line :x1="cx" :y1="0" :x2="cx" :y2="size" :stroke="color" stroke-width="0.5" opacity="0.2" />
    <line :x1="cx - r * 0.7" :y1="cy - r * 0.7" :x2="cx + r * 0.7" :y2="cy + r * 0.7" :stroke="color" stroke-width="0.3" opacity="0.12" />
    <line :x1="cx + r * 0.7" :y1="cy - r * 0.7" :x2="cx - r * 0.7" :y2="cy + r * 0.7" :stroke="color" stroke-width="0.3" opacity="0.12" />
    <g v-for="t in targetsList" :key="t.id" :opacity="Math.max(0, 1 - t.age / t.maxAge)">
      <rect :x="t.x - 3" :y="t.y - 3" width="6" height="6" fill="none" :stroke="color" stroke-width="1" />
      <circle :cx="t.x" :cy="t.y" r="1" :fill="color" />
    </g>
    <line :x1="cx" :y1="cy" :x2="cx + r * Math.cos(rad)" :y2="cy + r * Math.sin(rad)" :stroke="color" stroke-width="1.5" opacity="0.8" />
    <circle :cx="cx" :cy="cy" r="2" :fill="color" />
    <rect :x="0" :y="0" :width="size" :height="size" fill="none" stroke="var(--border)" stroke-width="1" />
  </svg>
</template>
