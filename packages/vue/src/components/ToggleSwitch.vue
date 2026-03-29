<script setup lang="ts">
import { ref, computed } from "vue";

const props = withDefaults(defineProps<{
  on?: boolean;
  color?: string;
  label?: string;
}>(), { on: false, color: "var(--accent)" });

const emit = defineEmits<{ change: [value: boolean] }>();

const state = ref(props.on);
const trackW = 28;
const trackH = 12;
const blockW = 10;
const blockX = computed(() => state.value ? trackW - blockW - 2 : 2);

function handleClick() {
  state.value = !state.value;
  emit("change", state.value);
}
</script>
<template>
  <div @click="handleClick" :style="{ display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer', userSelect: 'none' }">
    <svg :width="trackW" :height="trackH" style="display:block" shape-rendering="crispEdges">
      <rect :x="0" :y="0" :width="trackW" :height="trackH"
        :fill="state ? color : 'var(--bg-secondary)'"
        :stroke="state ? color : 'var(--border-strong)'"
        stroke-width="1"
      />
      <rect :x="blockX" :y="2" :width="blockW" :height="trackH - 4"
        :fill="state ? 'var(--bg)' : 'var(--fg-dim)'"
      />
      <text v-if="!state" :x="trackW - 6" :y="trackH - 3" fill="var(--fg-dimmer)" font-size="5" font-family="monospace" text-anchor="middle">0</text>
      <text v-if="state" :x="6" :y="trackH - 3" fill="var(--bg)" font-size="5" font-family="monospace" text-anchor="middle">1</text>
    </svg>
    <span v-if="label" :style="{ fontFamily: 'monospace', fontSize: '9px', color: 'var(--fg-dim)' }">{{ label }}</span>
  </div>
</template>
