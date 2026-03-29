<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";

const props = withDefaults(defineProps<{
  running?: boolean;
  color?: string;
}>(), { running: false, color: "var(--accent)" });

const elapsed = ref(0);
let startTime: number | null = null;
let accumulated = 0;
let rafId = 0;

function tick() {
  if (startTime !== null) {
    elapsed.value = accumulated + (performance.now() - startTime);
  }
  rafId = requestAnimationFrame(tick);
}

function startTimer() {
  startTime = performance.now();
  rafId = requestAnimationFrame(tick);
}

function stopTimer() {
  if (startTime !== null) {
    accumulated += performance.now() - startTime;
    startTime = null;
  }
  cancelAnimationFrame(rafId);
}

onMounted(() => { if (props.running) startTimer(); });
onUnmounted(() => { cancelAnimationFrame(rafId); });

watch(() => props.running, (val) => {
  if (val) startTimer();
  else stopTimer();
});

const pad2 = (n: number) => String(n).padStart(2, "0");
const hours = computed(() => Math.floor(Math.floor(elapsed.value / 1000) / 3600));
const mins = computed(() => Math.floor((Math.floor(elapsed.value / 1000) % 3600) / 60));
const secs = computed(() => Math.floor(elapsed.value / 1000) % 60);
const millis = computed(() => Math.floor((elapsed.value % 1000) / 10));
</script>
<template>
  <span :style="{ fontFamily: 'monospace', fontSize: '13px', color, letterSpacing: '0.06em' }">
    {{ pad2(hours) }}:{{ pad2(mins) }}:{{ pad2(secs) }}<span :style="{ fontSize: '10px', color: 'var(--fg-dim)', marginLeft: '1px' }">:{{ pad2(millis) }}</span>
  </span>
</template>
