<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const props = withDefaults(defineProps<{ text?: string; speed?: number; color?: string; loop?: boolean }>(),
  { text: "SYSTEM·ONLINE", speed: 50, color: "var(--fg)", loop: true });

const displayed = ref("");
const cursor = ref(true);
let cancelled = false;
let cursorId: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  cancelled = false;
  cursorId = setInterval(() => { cursor.value = !cursor.value; }, 530);
  const run = async () => {
    let i = 0; displayed.value = "";
    while (!cancelled) {
      i++; displayed.value = props.text.slice(0, i);
      if (i >= props.text.length) {
        if (!props.loop) break;
        await new Promise<void>(r => setTimeout(r, 1500));
        if (cancelled) break;
        i = 0; displayed.value = "";
      }
      await new Promise<void>(r => setTimeout(r, props.speed));
    }
  };
  run();
});
onUnmounted(() => { cancelled = true; if (cursorId) clearInterval(cursorId); });
</script>
<template>
  <span :style="{ fontFamily: 'monospace', fontSize: '11px', color: props.color }">
    {{ displayed }}<span :style="{ opacity: cursor ? 1 : 0 }">█</span>
  </span>
</template>
