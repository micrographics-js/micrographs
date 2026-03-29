<script setup lang="ts">
import { computed } from "vue";

const ZONE_COLORS = [
  "var(--accent)",
  "var(--accent-amber)",
  "var(--accent-red)",
  "var(--fg-dim)",
  "var(--accent)",
];

const props = withDefaults(defineProps<{
  sector?: string;
  zone?: number;
  color?: string;
}>(), { sector: "A7", zone: 3 });

const zoneColor = computed(() => props.color ?? ZONE_COLORS[props.zone % ZONE_COLORS.length]);
const label = computed(() => `SEC\u00b7${props.sector.toUpperCase()}\u00b7Z${String(props.zone).padStart(2, "0")}`);
</script>
<template>
  <span :style="{
    fontFamily: 'monospace',
    fontSize: '9px',
    color: zoneColor,
    padding: '1px 5px',
    border: `1px solid ${zoneColor}`,
    letterSpacing: '0.1em',
    display: 'inline-block',
    opacity: 0.9,
  }">{{ label }}</span>
</template>
