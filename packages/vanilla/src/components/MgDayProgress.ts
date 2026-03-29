export class MgDayProgress extends HTMLElement {
  private intervalId?: ReturnType<typeof setInterval>;

  static get observedAttributes() {
    return ["unit", "color", "accent-color"];
  }

  private get unit() { return this.getAttribute("unit") || "day"; }
  private get color() { return this.getAttribute("color") || "var(--fg-dim)"; }
  private get accentColor() { return this.getAttribute("accent-color") || "var(--accent)"; }

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

  private getProgress(): { pct: number; label: string } {
    const now = new Date();
    const unit = this.unit;
    if (unit === "day") {
      const pct = (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) / 86400;
      return { pct, label: "DAY" };
    }
    if (unit === "year") {
      const start = new Date(now.getFullYear(), 0, 1);
      const end = new Date(now.getFullYear() + 1, 0, 1);
      const pct = (now.getTime() - start.getTime()) / (end.getTime() - start.getTime());
      return { pct, label: "YEAR" };
    }
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const pct = (now.getDate() - 1 + (now.getHours() / 24)) / daysInMonth;
    return { pct, label: "MONTH" };
  }

  private render() {
    const { pct, label } = this.getProgress();
    const color = this.color, accentColor = this.accentColor;
    this.innerHTML = `<span style="font-family:monospace;font-size:11px;color:${color}"><span style="color:${accentColor}">${label}</span> ${(pct * 100).toFixed(1)}%</span>`;
  }
}

customElements.define("mg-day-progress", MgDayProgress);
