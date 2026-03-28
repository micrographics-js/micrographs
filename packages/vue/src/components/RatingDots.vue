<script setup lang="ts">
const props = withDefaults(defineProps<{ value?: number; max?: number; color?: string; emptyColor?: string }>(),
  { value: 3, max: 5, color: "var(--accent)", emptyColor: "var(--fg-dimmer)" });
</script>
<template>
  <span style="font-family:monospace; font-size:12px; letter-spacing:0.15em">
    <span v-for="i in max" :key="i" :style="{ color: i <= value ? props.color : props.emptyColor }">◆</span>
  </span>
</template>
