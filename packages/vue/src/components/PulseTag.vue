<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { createTicker } from "@micrographics/core";

const props = withDefaults(defineProps<{ label?: string; color?: string; speed?: number }>(),
  { label: "LIVE", color: "var(--accent)", speed: 800 });

const on = ref(true);
let cleanup: (() => void) | null = null;
onMounted(() => { cleanup = createTicker(props.speed, () => { on.value = !on.value; }); });
onUnmounted(() => cleanup?.());
</script>
<template>
  <span :style="{ fontFamily: 'monospace', fontSize: '11px', color: props.color, display: 'inline-flex', alignItems: 'center', gap: '4px' }">
    <span :style="{ opacity: on ? 1 : 0, transition: 'opacity 0.1s' }">◆</span>
    <span>{{ props.label }}</span>
  </span>
</template>
