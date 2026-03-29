import { createTicker } from "@micrographics-js/core";

export class MgPingIndicator extends HTMLElement {
  private cleanup?: () => void;
  private active = false;
  private activeTimeout?: ReturnType<typeof setTimeout>;

  static get observedAttributes() {
    return ["ms", "color", "speed"];
  }

  private get ms() { return parseInt(this.getAttribute("ms") || "42"); }
  private get color() { return this.getAttribute("color") || "var(--accent)"; }
  private get speed() { return parseInt(this.getAttribute("speed") || "2000"); }

  connectedCallback() {
    this.active = false;
    this.render();
    this.cleanup = createTicker(this.speed, () => {
      this.active = true;
      this.render();
      clearTimeout(this.activeTimeout);
      this.activeTimeout = setTimeout(() => { this.active = false; this.render(); }, 200);
    });
  }

  disconnectedCallback() {
    this.cleanup?.();
    clearTimeout(this.activeTimeout);
  }

  attributeChangedCallback() {
    this.cleanup?.();
    this.active = false;
    this.render();
    this.cleanup = createTicker(this.speed, () => {
      this.active = true;
      this.render();
      clearTimeout(this.activeTimeout);
      this.activeTimeout = setTimeout(() => { this.active = false; this.render(); }, 200);
    });
  }

  private render() {
    const color = this.color, ms = this.ms;
    const bgColor = this.active ? color : "transparent";
    this.innerHTML = `<span style="font-family:monospace;font-size:11px;color:${color};display:inline-flex;align-items:center;gap:5px">
      <span style="display:inline-block;width:6px;height:6px;background:${bgColor};border:1px solid ${color};border-radius:0;transition:background 0.1s"></span>
      ${ms}ms
    </span>`;
  }
}

customElements.define("mg-ping-indicator", MgPingIndicator);
