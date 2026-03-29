<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{
  width?: number;
  height?: number;
  color?: string;
  divisions?: number;
  showLabels?: boolean;
}>(), { width: 120, height: 16, color: "var(--fg-dim)", divisions: 10, showLabels: true });

const subdivisions = 5;
const totalTicks = computed(() => props.divisions * subdivisions);
const tickSpacing = computed(() => (props.width - 1) / totalTicks.value);
const majorH = computed(() => Math.floor(props.height * 0.65));
const minorH = computed(() => Math.floor(props.height * 0.35));

function tickX(i: number) { return Math.round(i * tickSpacing.value); }
function isMajor(i: number) { return i % subdivisions === 0; }
function tickH(i: number) { return isMajor(i) ? majorH.value : minorH.value; }
function tickLabel(i: number) { return isMajor(i) ? String(i / subdivisions) : null; }
</script>
<template>
  <svg :width="width" :height="height" style="display:block" shape-rendering="crispEdges">
    <line :x1="0" :y1="0" :x2="width" :y2="0" :stroke="color" stroke-width="1" />
    <g v-for="i in totalTicks + 1" :key="i">
      <line
        :x1="tickX(i - 1)" :y1="0" :x2="tickX(i - 1)" :y2="tickH(i - 1)"
        :stroke="color" :stroke-width="isMajor(i - 1) ? 1 : 0.5"
      />
      <text
        v-if="showLabels && tickLabel(i - 1) !== null"
        :x="tickX(i - 1)" :y="height - 1"
        text-anchor="middle" :fill="color" font-size="6" font-family="monospace" opacity="0.7"
      >{{ tickLabel(i - 1) }}</text>
    </g>
  </svg>
</template>
