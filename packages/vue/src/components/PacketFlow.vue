<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { createTicker } from "@micrographics/core";

const props = withDefaults(defineProps<{
  width?: number;
  height?: number;
  color?: string;
  packets?: number;
  speed?: number;
}>(), { width: 80, height: 12, color: "var(--accent)", packets: 4, speed: 40 });

interface Packet { id: number; x: number; size: number; }

const pkts = ref<Packet[]>(
  Array.from({ length: props.packets }, (_, i) => ({
    id: i,
    x: (i / props.packets) * props.width,
    size: 4 + Math.floor(i % 3) * 2,
  }))
);

let cleanup: (() => void) | undefined;
onMounted(() => {
  cleanup = createTicker(props.speed, () => {
    pkts.value = pkts.value.map(p => ({
      ...p,
      x: (p.x + 2) % (props.width + p.size + 4),
    }));
  });
});
onUnmounted(() => { cleanup?.(); });

const mid = computed(() => props.height / 2);
</script>
<template>
  <svg :width="width" :height="height" style="display:block" shape-rendering="crispEdges">
    <line :x1="0" :y1="mid" :x2="width" :y2="mid" stroke="var(--fg-dimmer)" stroke-width="1" />
    <g v-for="p in pkts" :key="p.id">
      <rect
        :x="p.x - p.size / 2"
        :y="mid - 2"
        :width="p.size"
        height="4"
        :fill="color"
        opacity="0.85"
      />
    </g>
  </svg>
</template>
