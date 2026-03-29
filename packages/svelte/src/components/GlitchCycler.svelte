<script lang="ts">
import { typeIn, scramble } from "@micrographics/core";
const DEFAULT_SENTENCES = [
  "LOADING SUBSYSTEMS...",
  "SIGNAL ACQUIRED",
  "READY FOR TRANSMISSION",
  "AWAITING FURTHER ORDERS",
];
let { sentences = DEFAULT_SENTENCES, pauseMs = 2000, color = "var(--accent)" } = $props();
let displayed = $state("");

$effect(() => {
  let cancelled = false;
  let idx = 0;

  const run = async () => {
    while (!cancelled) {
      const text = sentences[idx % sentences.length];
      idx++;
      await scramble(text.length, (v: string) => { displayed = v; }, () => cancelled, 4, 40);
      if (cancelled) break;
      await typeIn(text, (v: string) => { displayed = v; }, () => cancelled, 25);
      if (cancelled) break;
      await new Promise<void>(r => setTimeout(r, pauseMs));
    }
  };
  run();
  return () => { cancelled = true; };
});
</script>
<span style="font-family:monospace; font-size:11px; color:{color}; letter-spacing:0.05em">{displayed}</span>
