<script lang="ts">
import { createTicker } from "@micrographics/core";
const DEFAULT_ZONES = [
  { label: "UTC", offset: 0 },
  { label: "NYC", offset: -5 },
  { label: "TYO", offset: 9 },
];
let { zones = DEFAULT_ZONES, color = "var(--fg)" } = $props();
let now = $state(new Date());
$effect(() => { return createTicker(1000, () => { now = new Date(); }); });
function fmt(zone: { label: string; offset: number }) {
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const local = new Date(utc + zone.offset * 3600000);
  const h = String(local.getHours()).padStart(2, "0");
  const m = String(local.getMinutes()).padStart(2, "0");
  const s = String(local.getSeconds()).padStart(2, "0");
  return `${h}:${m}:${s}`;
}
</script>
<div style="display:flex; gap:10px; font-family:monospace; font-size:10px">
  {#each zones as z (z.label)}
    <span style="display:flex; flex-direction:column; align-items:center; gap:1px">
      <span style="color:var(--fg-dimmer); font-size:8px">{z.label}</span>
      <span style="color:{color}; letter-spacing:0.04em">{fmt(z)}</span>
    </span>
  {/each}
</div>
