<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const props = withDefaults(defineProps<{ unit?: string; color?: string; accentColor?: string }>(),
  { unit: "day", color: "var(--fg-dim)", accentColor: "var(--accent)" });

function getProgress(unit: string) {
  const now = new Date();
  if (unit === "day") { const pct = (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) / 86400; return { pct, label: "DAY" }; }
  if (unit === "year") { const start = new Date(now.getFullYear(), 0, 1); const end = new Date(now.getFullYear() + 1, 0, 1); return { pct: (now.getTime() - start.getTime()) / (end.getTime() - start.getTime()), label: "YEAR" }; }
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  return { pct: (now.getDate() - 1 + now.getHours() / 24) / daysInMonth, label: "MONTH" };
}

const progress = ref(getProgress(props.unit));
let id: ReturnType<typeof setInterval> | null = null;
onMounted(() => { id = setInterval(() => { progress.value = getProgress(props.unit); }, 1000); });
onUnmounted(() => { if (id) clearInterval(id); });
</script>
<template>
  <span :style="{ fontFamily: 'monospace', fontSize: '11px', color: props.color }">
    <span :style="{ color: props.accentColor }">{{ progress.label }}</span> {{ (progress.pct * 100).toFixed(1) }}%
  </span>
</template>
