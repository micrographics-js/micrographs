<script lang="ts">
let { text = "copy me", color = "var(--fg-dim)" } = $props();
let state = $state<"idle" | "copied">("idle");

function handleClick() {
  navigator.clipboard?.writeText(text).catch(() => {});
  state = "copied";
  setTimeout(() => { state = "idle"; }, 2000);
}
</script>
<button
  onclick={handleClick}
  style="font-family:monospace; font-size:10px; color:{state === 'copied' ? 'var(--accent)' : color}; background:none; border:1px solid {state === 'copied' ? 'var(--accent)' : color}; padding:2px 6px; cursor:pointer; letter-spacing:0.05em; transition:color 0.1s, border-color 0.1s"
>
  {state === "copied" ? "[COPIED ✓]" : "[COPY]"}
</button>
