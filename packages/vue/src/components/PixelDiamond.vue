<script setup lang="ts">
import { computed } from "vue";
import { pixelDiamondPath } from "@micrographics/core";

const props = withDefaults(defineProps<{ size?: number; color?: string; glow?: boolean }>(),
  { size: 2, color: "var(--accent)", glow: true });

const svgSize = computed(() => props.size * 6 + props.size * 4 * 2);
const cx = computed(() => svgSize.value / 2);
const path = computed(() => pixelDiamondPath(cx.value, cx.value, props.size));
</script>
<template>
  <svg :width="svgSize" :height="svgSize" style="display:block" shape-rendering="crispEdges">
    <defs v-if="glow">
      <filter id="vdiamond-glow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <path :d="path" :fill="color" :filter="glow ? 'url(#vdiamond-glow)' : undefined" />
  </svg>
</template>
