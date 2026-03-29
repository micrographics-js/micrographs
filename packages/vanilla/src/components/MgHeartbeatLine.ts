import { createTicker } from "@micrographics-js/core";

export class MgHeartbeatLine extends HTMLElement {
  private cleanup?: () => void;
  private phase = 0;

  static get observedAttributes() {
    return ["width", "height", "color", "speed"];
  }

  private get width() { return parseInt(this.getAttribute("width") || "80"); }
  private get height() { return parseInt(this.getAttribute("height") || "24"); }
  private get color() { return this.getAttribute("color") || "var(--accent)"; }
  private get speed() { return parseInt(this.getAttribute("speed") || "1200"); }

  connectedCallback() {
    this.phase = 0;
    this.render();
    this.cleanup = createTicker(this.speed / 20, () => {
      this.phase = (this.phase + 1) % 20;
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
    this.cleanup = createTicker(this.speed / 20, () => {
      this.phase = (this.phase + 1) % 20;
      this.render();
    });
  }

  private render() {
    const w = this.width, h = this.height, color = this.color;
    const mid = h / 2;
    const step = w / 20;
    const pts: string[] = [];
    for (let i = 0; i < 20; i++) {
      const x = i * step;
      let y = mid;
      const rel = (i - this.phase + 20) % 20;
      if (rel === 8) y = mid - h * 0.4;
      else if (rel === 9) y = mid + h * 0.5;
      else if (rel === 10) y = mid - h * 0.15;
      pts.push(`${x},${y}`);
    }
    this.innerHTML = `<svg width="${w}" height="${h}" style="display:block">
      <polyline points="${pts.join(" ")}" fill="none" stroke="${color}" stroke-width="1.5" />
    </svg>`;
  }
}

customElements.define("mg-heartbeat-line", MgHeartbeatLine);
