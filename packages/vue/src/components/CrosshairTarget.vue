<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { createTicker } from "@micrographics-js/core";

const props = withDefaults(defineProps<{
  size?: number;
  color?: string;
  animated?: boolean;
  locked?: boolean;
}>(), { size: 40, color: "var(--accent)", animated: false, locked: false });

const rotation = ref(0);
let cleanup: (() => void) | undefined;
onMounted(() => {
  if (!props.animated) return;
  cleanup = createTicker(60, () => { rotation.value = (rotation.value + 1) % 360; });
});
onUnmounted(() => { cleanup?.(); });

const cx = computed(() => props.size / 2);
const cy = computed(() => props.size / 2);
const r = computed(() => props.size / 2 - 2);
const innerR = computed(() => r.value * 0.22);
const gap = computed(() => r.value * 0.3);
const centerColor = computed(() => props.locked ? "var(--accent-red)" : "none");

const rotatingLines = computed(() =>
  [0, 90, 180, 270].map(a => {
    const rad = (a * Math.PI) / 180;
    return {
      x1: cx.value + (innerR.value + gap.value * 0.5) * Math.cos(rad),
      y1: cy.value + (innerR.value + gap.value * 0.5) * Math.sin(rad),
      x2: cx.value + r.value * Math.cos(rad),
      y2: cy.value + r.value * Math.sin(rad),
    };
  })
);

const cornerArcs = computed(() =>
  [45, 135, 225, 315].map(a => {
    const arcLen = 12;
    const a1 = ((a - arcLen / 2) * Math.PI) / 180;
    const a2 = ((a + arcLen / 2) * Math.PI) / 180;
    const ax1 = cx.value + r.value * Math.cos(a1);
    const ay1 = cy.value + r.value * Math.sin(a1);
    const ax2 = cx.value + r.value * Math.cos(a2);
    const ay2 = cy.value + r.value * Math.sin(a2);
    return `M ${ax1} ${ay1} A ${r.value} ${r.value} 0 0 1 ${ax2} ${ay2}`;
  })
);
</script>
<template>
  <svg :width="size" :height="size" style="display:block">
    <g :transform="`rotate(${rotation}, ${cx}, ${cy})`">
      <line v-for="(l, i) in rotatingLines" :key="i"
        :x1="l.x1" :y1="l.y1" :x2="l.x2" :y2="l.y2"
        :stroke="color" stroke-width="1.5"
      />
      <path v-for="(d, i) in cornerArcs" :key="'a' + i"
        :d="d" fill="none" :stroke="color" stroke-width="1" opacity="0.5"
      />
    </g>
    <line :x1="cx - r" :y1="cy" :x2="cx - innerR" :y2="cy" :stroke="color" stroke-width="1" />
    <line :x1="cx + innerR" :y1="cy" :x2="cx + r" :y2="cy" :stroke="color" stroke-width="1" />
    <line :x1="cx" :y1="cy - r" :x2="cx" :y2="cy - innerR" :stroke="color" stroke-width="1" />
    <line :x1="cx" :y1="cy + innerR" :x2="cx" :y2="cy + r" :stroke="color" stroke-width="1" />
    <circle :cx="cx" :cy="cy" :r="innerR" :fill="centerColor" :stroke="color" stroke-width="1" :opacity="locked ? 0.8 : 1" />
    <circle v-if="locked" :cx="cx" :cy="cy" r="2" fill="var(--bg)" />
  </svg>
</template>
