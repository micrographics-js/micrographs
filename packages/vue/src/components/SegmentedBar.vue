<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{
  value?: number;
  segments?: number;
  width?: number;
  height?: number;
  color?: string;
  showLabel?: boolean;
}>(), { value: 60, segments: 10, width: 80, height: 8, color: "var(--accent)", showLabel: false });

const filled = computed(() => Math.round((props.value / 100) * props.segments));
const segW = computed(() => Math.floor((props.width - (props.segments - 1)) / props.segments));
const totalW = computed(() => props.segments * segW.value + (props.segments - 1));
</script>
<template>
  <div :style="{ display: 'inline-flex', flexDirection: 'column', gap: '2px' }">
    <svg :width="totalW" :height="height" style="display:block" shape-rendering="crispEdges">
      <rect
        v-for="i in segments" :key="i"
        :x="(i - 1) * (segW + 1)"
        :y="0"
        :width="segW"
        :height="height"
        :fill="(i - 1) < filled ? color : 'var(--fg-dimmer)'"
        :opacity="(i - 1) < filled ? 0.9 : 0.2"
      />
    </svg>
    <span v-if="showLabel" :style="{ fontFamily: 'monospace', fontSize: '8px', color: 'var(--fg-dim)', textAlign: 'right' }">{{ value }}%</span>
  </div>
</template>
