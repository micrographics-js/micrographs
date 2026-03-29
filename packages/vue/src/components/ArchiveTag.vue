<script setup lang="ts">
import { computed } from "vue";
import { seeded } from "@micrographics-js/core";

const props = withDefaults(defineProps<{ id?: string | number; label?: string; date?: string; color?: string; seed?: number }>(),
  { id: "NAS-001", label: "INTERNAL", color: "var(--fg-dim)", seed: 42 });

const fakeDate = computed(() => props.date ?? `${2024 + Math.floor(seeded(props.seed) * 2)}.${String(Math.floor(seeded(props.seed + 1) * 12) + 1).padStart(2, "0")}`);
const vol = computed(() => String(Math.floor(seeded(props.seed + 2) * 9) + 1));
const track = computed(() => String(Math.floor(seeded(props.seed + 3) * 99) + 1).padStart(2, "0"));
</script>
<template>
  <div :style="{ fontFamily: 'monospace', border: '1px solid var(--border-strong)', padding: '6px 8px', display: 'inline-flex', flexDirection: 'column', gap: '3px', minWidth: '100px' }">
    <div style="font-size:7px; color:var(--fg-dimmer); letter-spacing:0.15em">ARCHIVE</div>
    <div :style="{ fontSize: '14px', color: props.color, fontWeight: 'bold', letterSpacing: '0.05em' }">{{ props.id }}</div>
    <div style="display:flex; justify-content:space-between; gap:8px">
      <span style="font-size:8px; color:var(--fg-dimmer)">{{ props.label }}</span>
      <span style="font-size:8px; color:var(--fg-dimmer)">{{ fakeDate }}</span>
    </div>
    <div style="display:flex; gap:4px; margin-top:1px">
      <span style="font-size:7px; color:var(--fg-dimmer); opacity:0.6">VOL.{{ vol }}</span>
      <span style="font-size:7px; color:var(--fg-dimmer); opacity:0.6">TRK.{{ track }}</span>
    </div>
  </div>
</template>
