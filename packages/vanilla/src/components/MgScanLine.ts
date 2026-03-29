import { createTicker } from "@micrographics-js/core";

export class MgScanLine extends HTMLElement {
  private cleanup?: () => void;
  private y = 0;

  static get observedAttributes() {
    return ["width", "height", "color", "speed"];
  }

  private get width() { return parseInt(this.getAttribute("width") || "60"); }
  private get height() { return parseInt(this.getAttribute("height") || "40"); }
  private get color() { return this.getAttribute("color") || "var(--accent)"; }
  private get speed() { return parseInt(this.getAttribute("speed") || "60"); }

  connectedCallback() {
    this.y = 0;
    this.render();
    this.cleanup = createTicker(this.speed, () => {
      this.y = (this.y + 1) % this.height;
      this.render();
    });
  }

  disconnectedCallback() {
    this.cleanup?.();
  }

  attributeChangedCallback() {
    this.cleanup?.();
    this.y = 0;
    this.render();
    this.cleanup = createTicker(this.speed, () => {
      this.y = (this.y + 1) % this.height;
      this.render();
    });
  }

  private render() {
    const w = this.width, h = this.height, color = this.color, y = this.y;
    this.innerHTML = `<svg width="${w}" height="${h}" style="display:block">
      <rect x="0" y="0" width="${w}" height="${h}" fill="none" stroke="var(--fg-dimmer)" stroke-width="0.5" />
      <rect x="0" y="${y}" width="${w}" height="2" fill="${color}" opacity="0.8" />
      <rect x="0" y="${y - 4}" width="${w}" height="6" fill="${color}" opacity="0.15" />
    </svg>`;
  }
}

customElements.define("mg-scan-line", MgScanLine);
