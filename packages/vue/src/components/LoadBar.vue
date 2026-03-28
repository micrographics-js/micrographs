<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const props = withDefaults(defineProps<{ segments?: number; color?: string; duration?: number; width?: number; height?: number }>(),
  { segments: 12, color: "var(--accent)", duration: 1200, width: 96, height: 8 });

const filled = ref(0);
let id: ReturnType<typeof setInterval> | null = null;
onMounted(() => {
  filled.value = 0;
  const step = props.duration / props.segments;
  let i = 0;
  id = setInterval(() => { i++; filled.value = i; if (i >= props.segments) clearInterval(id!); }, step);
});
onUnmounted(() => { if (id) clearInterval(id); });

const segW = () => Math.floor(props.width / props.segments) - 1;
</script>
<template>
  <svg :width="width" :height="height" style="display:block" shape-rendering="crispEdges">
    <rect v-for="i in segments" :key="i"
      :x="(i-1) * (segW() + 1)" y="0" :width="segW()" :height="height"
      :fill="i <= filled ? color : 'var(--fg-dimmer)'"
      :opacity="i <= filled ? 1 : 0.2"
    />
  </svg>
</template>
