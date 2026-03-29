import { createTicker } from "@micrographics-js/core";

export class MgVUMeter extends HTMLElement {
  private cleanup?: () => void;
  private levels = [0.7, 0.5];

  static get observedAttributes() {
    return ["color", "speed", "height"];
  }

  private get color() { return this.getAttribute("color") || "var(--accent)"; }
  private get speed() { return parseInt(this.getAttribute("speed") || "80"); }
  private get height() { return parseInt(this.getAttribute("height") || "40"); }

  connectedCallback() {
    this.levels = [0.7, 0.5];
    this.render();
    this.cleanup = createTicker(this.speed, () => {
      this.levels = this.levels.map(v => Math.max(0.05, Math.min(1, v + (Math.random() - 0.5) * 0.25)));
      this.render();
    });
  }

  disconnectedCallback() {
    this.cleanup?.();
  }

  attributeChangedCallback() {
    this.cleanup?.();
    this.levels = [0.7, 0.5];
    this.render();
    this.cleanup = createTicker(this.speed, () => {
      this.levels = this.levels.map(v => Math.max(0.05, Math.min(1, v + (Math.random() - 0.5) * 0.25)));
      this.render();
    });
  }

  private render() {
    const color = this.color, h = this.height;
    const segments = 8, barW = 8, gap = 2;
    const svgW = 2 * barW + gap + 4;
    const segH = Math.floor(h / segments) - 1;

    const rects = this.levels.flatMap((lv, col) => {
      const filled = Math.round(lv * segments);
      return Array.from({ length: segments }, (_, i) => {
        const seg = segments - 1 - i;
        const x = col * (barW + gap + 2);
        const y = i * (segH + 1);
        const active = seg < filled;
        const segColor = seg >= segments - 2 ? "var(--accent-red)" : seg >= segments - 4 ? "var(--accent-amber)" : color;
        return `<rect x="${x}" y="${y}" width="${barW}" height="${segH}" fill="${active ? segColor : "var(--fg-dimmer)"}" opacity="${active ? 1 : 0.2}" />`;
      });
    }).join("");

    this.innerHTML = `<svg width="${svgW}" height="${h}" style="display:block" shape-rendering="crispEdges">${rects}</svg>`;
  }
}

customElements.define("mg-vu-meter", MgVUMeter);
