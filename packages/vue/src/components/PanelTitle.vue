<script setup lang="ts">
const props = withDefaults(defineProps<{ title?: string; color?: string; accent?: string }>(),
  { title: "PANEL", color: "var(--fg-dim)", accent: "var(--accent)" });
</script>
<template>
  <div :style="{ fontFamily: 'monospace', fontSize: '10px', color: props.color, display: 'flex', alignItems: 'center', gap: '6px', userSelect: 'none' }">
    <span :style="{ flex: 1, height: '1px', background: props.color, opacity: 0.4 }" />
    <span :style="{ color: props.accent, letterSpacing: '0.15em' }">{{ props.title }}</span>
    <span :style="{ flex: 1, height: '1px', background: props.color, opacity: 0.4 }" />
  </div>
</template>
