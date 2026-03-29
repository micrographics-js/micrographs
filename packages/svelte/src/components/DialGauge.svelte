<script lang="ts">
let { value = 65, min = 0, max = 100, label = "RPM", color = "var(--accent)", width = 80, height = 50 } = $props();
const cx = $derived(width / 2);
const cy = $derived(height - 8);
const r = $derived(Math.min(cx - 4, cy - 4));
const pct = $derived(Math.max(0, Math.min(1, (value - min) / (max - min))));
const angle = $derived(-180 + pct * 180);
const rad = $derived((angle * Math.PI) / 180);
const nx = $derived(cx + r * 0.75 * Math.cos(rad));
const ny = $derived(cy + r * 0.75 * Math.sin(rad));

function arcPath(radius: number, start: number, end: number, ccx: number, ccy: number): string {
  const startRad = (start * Math.PI) / 180;
  const endRad = (end * Math.PI) / 180;
  const x1 = ccx + radius * Math.cos(startRad);
  const y1 = ccy + radius * Math.sin(startRad);
  const x2 = ccx + radius * Math.cos(endRad);
  const y2 = ccy + radius * Math.sin(endRad);
  return `M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}`;
}
</script>
<svg {width} {height} style="display:block">
  <path d={arcPath(r, -180, 0, cx, cy)} fill="none" stroke="var(--fg-dimmer)" stroke-width="2" />
  <path d={arcPath(r, -180, -180 + pct * 180, cx, cy)} fill="none" stroke={color} stroke-width="2" />
  <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={color} stroke-width="1.5" />
  <circle cx={cx} cy={cy} r="3" fill={color} />
  <text x={cx} y={cy - r - 4} text-anchor="middle" fill="var(--fg-dim)" font-size="8" font-family="monospace">{label}</text>
  <text x={cx} y={height - 2} text-anchor="middle" fill={color} font-size="9" font-family="monospace">{value}</text>
</svg>
