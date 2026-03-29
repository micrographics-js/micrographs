import { createTicker } from "@micrographics/core";

export class MgTargetReticle extends HTMLElement {
  private cleanup?: () => void;
  private rotation = 0;
  private pulse = 1;

  static get observedAttributes() {
    return ["size", "color", "label", "animate", "rings", "crosshair", "speed"];
  }

  private get size() { return parseInt(this.getAttribute("size") || "64"); }
  private get color() { return this.getAttribute("color") || "var(--accent)"; }
  private get label() { return this.getAttribute("label") || ""; }
  private get animate() { return this.getAttribute("animate") !== "false"; }
  private get rings() { return parseInt(this.getAttribute("rings") || "2"); }
  private get crosshair() { return this.getAttribute("crosshair") !== "false"; }
  private get speed() { return parseInt(this.getAttribute("speed") || "3000"); }

  connectedCallback() {
    this.rotation = 0;
    this.pulse = 1;
    this.render();
    if (this.animate) {
      const speed = this.speed;
      this.cleanup = createTicker(40, () => {
        this.rotation = (this.rotation + (360 / speed) * 40) % 360;
        this.pulse = 0.5 + 0.5 * Math.abs(Math.sin(Date.now() / 800));
        this.render();
      });
    }
  }

  disconnectedCallback() {
    this.cleanup?.();
  }

  attributeChangedCallback() {
    this.cleanup?.();
    this.rotation = 0;
    this.pulse = 1;
    this.render();
    if (this.animate) {
      const speed = this.speed;
      this.cleanup = createTicker(40, () => {
        this.rotation = (this.rotation + (360 / speed) * 40) % 360;
        this.pulse = 0.5 + 0.5 * Math.abs(Math.sin(Date.now() / 800));
        this.render();
      });
    }
  }

  private render() {
    const size = this.size, color = this.color;
    const cx = size / 2, cy = size / 2;
    const gap = 8;
    const ringsCount = this.rings;

    const ringsSvg = Array.from({ length: ringsCount }, (_, i) =>
      `<circle cx="${cx}" cy="${cy}" r="${cx - 2 - i * 8}" fill="none" stroke="${color}" stroke-width="0.5" opacity="${0.3 - i * 0.1}" ${i === 0 ? "" : 'stroke-dasharray="4 8"'} />`
    ).join("");

    const brackets = [0, 90, 180, 270].map(baseAngle => {
      const angle = baseAngle + this.rotation;
      const rad = (angle * Math.PI) / 180;
      const r = cx - 4;
      const bx = cx + r * Math.cos(rad);
      const by = cy + r * Math.sin(rad);
      const len = 6;
      const perpRad = rad + Math.PI / 2;
      return `<g filter="url(#reticle-glow)">
        <line x1="${bx}" y1="${by}" x2="${bx + len * Math.cos(rad)}" y2="${by + len * Math.sin(rad)}" stroke="${color}" stroke-width="1.5" />
        <line x1="${bx}" y1="${by}" x2="${bx + len * Math.cos(perpRad)}" y2="${by + len * Math.sin(perpRad)}" stroke="${color}" stroke-width="1.5" />
      </g>`;
    }).join("");

    const crosshairSvg = this.crosshair ? `
      <line x1="${2}" y1="${cy}" x2="${cx - gap}" y2="${cy}" stroke="${color}" stroke-width="0.75" opacity="0.6" />
      <line x1="${cx + gap}" y1="${cy}" x2="${cx * 2 - 2}" y2="${cy}" stroke="${color}" stroke-width="0.75" opacity="0.6" />
      <line x1="${cx}" y1="${2}" x2="${cx}" y2="${cy - gap}" stroke="${color}" stroke-width="0.75" opacity="0.6" />
      <line x1="${cx}" y1="${cy + gap}" x2="${cx}" y2="${cy * 2 - 2}" stroke="${color}" stroke-width="0.75" opacity="0.6" />
    ` : "";

    const labelSvg = this.label
      ? `<text x="${cx * 2 - 2}" y="${cy + 3}" text-anchor="end" fill="${color}" font-size="6" font-family="monospace" letter-spacing="0.1em" opacity="0.7">${this.label}</text>`
      : "";

    this.innerHTML = `<svg width="${size}" height="${size}" style="display:block;overflow:visible">
      <defs>
        <filter id="reticle-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      ${ringsSvg}
      ${brackets}
      ${crosshairSvg}
      <circle cx="${cx}" cy="${cy}" r="2" fill="${color}" opacity="${this.pulse}" filter="url(#reticle-glow)" />
      ${labelSvg}
    </svg>`;
  }
}

customElements.define("mg-target-reticle", MgTargetReticle);
