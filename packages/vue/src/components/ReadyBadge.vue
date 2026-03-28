<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const props = withDefaults(defineProps<{ color?: string; delay?: number }>(), { color: "var(--accent)", delay: 80 });
const SEGMENTS = ["[", " ", "R", "E", "A", "D", "Y", " ", "]"];
const visible = ref(0);
const timeouts: ReturnType<typeof setTimeout>[] = [];
onMounted(() => {
  visible.value = 0;
  SEGMENTS.forEach((_, i) => timeouts.push(setTimeout(() => { visible.value = i + 1; }, props.delay * (i + 1))));
});
onUnmounted(() => timeouts.forEach(clearTimeout));
</script>
<template>
  <span :style="{ fontFamily: 'monospace', fontSize: '12px', color: props.color, letterSpacing: '0.05em' }">
    {{ SEGMENTS.slice(0, visible).join("") }}
  </span>
</template>
