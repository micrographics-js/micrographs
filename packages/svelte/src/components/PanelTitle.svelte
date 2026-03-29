<script lang="ts">
let { title = "PANEL", color = "var(--fg-dim)", accent = "var(--accent)" } = $props();
</script>
<div style="font-family:monospace; font-size:10px; color:{color}; display:flex; align-items:center; gap:6px; user-select:none">
  <span style="flex:1; height:1px; background:{color}; opacity:0.4"></span>
  <span style="color:{accent}; letter-spacing:0.15em">{title}</span>
  <span style="flex:1; height:1px; background:{color}; opacity:0.4"></span>
</div>
