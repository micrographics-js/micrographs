<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { createTicker } from "@micrographics-js/core";

const props = withDefaults(defineProps<{ status?: string; speed?: number }>(), { status: "ok", speed: 1000 });
const STATUS_COLORS: Record<string, string> = { ok: "var(--accent)", warn: "var(--accent-amber)", error: "var(--accent-red)", idle: "var(--fg-dimmer)" };
const on = ref(true);
let cleanup: (() => void) | null = null;
onMounted(() => { cleanup = createTicker(props.speed, () => { on.value = !on.value; }); });
onUnmounted(() => cleanup?.());
const color = () => STATUS_COLORS[props.status] ?? "var(--fg-dimmer)";
</script>
<template>
  <svg width="10" height="10" style="display:block" shape-rendering="crispEdges">
    <rect x="1" y="1" width="8" height="8" :fill="color()" :opacity="on ? 1 : 0.2" />
  </svg>
</template>
