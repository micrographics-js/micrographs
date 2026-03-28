<script setup lang="ts">
const props = withDefaults(defineProps<{ label?: string; value?: string; color?: string; valueColor?: string }>(),
  { label: "STATUS", value: "ACTIVE", color: "var(--fg-dimmer)", valueColor: "var(--fg)" });
</script>
<template>
  <span style="font-family:monospace; font-size:10px; display:inline-flex; align-items:center; border:1px solid var(--border)">
    <span :style="{ color: props.color, padding: '1px 4px', borderRight: '1px solid var(--border)', background: 'var(--bg-secondary)' }">{{ props.label }}</span>
    <span :style="{ color: props.valueColor, padding: '1px 4px' }">{{ props.value }}</span>
  </span>
</template>
