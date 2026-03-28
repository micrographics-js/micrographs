<script setup lang="ts">
import { ref, onMounted } from "vue";

const props = withDefaults(defineProps<{ target?: number; duration?: number; color?: string; prefix?: string; suffix?: string }>(),
  { target: 1337, duration: 1500, color: "var(--fg)", prefix: "", suffix: "" });

const value = ref(0);
onMounted(() => {
  const start = Date.now();
  const tick = () => {
    const progress = Math.min((Date.now() - start) / props.duration, 1);
    value.value = Math.round(progress * props.target);
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});
</script>
<template>
  <span :style="{ fontFamily: 'monospace', fontSize: '14px', color: props.color, letterSpacing: '0.05em' }">
    {{ props.prefix }}{{ value.toLocaleString() }}{{ props.suffix }}
  </span>
</template>
