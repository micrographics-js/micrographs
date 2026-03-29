export class MgPanelTitle extends HTMLElement {
  static get observedAttributes() {
    return ["title", "color", "accent"];
  }

  private get _title() { return this.getAttribute("title") || "PANEL"; }
  private get _color() { return this.getAttribute("color") || "var(--fg-dim)"; }
  private get _accent() { return this.getAttribute("accent") || "var(--accent)"; }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  private render() {
    const color = this._color, accent = this._accent;
    this.innerHTML = `<div style="font-family:monospace;font-size:10px;color:${color};display:flex;align-items:center;gap:6px;user-select:none">
      <span style="flex:1;height:1px;background:${color};opacity:0.4"></span>
      <span style="color:${accent};letter-spacing:0.15em">${this._title}</span>
      <span style="flex:1;height:1px;background:${color};opacity:0.4"></span>
    </div>`;
  }
}

customElements.define("mg-panel-title", MgPanelTitle);
