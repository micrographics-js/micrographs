export class MgCornerOrnament extends HTMLElement {
  static get observedAttributes() {
    return ["corner", "size", "color", "thickness"];
  }

  private get corner() { return (this.getAttribute("corner") || "tl") as "tl" | "tr" | "bl" | "br"; }
  private get size() { return parseInt(this.getAttribute("size") || "16"); }
  private get color() { return this.getAttribute("color") || "var(--fg-dimmer)"; }
  private get thickness() { return parseFloat(this.getAttribute("thickness") || "1.5"); }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  private render() {
    const corner = this.corner, s = this.size, color = this.color, t = this.thickness;
    let lines: Array<{ x1: number; y1: number; x2: number; y2: number }> = [];

    if (corner === "tl") {
      lines = [{ x1: 0, y1: s, x2: 0, y2: 0 }, { x1: 0, y1: 0, x2: s, y2: 0 }];
    } else if (corner === "tr") {
      lines = [{ x1: 0, y1: 0, x2: s, y2: 0 }, { x1: s, y1: 0, x2: s, y2: s }];
    } else if (corner === "bl") {
      lines = [{ x1: 0, y1: 0, x2: 0, y2: s }, { x1: 0, y1: s, x2: s, y2: s }];
    } else {
      lines = [{ x1: s, y1: 0, x2: s, y2: s }, { x1: 0, y1: s, x2: s, y2: s }];
    }

    const linesSvg = lines.map(l =>
      `<line x1="${l.x1}" y1="${l.y1}" x2="${l.x2}" y2="${l.y2}" stroke="${color}" stroke-width="${t}" />`
    ).join("");

    this.innerHTML = `<svg width="${s + t}" height="${s + t}" style="display:block" shape-rendering="crispEdges">${linesSvg}</svg>`;
  }
}

customElements.define("mg-corner-ornament", MgCornerOrnament);
