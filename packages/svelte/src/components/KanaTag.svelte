<script lang="ts">
let { section = "home", color = "var(--fg-dim)" } = $props();
const KANA_MAP: Record<string, string> = {
  about:    "ジコ─001",
  projects: "プロ─002",
  blog:     "ログ─003",
  contact:  "コム─004",
  home:     "ホム─000",
  status:   "ステ─005",
  docs:     "ドク─006",
};
const code = $derived(KANA_MAP[section?.toLowerCase()] ?? "ナス─000");
</script>
<span style="font-family:monospace; font-size:9px; color:{color}; letter-spacing:0.02em; user-select:none">{code}</span>
