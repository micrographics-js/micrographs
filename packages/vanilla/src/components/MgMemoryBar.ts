export class MgMemoryBar extends HTMLElement {
  static get observedAttributes() {
    return ["used", "total", "unit", "segments", "color", "width", "height"];
  }

  private get used() { return parseFloat(this.getAttribute("used") || "6.4"); }
  private get total() { return parseFloat(this.getAttribute("total") || "16"); }
  private get unit() { return this.getAttribute("unit") || "GB"; }
  private get segments() { return parseInt(this.getAttribute("segments") || "10"); }
  private get color() { return this.getAttribute("color") || "var(--accent)"; }
  private get width() { return parseInt(this.getAttribute("width") || "80"); }
  private get height() { return parseInt(this.getAttribute("height") || "8"); }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  private render() {
    const used = this.used, total = this.total, unit = this.unit;
    const segments = this.segments, color = this.color, w = this.width, h = this.height;
    const pct = used / total;
    const filled = Math.round(pct * segments);
    const segW = Math.floor(w / segments) - 1;
    const barColor = pct > 0.85 ? "var(--accent-red)" : pct > 0.65 ? "var(--accent-amber)" : color;

    const rects = Array.from({ length: segments }, (_, i) => {
      const fill = i < filled ? barColor : "var(--fg-dimmer)";
      const opacity = i < filled ? 1 : 0.2;
      return `<rect x="${i * (segW + 1)}" y="0" width="${segW}" height="${h}" fill="${fill}" opacity="${opacity}" />`;
    }).join("");

    this.innerHTML = `<div style="display:flex;flex-direction:column;gap:2px">
      <svg width="${w}" height="${h}" style="display:block" shape-rendering="crispEdges">${rects}</svg>
      <span style="font-family:monospace;font-size:9px;color:var(--fg-dimmer)">${used}${unit} / ${total}${unit}</span>
    </div>`;
  }
}

customElements.define("mg-memory-bar", MgMemoryBar);
