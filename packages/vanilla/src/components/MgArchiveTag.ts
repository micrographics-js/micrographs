import { seeded } from "@micrographics/core";

export class MgArchiveTag extends HTMLElement {
  static get observedAttributes() {
    return ["id", "label", "date", "color", "seed"];
  }

  private get archiveId() { return this.getAttribute("id") || "NAS-001"; }
  private get label() { return this.getAttribute("label") || "INTERNAL"; }
  private get date() { return this.getAttribute("date") || ""; }
  private get color() { return this.getAttribute("color") || "var(--fg-dim)"; }
  private get seed() { return parseInt(this.getAttribute("seed") || "42"); }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  private render() {
    const seed = this.seed, color = this.color;
    const fakeDate = this.date || `${2024 + Math.floor(seeded(seed) * 2)}.${String(Math.floor(seeded(seed + 1) * 12) + 1).padStart(2, "0")}`;
    const vol = String(Math.floor(seeded(seed + 2) * 9) + 1);
    const track = String(Math.floor(seeded(seed + 3) * 99) + 1).padStart(2, "0");

    this.innerHTML = `<div style="font-family:monospace;border:1px solid var(--border-strong);padding:6px 8px;display:inline-flex;flex-direction:column;gap:3px;min-width:100px">
      <div style="font-size:7px;color:var(--fg-dimmer);letter-spacing:0.15em">ARCHIVE</div>
      <div style="font-size:14px;color:${color};font-weight:bold;letter-spacing:0.05em">${this.archiveId}</div>
      <div style="display:flex;justify-content:space-between;gap:8px">
        <span style="font-size:8px;color:var(--fg-dimmer)">${this.label}</span>
        <span style="font-size:8px;color:var(--fg-dimmer)">${fakeDate}</span>
      </div>
      <div style="display:flex;gap:4px;margin-top:1px">
        <span style="font-size:7px;color:var(--fg-dimmer);opacity:0.6">VOL.${vol}</span>
        <span style="font-size:7px;color:var(--fg-dimmer);opacity:0.6">TRK.${track}</span>
      </div>
    </div>`;
  }
}

customElements.define("mg-archive-tag", MgArchiveTag);
