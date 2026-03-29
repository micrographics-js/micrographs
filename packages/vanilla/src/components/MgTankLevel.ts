import { createTicker } from "@micrographics/core";

export class MgTankLevel extends HTMLElement {
  private cleanup?: () => void;
  private wave = 0;

  static get observedAttributes() {
    return ["level", "color", "width", "height", "label", "animated"];
  }

  private get level() { return parseFloat(this.getAttribute("level") || "0.6"); }
  private get color() { return this.getAttribute("color") || "var(--accent)"; }
  private get width() { return parseInt(this.getAttribute("width") || "24"); }
  private get height() { return parseInt(this.getAttribute("height") || "48"); }
  private get _label() { return this.getAttribute("label") || "FUEL"; }
  private get animated() { return this.getAttribute("animated") !== "false"; }

  connectedCallback() {
    this.wave = 0;
    this.render();
    if (this.animated) {
      this.cleanup = createTicker(100, () => { this.wave += 0.1; this.render(); });
    }
  }

  disconnectedCallback() {
    this.cleanup?.();
  }

  attributeChangedCallback() {
    this.cleanup?.();
    this.wave = 0;
    this.render();
    if (this.animated) {
      this.cleanup = createTicker(100, () => { this.wave += 0.1; this.render(); });
    }
  }

  private render() {
    const level = this.level, color = this.color, w = this.width, h = this.height, label = this._label;
    const fillH = Math.round(level * (h - 4));
    const waveOffset = Math.sin(this.wave) * 2;
    this.innerHTML = `<div style="display:inline-flex;flex-direction:column;align-items:center;gap:2px">
      <svg width="${w}" height="${h}" style="display:block" shape-rendering="crispEdges">
        <rect x="1" y="1" width="${w - 2}" height="${h - 2}" fill="none" stroke="var(--fg-dim)" stroke-width="1" />
        <rect x="2" y="${h - 2 - fillH + waveOffset}" width="${w - 4}" height="${fillH}" fill="${color}" opacity="0.8" />
      </svg>
      <span style="font-family:monospace;font-size:8px;color:var(--fg-dimmer)">${label}</span>
    </div>`;
  }
}

customElements.define("mg-tank-level", MgTankLevel);
