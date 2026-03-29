<script lang="ts">
import { createTicker } from "@micrographics/core";
let { value = 0, bits = 8, color = "var(--accent)", speed = 400, animated = false } = $props();
let current = $state(value);
const maxVal = $derived(Math.pow(2, bits) - 1);
$effect(() => { current = value; });
$effect(() => {
  if (!animated) return;
  return createTicker(speed, () => { current = (current + 1) % (maxVal + 1); });
});
const binary = $derived(current.toString(2).padStart(bits, "0").slice(-bits));
const bitW = 10;
const bitH = 14;
const gap = 2;
const groupGap = $derived(bits > 4 ? 4 : 0);
const groups = $derived(bits > 4 ? Math.ceil(bits / 4) : 1);
const totalW = $derived(bits * (bitW + gap) - gap + (groups - 1) * groupGap);
</script>
<svg width={totalW} height={bitH + 8} style="display:block" shape-rendering="crispEdges">
  {#each binary.split("") as bit, i}
    {@const group = Math.floor(i / 4)}
    {@const x = i * (bitW + gap) + group * groupGap}
    {@const isOne = bit === "1"}
    <rect {x} y="0" width={bitW} height={bitH} fill={isOne ? color : "var(--bg-secondary)"} stroke={isOne ? color : "var(--border)"} stroke-width="1" opacity={isOne ? 0.9 : 0.5} />
    <text x={x + bitW / 2} y={bitH - 3} text-anchor="middle" fill={isOne ? "var(--bg)" : "var(--fg-dimmer)"} font-size="8" font-family="monospace">{bit}</text>
    {#if bits <= 8}
      {@const bitPos = bits - 1 - i}
      <text x={x + bitW / 2} y={bitH + 7} text-anchor="middle" fill="var(--fg-dimmer)" font-size="6" font-family="monospace">{bitPos}</text>
    {/if}
  {/each}
</svg>
