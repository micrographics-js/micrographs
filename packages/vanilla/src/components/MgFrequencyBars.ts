import { createTicker } from "@micrographics-js/core";

export class MgFrequencyBars extends HTMLElement {
  private cleanup?: () => void;
  private tick = 0;

  static get observedAttributes() {
    return ["bars", "color", "height", "speed"];
  }

  private get bars() { return parseInt(this.getAttribute("bars") || "8"); }
  private get color() { return this.getAttribute("color") || "var(--accent)"; }
  private get height() { return parseInt(this.getAttribute("height") || "32"); }
  private get speed() { return parseInt(this.getAttribute("speed") || "80"); }

  connectedCallback() {
    this.tick = 0;
    this.render();
    this.cleanup = createTicker(this.speed, () => {
      this.tick++;
      this.render();
    });
  }

  disconnectedCallback() {
    this.cleanup?.();
  }

  attributeChangedCallback() {
    this.cleanup?.();
    this.tick = 0;
    this.render();
    this.cleanup = createTicker(this.speed, () => {
      this.tick++;
      this.render();
    });
  }

  private render() {
    const bars = this.bars, color = this.color, h = this.height;
    const barW = 4, gap = 2;
    const svgW = bars * (barW + gap) - gap;
    const rects = Array.from({ length: bars }, (_, i) => {
      const phase = (this.tick / 10 + i * 0.7) % (Math.PI * 2);
      const bh = Math.max(2, Math.round(((Math.sin(phase) + 1) / 2) * h));
      return `<rect x="${i * (barW + gap)}" y="${h - bh}" width="${barW}" height="${bh}" fill="${color}" />`;
    }).join("");
    this.innerHTML = `<svg width="${svgW}" height="${h}" style="display:block" shape-rendering="crispEdges">${rects}</svg>`;
  }
}

customElements.define("mg-frequency-bars", MgFrequencyBars);
