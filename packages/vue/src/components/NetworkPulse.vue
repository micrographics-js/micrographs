<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { createTicker } from "@micrographics/core";

const props = withDefaults(defineProps<{ upKbps?: number; downKbps?: number; speed?: number }>(),
  { upKbps: 128, downKbps: 512, speed: 500 });

const up = ref(props.upKbps);
const down = ref(props.downKbps);
let cleanup: (() => void) | null = null;
onMounted(() => {
  cleanup = createTicker(props.speed, () => {
    up.value = Math.max(0, props.upKbps + Math.round((Math.random() - 0.5) * 30));
    down.value = Math.max(0, props.downKbps + Math.round((Math.random() - 0.5) * 80));
  });
});
onUnmounted(() => cleanup?.());
</script>
<template>
  <div :style="{ fontFamily: 'monospace', fontSize: '10px', display: 'flex', flexDirection: 'column', gap: '2px' }">
    <span style="color: var(--accent)">▲ {{ up }} KB/s</span>
    <span style="color: var(--fg-dim)">▼ {{ down }} KB/s</span>
  </div>
</template>
