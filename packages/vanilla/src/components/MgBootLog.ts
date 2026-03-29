const DEFAULT_LINES = [
  "BIOS v2.4.1 .......... [OK]",
  "Loading kernel ........ [OK]",
  "Init drivers .......... [OK]",
  "Mount filesystems ..... [OK]",
  "Start services ........ [OK]",
  "SYS READY",
];

export class MgBootLog extends HTMLElement {
  private timeoutIds: ReturnType<typeof setTimeout>[] = [];
  private visible = 0;

  static get observedAttributes() {
    return ["delay", "color"];
  }

  private get lines(): string[] {
    const attr = this.getAttribute("lines");
    if (attr) {
      try { return JSON.parse(attr); } catch { /* fallthrough */ }
    }
    return DEFAULT_LINES;
  }
  private get delay() { return parseInt(this.getAttribute("delay") || "300"); }
  private get color() { return this.getAttribute("color") || "var(--fg-dim)"; }

  connectedCallback() {
    this.start();
  }

  disconnectedCallback() {
    this.timeoutIds.forEach(clearTimeout);
  }

  attributeChangedCallback() {
    this.timeoutIds.forEach(clearTimeout);
    this.start();
  }

  private start() {
    this.visible = 0;
    this.render();
    const lines = this.lines;
    const delay = this.delay;
    this.timeoutIds = lines.map((_, i) =>
      setTimeout(() => { this.visible = i + 1; this.render(); }, delay * (i + 1))
    );
  }

  private render() {
    const lines = this.lines;
    const color = this.color;
    const shown = lines.slice(0, this.visible).map(line => {
      const lineColor = line === "SYS READY" ? "var(--accent)" : color;
      return `<div style="color:${lineColor}">${line}</div>`;
    }).join("");
    this.innerHTML = `<div style="font-family:monospace;font-size:10px;color:${color};line-height:1.6">${shown}</div>`;
  }
}

customElements.define("mg-boot-log", MgBootLog);
