import { pixelDiamondPath } from "@micrographics-js/core";

export class MgPixelDiamond extends HTMLElement {
  static get observedAttributes() {
    return ["size", "color", "glow"];
  }

  private get size() { return parseInt(this.getAttribute("size") || "2"); }
  private get color() { return this.getAttribute("color") || "var(--accent)"; }
  private get glow() { return this.getAttribute("glow") !== "false"; }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  private render() {
    const size = this.size, color = this.color, glow = this.glow;
    const margin = size * 4;
    const svgSize = size * 6 + margin * 2;
    const cx = svgSize / 2;
    const cy = svgSize / 2;

    const defs = glow ? `<defs>
      <filter id="diamond-glow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>` : "";

    const filterAttr = glow ? ` filter="url(#diamond-glow)"` : "";

    this.innerHTML = `<svg width="${svgSize}" height="${svgSize}" style="display:block" shape-rendering="crispEdges">
      ${defs}
      <path d="${pixelDiamondPath(cx, cy, size)}" fill="${color}"${filterAttr} />
    </svg>`;
  }
}

customElements.define("mg-pixel-diamond", MgPixelDiamond);
