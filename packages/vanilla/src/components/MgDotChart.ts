import { createTicker, seeded } from "@micrographics/core";

export class MgDotChart extends HTMLElement {
  private cleanup?: () => void;
  private values: number[] = [];

  static get observedAttributes() {
    return ["width", "seed", "color", "height", "speed"];
  }

  private get dotWidth() { return parseInt(this.getAttribute("width") || "9"); }
  private get seed() { return parseInt(this.getAttribute("seed") || "42"); }
  private get color() { return this.getAttribute("color") || "var(--accent)"; }
  private get height() { return parseInt(this.getAttribute("height") || "32"); }
  private get speed() { return parseInt(this.getAttribute("speed") || "180"); }

  connectedCallback() {
    this.values = Array.from({ length: this.dotWidth }, (_, i) => seeded(this.seed + i));
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
    this.values = Array.from({ length: this.dotWidth }, (_, i) => seeded(this.seed + i));
    this.render();
    this.cleanup = createTicker(this.speed, () => {
      this.values = [...this.values.slice(1), Math.random()];
      this.render();
    });
  }

  private render() {
    const color = this.color, h = this.height;
    const dotSize = 3;
    const svgW = this.values.length * (dotSize + 2) - 2;
    const dots = this.values.map((v, i) => {
      const x = i * (dotSize + 2);
      const y = Math.round((1 - v) * (h - dotSize));
      return `<rect x="${x}" y="${y}" width="${dotSize}" height="${dotSize}" fill="${color}" />`;
    }).join("");
    this.innerHTML = `<svg width="${svgW}" height="${h}" style="display:block" shape-rendering="crispEdges">${dots}</svg>`;
  }
}

customElements.define("mg-dot-chart", MgDotChart);
