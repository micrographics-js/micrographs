import { createTicker } from "@micrographics-js/core";

export class MgCPUSparkline extends HTMLElement {
  private cleanup?: () => void;
  private values: number[] = [];

  static get observedAttributes() {
    return ["color", "speed", "bars", "height"];
  }

  private get color() { return this.getAttribute("color") || "var(--accent)"; }
  private get speed() { return parseInt(this.getAttribute("speed") || "500"); }
  private get bars() { return parseInt(this.getAttribute("bars") || "16"); }
  private get height() { return parseInt(this.getAttribute("height") || "24"); }

  connectedCallback() {
    this.values = Array.from({ length: this.bars }, () => Math.random() * 0.8 + 0.1);
    this.render();
    this.cleanup = createTicker(this.speed, () => {
      const last = this.values[this.values.length - 1];
      this.values = [...this.values.slice(1), Math.max(0.05, Math.min(1, last + (Math.random() - 0.5) * 0.4))];
      this.render();
    });
  }

  disconnectedCallback() {
    this.cleanup?.();
  }

  attributeChangedCallback() {
    this.cleanup?.();
    this.values = Array.from({ length: this.bars }, () => Math.random() * 0.8 + 0.1);
    this.render();
    this.cleanup = createTicker(this.speed, () => {
      const last = this.values[this.values.length - 1];
      this.values = [...this.values.slice(1), Math.max(0.05, Math.min(1, last + (Math.random() - 0.5) * 0.4))];
      this.render();
    });
  }

  private render() {
    const color = this.color, h = this.height;
    const barW = 3, gap = 1;
    const svgW = this.values.length * (barW + gap) - gap;
    const last = this.values[this.values.length - 1] ?? 0;
    const cpuPct = Math.round(last * 100);
    const rects = this.values.map((v, i) => {
      const bh = Math.max(1, Math.round(v * h));
      const barColor = v > 0.8 ? "var(--accent-red)" : v > 0.6 ? "var(--accent-amber)" : color;
      return `<rect x="${i * (barW + gap)}" y="${h - bh}" width="${barW}" height="${bh}" fill="${barColor}" />`;
    }).join("");
    this.innerHTML = `<div style="display:flex;flex-direction:column;gap:2px">
      <span style="font-family:monospace;font-size:9px;color:var(--fg-dimmer)">CPU ${cpuPct}%</span>
      <svg width="${svgW}" height="${h}" style="display:block" shape-rendering="crispEdges">${rects}</svg>
    </div>`;
  }
}

customElements.define("mg-cpu-sparkline", MgCPUSparkline);
