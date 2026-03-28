<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const props = withDefaults(defineProps<{ delay?: number; color?: string }>(), { delay: 2000, color: "var(--accent)" });
const ready = ref(false);
const blink = ref(true);
let t: ReturnType<typeof setTimeout> | null = null;
let id: ReturnType<typeof setInterval> | null = null;
onMounted(() => {
  t = setTimeout(() => { ready.value = true; }, props.delay);
  id = setInterval(() => { blink.value = !blink.value; }, 400);
});
onUnmounted(() => { if (t) clearTimeout(t); if (id) clearInterval(id); });
</script>
<template>
  <span :style="{ fontFamily: 'monospace', fontSize: '11px', color: props.color, letterSpacing: '0.05em' }">
    <span v-if="ready">SYS·READY</span>
    <span v-else :style="{ opacity: blink ? 1 : 0.4 }">SYS·BOOTING</span>
  </span>
</template>
