<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { createTicker } from "@micrographics/core";

const props = withDefaults(defineProps<{
  value?: number;
  bits?: number;
  color?: string;
  speed?: number;
  animated?: boolean;
}>(), { value: 0, bits: 8, color: "var(--accent)", speed: 400, animated: false });

const current = ref(props.value);
const maxVal = computed(() => Math.pow(2, props.bits) - 1);

watch(() => props.value, (v) => { current.value = v; });

let cleanup: (() => void) | undefined;
onMounted(() => {
  if (!props.animated) return;
  cleanup = createTicker(props.speed, () => { current.value = (current.value + 1) % (maxVal.value + 1); });
});
onUnmounted(() => { cleanup?.(); });

const binary = computed(() => current.value.toString(2).padStart(props.bits, "0").slice(-props.bits));
const bitW = 10;
const bitH = 14;
const gap = 2;
const groupGap = computed(() => props.bits > 4 ? 4 : 0);
const groups = computed(() => props.bits > 4 ? Math.ceil(props.bits / 4) : 1);
const totalW = computed(() => props.bits * (bitW + gap) - gap + (groups.value - 1) * groupGap.value);

function bitX(i: number) {
  const group = Math.floor(i / 4);
  return i * (bitW + gap) + group * groupGap.value;
}
</script>
<template>
  <svg :width="totalW" :height="bitH + 8" style="display:block" shape-rendering="crispEdges">
    <g v-for="(bit, i) in binary.split('')" :key="i">
      <rect
        :x="bitX(i)" :y="0" :width="bitW" :height="bitH"
        :fill="bit === '1' ? color : 'var(--bg-secondary)'"
        :stroke="bit === '1' ? color : 'var(--border)'"
        stroke-width="1"
        :opacity="bit === '1' ? 0.9 : 0.5"
      />
      <text
        :x="bitX(i) + bitW / 2" :y="bitH - 3"
        text-anchor="middle"
        :fill="bit === '1' ? 'var(--bg)' : 'var(--fg-dimmer)'"
        font-size="8" font-family="monospace"
      >{{ bit }}</text>
    </g>
    <template v-if="bits <= 8">
      <text
        v-for="(_, i) in binary.split('')" :key="'l' + i"
        :x="bitX(i) + bitW / 2" :y="bitH + 7"
        text-anchor="middle" fill="var(--fg-dimmer)" font-size="6" font-family="monospace"
      >{{ bits - 1 - i }}</text>
    </template>
  </svg>
</template>
