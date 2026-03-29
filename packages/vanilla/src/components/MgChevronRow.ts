import { createTicker } from "@micrographics-js/core";

export class MgChevronRow extends HTMLElement {
  private cleanup?: () => void;
  private phase = 0;

  static get observedAttributes() {
    return ["direction", "color", "count", "speed"];
  }

  private get direction() { return (this.getAttribute("direction") || "right") as "right" | "left"; }
  private get color() { return this.getAttribute("color") || "var(--fg-dimmer)"; }
  private get count() { return parseInt(this.getAttribute("count") || "6"); }
  private get speed() { return parseInt(this.getAttribute("speed") || "200"); }

  connectedCallback() {
    this.phase = 0;
    this.render();
    this.cleanup = createTicker(this.speed, () => {
      this.phase = (this.phase + 1) % this.count;
      this.render();
    });
  }

  disconnectedCallback() {
    this.cleanup?.();
  }

  attributeChangedCallback() {
    this.cleanup?.();
    this.phase = 0;
    this.render();
    this.cleanup = createTicker(this.speed, () => {
      this.phase = (this.phase + 1) % this.count;
      this.render();
    });
  }

  private render() {
    const direction = this.direction, color = this.color, count = this.count;
    const ch = direction === "right" ? ">" : "<";
    const spans = Array.from({ length: count }, (_, i) => {
      const dist = direction === "right"
        ? (i - this.phase + count) % count
        : (this.phase - i + count) % count;
      const opacity = 1 - dist * (0.8 / count);
      return `<span style="color:${color};opacity:${opacity}">${ch}</span>`;
    }).join("");
    this.innerHTML = `<span style="font-family:monospace;font-size:12px;letter-spacing:0.05em">${spans}</span>`;
  }
}

customElements.define("mg-chevron-row", MgChevronRow);
