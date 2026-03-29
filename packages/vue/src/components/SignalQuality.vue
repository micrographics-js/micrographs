<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{
  quality?: number;
  width?: number;
  height?: number;
  color?: string;
}>(), { quality: 3, width: 24, height: 16, color: "var(--accent)" });

const barsCount = 5;
const barW = computed(() => Math.floor((props.width - (barsCount - 1) * 2) / barsCount));
const clampedQ = computed(() => Math.max(0, Math.min(barsCount, props.quality)));

function barHeight(i: number) { return Math.round(props.height * (0.2 + (i / (barsCount - 1)) * 0.8)); }
function barX(i: number) { return i * (barW.value + 2); }
function barY(i: number) { return props.height - barHeight(i); }
function isActive(i: number) { return i < clampedQ.value; }
</script>
<template>
  <svg :width="width" :height="height" style="display:block" shape-rendering="crispEdges">
    <rect
      v-for="i in barsCount" :key="i"
      :x="barX(i - 1)"
      :y="barY(i - 1)"
      :width="barW"
      :height="barHeight(i - 1)"
      :fill="isActive(i - 1) ? color : 'var(--fg-dimmer)'"
      :opacity="isActive(i - 1) ? 0.9 : 0.2"
    />
  </svg>
</template>
