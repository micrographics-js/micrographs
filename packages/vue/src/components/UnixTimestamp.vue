<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const props = withDefaults(defineProps<{ color?: string }>(), { color: "var(--fg-dim)" });
const ts = ref(Math.floor(Date.now() / 1000));
let id: ReturnType<typeof setInterval> | null = null;
onMounted(() => { id = setInterval(() => { ts.value = Math.floor(Date.now() / 1000); }, 1000); });
onUnmounted(() => { if (id) clearInterval(id); });
</script>
<template>
  <span :style="{ fontFamily: 'monospace', fontSize: '11px', color: props.color, letterSpacing: '0.05em' }">{{ ts }}</span>
</template>
