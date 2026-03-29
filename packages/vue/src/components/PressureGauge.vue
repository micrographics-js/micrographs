<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{
  value?: number;
  min?: number;
  max?: number;
  size?: number;
  color?: string;
  unit?: string;
}>(), { value: 50, min: 0, max: 100, size: 60, color: "var(--accent)", unit: "PSI" });

const cx = computed(() => props.size / 2);
const cy = computed(() => props.size / 2);
const r = computed(() => props.size / 2 - 5);
const pct = computed(() => Math.max(0, Math.min(1, (props.value - props.min) / (props.max - props.min))));
const startAngle = 135;
const totalArc = 270;
const endAngle = computed(() => startAngle + pct.value * totalArc);

function toRad(deg: number) { return (deg * Math.PI) / 180; }
function arcPath(r2: number, start: number, end: number) {
  const s = toRad(start);
  const e = toRad(end);
  const x1 = cx.value + r2 * Math.cos(s);
  const y1 = cy.value + r2 * Math.sin(s);
  const x2 = cx.value + r2 * Math.cos(e);
  const y2 = cy.value + r2 * Math.sin(e);
  const large = end - start > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r2} ${r2} 0 ${large} 1 ${x2} ${y2}`;
}

const trackD = computed(() => arcPath(r.value, startAngle, startAngle + totalArc));
const fillD = computed(() => arcPath(r.value, startAngle, endAngle.value));

const ticks = computed(() =>
  Array.from({ length: 9 }, (_, i) => {
    const a = toRad(startAngle + (i / 8) * totalArc);
    const inner = r.value - 4;
    const outer = r.value + 1;
    return {
      x1: cx.value + inner * Math.cos(a),
      y1: cy.value + inner * Math.sin(a),
      x2: cx.value + outer * Math.cos(a),
      y2: cy.value + outer * Math.sin(a),
    };
  })
);
</script>
<template>
  <svg :width="size" :height="size" style="display:block">
    <path :d="trackD" fill="none" stroke="var(--fg-dimmer)" stroke-width="3" stroke-linecap="square" />
    <path v-if="pct > 0" :d="fillD" fill="none" :stroke="color" stroke-width="3" stroke-linecap="square" />
    <line v-for="(t, i) in ticks" :key="i"
      :x1="t.x1" :y1="t.y1" :x2="t.x2" :y2="t.y2"
      stroke="var(--fg-dimmer)" stroke-width="0.75"
    />
    <text :x="cx" :y="cy + 2" text-anchor="middle" :fill="color" font-size="10" font-family="monospace" font-weight="bold">{{ value }}</text>
    <text :x="cx" :y="cy + 10" text-anchor="middle" fill="var(--fg-dimmer)" font-size="7" font-family="monospace">{{ unit }}</text>
  </svg>
</template>
