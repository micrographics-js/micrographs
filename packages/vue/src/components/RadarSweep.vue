<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { createTicker } from "@micrographics/core";

const props = withDefaults(defineProps<{
  size?: number;
  color?: string;
  speed?: number;
  pings?: number;
}>(), { size: 60, color: "var(--accent)", speed: 40, pings: 3 });

interface Ping { x: number; y: number; age: number; }

const angle = ref(0);
const pingsList = ref<Ping[]>([]);

let cleanup: (() => void) | undefined;
onMounted(() => {
  const r = props.size / 2 - 4;
  const cx = props.size / 2;
  const cy = props.size / 2;
  cleanup = createTicker(props.speed, () => {
    const next = (angle.value + 3) % 360;
    if (Math.random() < 0.03) {
      const dist = Math.random() * r * 0.85;
      const pingAngle = next * (Math.PI / 180);
      pingsList.value = [
        ...pingsList.value.slice(-(props.pings - 1)),
        { x: cx + dist * Math.cos(pingAngle), y: cy + dist * Math.sin(pingAngle), age: 0 },
      ];
    }
    pingsList.value = pingsList.value.map(p => ({ ...p, age: p.age + 1 })).filter(p => p.age < 60);
    angle.value = next;
  });
});
onUnmounted(() => { cleanup?.(); });

const cx = computed(() => props.size / 2);
const cy = computed(() => props.size / 2);
const r = computed(() => props.size / 2 - 4);
const rad = computed(() => (angle.value * Math.PI) / 180);
const x2 = computed(() => cx.value + r.value * Math.cos(rad.value));
const y2 = computed(() => cy.value + r.value * Math.sin(rad.value));
const gradId = computed(() => `radar-sweep-${props.size}`);
const rings = [0.33, 0.66, 1];
</script>
<template>
  <svg :width="size" :height="size" style="display:block">
    <defs>
      <radialGradient :id="gradId" cx="50%" cy="50%" r="50%">
        <stop offset="0%" :stop-color="color" stop-opacity="0.15" />
        <stop offset="100%" :stop-color="color" stop-opacity="0" />
      </radialGradient>
    </defs>
    <circle :cx="cx" :cy="cy" :r="r" fill="var(--bg-secondary)" stroke="var(--border)" stroke-width="1" />
    <circle v-for="(f, i) in rings" :key="i" :cx="cx" :cy="cy" :r="r * f" fill="none" stroke="var(--fg-dimmer)" stroke-width="0.5" opacity="0.4" />
    <line :x1="cx - r" :y1="cy" :x2="cx + r" :y2="cy" stroke="var(--fg-dimmer)" stroke-width="0.5" opacity="0.3" />
    <line :x1="cx" :y1="cy - r" :x2="cx" :y2="cy + r" stroke="var(--fg-dimmer)" stroke-width="0.5" opacity="0.3" />
    <circle :cx="cx" :cy="cy" :r="r" :fill="`url(#${gradId})`" opacity="0.6" />
    <circle v-for="(p, i) in pingsList" :key="i" :cx="p.x" :cy="p.y" r="1.5" :fill="color" :opacity="Math.max(0, 1 - p.age / 60)" />
    <line :x1="cx" :y1="cy" :x2="x2" :y2="y2" :stroke="color" stroke-width="1.5" opacity="0.9" />
    <circle :cx="cx" :cy="cy" r="2" :fill="color" />
  </svg>
</template>
