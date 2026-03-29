function formatUptime(ms: number): string {
  const s = Math.floor(ms / 1000);
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;
  return `${String(days).padStart(2, "0")}:${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export class MgUptime extends HTMLElement {
  private intervalId?: ReturnType<typeof setInterval>;
  private mountTime = Date.now();

  static get observedAttributes() {
    return ["start-ms", "color"];
  }

  private get startMs() {
    const attr = this.getAttribute("start-ms");
    return attr ? parseInt(attr) : this.mountTime;
  }
  private get color() { return this.getAttribute("color") || "var(--fg)"; }

  connectedCallback() {
    this.mountTime = Date.now();
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
    const elapsed = Date.now() - this.startMs;
    const color = this.color;
    this.innerHTML = `<span style="font-family:monospace;font-size:11px;color:${color};letter-spacing:0.08em">${formatUptime(elapsed)}</span>`;
  }
}

customElements.define("mg-uptime", MgUptime);
