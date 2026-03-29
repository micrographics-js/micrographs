<script lang="ts">
import ScanBeam from "./ScanBeam.svelte";
let { done = false, temp = 22, unit = "C", condition = "CLEAR" } = $props();
</script>
{#if !done}
<div style="display:inline-flex; align-items:center; gap:6px; font-family:monospace; font-size:9px; color:var(--fg-dim)">
  <span>WX</span>
  <ScanBeam width={60} height={4} color="var(--accent)" speed={50} />
</div>
{:else}
<span style="font-family:monospace; font-size:10px; color:var(--fg); letter-spacing:0.04em">
  <span style="color:var(--accent-amber)">{temp}&deg;{unit}</span>
  <span style="color:var(--fg-dimmer)"> &middot; </span>
  <span style="color:var(--fg-dim)">{condition}</span>
</span>
{/if}
