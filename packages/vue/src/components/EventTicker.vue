<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { createTicker } from "@micrographics/core";

const DEFAULT_EVENTS = ["SYS_INIT", "PKT_RECV", "AUTH_OK", "SYNC", "PROC_RUN"];

const props = withDefaults(defineProps<{
  events?: string[];
  speed?: number;
  color?: string;
  width?: number;
}>(), { events: () => DEFAULT_EVENTS, speed: 1800, color: "var(--fg)", width: 100 });

const index = ref(0);
const fade = ref(1);

let cleanup: (() => void) | undefined;
onMounted(() => {
  cleanup = createTicker(props.speed, () => {
    fade.value = 0;
    setTimeout(() => {
      index.value = (index.value + 1) % props.events.length;
      fade.value = 1;
    }, 200);
  });
});
onUnmounted(() => { cleanup?.(); });

const current = computed(() => props.events[index.value] ?? "");
</script>
<template>
  <div :style="{
    fontFamily: 'monospace',
    fontSize: '10px',
    color: color,
    width: `${width}px`,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  }">
    <span style="color: var(--fg-dimmer)">&rsaquo;</span>
    <span :style="{
      opacity: fade,
      transition: 'opacity 0.18s ease',
      letterSpacing: '0.06em',
    }">{{ current }}</span>
  </div>
</template>
