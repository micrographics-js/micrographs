<script setup lang="ts">
import { computed } from "vue";
import { seeded } from "@micrographics/core";

const props = withDefaults(defineProps<{ seed?: number; width?: number; height?: number; color?: string }>(),
  { seed: 42, width: 60, height: 20, color: "var(--fg-dim)" });

const bars = computed(() => Array.from({ length: Math.floor(props.width / 2) }, (_, i) => ({
  x: i * 2, w: seeded(props.seed + i) > 0.5 ? 2 : 1,
  h: Math.round(props.height * (0.6 + seeded(props.seed + i + 100) * 0.4)),
})));
</script>
<template>
  <svg :width="width" :height="height" style="display:block" shape-rendering="crispEdges">
    <rect v-for="(b, i) in bars" :key="i" :x="b.x" :y="height - b.h" :width="b.w" :height="b.h" :fill="color" />
  </svg>
</template>
