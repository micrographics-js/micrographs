import { createTicker } from "@micrographics/core";

const STATUS_COLORS: Record<string, string> = {
  ok: "var(--accent)",
  warn: "var(--accent-amber)",
  error: "var(--accent-red)",
  idle: "var(--fg-dimmer)",
};

export class MgStatusLight extends HTMLElement {
  private cleanup?: () => void;
  private on = true;

  static get observedAttributes() {
    return ["status", "speed"];
  }

  private get status() { return this.getAttribute("status") || "ok"; }
  private get speed() { return parseInt(this.getAttribute("speed") || "1000"); }

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
    const color = STATUS_COLORS[this.status] ?? "var(--fg-dimmer)";
    this.innerHTML = `<svg width="10" height="10" style="display:block" shape-rendering="crispEdges">
      <rect x="1" y="1" width="8" height="8" fill="${color}" opacity="${this.on ? 1 : 0.2}" />
    </svg>`;
  }
}

customElements.define("mg-status-light", MgStatusLight);
