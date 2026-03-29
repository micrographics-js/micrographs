export class MgPixelClock extends HTMLElement {
  private intervalId?: ReturnType<typeof setInterval>;

  static get observedAttributes() {
    return ["color", "show-seconds"];
  }

  private get color() { return this.getAttribute("color") || "var(--accent)"; }
  private get showSeconds() { return this.getAttribute("show-seconds") !== "false"; }

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
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    const color = this.color;
    const time = `${hh}:${mm}${this.showSeconds ? `:${ss}` : ""}`;
    this.innerHTML = `<span style="font-family:monospace;font-size:18px;color:${color};letter-spacing:0.1em;font-weight:bold">${time}</span>`;
  }
}

customElements.define("mg-pixel-clock", MgPixelClock);
