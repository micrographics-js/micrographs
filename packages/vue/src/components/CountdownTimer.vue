<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { createTicker } from "@micrographics-js/core";

const props = withDefaults(defineProps<{
  from?: number;
  color?: string;
  alertAt?: number;
}>(), { from: 300, color: "var(--accent)", alertAt: 60 });

const emit = defineEmits<{ end: [] }>();

const remaining = ref(props.from);

watch(() => props.from, (v) => { remaining.value = v; });

let cleanup: (() => void) | undefined;
onMounted(() => {
  if (remaining.value <= 0) { emit("end"); return; }
  cleanup = createTicker(1000, () => {
    remaining.value = Math.max(0, remaining.value - 1);
    if (remaining.value === 0) { emit("end"); }
  });
});
onUnmounted(() => { cleanup?.(); });

const display = computed(() => {
  const mins = Math.floor(remaining.value / 60);
  const secs = remaining.value % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
});

const isAlert = computed(() => remaining.value <= props.alertAt);
const activeColor = computed(() => isAlert.value ? "var(--accent-red)" : props.color);
</script>
<template>
  <span :style="{
    fontFamily: 'monospace',
    fontSize: '14px',
    color: activeColor,
    letterSpacing: '0.1em',
    fontVariantNumeric: 'tabular-nums',
  }">{{ display }}</span>
</template>
