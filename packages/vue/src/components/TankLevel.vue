<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { createTicker } from "@micrographics/core";

const props = withDefaults(defineProps<{ level?: number; color?: string; width?: number; height?: number; label?: string; animated?: boolean }>(),
  { level: 0.6, color: "var(--accent)", width: 24, height: 48, label: "FUEL", animated: true });

const wave = ref(0);
let cleanup: (() => void) | null = null;
onMounted(() => { if (props.animated) cleanup = createTicker(100, () => { wave.value += 0.1; }); });
onUnmounted(() => cleanup?.());
const fillH = () => Math.round(props.level * (props.height - 4));
const waveOffset = () => Math.sin(wave.value) * 2;
</script>
<template>
  <div style="display:inline-flex; flex-direction:column; align-items:center; gap:2px">
    <svg :width="width" :height="height" style="display:block" shape-rendering="crispEdges">
      <rect x="1" y="1" :width="width - 2" :height="height - 2" fill="none" stroke="var(--fg-dim)" stroke-width="1" />
      <rect x="2" :y="height - 2 - fillH() + waveOffset()" :width="width - 4" :height="fillH()" :fill="color" opacity="0.8" />
    </svg>
    <span style="font-family:monospace; font-size:8px; color:var(--fg-dimmer)">{{ props.label }}</span>
  </div>
</template>
