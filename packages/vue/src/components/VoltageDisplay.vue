<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{
  voltage?: number;
  min?: number;
  max?: number;
  width?: number;
  height?: number;
  unit?: string;
}>(), { voltage: 5, min: 0, max: 12, width: 16, height: 40, unit: "V" });

const pct = computed(() => Math.max(0, Math.min(1, (props.voltage - props.min) / (props.max - props.min))));
const segments = 8;
const segH = computed(() => Math.floor((props.height - 14) / segments) - 1);
const filled = computed(() => Math.round(pct.value * segments));

function segY(i: number) { return props.height - 14 - (i + 1) * (segH.value + 1); }
function segColor(i: number) {
  const ratio = i / segments;
  if (ratio > 0.75) return "var(--accent-red)";
  if (ratio > 0.5) return "var(--accent-amber)";
  return "var(--accent)";
}
</script>
<template>
  <svg :width="width" :height="height" style="display:block" shape-rendering="crispEdges">
    <rect :x="0" :y="0" :width="width" :height="height - 10" fill="var(--bg-secondary)" stroke="var(--border)" stroke-width="1" />
    <rect
      v-for="i in segments" :key="i"
      :x="2"
      :y="segY(i - 1)"
      :width="width - 4"
      :height="segH"
      :fill="(i - 1) < filled ? segColor(i - 1) : 'var(--fg-dimmer)'"
      :opacity="(i - 1) < filled ? 0.9 : 0.15"
    />
    <text :x="width / 2" :y="height - 1" text-anchor="middle" fill="var(--fg-dim)" font-size="7" font-family="monospace">{{ voltage }}{{ unit }}</text>
  </svg>
</template>
