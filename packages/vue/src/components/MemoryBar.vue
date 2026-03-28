<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{ used?: number; total?: number; unit?: string; segments?: number; color?: string; width?: number; height?: number }>(),
  { used: 6.4, total: 16, unit: "GB", segments: 10, color: "var(--accent)", width: 80, height: 8 });

const pct = computed(() => props.used / props.total);
const filled = computed(() => Math.round(pct.value * props.segments));
const segW = computed(() => Math.floor(props.width / props.segments) - 1);
const barColor = computed(() => pct.value > 0.85 ? "var(--accent-red)" : pct.value > 0.65 ? "var(--accent-amber)" : props.color);
</script>
<template>
  <div style="display:flex; flex-direction:column; gap:2px">
    <svg :width="width" :height="height" style="display:block" shape-rendering="crispEdges">
      <rect v-for="i in segments" :key="i"
        :x="(i-1) * (segW + 1)" y="0" :width="segW" :height="height"
        :fill="i <= filled ? barColor : 'var(--fg-dimmer)'"
        :opacity="i <= filled ? 1 : 0.2"
      />
    </svg>
    <span style="font-family:monospace; font-size:9px; color:var(--fg-dimmer)">{{ props.used }}{{ props.unit }} / {{ props.total }}{{ props.unit }}</span>
  </div>
</template>
