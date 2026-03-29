import { createTicker } from "@micrographics/core";

export class MgSignalMeter extends HTMLElement {
  private cleanup?: () => void;

  static get observedAttributes() {
    return ["bars", "color", "speed", "width", "height"];
  }

  private get bars() { return parseInt(this.getAttribute("bars") || "5"); }
  private get color() { return this.getAttribute("color") || "var(--accent)"; }
  private get speed() { return parseInt(this.getAttribute("speed") || "180"); }
  private get width() { return parseInt(this.getAttribute("width") || "40"); }
  private get height() { return parseInt(this.getAttribute("height") || "24"); }

  connectedCallback() {
    this.render();
    this.cleanup = createTicker(this.speed, () => this.tick());
  }

  disconnectedCallback() {
    this.cleanup?.();
  }

  attributeChangedCallback() {
    this.render();
  }

  private tickCount = 0;

  private tick() {
    this.tickCount++;
    this.render();
  }

  private render() {
    const bars = this.bars, color = this.color, w = this.width, h = this.height;
    const barW = Math.floor(w / bars) - 1;
    const rects = Array.from({ length: bars }, (_, i) => {
      const phase = (this.tickCount / 8 + i * 0.4) % (Math.PI * 2);
      const bh = Math.max(2, Math.round(((Math.sin(phase) + 1) / 2) * h));
      const x = i * (barW + 1);
      return `<rect x="${x}" y="${h - bh}" width="${barW}" height="${bh}" fill="${color}" opacity="${0.7 + 0.3 * ((i + 1) / bars)}" />`;
    }).join("");

    this.innerHTML = `<svg width="${w}" height="${h}" style="display:block" shape-rendering="crispEdges">${rects}</svg>`;
  }
}

customElements.define("mg-signal-meter", MgSignalMeter);
