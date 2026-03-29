import { createTicker } from "@micrographics/core";

export class MgPulseTag extends HTMLElement {
  private cleanup?: () => void;
  private on = true;

  static get observedAttributes() {
    return ["label", "color", "speed"];
  }

  private get label() { return this.getAttribute("label") || "LIVE"; }
  private get color() { return this.getAttribute("color") || "var(--accent)"; }
  private get speed() { return parseInt(this.getAttribute("speed") || "800"); }

  connectedCallback() {
    this.on = true;
    this.render();
    this.cleanup = createTicker(this.speed, () => { this.on = !this.on; this.render(); });
  }

  disconnectedCallback() {
    this.cleanup?.();
  }

  attributeChangedCallback() {
    this.cleanup?.();
    this.on = true;
    this.render();
    this.cleanup = createTicker(this.speed, () => { this.on = !this.on; this.render(); });
  }

  private render() {
    const color = this.color;
    this.innerHTML = `<span style="font-family:monospace;font-size:11px;color:${color};display:inline-flex;align-items:center;gap:4px">
      <span style="opacity:${this.on ? 1 : 0};transition:opacity 0.1s">◆</span>
      <span>${this.label}</span>
    </span>`;
  }
}

customElements.define("mg-pulse-tag", MgPulseTag);
