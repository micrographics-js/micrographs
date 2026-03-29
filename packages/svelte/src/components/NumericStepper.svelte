<script lang="ts">
let { value = 0, min = 0, max = 999, step = 1, onChange, color = "var(--accent)" }: { value?: number; min?: number; max?: number; step?: number; onChange?: (v: number) => void; color?: string } = $props();
let val = $state(value);
function decrement() {
  val = Math.max(min, val - step);
  onChange?.(val);
}
function increment() {
  val = Math.min(max, val + step);
  onChange?.(val);
}
const atMin = $derived(val <= min);
const atMax = $derived(val >= max);
const display = $derived(String(val).padStart(3, "0"));
</script>
<div style="display:inline-flex; align-items:center; gap:0; font-family:monospace">
  <button onclick={decrement} disabled={atMin} style="font-family:monospace; font-size:11px; color:{atMin ? 'var(--fg-dimmer)' : color}; background:var(--bg-secondary); border:1px solid {atMin ? 'var(--border)' : 'var(--border-strong)'}; padding:1px 5px; cursor:{atMin ? 'default' : 'pointer'}; user-select:none; line-height:1.4">&minus;</button>
  <span style="font-size:11px; color:{color}; padding:1px 6px; background:var(--bg); border:1px solid var(--border); border-left:none; border-right:none; min-width:32px; text-align:center; letter-spacing:0.1em">{display}</span>
  <button onclick={increment} disabled={atMax} style="font-family:monospace; font-size:11px; color:{atMax ? 'var(--fg-dimmer)' : color}; background:var(--bg-secondary); border:1px solid {atMax ? 'var(--border)' : 'var(--border-strong)'}; padding:1px 5px; cursor:{atMax ? 'default' : 'pointer'}; user-select:none; line-height:1.4">+</button>
</div>
