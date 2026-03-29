<script lang="ts">
import { createTicker, glitchText } from "@micrographics/core";
let { text = "MICROGRAPHICS", intensity = 0.15, speed = 200, color = "var(--fg)" } = $props();
let displayed = $state(text);

$effect(() => {
  displayed = text;
  return createTicker(speed, () => {
    if (Math.random() < 0.3) {
      displayed = glitchText(text, intensity);
      setTimeout(() => { displayed = text; }, 80);
    }
  });
});
</script>
<span style="font-family:monospace; font-size:12px; color:{color}; letter-spacing:0.05em">{displayed}</span>
