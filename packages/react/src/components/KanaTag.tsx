"use client";

export interface KanaTagProps {
  section?: string;
  color?: string;
}

const KANA_MAP: Record<string, string> = {
  about:    "ジコ─001",
  projects: "プロ─002",
  blog:     "ログ─003",
  contact:  "コム─004",
  home:     "ホム─000",
  status:   "ステ─005",
  docs:     "ドク─006",
};

export function KanaTag({ section = "home", color = "var(--fg-dim)" }: KanaTagProps) {
  const code = KANA_MAP[section?.toLowerCase()] ?? "ナス─000";
  return (
    <span style={{
      fontFamily: "monospace",
      fontSize: "9px",
      color,
      letterSpacing: "0.02em",
      userSelect: "none",
    }}>
      {code}
    </span>
  );
}
