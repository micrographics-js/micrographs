import { createTicker } from "@micrographics-js/core";

export class MgSpinDial extends HTMLElement {
  private cleanup?: () => void;
  private angle = 0;

  static get observedAttributes() {
    return ["done", "color", "size"];
  }

  private get done() { return this.hasAttribute("done") && this.getAttribute("done") !== "false"; }
  private get color() { return this.getAttribute("color") || "var(--accent)"; }
  private get size() { return parseInt(this.getAttribute("size") || "16"); }

  connectedCallback() {
    this.angle = 0;
    this.render();
    if (!this.done) {
      this.cleanup = createTicker(40, () => {
        this.angle = (this.angle + 18) % 360;
        this.render();
      });
    }
  }

  disconnectedCallback() {
    this.cleanup?.();
  }

  attributeChangedCallback() {
    this.cleanup?.();
    if (!this.done) {
      this.cleanup = createTicker(40, () => {
        this.angle = (this.angle + 18) % 360;
        this.render();
      });
    }
    this.render();
  }

  private render() {
    const size = this.size, color = this.color, done = this.done;
    const cx = size / 2, cy = size / 2;
    const r = size / 2 - 1.5;

    if (done) {
      const checkPts = `${cx - r * 0.35},${cy} ${cx - r * 0.1},${cy + r * 0.35} ${cx + r * 0.45},${cy - r * 0.35}`;
      this.innerHTML = `<svg width="${size}" height="${size}" style="display:block" shape-rendering="crispEdges">
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="1.5" />
        <polyline points="${checkPts}" fill="none" stroke="${color}" stroke-width="1.5" stroke-linejoin="round" />
      </svg>`;
      return;
    }

    const rad = (this.angle * Math.PI) / 180;
    const x2 = cx + r * 0.65 * Math.cos(rad);
    const y2 = cy + r * 0.65 * Math.sin(rad);

    this.innerHTML = `<svg width="${size}" height="${size}" style="display:block" shape-rendering="crispEdges">
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="var(--fg-dimmer)" stroke-width="1" stroke-dasharray="3 2" />
      <line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="1.5" stroke-linecap="square" />
      <rect x="${cx - 1}" y="${cy - 1}" width="2" height="2" fill="${color}" />
    </svg>`;
  }
}

customElements.define("mg-spin-dial", MgSpinDial);
