<script lang="ts">
import Barcode from "./Barcode.svelte";
import KanaTag from "./KanaTag.svelte";
import DataLabel from "./DataLabel.svelte";
import SpinDial from "./SpinDial.svelte";
let { section = "home", done = false } = $props();
const seed = $derived(section.split("").reduce((acc: number, c: string) => acc + c.charCodeAt(0), 0));
const sectionUpper = $derived(section.toUpperCase().slice(0, 4));
</script>
<div style="display:flex; flex-direction:row; align-items:center; gap:8px; padding:4px 0; border-bottom:1px solid var(--border); font-family:monospace; font-size:9px">
  <Barcode {seed} width={40} height={12} color="var(--fg-dimmer)" />
  <KanaTag {section} color="var(--fg-dim)" />
  <DataLabel label="SEC" value={sectionUpper} color="var(--fg-dimmer)" valueColor="var(--fg)" />
  <SpinDial {done} size={12} color="var(--accent)" />
</div>
