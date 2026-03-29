<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { typeIn, scramble } from "@micrographics-js/core";

const props = withDefaults(defineProps<{ sentences?: string[]; pauseMs?: number; color?: string }>(),
  { sentences: () => ["LOADING SUBSYSTEMS...", "SIGNAL ACQUIRED", "READY FOR TRANSMISSION", "AWAITING FURTHER ORDERS"], pauseMs: 2000, color: "var(--accent)" });

const displayed = ref("");
let cancelled = false;
onMounted(async () => {
  cancelled = false;
  let idx = 0;
  while (!cancelled) {
    const text = props.sentences[idx % props.sentences.length]; idx++;
    await scramble(text.length, (s) => { displayed.value = s; }, () => cancelled, 4, 40);
    if (cancelled) break;
    await typeIn(text, (s) => { displayed.value = s; }, () => cancelled, 25);
    if (cancelled) break;
    await new Promise<void>(r => setTimeout(r, props.pauseMs));
  }
});
onUnmounted(() => { cancelled = true; });
</script>
<template>
  <span :style="{ fontFamily: 'monospace', fontSize: '11px', color: props.color, letterSpacing: '0.05em' }">{{ displayed }}</span>
</template>
