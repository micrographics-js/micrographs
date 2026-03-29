<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { createTicker } from "@micrographics/core";

const props = withDefaults(defineProps<{
  value?: number;
  max?: number;
  size?: number;
  color?: string;
  unit?: string;
  animated?: boolean;
}>(), { value: 60, max: 100, size: 80, color: "var(--accent)", unit: "km/h", animated: false });

const current = ref(props.value);
watch(() => props.value, (v) => { current.value = v; });

let dir = 1;
let cleanup: (() => void) | undefined;
onMounted(() => {
  if (!props.animated) return;
  cleanup = createTicker(100, () => {
    const next = current.value + dir * 1.5;
    if (next >= props.max) dir = -1;
    if (next <= 0) dir = 1;
    current.value = Math.max(0, Math.min(props.max, next));
  });
});
onUnmounted(() => { cleanup?.(); });

const cx = computed(() => props.size / 2);
const cy = computed(() => props.size * 0.6);
const r = computed(() => props.size / 2 - 5);
const startAngle = 180;
const totalArc = 180;
const pct = computed(() => Math.max(0, Math.min(1, current.value / props.max)));

function toRad(deg: number) { return (deg * Math.PI) / 180; }
function arcPath(radius: number, start: number, sweep: number) {
  const s = toRad(start);
  const e = toRad(start + sweep);
  const x1 = cx.value + radius * Math.cos(s);
  const y1 = cy.value + radius * Math.sin(s);
  const x2 = cx.value + radius * Math.cos(e);
  const y2 = cy.value + radius * Math.sin(e);
  const large = sweep > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2}`;
}

const trackD = computed(() => arcPath(r.value, startAngle, totalArc));
const fillD = computed(() => arcPath(r.value, startAngle, pct.value * totalArc));

const needleAngle = computed(() => toRad(startAngle + pct.value * totalArc));
const nx = computed(() => cx.value + r.value * 0.75 * Math.cos(needleAngle.value));
const ny = computed(() => cy.value + r.value * 0.75 * Math.sin(needleAngle.value));
const nb = computed(() => toRad(needleAngle.value + Math.PI));
const nbx = computed(() => cx.value + r.value * 0.18 * Math.cos(nb.value));
const nby = computed(() => cy.value + r.value * 0.18 * Math.sin(nb.value));

const isHigh = computed(() => pct.value > 0.8);
const activeColor = computed(() => isHigh.value ? "var(--accent-red)" : pct.value > 0.6 ? "var(--accent-amber)" : props.color);

const ticks = computed(() =>
  Array.from({ length: 11 }, (_, i) => {
    const a = toRad(startAngle + (i / 10) * totalArc);
    const inner = r.value - 5;
    return {
      x1: cx.value + inner * Math.cos(a),
      y1: cy.value + inner * Math.sin(a),
      x2: cx.value + (r.value + 1) * Math.cos(a),
      y2: cy.value + (r.value + 1) * Math.sin(a),
      width: i % 5 === 0 ? 1.5 : 0.75,
    };
  })
);
</script>
<template>
  <svg :width="size" :height="size * 0.65" style="display:block">
    <path :d="trackD" fill="none" stroke="var(--fg-dimmer)" stroke-width="4" stroke-linecap="square" />
    <path v-if="pct > 0" :d="fillD" fill="none" :stroke="activeColor" stroke-width="4" stroke-linecap="square" />
    <line v-for="(t, i) in ticks" :key="i"
      :x1="t.x1" :y1="t.y1" :x2="t.x2" :y2="t.y2"
      stroke="var(--fg-dimmer)" :stroke-width="t.width"
    />
    <line :x1="nbx" :y1="nby" :x2="nx" :y2="ny" :stroke="activeColor" stroke-width="1.5" stroke-linecap="square" />
    <circle :cx="cx" :cy="cy" r="3" :fill="activeColor" />
    <text :x="cx" :y="cy - 6" text-anchor="middle" :fill="activeColor" font-size="11" font-family="monospace" font-weight="bold">{{ Math.round(current) }}</text>
    <text :x="cx" :y="cy + 3" text-anchor="middle" fill="var(--fg-dimmer)" font-size="7" font-family="monospace">{{ unit }}</text>
  </svg>
</template>
