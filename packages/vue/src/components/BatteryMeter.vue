<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { createTicker } from "@micrographics/core";

const props = withDefaults(defineProps<{ level?: number; charging?: boolean; width?: number; height?: number }>(),
  { level: 0.75, charging: false, width: 28, height: 14 });

const animLevel = ref(props.charging ? 0 : props.level);
let cleanup: (() => void) | null = null;
onMounted(() => {
  if (!props.charging) { animLevel.value = props.level; return; }
  cleanup = createTicker(400, () => { animLevel.value = (animLevel.value + 0.2) % 1.2; });
});
onUnmounted(() => cleanup?.());

const segments = 5;
const bodyW = () => props.width - 4;
const segW = () => Math.floor((bodyW() - segments + 1) / segments);
const filled = () => Math.round(Math.min(animLevel.value, 1) * segments);
const color = () => props.level < 0.2 ? "var(--accent-red)" : props.level < 0.4 ? "var(--accent-amber)" : "var(--accent)";
</script>
<template>
  <svg :width="width" :height="height" style="display:block" shape-rendering="crispEdges">
    <rect x="0" y="1" :width="bodyW()" :height="height - 2" fill="none" stroke="var(--fg-dim)" stroke-width="1" />
    <rect :x="bodyW()" :y="Math.floor(height / 4)" width="4" :height="Math.floor(height / 2)" fill="var(--fg-dim)" />
    <rect v-for="i in segments" :key="i"
      :x="2 + (i-1) * (segW() + 1)" y="3" :width="segW()" :height="height - 6"
      :fill="i <= filled() ? color() : 'none'"
      :stroke="i <= filled() ? 'none' : 'var(--fg-dimmer)'"
      stroke-width="0.5"
    />
  </svg>
</template>
