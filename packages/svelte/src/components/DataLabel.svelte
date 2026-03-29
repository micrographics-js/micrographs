<script lang="ts">
let { label = "STATUS", value = "ACTIVE", color = "var(--fg-dimmer)", valueColor = "var(--fg)" } = $props();
</script>
<span style="font-family:monospace; font-size:10px; display:inline-flex; align-items:center; gap:0; border:1px solid var(--border)">
  <span style="color:{color}; padding:1px 4px; border-right:1px solid var(--border); background:var(--bg-secondary)">{label}</span>
  <span style="color:{valueColor}; padding:1px 4px">{value}</span>
</span>
