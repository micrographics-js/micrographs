<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { createTicker } from "@micrographics/core";

const DEFAULT_ENTRIES = ["[INFO]  kernel: loaded modules ok","[INFO]  net: interface eth0 up","[WARN]  disk: usage at 87%","[INFO]  svc: auth service started","[DEBUG] req: GET /health 200 2ms","[INFO]  cron: job triggered","[WARN]  mem: gc pressure detected","[INFO]  sync: upstream ok"];
const props = withDefaults(defineProps<{ entries?: string[]; speed?: number; color?: string; maxLines?: number }>(),
  { entries: () => DEFAULT_ENTRIES, speed: 800, color: "var(--fg-dim)", maxLines: 5 });

const lines = ref<string[]>([]);
let idx = 0;
let cleanup: (() => void) | null = null;
onMounted(() => {
  cleanup = createTicker(props.speed, () => {
    lines.value = [...lines.value.slice(-(props.maxLines - 1)), props.entries[idx % props.entries.length]];
    idx++;
  });
});
onUnmounted(() => cleanup?.());
</script>
<template>
  <div :style="{ fontFamily: 'monospace', fontSize: '10px', color: props.color, lineHeight: '1.5', width: '200px', overflow: 'hidden' }">
    <div v-for="(line, i) in lines" :key="i" :style="{ opacity: 0.5 + 0.5 * ((i + 1) / lines.length) }">{{ line }}</div>
  </div>
</template>
