import { createTicker } from "@micrographics/core";

export class MgAlertBanner extends HTMLElement {
  private cleanup?: () => void;
  private on = true;

  static get observedAttributes() {
    return ["message", "speed"];
  }

  private get message() { return this.getAttribute("message") || "WARNING"; }
  private get speed() { return parseInt(this.getAttribute("speed") || "600"); }

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
    this.innerHTML = `<div style="font-family:monospace;font-size:11px;color:var(--accent-amber);padding:3px 8px;border:1px solid var(--accent-amber);display:inline-flex;align-items:center;gap:6px;opacity:${this.on ? 1 : 0.5};transition:opacity 0.1s;letter-spacing:0.05em">
      <span>!</span>
      <span>${this.message}</span>
    </div>`;
  }
}

customElements.define("mg-alert-banner", MgAlertBanner);
