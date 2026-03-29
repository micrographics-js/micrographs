import { createTicker } from "@micrographics/core";

export class MgScanBeam extends HTMLElement {
  private cleanup?: () => void;
  private pos = 0;

  static get observedAttributes() {
    return ["width", "height", "color", "speed"];
  }

  private get width() { return parseInt(this.getAttribute("width") || "80"); }
  private get height() { return parseInt(this.getAttribute("height") || "4"); }
  private get color() { return this.getAttribute("color") || "var(--accent)"; }
  private get speed() { return parseInt(this.getAttribute("speed") || "50"); }

  connectedCallback() {
    this.pos = 0;
    this.render();
    this.cleanup = createTicker(this.speed, () => {
      this.pos = (this.pos + 1) % (this.width + 20);
      this.render();
    });
  }

  disconnectedCallback() {
    this.cleanup?.();
  }

  attributeChangedCallback() {
    this.cleanup?.();
    this.pos = 0;
    this.render();
    this.cleanup = createTicker(this.speed, () => {
      this.pos = (this.pos + 1) % (this.width + 20);
      this.render();
    });
  }

  private render() {
    const w = this.width, h = this.height, color = this.color, pos = this.pos;
    const beamW = 16;
    const gradId = `sb-grad`;
    const clipLeft = Math.max(0, -pos + beamW);
    const clipRight = Math.max(0, pos - w);
    this.innerHTML = `<svg width="${w}" height="${h}" style="display:block" shape-rendering="crispEdges">
      <defs>
        <linearGradient id="${gradId}" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="${color}" stop-opacity="0" />
          <stop offset="40%" stop-color="${color}" stop-opacity="0.4" />
          <stop offset="100%" stop-color="${color}" stop-opacity="1" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="${w}" height="${h}" fill="var(--bg-secondary)" />
      <rect x="${pos - beamW}" y="0" width="${beamW}" height="${h}" fill="url(#${gradId})" clip-path="inset(0 ${clipRight}px 0 ${clipLeft}px)" />
      <rect x="${Math.min(pos, w - 1)}" y="0" width="1" height="${h}" fill="${color}" opacity="0.9" />
    </svg>`;
  }
}

customElements.define("mg-scan-beam", MgScanBeam);
