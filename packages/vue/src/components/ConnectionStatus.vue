<script setup lang="ts">
import { ref, watch, onUnmounted } from "vue";

const props = withDefaults(defineProps<{ connected?: boolean }>(), { connected: true });
const flicker = ref(false);
let t: ReturnType<typeof setTimeout> | null = null;
watch(() => props.connected, () => {
  flicker.value = true;
  t = setTimeout(() => { flicker.value = false; }, 300);
}, { immediate: true });
onUnmounted(() => { if (t) clearTimeout(t); });
const color = () => props.connected ? "var(--accent)" : "var(--accent-red)";
</script>
<template>
  <span :style="{ fontFamily: 'monospace', fontSize: '11px', color: color(), opacity: flicker ? 0.2 : 1, transition: 'opacity 0.05s', letterSpacing: '0.05em' }">
    {{ props.connected ? 'CONN·OK' : 'CONN·LOST' }}
  </span>
</template>
