<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { createTicker } from "@micrographics-js/core";

const props = withDefaults(defineProps<{ ms?: number; color?: string; speed?: number }>(),
  { ms: 42, color: "var(--accent)", speed: 2000 });

const active = ref(false);
let cleanup: (() => void) | null = null;
onMounted(() => {
  cleanup = createTicker(props.speed, () => { active.value = true; setTimeout(() => { active.value = false; }, 200); });
});
onUnmounted(() => cleanup?.());
</script>
<template>
  <span :style="{ fontFamily: 'monospace', fontSize: '11px', color: props.color, display: 'inline-flex', alignItems: 'center', gap: '5px' }">
    <span :style="{ display: 'inline-block', width: '6px', height: '6px', background: active ? props.color : 'transparent', border: `1px solid ${props.color}`, transition: 'background 0.1s' }" />
    {{ props.ms }}ms
  </span>
</template>
