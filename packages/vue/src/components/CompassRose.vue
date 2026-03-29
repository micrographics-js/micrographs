<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { createTicker } from "@micrographics-js/core";

const props = withDefaults(defineProps<{
  heading?: number;
  size?: number;
  color?: string;
  animated?: boolean;
  speed?: number;
}>(), { heading: 0, size: 60, color: "var(--accent)", animated: false, speed: 80 });

const current = ref(props.heading);
watch(() => props.heading, (v) => { current.value = v; });

let cleanup: (() => void) | undefined;
onMounted(() => {
  if (!props.animated) return;
  cleanup = createTicker(props.speed, () => { current.value = (current.value + 1) % 360; });
});
onUnmounted(() => { cleanup?.(); });

const cx = computed(() => props.size / 2);
const cy = computed(() => props.size / 2);
const r = computed(() => props.size / 2 - 4);

function toRad(deg: number) { return (deg * Math.PI) / 180; }

const needleAngle = computed(() => toRad(current.value - 90));

const dirs = ["N", "E", "S", "W"];
const dirAngles = [0, 90, 180, 270];

const tickLines = computed(() =>
  Array.from({ length: 36 }, (_, i) => {
    const a = toRad(i * 10);
    const isMajor = i % 9 === 0;
    const inner = r.value - (isMajor ? 5 : 2);
    return {
      x1: cx.value + inner * Math.cos(a),
      y1: cy.value + inner * Math.sin(a),
      x2: cx.value + r.value * Math.cos(a),
      y2: cy.value + r.value * Math.sin(a),
      width: isMajor ? 1 : 0.5,
    };
  })
);

const dirLabels = computed(() =>
  dirs.map((d, i) => {
    const a = toRad(dirAngles[i] - 90);
    const labelR = r.value - 9;
    return {
      label: d,
      x: cx.value + labelR * Math.cos(a),
      y: cy.value + labelR * Math.sin(a) + 3,
      fill: d === "N" ? "var(--accent-red)" : "var(--fg-dim)",
    };
  })
);

const needleTip = computed(() => ({
  x: cx.value + r.value * 0.65 * Math.cos(needleAngle.value),
  y: cy.value + r.value * 0.65 * Math.sin(needleAngle.value),
}));
const needleTail = computed(() => ({
  x: cx.value - r.value * 0.4 * Math.cos(needleAngle.value),
  y: cy.value - r.value * 0.4 * Math.sin(needleAngle.value),
}));
const needleBack = computed(() => ({
  x: cx.value - r.value * 0.3 * Math.cos(needleAngle.value),
  y: cy.value - r.value * 0.3 * Math.sin(needleAngle.value),
}));
</script>
<template>
  <svg :width="size" :height="size" style="display:block">
    <circle :cx="cx" :cy="cy" :r="r" fill="none" stroke="var(--border)" stroke-width="1" />
    <circle :cx="cx" :cy="cy" :r="r * 0.6" fill="none" stroke="var(--fg-dimmer)" stroke-width="0.5" opacity="0.4" />
    <line v-for="(t, i) in tickLines" :key="i"
      :x1="t.x1" :y1="t.y1" :x2="t.x2" :y2="t.y2"
      stroke="var(--fg-dimmer)" :stroke-width="t.width"
    />
    <text v-for="d in dirLabels" :key="d.label"
      :x="d.x" :y="d.y" text-anchor="middle" :fill="d.fill" font-size="7" font-family="monospace" font-weight="bold"
    >{{ d.label }}</text>
    <line :x1="needleTail.x" :y1="needleTail.y" :x2="needleTip.x" :y2="needleTip.y" :stroke="color" stroke-width="1.5" stroke-linecap="square" />
    <line :x1="cx" :y1="cy" :x2="needleBack.x" :y2="needleBack.y" stroke="var(--accent-red)" stroke-width="1.5" stroke-linecap="square" />
    <circle :cx="cx" :cy="cy" r="2.5" fill="var(--bg)" :stroke="color" stroke-width="1" />
  </svg>
</template>
