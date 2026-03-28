<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const props = withDefaults(defineProps<{ startMs?: number; color?: string }>(), { color: "var(--fg)" });
const mountTime = Date.now();
const elapsed = ref(0);
let id: ReturnType<typeof setInterval> | null = null;
onMounted(() => {
  const start = props.startMs ?? mountTime;
  id = setInterval(() => { elapsed.value = Date.now() - start; }, 1000);
});
onUnmounted(() => { if (id) clearInterval(id); });

const format = (ms: number) => {
  const s = Math.floor(ms / 1000);
  const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  return [d, h, m, sec].map(v => String(v).padStart(2, "0")).join(":");
};
</script>
<template>
  <span :style="{ fontFamily: 'monospace', fontSize: '11px', color: props.color, letterSpacing: '0.08em' }">
    {{ format(elapsed) }}
  </span>
</template>
