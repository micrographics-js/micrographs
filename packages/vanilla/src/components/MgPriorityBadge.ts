import { createTicker } from "@micrographics/core";

const LEVEL_COLORS: Record<string, string> = {
  A: "var(--accent-red)",
  B: "var(--accent-amber)",
  C: "var(--accent)",
  D: "var(--fg-dim)",
  X: "var(--fg-dimmer)",
};

export class MgPriorityBadge extends HTMLElement {
  private cleanup?: () => void;
  private on = true;

  static get observedAttributes() {
    return ["level", "label", "blink", "speed"];
  }

  private get level() { return this.getAttribute("level") || "A"; }
  private get _label() { return this.getAttribute("label") || "PRIORITY"; }
  private get blink() { return this.hasAttribute("blink") && this.getAttribute("blink") !== "false"; }
  private get speed() { return parseInt(this.getAttribute("speed") || "800"); }

  connectedCallback() {
    this.on = true;
    this.render();
    if (this.blink) {
      this.cleanup = createTicker(this.speed, () => { this.on = !this.on; this.render(); });
    }
  }

  disconnectedCallback() {
    this.cleanup?.();
  }

  attributeChangedCallback() {
    this.cleanup?.();
    this.on = true;
    this.render();
    if (this.blink) {
      this.cleanup = createTicker(this.speed, () => { this.on = !this.on; this.render(); });
    }
  }

  private render() {
    const level = this.level, label = this._label, blink = this.blink;
    const color = LEVEL_COLORS[level] ?? "var(--fg-dim)";
    const opacity = blink ? (this.on ? 1 : 0.3) : 1;
    this.innerHTML = `<div style="font-family:monospace;display:inline-flex;border:1px solid ${color};opacity:${opacity};transition:opacity 0.1s;user-select:none">
      <div style="font-size:8px;color:var(--fg-dimmer);padding:2px 5px;border-right:1px solid ${color};display:flex;align-items:center;letter-spacing:0.1em">${label}</div>
      <div style="font-size:20px;font-weight:bold;color:${color};padding:0 8px;line-height:1.1">${level}</div>
    </div>`;
  }
}

customElements.define("mg-priority-badge", MgPriorityBadge);
