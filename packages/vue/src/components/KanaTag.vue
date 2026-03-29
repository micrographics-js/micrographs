<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{
  section?: string;
  color?: string;
}>(), { section: "home", color: "var(--fg-dim)" });

const KANA_MAP: Record<string, string> = {
  about:    "ジコ─001",
  projects: "プロ─002",
  blog:     "ログ─003",
  contact:  "コム─004",
  home:     "ホム─000",
  status:   "ステ─005",
  docs:     "ドク─006",
};

const code = computed(() => KANA_MAP[props.section?.toLowerCase()] ?? "ナス─000");
</script>
<template>
  <span :style="{
    fontFamily: 'monospace',
    fontSize: '9px',
    color: color,
    letterSpacing: '0.02em',
    userSelect: 'none',
  }">{{ code }}</span>
</template>
