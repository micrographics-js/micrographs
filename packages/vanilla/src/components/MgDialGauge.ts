export class MgDialGauge extends HTMLElement {
  static get observedAttributes() {
    return ["value", "min", "max", "label", "color", "width", "height"];
  }

  private get value() { return parseFloat(this.getAttribute("value") || "65"); }
  private get min() { return parseFloat(this.getAttribute("min") || "0"); }
  private get max() { return parseFloat(this.getAttribute("max") || "100"); }
  private get _label() { return this.getAttribute("label") || "RPM"; }
  private get color() { return this.getAttribute("color") || "var(--accent)"; }
  private get width() { return parseInt(this.getAttribute("width") || "80"); }
  private get height() { return parseInt(this.getAttribute("height") || "50"); }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  private render() {
    const value = this.value, min = this.min, max = this.max;
    const label = this._label, color = this.color;
    const w = this.width, h = this.height;
    const cx = w / 2, cy = h - 8;
    const r = Math.min(cx - 4, cy - 4);
    const pct = Math.max(0, Math.min(1, (value - min) / (max - min)));
    const startAngle = -180;
    const angle = startAngle + pct * 180;
    const rad = (angle * Math.PI) / 180;
    const nx = cx + r * 0.75 * Math.cos(rad);
    const ny = cy + r * 0.75 * Math.sin(rad);

    const arcPath = (radius: number, start: number, end: number) => {
      const startRad = (start * Math.PI) / 180;
      const endRad = (end * Math.PI) / 180;
      const x1 = cx + radius * Math.cos(startRad);
      const y1 = cy + radius * Math.sin(startRad);
      const x2 = cx + radius * Math.cos(endRad);
      const y2 = cy + radius * Math.sin(endRad);
      return `M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}`;
    };

    this.innerHTML = `<svg width="${w}" height="${h}" style="display:block">
      <path d="${arcPath(r, -180, 0)}" fill="none" stroke="var(--fg-dimmer)" stroke-width="2" />
      <path d="${arcPath(r, -180, startAngle + pct * 180)}" fill="none" stroke="${color}" stroke-width="2" />
      <line x1="${cx}" y1="${cy}" x2="${nx}" y2="${ny}" stroke="${color}" stroke-width="1.5" />
      <circle cx="${cx}" cy="${cy}" r="3" fill="${color}" />
      <text x="${cx}" y="${cy - r - 4}" text-anchor="middle" fill="var(--fg-dim)" font-size="8" font-family="monospace">${label}</text>
      <text x="${cx}" y="${h - 2}" text-anchor="middle" fill="${color}" font-size="9" font-family="monospace">${value}</text>
    </svg>`;
  }
}

customElements.define("mg-dial-gauge", MgDialGauge);
