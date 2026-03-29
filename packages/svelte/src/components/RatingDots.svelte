<script lang="ts">
let { value = 3, max = 5, color = "var(--accent)", emptyColor = "var(--fg-dimmer)" } = $props();
</script>
<span style="font-family:monospace; font-size:12px; letter-spacing:0.15em">
  {#each Array.from({ length: max }, (_, i) => i) as i}
    <span style="color:{i < value ? color : emptyColor}">◆</span>
  {/each}
</span>
