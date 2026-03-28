<script lang="ts">
import { createTicker } from "@micrographics/core";
let { status = "ok", speed = 1000 } = $props();
const COLORS: Record<string,string> = { ok:"var(--accent)", warn:"var(--accent-amber)", error:"var(--accent-red)", idle:"var(--fg-dimmer)" };
let on = $state(true);
$effect(() => { return createTicker(speed, () => { on = !on; }); });
const color = $derived(COLORS[status] ?? "var(--fg-dimmer)");
</script>
<svg width="10" height="10" style="display:block" shape-rendering="crispEdges">
  <rect x="1" y="1" width="8" height="8" fill={color} opacity={on ? 1 : 0.2} />
</svg>
