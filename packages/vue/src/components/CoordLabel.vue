<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{
  x?: number;
  y?: number;
  z?: number;
  color?: string;
  precision?: number;
}>(), { x: 1.23, y: 45.67, z: -2.1, color: "var(--fg)", precision: 2 });

function fmt(n: number) {
  const sign = n < 0 ? "\u2212" : " ";
  const abs = Math.abs(n).toFixed(props.precision);
  const [int, dec] = abs.split(".");
  return `${sign}${int.padStart(3, "0")}.${dec}`;
}

const xFmt = computed(() => fmt(props.x));
const yFmt = computed(() => fmt(props.y));
const zFmt = computed(() => fmt(props.z));
</script>
<template>
  <span :style="{ fontFamily: 'monospace', fontSize: '10px', display: 'inline-flex', gap: '6px' }">
    <span><span style="color: var(--fg-dimmer)">X:</span><span :style="{ color }">{{ xFmt }}</span></span>
    <span><span style="color: var(--fg-dimmer)">Y:</span><span :style="{ color }">{{ yFmt }}</span></span>
    <span><span style="color: var(--fg-dimmer)">Z:</span><span :style="{ color }">{{ zFmt }}</span></span>
  </span>
</template>
