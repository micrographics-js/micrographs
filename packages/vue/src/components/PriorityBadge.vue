<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { createTicker } from "@micrographics/core";

const props = withDefaults(defineProps<{ level?: string; label?: string; blink?: boolean; speed?: number }>(),
  { level: "A", label: "PRIORITY", blink: false, speed: 800 });

const COLORS: Record<string, string> = { A: "var(--accent-red)", B: "var(--accent-amber)", C: "var(--accent)", D: "var(--fg-dim)", X: "var(--fg-dimmer)" };
const on = ref(true);
let cleanup: (() => void) | null = null;
onMounted(() => { if (props.blink) cleanup = createTicker(props.speed, () => { on.value = !on.value; }); });
onUnmounted(() => cleanup?.());
const color = () => COLORS[props.level] ?? "var(--fg-dim)";
</script>
<template>
  <div :style="{ fontFamily: 'monospace', display: 'inline-flex', border: `1px solid ${color()}`, opacity: props.blink ? (on ? 1 : 0.3) : 1, transition: 'opacity 0.1s', userSelect: 'none' }">
    <div :style="{ fontSize: '8px', color: 'var(--fg-dimmer)', padding: '2px 5px', borderRight: `1px solid ${color()}`, display: 'flex', alignItems: 'center', letterSpacing: '0.1em' }">{{ props.label }}</div>
    <div :style="{ fontSize: '20px', fontWeight: 'bold', color: color(), padding: '0 8px', lineHeight: 1.1 }">{{ props.level }}</div>
  </div>
</template>
