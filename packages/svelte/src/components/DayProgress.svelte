<script lang="ts">
let { unit = "day" as "day" | "year" | "month", color = "var(--fg-dim)", accentColor = "var(--accent)" } = $props();

function getProgress(u: string): { pct: number; label: string } {
  const now = new Date();
  if (u === "day") {
    const pct = (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) / 86400;
    return { pct, label: "DAY" };
  }
  if (u === "year") {
    const start = new Date(now.getFullYear(), 0, 1);
    const end = new Date(now.getFullYear() + 1, 0, 1);
    const pct = (now.getTime() - start.getTime()) / (end.getTime() - start.getTime());
    return { pct, label: "YEAR" };
  }
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const pct = (now.getDate() - 1 + (now.getHours() / 24)) / daysInMonth;
  return { pct, label: "MONTH" };
}

let progress = $state(getProgress(unit));
$effect(() => {
  progress = getProgress(unit);
  const id = setInterval(() => { progress = getProgress(unit); }, 1000);
  return () => clearInterval(id);
});
</script>
<span style="font-family:monospace; font-size:11px; color:{color}">
  <span style="color:{accentColor}">{progress.label}</span> {(progress.pct * 100).toFixed(1)}%
</span>
