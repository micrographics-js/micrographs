<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{
  value?: number;
  width?: number;
  height?: number;
  min?: number;
  max?: number;
}>(), { value: 50, width: 80, height: 8, min: 0, max: 100 });

const pct = computed(() => Math.max(0, Math.min(1, (props.value - props.min) / (props.max - props.min))));
const filled = computed(() => Math.round(pct.value * props.width));
const gradId = computed(() => `thermal-grad-${props.width}`);
</script>
<template>
  <svg :width="width" :height="height" style="display:block" shape-rendering="crispEdges">
    <defs>
      <linearGradient :id="gradId" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#4488ff" />
        <stop offset="30%" stop-color="#44cc88" />
        <stop offset="65%" stop-color="var(--accent-amber)" />
        <stop offset="100%" stop-color="var(--accent-red)" />
      </linearGradient>
    </defs>
    <rect :x="0" :y="0" :width="width" :height="height" fill="var(--bg-secondary)" />
    <rect :x="0" :y="0" :width="filled" :height="height" :fill="`url(#${gradId})`" />
    <rect :x="0" :y="0" :width="width" :height="height" fill="none" stroke="var(--border)" stroke-width="1" />
  </svg>
</template>
