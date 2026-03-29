<script setup lang="ts">
import { computed } from "vue";

const STATUS_COLORS: Record<string, string> = {
  active:   "var(--accent)",
  standby:  "var(--accent-amber)",
  complete: "var(--accent)",
  failed:   "var(--accent-red)",
};

const STATUS_LABELS: Record<string, string> = {
  active:   "ACTIVE",
  standby:  "STANDBY",
  complete: "COMPLETE",
  failed:   "FAILED",
};

const props = withDefaults(defineProps<{
  mission?: string;
  status?: "active" | "standby" | "complete" | "failed";
  phase?: number;
  total?: number;
  color?: string;
}>(), { mission: "MSN-001", status: "active", phase: 2, total: 5, color: "var(--accent)" });

const statusColor = computed(() => STATUS_COLORS[props.status] ?? props.color);
const statusLabel = computed(() => STATUS_LABELS[props.status] ?? props.status.toUpperCase());
const barW = 80;
const segW = computed(() => Math.floor((barW - (props.total - 1)) / props.total));
</script>
<template>
  <div :style="{ display: 'inline-flex', flexDirection: 'column', gap: '4px', fontFamily: 'monospace' }">
    <div :style="{ display: 'flex', gap: '6px', alignItems: 'center' }">
      <span :style="{ fontSize: '10px', color: 'var(--fg-dim)', letterSpacing: '0.06em' }">{{ mission }}</span>
      <span :style="{
        fontSize: '8px',
        color: statusColor,
        padding: '1px 4px',
        border: `1px solid ${statusColor}`,
        letterSpacing: '0.08em',
      }">{{ statusLabel }}</span>
    </div>
    <div :style="{ display: 'flex', alignItems: 'center', gap: '4px' }">
      <span :style="{ fontSize: '8px', color: 'var(--fg-dimmer)' }">PH</span>
      <svg :width="barW" height="6" style="display:block" shape-rendering="crispEdges">
        <rect
          v-for="i in total" :key="i"
          :x="(i - 1) * (segW + 1)"
          :y="0"
          :width="segW"
          height="6"
          :fill="(i - 1) < phase ? statusColor : 'var(--fg-dimmer)'"
          :opacity="(i - 1) < phase ? 0.85 : 0.2"
        />
      </svg>
      <span :style="{ fontSize: '8px', color: 'var(--fg-dim)' }">{{ phase }}/{{ total }}</span>
    </div>
  </div>
</template>
