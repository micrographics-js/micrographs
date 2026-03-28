<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{ value?: number; min?: number; max?: number; label?: string; color?: string; width?: number; height?: number }>(),
  { value: 65, min: 0, max: 100, label: "RPM", color: "var(--accent)", width: 80, height: 50 });

const cx = computed(() => props.width / 2);
const cy = computed(() => props.height - 8);
const r = computed(() => Math.min(cx.value - 4, cy.value - 4));
const pct = computed(() => Math.max(0, Math.min(1, (props.value - props.min) / (props.max - props.min))));
const angle = computed(() => -180 + pct.value * 180);
const rad = computed(() => angle.value * Math.PI / 180);
const nx = computed(() => cx.value + r.value * 0.75 * Math.cos(rad.value));
const ny = computed(() => cy.value + r.value * 0.75 * Math.sin(rad.value));
const arc = (radius: number, start: number, end: number) => {
  const s = start * Math.PI / 180, e = end * Math.PI / 180;
  return `M ${cx.value + radius * Math.cos(s)} ${cy.value + radius * Math.sin(s)} A ${radius} ${radius} 0 0 1 ${cx.value + radius * Math.cos(e)} ${cy.value + radius * Math.sin(e)}`;
};
</script>
<template>
  <svg :width="width" :height="height" style="display:block">
    <path :d="arc(r, -180, 0)" fill="none" stroke="var(--fg-dimmer)" stroke-width="2" />
    <path :d="arc(r, -180, -180 + pct * 180)" fill="none" :stroke="color" stroke-width="2" />
    <line :x1="cx" :y1="cy" :x2="nx" :y2="ny" :stroke="color" stroke-width="1.5" />
    <circle :cx="cx" :cy="cy" r="3" :fill="color" />
    <text :x="cx" :y="cy - r - 4" text-anchor="middle" fill="var(--fg-dim)" font-size="8" font-family="monospace">{{ label }}</text>
    <text :x="cx" :y="height - 2" text-anchor="middle" :fill="color" font-size="9" font-family="monospace">{{ value }}</text>
  </svg>
</template>
