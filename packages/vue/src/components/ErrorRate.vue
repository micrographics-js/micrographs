<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { createTicker } from "@micrographics/core";

const props = withDefaults(defineProps<{ count?: number; speed?: number }>(), { count: 7, speed: 1500 });
const on = ref(true);
const current = ref(props.count);
let cleanup: (() => void) | null = null;
onMounted(() => {
  cleanup = createTicker(props.speed, () => {
    on.value = !on.value;
    if (Math.random() < 0.3) current.value++;
  });
});
onUnmounted(() => cleanup?.());
</script>
<template>
  <span :style="{ fontFamily: 'monospace', fontSize: '11px', color: 'var(--accent-red)', opacity: on ? 1 : 0.4, transition: 'opacity 0.1s' }">
    ERR:{{ current }}
  </span>
</template>
