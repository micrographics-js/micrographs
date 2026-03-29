const KANA_MAP: Record<string, string> = {
  about:    "ジコ─001",
  projects: "プロ─002",
  blog:     "ログ─003",
  contact:  "コム─004",
  home:     "ホム─000",
  status:   "ステ─005",
  docs:     "ドク─006",
};

export class MgKanaTag extends HTMLElement {
  static get observedAttributes() {
    return ["section", "color"];
  }

  private get section() { return this.getAttribute("section") || "home"; }
  private get color() { return this.getAttribute("color") || "var(--fg-dim)"; }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  private render() {
    const code = KANA_MAP[this.section.toLowerCase()] ?? "ナス─000";
    const color = this.color;
    this.innerHTML = `<span style="font-family:monospace;font-size:9px;color:${color};letter-spacing:0.02em;user-select:none">${code}</span>`;
  }
}

customElements.define("mg-kana-tag", MgKanaTag);
