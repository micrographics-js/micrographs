<script setup lang="ts">
import { ref } from "vue";

const props = withDefaults(defineProps<{ text?: string; color?: string }>(), { text: "copy me", color: "var(--fg-dim)" });
const copied = ref(false);
const handleClick = () => {
  navigator.clipboard?.writeText(props.text).catch(() => {});
  copied.value = true;
  setTimeout(() => { copied.value = false; }, 2000);
};
</script>
<template>
  <button @click="handleClick" :style="{ fontFamily: 'monospace', fontSize: '10px', color: copied ? 'var(--accent)' : props.color, background: 'none', border: `1px solid ${copied ? 'var(--accent)' : props.color}`, padding: '2px 6px', cursor: 'pointer', letterSpacing: '0.05em', transition: 'color 0.1s, border-color 0.1s' }">
    {{ copied ? '[COPIED ✓]' : '[COPY]' }}
  </button>
</template>
