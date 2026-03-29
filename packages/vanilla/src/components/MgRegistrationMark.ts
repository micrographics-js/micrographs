export class MgRegistrationMark extends HTMLElement {
  static get observedAttributes() {
    return ["size", "color", "label"];
  }

  private get size() { return parseInt(this.getAttribute("size") || "24"); }
  private get color() { return this.getAttribute("color") || "var(--fg-dimmer)"; }
  private get label() { return this.getAttribute("label") || ""; }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  private render() {
    const size = this.size, color = this.color;
    const cx = size / 2, cy = size / 2;
    const r = size * 0.35;
    const label = this.label;
    const labelHtml = label
      ? `<span style="font-family:monospace;font-size:7px;color:${color};letter-spacing:0.1em">${label}</span>`
      : "";

    this.innerHTML = `<div style="display:inline-flex;flex-direction:column;align-items:center;gap:2px">
      <svg width="${size}" height="${size}" style="display:block">
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="0.75" />
        <line x1="0" y1="${cy}" x2="${size}" y2="${cy}" stroke="${color}" stroke-width="0.75" />
        <line x1="${cx}" y1="0" x2="${cx}" y2="${size}" stroke="${color}" stroke-width="0.75" />
      </svg>
      ${labelHtml}
    </div>`;
  }
}

customElements.define("mg-registration-mark", MgRegistrationMark);
