export class MgRatingDots extends HTMLElement {
  static get observedAttributes() {
    return ["value", "max", "color", "empty-color"];
  }

  private get value() { return parseInt(this.getAttribute("value") || "3"); }
  private get max() { return parseInt(this.getAttribute("max") || "5"); }
  private get color() { return this.getAttribute("color") || "var(--accent)"; }
  private get emptyColor() { return this.getAttribute("empty-color") || "var(--fg-dimmer)"; }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  private render() {
    const value = this.value, max = this.max, color = this.color, emptyColor = this.emptyColor;
    const spans = Array.from({ length: max }, (_, i) =>
      `<span style="color:${i < value ? color : emptyColor}">◆</span>`
    ).join("");
    this.innerHTML = `<span style="font-family:monospace;font-size:12px;letter-spacing:0.15em">${spans}</span>`;
  }
}

customElements.define("mg-rating-dots", MgRatingDots);
