export class MgDataLabel extends HTMLElement {
  static get observedAttributes() {
    return ["label", "value", "color", "value-color"];
  }

  private get _label() { return this.getAttribute("label") || "STATUS"; }
  private get value() { return this.getAttribute("value") || "ACTIVE"; }
  private get color() { return this.getAttribute("color") || "var(--fg-dimmer)"; }
  private get valueColor() { return this.getAttribute("value-color") || "var(--fg)"; }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  private render() {
    const color = this.color, valueColor = this.valueColor;
    this.innerHTML = `<span style="font-family:monospace;font-size:10px;display:inline-flex;align-items:center;gap:0;border:1px solid var(--border)">
      <span style="color:${color};padding:1px 4px;border-right:1px solid var(--border);background:var(--bg-secondary)">${this._label}</span>
      <span style="color:${valueColor};padding:1px 4px">${this.value}</span>
    </span>`;
  }
}

customElements.define("mg-data-label", MgDataLabel);
