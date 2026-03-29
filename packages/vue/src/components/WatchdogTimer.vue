<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { createTicker } from "@micrographics/core";

const props = withDefaults(defineProps<{
  interval?: number;
  color?: string;
}>(), { interval: 5000, color: "var(--accent)" });

const emit = defineEmits<{ bark: [] }>();

const remaining = ref(props.interval);
const pulse = ref(false);
let startTime = 0;

let cleanup: (() => void) | undefined;
onMounted(() => {
  startTime = Date.now();
  cleanup = createTicker(50, () => {
    const elapsed = Date.now() - startTime;
    const left = Math.max(0, props.interval - elapsed);
    remaining.value = left;
    if (left === 0) {
      emit("bark");
      pulse.value = true;
      setTimeout(() => {
        startTime = Date.now();
        remaining.value = props.interval;
        pulse.value = false;
      }, 300);
    }
  });
});
onUnmounted(() => { cleanup?.(); });

const pct = computed(() => remaining.value / props.interval);
const size = 32;
const cx = size / 2;
const cy = size / 2;
const r = size / 2 - 3;
const startAngle = -90;
const totalArc = 360;
const sweep = computed(() => pct.value * totalArc);

function toRad(deg: number) { return (deg * Math.PI) / 180; }
function arcPath(start: number, end: number) {
  if (Math.abs(end - start) >= 359.9) {
    return `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r}`;
  }
  const s = toRad(start);
  const e = toRad(end);
  const x1 = cx + r * Math.cos(s);
  const y1 = cy + r * Math.sin(s);
  const x2 = cx + r * Math.cos(e);
  const y2 = cy + r * Math.sin(e);
  const large = end - start > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
}

const secs = computed(() => (remaining.value / 1000).toFixed(1));
const heartbeatColor = computed(() => pulse.value ? "var(--accent-red)" : props.color);
const arcD = computed(() => arcPath(startAngle, startAngle + sweep.value));
const arcStroke = computed(() => pct.value < 0.25 ? "var(--accent-red)" : heartbeatColor.value);
const textColor = computed(() => pct.value < 0.25 ? "var(--accent-red)" : props.color);
</script>
<template>
  <div style="display: inline-flex; align-items: center; gap: 6px">
    <svg :width="size" :height="size" style="display:block">
      <circle :cx="cx" :cy="cy" :r="r" fill="none" stroke="var(--fg-dimmer)" stroke-width="2" opacity="0.3" />
      <path v-if="pct > 0" :d="arcD" fill="none" :stroke="arcStroke" stroke-width="2" stroke-linecap="square" />
      <circle :cx="cx" :cy="cy" r="3" :fill="heartbeatColor" :opacity="pulse ? 1 : 0.5" />
    </svg>
    <span :style="{
      fontFamily: 'monospace',
      fontSize: '10px',
      color: textColor,
      letterSpacing: '0.06em',
      minWidth: '30px',
    }">{{ secs }}s</span>
  </div>
</template>
