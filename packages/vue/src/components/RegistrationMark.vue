<script setup lang="ts">
const props = withDefaults(defineProps<{ size?: number; color?: string; label?: string }>(),
  { size: 24, color: "var(--fg-dimmer)" });
const cx = () => props.size / 2;
const r = () => props.size * 0.35;
</script>
<template>
  <div style="display:inline-flex; flex-direction:column; align-items:center; gap:2px">
    <svg :width="size" :height="size" style="display:block">
      <circle :cx="cx()" :cy="cx()" :r="r()" fill="none" :stroke="color" stroke-width="0.75"/>
      <line x1="0" :y1="cx()" :x2="size" :y2="cx()" :stroke="color" stroke-width="0.75"/>
      <line :x1="cx()" y1="0" :x2="cx()" :y2="size" :stroke="color" stroke-width="0.75"/>
    </svg>
    <span v-if="label" :style="{ fontFamily: 'monospace', fontSize: '7px', color: props.color, letterSpacing: '0.1em' }">{{ label }}</span>
  </div>
</template>
