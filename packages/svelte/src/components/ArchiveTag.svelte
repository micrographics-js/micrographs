<script lang="ts">
import { seeded } from "@micrographics-js/core";
let { id = "NAS-001", label = "INTERNAL", date = undefined as string | undefined, color = "var(--fg-dim)", seed = 42 } = $props();
const fakeDate = $derived(date ?? `${2024 + Math.floor(seeded(seed) * 2)}.${String(Math.floor(seeded(seed + 1) * 12) + 1).padStart(2, "0")}`);
const vol = $derived(String(Math.floor(seeded(seed + 2) * 9) + 1));
const track = $derived(String(Math.floor(seeded(seed + 3) * 99) + 1).padStart(2, "0"));
</script>
<div style="font-family:monospace; border:1px solid var(--border-strong); padding:6px 8px; display:inline-flex; flex-direction:column; gap:3px; min-width:100px">
  <div style="font-size:7px; color:var(--fg-dimmer); letter-spacing:0.15em">ARCHIVE</div>
  <div style="font-size:14px; color:{color}; font-weight:bold; letter-spacing:0.05em">{id}</div>
  <div style="display:flex; justify-content:space-between; gap:8px">
    <span style="font-size:8px; color:var(--fg-dimmer)">{label}</span>
    <span style="font-size:8px; color:var(--fg-dimmer)">{fakeDate}</span>
  </div>
  <div style="display:flex; gap:4px; margin-top:1px">
    <span style="font-size:7px; color:var(--fg-dimmer); opacity:0.6">VOL.{vol}</span>
    <span style="font-size:7px; color:var(--fg-dimmer); opacity:0.6">TRK.{track}</span>
  </div>
</div>
