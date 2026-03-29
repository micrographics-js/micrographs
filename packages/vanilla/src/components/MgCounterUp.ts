export class MgCounterUp extends HTMLElement {
  private rafId?: number;
  private value = 0;

  static get observedAttributes() {
    return ["target", "duration", "color", "prefix", "suffix"];
  }

  private get target() { return parseInt(this.getAttribute("target") || "1337"); }
  private get duration() { return parseInt(this.getAttribute("duration") || "1500"); }
  private get color() { return this.getAttribute("color") || "var(--fg)"; }
  private get prefix() { return this.getAttribute("prefix") || ""; }
  private get suffix() { return this.getAttribute("suffix") || ""; }

  connectedCallback() {
    this.startCount();
  }

  disconnectedCallback() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }

  attributeChangedCallback() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.startCount();
  }

  private startCount() {
    const start = Date.now();
    const target = this.target;
    const duration = this.duration;
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      this.value = Math.round(progress * target);
      this.render();
      if (progress < 1) this.rafId = requestAnimationFrame(tick);
    };
    this.rafId = requestAnimationFrame(tick);
  }

  private render() {
    const color = this.color;
    this.innerHTML = `<span style="font-family:monospace;font-size:14px;color:${color};letter-spacing:0.05em">${this.prefix}${this.value.toLocaleString()}${this.suffix}</span>`;
  }
}

customElements.define("mg-counter-up", MgCounterUp);
