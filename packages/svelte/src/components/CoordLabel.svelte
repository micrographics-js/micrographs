<script lang="ts">
let { x = 1.23, y = 45.67, z = -2.1, color = "var(--fg)", precision = 2 } = $props();
function fmt(n: number) {
  const sign = n < 0 ? "\u2212" : " ";
  const abs = Math.abs(n).toFixed(precision);
  const [int, dec] = abs.split(".");
  return `${sign}${int.padStart(3, "0")}.${dec}`;
}
const xFmt = $derived(fmt(x));
const yFmt = $derived(fmt(y));
const zFmt = $derived(fmt(z));
</script>
<span style="font-family:monospace; font-size:10px; display:inline-flex; gap:6px">
  <span><span style="color:var(--fg-dimmer)">X:</span><span style="color:{color}">{xFmt}</span></span>
  <span><span style="color:var(--fg-dimmer)">Y:</span><span style="color:{color}">{yFmt}</span></span>
  <span><span style="color:var(--fg-dimmer)">Z:</span><span style="color:{color}">{zFmt}</span></span>
</span>
