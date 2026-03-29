import { typeIn, scramble } from "@micrographics/core";

const DEFAULT_SENTENCES = [
  "LOADING SUBSYSTEMS...",
  "SIGNAL ACQUIRED",
  "READY FOR TRANSMISSION",
  "AWAITING FURTHER ORDERS",
];

export class MgGlitchCycler extends HTMLElement {
  private cancelled = false;

  static get observedAttributes() {
    return ["pause-ms", "color"];
  }

  private get sentences(): string[] {
    const attr = this.getAttribute("sentences");
    if (attr) {
      try { return JSON.parse(attr); } catch { /* fallthrough */ }
    }
    return DEFAULT_SENTENCES;
  }
  private get pauseMs() { return parseInt(this.getAttribute("pause-ms") || "2000"); }
  private get color() { return this.getAttribute("color") || "var(--accent)"; }

  connectedCallback() {
    this.cancelled = false;
    this.runLoop();
  }

  disconnectedCallback() {
    this.cancelled = true;
  }

  attributeChangedCallback() {
    this.cancelled = true;
    setTimeout(() => {
      this.cancelled = false;
      this.runLoop();
    }, 50);
  }

  private async runLoop() {
    let idx = 0;
    const sentences = this.sentences;
    const pauseMs = this.pauseMs;

    while (!this.cancelled) {
      const text = sentences[idx % sentences.length];
      idx++;
      await scramble(text.length, (s) => this.setDisplayed(s), () => this.cancelled, 4, 40);
      if (this.cancelled) break;
      await typeIn(text, (s) => this.setDisplayed(s), () => this.cancelled, 25);
      if (this.cancelled) break;
      await new Promise<void>(r => setTimeout(r, pauseMs));
    }
  }

  private setDisplayed(text: string) {
    const color = this.color;
    this.innerHTML = `<span style="font-family:monospace;font-size:11px;color:${color};letter-spacing:0.05em">${text}</span>`;
  }
}

customElements.define("mg-glitch-cycler", MgGlitchCycler);
