<script setup lang="ts">
import { computed } from "vue";
import Barcode from "./Barcode.vue";
import KanaTag from "./KanaTag.vue";
import DataLabel from "./DataLabel.vue";
import SpinDial from "./SpinDial.vue";

const props = withDefaults(defineProps<{
  section?: string;
  done?: boolean;
}>(), { section: "home", done: false });

const seed = computed(() => props.section.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0));
const secValue = computed(() => props.section.toUpperCase().slice(0, 4));
</script>
<template>
  <div :style="{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '8px',
    padding: '4px 0',
    borderBottom: '1px solid var(--border)',
    fontFamily: 'monospace',
    fontSize: '9px',
  }">
    <Barcode :seed="seed" :width="40" :height="12" color="var(--fg-dimmer)" />
    <KanaTag :section="section" color="var(--fg-dim)" />
    <DataLabel label="SEC" :value="secValue" color="var(--fg-dimmer)" value-color="var(--fg)" />
    <SpinDial :done="done" :size="12" color="var(--accent)" />
  </div>
</template>
