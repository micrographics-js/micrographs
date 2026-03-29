import { createTicker, seeded } from "@micrographics-js/core";

export class MgBarSparkline extends HTMLElement {
  private cleanup?: () => void;
  private values: number[] = [];

  static get observedAttributes() {
    return ["bars", "color", "height", "speed", "seed"];
  }

  private get bars() { return parseInt(this.getAttribute("bars") || "12"); }
  private get color() { return this.getAttribute("color") || "var(--accent)"; }
  private get height() { return parseInt(this.getAttribute("height") || "32"); }
  private get speed() { return parseInt(this.getAttribute("speed") || "200"); }
  private get seed() { return parseInt(this.getAttribute("seed") || "7"); }

  connectedCallback() {
    this.values = Array.from({ length: this.bars }, (_, i) => seeded(this.seed + i));
    this.render();
    this.cleanup = createTicker(this.speed, () => {
      this.values = [...this.values.slice(1), Math.random()];
      this.render();
    });
  }

  disconnectedCallback() {
    this.cleanup?.();
  }

  attributeChangedCallback() {
    this.cleanup?.();
    this.values = Array.from({ length: this.bars }, (_, i) => seeded(this.seed + i));
    this.render();
    this.cleanup = createTicker(this.speed, () => {
      this.values = [...this.values.slice(1), Math.random()];
      this.render();
    });
  }

  private render() {
    const color = this.color, h = this.height;
    const barW = 3, gap = 1;
    const svgW = this.values.length * (barW + gap) - gap;
    const rects = this.values.map((v, i) => {
      const bh = Math.max(1, Math.round(v * h));
      return `<rect x="${i * (barW + gap)}" y="${h - bh}" width="${barW}" height="${bh}" fill="${color}" />`;
    }).join("");
    this.innerHTML = `<svg width="${svgW}" height="${h}" style="display:block" shape-rendering="crispEdges">${rects}</svg>`;
  }
}

customElements.define("mg-bar-sparkline", MgBarSparkline);
