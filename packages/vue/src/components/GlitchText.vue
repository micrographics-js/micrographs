<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { createTicker, glitchText } from "@micrographics/core";

const props = withDefaults(defineProps<{ text?: string; intensity?: number; speed?: number; color?: string }>(),
  { text: "MICROGRAPHICS", intensity: 0.15, speed: 200, color: "var(--fg)" });

const displayed = ref(props.text);
let cleanup: (() => void) | null = null;
onMounted(() => {
  cleanup = createTicker(props.speed, () => {
    if (Math.random() < 0.3) {
      displayed.value = glitchText(props.text, props.intensity);
      setTimeout(() => { displayed.value = props.text; }, 80);
    }
  });
});
onUnmounted(() => cleanup?.());
</script>
<template>
  <span :style="{ fontFamily: 'monospace', fontSize: '12px', color: props.color, letterSpacing: '0.05em' }">{{ displayed }}</span>
</template>
