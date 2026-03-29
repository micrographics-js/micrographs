<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { createTicker } from "@micrographics-js/core";

const props = withDefaults(defineProps<{ message?: string; speed?: number }>(), { message: "WARNING", speed: 600 });
const on = ref(true);
let cleanup: (() => void) | null = null;
onMounted(() => { cleanup = createTicker(props.speed, () => { on.value = !on.value; }); });
onUnmounted(() => cleanup?.());
</script>
<template>
  <div :style="{ fontFamily: 'monospace', fontSize: '11px', color: 'var(--accent-amber)', padding: '3px 8px', border: '1px solid var(--accent-amber)', display: 'inline-flex', alignItems: 'center', gap: '6px', opacity: on ? 1 : 0.5, transition: 'opacity 0.1s', letterSpacing: '0.05em' }">
    <span>!</span><span>{{ props.message }}</span>
  </div>
</template>
