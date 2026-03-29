<script setup lang="ts">
import ScanBeam from "./ScanBeam.vue";

const props = withDefaults(defineProps<{
  done?: boolean;
  temp?: number;
  unit?: string;
  condition?: string;
}>(), { done: false, temp: 22, unit: "C", condition: "CLEAR" });
</script>
<template>
  <div v-if="!done" :style="{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'monospace', fontSize: '9px', color: 'var(--fg-dim)' }">
    <span>WX</span>
    <ScanBeam :width="60" :height="4" color="var(--accent)" :speed="50" />
  </div>
  <span v-else :style="{ fontFamily: 'monospace', fontSize: '10px', color: 'var(--fg)', letterSpacing: '0.04em' }">
    <span style="color: var(--accent-amber)">{{ temp }}&deg;{{ unit }}</span>
    <span style="color: var(--fg-dimmer)"> &middot; </span>
    <span style="color: var(--fg-dim)">{{ condition }}</span>
  </span>
</template>
