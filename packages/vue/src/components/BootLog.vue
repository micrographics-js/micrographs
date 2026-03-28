<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const DEFAULT_LINES = ["BIOS v2.4.1 .......... [OK]","Loading kernel ........ [OK]","Init drivers .......... [OK]","Mount filesystems ..... [OK]","Start services ........ [OK]","SYS READY"];
const props = withDefaults(defineProps<{ lines?: string[]; delay?: number; color?: string }>(),
  { lines: () => DEFAULT_LINES, delay: 300, color: "var(--fg-dim)" });

const visible = ref(0);
const timeouts: ReturnType<typeof setTimeout>[] = [];
onMounted(() => {
  visible.value = 0;
  props.lines.forEach((_, i) => timeouts.push(setTimeout(() => { visible.value = i + 1; }, props.delay * (i + 1))));
});
onUnmounted(() => timeouts.forEach(clearTimeout));
</script>
<template>
  <div :style="{ fontFamily: 'monospace', fontSize: '10px', color: props.color, lineHeight: '1.6' }">
    <div v-for="(line, i) in props.lines.slice(0, visible)" :key="i"
      :style="{ color: line === 'SYS READY' ? 'var(--accent)' : props.color }">{{ line }}</div>
  </div>
</template>
