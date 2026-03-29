const SEGMENTS = ["[", " ", "R", "E", "A", "D", "Y", " ", "]"];

export class MgReadyBadge extends HTMLElement {
  private timeoutIds: ReturnType<typeof setTimeout>[] = [];
  private visible = 0;

  static get observedAttributes() {
    return ["color", "delay"];
  }

  private get color() { return this.getAttribute("color") || "var(--accent)"; }
  private get delay() { return parseInt(this.getAttribute("delay") || "80"); }

  connectedCallback() {
    this.start();
  }

  disconnectedCallback() {
    this.timeoutIds.forEach(clearTimeout);
  }

  attributeChangedCallback() {
    this.timeoutIds.forEach(clearTimeout);
    this.start();
  }

  private start() {
    this.visible = 0;
    this.render();
    const delay = this.delay;
    this.timeoutIds = SEGMENTS.map((_, i) =>
      setTimeout(() => { this.visible = i + 1; this.render(); }, delay * (i + 1))
    );
  }

  private render() {
    const color = this.color;
    const text = SEGMENTS.slice(0, this.visible).join("");
    this.innerHTML = `<span style="font-family:monospace;font-size:12px;color:${color};letter-spacing:0.05em">${text}</span>`;
  }
}

customElements.define("mg-ready-badge", MgReadyBadge);
