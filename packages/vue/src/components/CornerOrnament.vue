<script setup lang="ts">
const props = withDefaults(defineProps<{ corner?: string; size?: number; color?: string; thickness?: number }>(),
  { corner: "tl", size: 16, color: "var(--fg-dimmer)", thickness: 1.5 });
const lines = () => {
  const s = props.size;
  if (props.corner === "tl") return [{x1:0,y1:s,x2:0,y2:0},{x1:0,y1:0,x2:s,y2:0}];
  if (props.corner === "tr") return [{x1:0,y1:0,x2:s,y2:0},{x1:s,y1:0,x2:s,y2:s}];
  if (props.corner === "bl") return [{x1:0,y1:0,x2:0,y2:s},{x1:0,y1:s,x2:s,y2:s}];
  return [{x1:s,y1:0,x2:s,y2:s},{x1:0,y1:s,x2:s,y2:s}];
};
</script>
<template>
  <svg :width="size + thickness" :height="size + thickness" style="display:block" shape-rendering="crispEdges">
    <line v-for="(l, i) in lines()" :key="i" v-bind="l" :stroke="color" :stroke-width="thickness" />
  </svg>
</template>
