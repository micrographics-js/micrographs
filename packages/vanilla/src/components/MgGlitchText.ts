import { createTicker, glitchText } from "@micrographics-js/core";

export class MgGlitchText extends HTMLElement {
  private cleanup?: () => void;
  private displayed = "";
  private glitchTimeout?: ReturnType<typeof setTimeout>;

  static get observedAttributes() {
    return ["text", "intensity", "speed", "color"];
  }

  private get text() { return this.getAttribute("text") || "MICROGRAPHICS"; }
  private get intensity() { return parseFloat(this.getAttribute("intensity") || "0.15"); }
  private get speed() { return parseInt(this.getAttribute("speed") || "200"); }
  private get color() { return this.getAttribute("color") || "var(--fg)"; }

  connectedCallback() {
    this.displayed = this.text;
    this.render();
    this.cleanup = createTicker(this.speed, () => {
      if (Math.random() < 0.3) {
        this.displayed = glitchText(this.text, this.intensity);
        this.render();
        clearTimeout(this.glitchTimeout);
        this.glitchTimeout = setTimeout(() => {
          this.displayed = this.text;
          this.render();
        }, 80);
      }
    });
  }

  disconnectedCallback() {
    this.cleanup?.();
    clearTimeout(this.glitchTimeout);
  }

  attributeChangedCallback() {
    this.displayed = this.text;
    this.cleanup?.();
    this.render();
    this.cleanup = createTicker(this.speed, () => {
      if (Math.random() < 0.3) {
        this.displayed = glitchText(this.text, this.intensity);
        this.render();
        clearTimeout(this.glitchTimeout);
        this.glitchTimeout = setTimeout(() => {
          this.displayed = this.text;
          this.render();
        }, 80);
      }
    });
  }

  private render() {
    const color = this.color;
    this.innerHTML = `<span style="font-family:monospace;font-size:12px;color:${color};letter-spacing:0.05em">${this.displayed}</span>`;
  }
}

customElements.define("mg-glitch-text", MgGlitchText);
