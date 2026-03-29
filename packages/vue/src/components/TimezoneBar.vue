<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { createTicker } from "@micrographics-js/core";

interface TZone { label: string; offset: number; }

const DEFAULT_ZONES: TZone[] = [
  { label: "UTC", offset: 0 },
  { label: "NYC", offset: -5 },
  { label: "TYO", offset: 9 },
];

const props = withDefaults(defineProps<{
  zones?: TZone[];
  color?: string;
}>(), { zones: () => DEFAULT_ZONES, color: "var(--fg)" });

const now = ref(new Date());
let cleanup: (() => void) | undefined;
onMounted(() => {
  cleanup = createTicker(1000, () => { now.value = new Date(); });
});
onUnmounted(() => { cleanup?.(); });

function fmt(zone: TZone) {
  const utc = now.value.getTime() + now.value.getTimezoneOffset() * 60000;
  const local = new Date(utc + zone.offset * 3600000);
  const h = String(local.getHours()).padStart(2, "0");
  const m = String(local.getMinutes()).padStart(2, "0");
  const s = String(local.getSeconds()).padStart(2, "0");
  return `${h}:${m}:${s}`;
}
</script>
<template>
  <div :style="{ display: 'flex', gap: '10px', fontFamily: 'monospace', fontSize: '10px' }">
    <span v-for="z in zones" :key="z.label" :style="{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px' }">
      <span style="color: var(--fg-dimmer); font-size: 8px">{{ z.label }}</span>
      <span :style="{ color, letterSpacing: '0.04em' }">{{ fmt(z) }}</span>
    </span>
  </div>
</template>
