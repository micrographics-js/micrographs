import { createTicker } from "@micrographics-js/core";

export class MgFlowMeter extends HTMLElement {
  private cleanup?: () => void;
  private offset = 0;

  static get observedAttributes() {
    return ["direction", "speed", "color", "count"];
  }

  private get direction() { return (this.getAttribute("direction") || "right") as "right" | "left"; }
  private get speed() { return parseInt(this.getAttribute("speed") || "150"); }
  private get color() { return this.getAttribute("color") || "var(--accent)"; }
  private get count() { return parseInt(this.getAttribute("count") || "5"); }

  connectedCallback() {
    this.offset = 0;
    this.render();
    this.cleanup = createTicker(this.speed, () => {
      this.offset = (this.offset + 1) % this.count;
      this.render();
    });
  }

  disconnectedCallback() {
    this.cleanup?.();
  }

  attributeChangedCallback() {
    this.cleanup?.();
    this.offset = 0;
    this.render();
    this.cleanup = createTicker(this.speed, () => {
      this.offset = (this.offset + 1) % this.count;
      this.render();
    });
  }

  private render() {
    const direction = this.direction, color = this.color, count = this.count;
    const ch = direction === "right" ? ">" : "<";
    const spans = Array.from({ length: count }, (_, i) => {
      const opacity = (i - this.offset + count) % count < 2 ? 1 : 0.25;
      return `<span style="opacity:${opacity}">${ch}</span>`;
    }).join("");
    this.innerHTML = `<span style="font-family:monospace;font-size:12px;color:${color};letter-spacing:0.05em">${spans}</span>`;
  }
}

customElements.define("mg-flow-meter", MgFlowMeter);
