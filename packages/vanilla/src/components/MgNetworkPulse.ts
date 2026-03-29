import { createTicker } from "@micrographics/core";

export class MgNetworkPulse extends HTMLElement {
  private cleanup?: () => void;
  private up = 128;
  private down = 512;

  static get observedAttributes() {
    return ["up-kbps", "down-kbps", "speed"];
  }

  private get upKbps() { return parseInt(this.getAttribute("up-kbps") || "128"); }
  private get downKbps() { return parseInt(this.getAttribute("down-kbps") || "512"); }
  private get speed() { return parseInt(this.getAttribute("speed") || "500"); }

  connectedCallback() {
    this.up = this.upKbps;
    this.down = this.downKbps;
    this.render();
    this.startTicker();
  }

  disconnectedCallback() {
    this.cleanup?.();
  }

  attributeChangedCallback() {
    this.cleanup?.();
    this.up = this.upKbps;
    this.down = this.downKbps;
    this.render();
    this.startTicker();
  }

  private startTicker() {
    const upKbps = this.upKbps, downKbps = this.downKbps;
    this.cleanup = createTicker(this.speed, () => {
      this.up = Math.max(0, upKbps + Math.round((Math.random() - 0.5) * 30));
      this.down = Math.max(0, downKbps + Math.round((Math.random() - 0.5) * 80));
      this.render();
    });
  }

  private render() {
    this.innerHTML = `<div style="font-family:monospace;font-size:10px;display:flex;flex-direction:column;gap:2px">
      <span style="color:var(--accent)">▲ ${this.up} KB/s</span>
      <span style="color:var(--fg-dim)">▼ ${this.down} KB/s</span>
    </div>`;
  }
}

customElements.define("mg-network-pulse", MgNetworkPulse);
