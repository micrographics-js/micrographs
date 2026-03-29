import { createTicker } from "@micrographics/core";

export class MgErrorRate extends HTMLElement {
  private cleanup?: () => void;
  private on = true;
  private current = 7;

  static get observedAttributes() {
    return ["count", "speed"];
  }

  private get count() { return parseInt(this.getAttribute("count") || "7"); }
  private get speed() { return parseInt(this.getAttribute("speed") || "1500"); }

  connectedCallback() {
    this.current = this.count;
    this.render();
    this.cleanup = createTicker(this.speed, () => {
      this.on = !this.on;
      if (Math.random() < 0.3) this.current++;
      this.render();
    });
  }

  disconnectedCallback() {
    this.cleanup?.();
  }

  attributeChangedCallback() {
    this.cleanup?.();
    this.current = this.count;
    this.on = true;
    this.render();
    this.cleanup = createTicker(this.speed, () => {
      this.on = !this.on;
      if (Math.random() < 0.3) this.current++;
      this.render();
    });
  }

  private render() {
    this.innerHTML = `<span style="font-family:monospace;font-size:11px;color:var(--accent-red);opacity:${this.on ? 1 : 0.4};transition:opacity 0.1s">ERR:${this.current}</span>`;
  }
}

customElements.define("mg-error-rate", MgErrorRate);
