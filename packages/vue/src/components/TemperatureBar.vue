<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{
  value?: number;
  min?: number;
  max?: number;
  width?: number;
  height?: number;
  unit?: string;
  color?: string;
}>(), { value: 65, min: 0, max: 100, width: 12, height: 60, unit: "\u00b0C", color: "var(--accent)" });

const pct = computed(() => Math.max(0, Math.min(1, (props.value - props.min) / (props.max - props.min))));
const barH = computed(() => props.height - 18);
const filled = computed(() => Math.round(pct.value * barH.value));
const barY = computed(() => barH.value - filled.value);
const gradId = computed(() => `temp-grad-${props.height}`);
const activeColor = computed(() => {
  if (props.value > props.max * 0.75) return "var(--accent-red)";
  if (props.value > props.max * 0.5) return "var(--accent-amber)";
  return props.color;
});

const tickMarks = [0, 0.25, 0.5, 0.75, 1];
</script>
<template>
  <svg :width="width" :height="height" style="display:block" shape-rendering="crispEdges">
    <defs>
      <linearGradient :id="gradId" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--accent-red)" />
        <stop offset="50%" stop-color="var(--accent-amber)" />
        <stop offset="100%" :stop-color="color" />
      </linearGradient>
    </defs>
    <circle :cx="width / 2" :cy="barH + 6" r="5" :fill="activeColor" />
    <rect :x="width / 2 - 3" :y="0" width="6" :height="barH + 3" fill="var(--bg-secondary)" stroke="var(--border)" stroke-width="1" />
    <rect v-if="filled > 0" :x="width / 2 - 2" :y="barY + 1" width="4" :height="filled + 2" :fill="`url(#${gradId})`" />
    <line
      v-for="(t, i) in tickMarks" :key="i"
      :x1="width / 2 + 3" :y1="barH * (1 - t)"
      :x2="width / 2 + 5" :y2="barH * (1 - t)"
      stroke="var(--fg-dimmer)" stroke-width="1"
    />
    <text :x="width / 2" :y="height - 1" text-anchor="middle" fill="var(--fg-dim)" font-size="7" font-family="monospace">{{ value }}{{ unit }}</text>
  </svg>
</template>
