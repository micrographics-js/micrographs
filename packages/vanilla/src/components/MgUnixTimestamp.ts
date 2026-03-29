export class MgUnixTimestamp extends HTMLElement {
  private intervalId?: ReturnType<typeof setInterval>;

  static get observedAttributes() {
    return ["color"];
  }

  private get color() { return this.getAttribute("color") || "var(--fg-dim)"; }

  connectedCallback() {
    this.render();
    this.intervalId = setInterval(() => this.render(), 1000);
  }

  disconnectedCallback() {
    clearInterval(this.intervalId);
  }

  attributeChangedCallback() {
    this.render();
  }

  private render() {
    const ts = Math.floor(Date.now() / 1000);
    const color = this.color;
    this.innerHTML = `<span style="font-family:monospace;font-size:11px;color:${color};letter-spacing:0.05em">${ts}</span>`;
  }
}

customElements.define("mg-unix-timestamp", MgUnixTimestamp);
