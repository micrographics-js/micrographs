import { createTicker } from "@micrographics-js/core";

export class MgBatteryMeter extends HTMLElement {
  private cleanup?: () => void;
  private animLevel = 0.75;

  static get observedAttributes() {
    return ["level", "charging", "width", "height"];
  }

  private get level() { return parseFloat(this.getAttribute("level") || "0.75"); }
  private get charging() { return this.getAttribute("charging") === "true" || this.hasAttribute("charging"); }
  private get width() { return parseInt(this.getAttribute("width") || "28"); }
  private get height() { return parseInt(this.getAttribute("height") || "14"); }

  connectedCallback() {
    this.animLevel = this.charging ? 0 : this.level;
    this.startAnimation();
    this.render();
  }

  disconnectedCallback() {
    this.cleanup?.();
  }

  attributeChangedCallback() {
    this.cleanup?.();
    this.animLevel = this.charging ? 0 : this.level;
    this.startAnimation();
    this.render();
  }

  private startAnimation() {
    if (this.charging) {
      this.cleanup = createTicker(400, () => {
        this.animLevel = (this.animLevel + 0.2) % 1.2;
        this.render();
      });
    } else {
      this.animLevel = this.level;
    }
  }

  private render() {
    const level = this.level, w = this.width, h = this.height;
    const segments = 5;
    const bodyW = w - 4;
    const segW = Math.floor((bodyW - segments + 1) / segments);
    const color = level < 0.2 ? "var(--accent-red)" : level < 0.4 ? "var(--accent-amber)" : "var(--accent)";
    const filled = Math.round(Math.min(this.animLevel, 1) * segments);

    const segs = Array.from({ length: segments }, (_, i) => {
      const x = 2 + i * (segW + 1);
      const fill = i < filled ? color : "none";
      const stroke = i < filled ? "none" : "var(--fg-dimmer)";
      return `<rect x="${x}" y="3" width="${segW}" height="${h - 6}" fill="${fill}" stroke="${stroke}" stroke-width="0.5" />`;
    }).join("");

    this.innerHTML = `<svg width="${w}" height="${h}" style="display:block" shape-rendering="crispEdges">
      <rect x="0" y="1" width="${bodyW}" height="${h - 2}" fill="none" stroke="var(--fg-dim)" stroke-width="1" />
      <rect x="${bodyW}" y="${Math.floor(h / 4)}" width="4" height="${Math.floor(h / 2)}" fill="var(--fg-dim)" />
      ${segs}
    </svg>`;
  }
}

customElements.define("mg-battery-meter", MgBatteryMeter);
