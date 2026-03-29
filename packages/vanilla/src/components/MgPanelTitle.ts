export class MgPanelTitle extends HTMLElement {
  static get observedAttributes() {
    return ["title", "color", "accent"];
  }

  private get title() { return this.getAttribute("title") || "PANEL"; }
  private get color() { return this.getAttribute("color") || "var(--fg-dim)"; }
  private get accent() { return this.getAttribute("accent") || "var(--accent)"; }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  private render() {
    const color = this.color, accent = this.accent;
    this.innerHTML = `<div style="font-family:monospace;font-size:10px;color:${color};display:flex;align-items:center;gap:6px;user-select:none">
      <span style="flex:1;height:1px;background:${color};opacity:0.4"></span>
      <span style="color:${accent};letter-spacing:0.15em">${this.title}</span>
      <span style="flex:1;height:1px;background:${color};opacity:0.4"></span>
    </div>`;
  }
}

customElements.define("mg-panel-title", MgPanelTitle);
