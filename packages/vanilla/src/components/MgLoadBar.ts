export class MgLoadBar extends HTMLElement {
  private intervalId?: ReturnType<typeof setInterval>;
  private filled = 0;

  static get observedAttributes() {
    return ["segments", "color", "duration", "width", "height"];
  }

  private get segments() { return parseInt(this.getAttribute("segments") || "12"); }
  private get color() { return this.getAttribute("color") || "var(--accent)"; }
  private get duration() { return parseInt(this.getAttribute("duration") || "1200"); }
  private get width() { return parseInt(this.getAttribute("width") || "96"); }
  private get height() { return parseInt(this.getAttribute("height") || "8"); }

  connectedCallback() {
    this.start();
  }

  disconnectedCallback() {
    clearInterval(this.intervalId);
  }

  attributeChangedCallback() {
    clearInterval(this.intervalId);
    this.start();
  }

  private start() {
    this.filled = 0;
    this.render();
    const segments = this.segments;
    const step = this.duration / segments;
    let i = 0;
    this.intervalId = setInterval(() => {
      i++;
      this.filled = i;
      this.render();
      if (i >= segments) clearInterval(this.intervalId);
    }, step);
  }

  private render() {
    const segments = this.segments, color = this.color, w = this.width, h = this.height;
    const segW = Math.floor(w / segments) - 1;
    const rects = Array.from({ length: segments }, (_, i) => {
      const fill = i < this.filled ? color : "var(--fg-dimmer)";
      const opacity = i < this.filled ? 1 : 0.2;
      return `<rect x="${i * (segW + 1)}" y="0" width="${segW}" height="${h}" fill="${fill}" opacity="${opacity}" />`;
    }).join("");
    this.innerHTML = `<svg width="${w}" height="${h}" style="display:block" shape-rendering="crispEdges">${rects}</svg>`;
  }
}

customElements.define("mg-load-bar", MgLoadBar);
