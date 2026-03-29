import { createTicker } from "@micrographics-js/core";

const DEFAULT_ENTRIES = [
  "[INFO]  kernel: loaded modules ok",
  "[INFO]  net: interface eth0 up",
  "[WARN]  disk: usage at 87%",
  "[INFO]  svc: auth service started",
  "[INFO]  svc: api gateway ready",
  "[DEBUG] req: GET /health 200 2ms",
  "[INFO]  cron: job triggered",
  "[WARN]  mem: gc pressure detected",
  "[INFO]  sync: upstream ok",
  "[DEBUG] req: POST /event 201 8ms",
];

export class MgLogStream extends HTMLElement {
  private cleanup?: () => void;
  private lines: string[] = [];
  private idx = 0;

  static get observedAttributes() {
    return ["speed", "color", "max-lines"];
  }

  private get entries(): string[] {
    const attr = this.getAttribute("entries");
    if (attr) {
      try { return JSON.parse(attr); } catch { /* fallthrough */ }
    }
    return DEFAULT_ENTRIES;
  }
  private get speed() { return parseInt(this.getAttribute("speed") || "800"); }
  private get color() { return this.getAttribute("color") || "var(--fg-dim)"; }
  private get maxLines() { return parseInt(this.getAttribute("max-lines") || "5"); }

  connectedCallback() {
    this.lines = [];
    this.idx = 0;
    this.render();
    this.startTicker();
  }

  disconnectedCallback() {
    this.cleanup?.();
  }

  attributeChangedCallback() {
    this.cleanup?.();
    this.startTicker();
  }

  private startTicker() {
    const maxLines = this.maxLines;
    const entries = this.entries;
    this.cleanup = createTicker(this.speed, () => {
      this.lines = [...this.lines.slice(-(maxLines - 1)), entries[this.idx % entries.length]];
      this.idx++;
      this.render();
    });
  }

  private render() {
    const color = this.color;
    const total = this.lines.length;
    const divs = this.lines.map((line, i) => {
      const opacity = 0.5 + 0.5 * ((i + 1) / total);
      return `<div style="opacity:${opacity}">${line}</div>`;
    }).join("");
    this.innerHTML = `<div style="font-family:monospace;font-size:10px;color:${color};line-height:1.5;width:200px;overflow:hidden">${divs}</div>`;
  }
}

customElements.define("mg-log-stream", MgLogStream);
