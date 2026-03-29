<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

const props = withDefaults(defineProps<{
  text?: string;
  speed?: number;
  width?: number;
  color?: string;
  separator?: string;
}>(), {
  text: "SYSTEM ONLINE \u00b7 DATA STREAM ACTIVE \u00b7 ALL NODES NOMINAL",
  speed: 40,
  width: 120,
  color: "var(--fg-dim)",
  separator: " \u00b7\u2500\u2500 ",
});

const offset = ref(0);
let rafId = 0;
let lastTime = 0;

const fullText = computed(() => props.text + props.separator);
const doubled = computed(() => fullText.value + fullText.value);
const charW = 6.5;
const totalW = computed(() => fullText.value.length * charW);
const textX = computed(() => -offset.value);

onMounted(() => {
  const tick = (ts: number) => {
    if (lastTime === 0) lastTime = ts;
    const delta = ts - lastTime;
    if (delta >= props.speed) {
      offset.value = (offset.value + 1) % Math.ceil(totalW.value);
      lastTime = ts;
    }
    rafId = requestAnimationFrame(tick);
  };
  rafId = requestAnimationFrame(tick);
});
onUnmounted(() => { cancelAnimationFrame(rafId); });
</script>
<template>
  <div :style="{ width: `${width}px`, overflow: 'hidden', display: 'inline-block' }">
    <svg :width="width" height="12" style="display:block">
      <text
        :x="textX"
        y="9"
        :fill="color"
        font-size="9"
        font-family="monospace"
        style="white-space: pre"
      >{{ doubled }}</text>
    </svg>
  </div>
</template>
