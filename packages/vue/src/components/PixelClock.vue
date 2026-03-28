<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

const props = withDefaults(defineProps<{ color?: string; showSeconds?: boolean }>(), { color: "var(--accent)", showSeconds: true });
const now = ref(new Date());
let id: ReturnType<typeof setInterval> | null = null;
onMounted(() => { id = setInterval(() => { now.value = new Date(); }, 1000); });
onUnmounted(() => { if (id) clearInterval(id); });
const display = computed(() => {
  const hh = String(now.value.getHours()).padStart(2, "0");
  const mm = String(now.value.getMinutes()).padStart(2, "0");
  const ss = String(now.value.getSeconds()).padStart(2, "0");
  return props.showSeconds ? `${hh}:${mm}:${ss}` : `${hh}:${mm}`;
});
</script>
<template>
  <span :style="{ fontFamily: 'monospace', fontSize: '18px', color: props.color, letterSpacing: '0.1em', fontWeight: 'bold' }">{{ display }}</span>
</template>
