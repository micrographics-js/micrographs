<script setup lang="ts">
import { ref, computed } from "vue";

const props = withDefaults(defineProps<{
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  color?: string;
}>(), { value: 0, min: 0, max: 999, step: 1, color: "var(--accent)" });

const emit = defineEmits<{ change: [value: number] }>();

const val = ref(props.value);

function decrement() {
  val.value = Math.max(props.min, val.value - props.step);
  emit("change", val.value);
}
function increment() {
  val.value = Math.min(props.max, val.value + props.step);
  emit("change", val.value);
}

const atMin = computed(() => val.value <= props.min);
const atMax = computed(() => val.value >= props.max);

function btnStyle(disabled: boolean) {
  return {
    fontFamily: 'monospace',
    fontSize: '11px',
    color: disabled ? 'var(--fg-dimmer)' : props.color,
    background: 'var(--bg-secondary)',
    border: `1px solid ${disabled ? 'var(--border)' : 'var(--border-strong)'}`,
    padding: '1px 5px',
    cursor: disabled ? 'default' : 'pointer',
    userSelect: 'none' as const,
    lineHeight: '1.4',
  };
}

const display = computed(() => String(val.value).padStart(3, "0"));
</script>
<template>
  <div :style="{ display: 'inline-flex', alignItems: 'center', gap: '0', fontFamily: 'monospace' }">
    <button :disabled="atMin" :style="btnStyle(atMin)" @click="decrement">&minus;</button>
    <span :style="{
      fontSize: '11px',
      color,
      padding: '1px 6px',
      background: 'var(--bg)',
      border: '1px solid var(--border)',
      borderLeft: 'none',
      borderRight: 'none',
      minWidth: '32px',
      textAlign: 'center',
      letterSpacing: '0.1em',
    }">{{ display }}</span>
    <button :disabled="atMax" :style="btnStyle(atMax)" @click="increment">+</button>
  </div>
</template>
