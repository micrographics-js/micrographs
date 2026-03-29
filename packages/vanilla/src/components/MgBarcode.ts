import { seeded } from "@micrographics-js/core";

export class MgBarcode extends HTMLElement {
  static get observedAttributes() {
    return ["seed", "width", "height", "color"];
  }

  private get seed() { return parseInt(this.getAttribute("seed") || "42"); }
  private get width() { return parseInt(this.getAttribute("width") || "60"); }
  private get height() { return parseInt(this.getAttribute("height") || "20"); }
  private get color() { return this.getAttribute("color") || "var(--fg-dim)"; }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  private render() {
    const seed = this.seed, w = this.width, h = this.height, color = this.color;
    const bars = Array.from({ length: Math.floor(w / 2) }, (_, i) => {
      const bw = seeded(seed + i) > 0.5 ? 2 : 1;
      const bh = Math.round(h * (0.6 + seeded(seed + i + 100) * 0.4));
      const x = i * 2;
      return `<rect x="${x}" y="${h - bh}" width="${bw}" height="${bh}" fill="${color}" />`;
    }).join("");

    this.innerHTML = `<svg width="${w}" height="${h}" style="display:block" shape-rendering="crispEdges">${bars}</svg>`;
  }
}

customElements.define("mg-barcode", MgBarcode);
