export class MgBootSequence extends HTMLElement {
  private readyTimeout?: ReturnType<typeof setTimeout>;
  private blinkInterval?: ReturnType<typeof setInterval>;
  private ready = false;
  private blink = true;

  static get observedAttributes() {
    return ["delay", "color"];
  }

  private get delay() { return parseInt(this.getAttribute("delay") || "2000"); }
  private get color() { return this.getAttribute("color") || "var(--accent)"; }

  connectedCallback() {
    this.start();
  }

  disconnectedCallback() {
    clearTimeout(this.readyTimeout);
    clearInterval(this.blinkInterval);
  }

  attributeChangedCallback() {
    clearTimeout(this.readyTimeout);
    clearInterval(this.blinkInterval);
    this.ready = false;
    this.blink = true;
    this.start();
  }

  private start() {
    this.ready = false;
    this.render();
    this.readyTimeout = setTimeout(() => { this.ready = true; this.render(); }, this.delay);
    this.blinkInterval = setInterval(() => { this.blink = !this.blink; this.render(); }, 400);
  }

  private render() {
    const color = this.color;
    if (this.ready) {
      this.innerHTML = `<span style="font-family:monospace;font-size:11px;color:${color};letter-spacing:0.05em">SYS·READY</span>`;
    } else {
      this.innerHTML = `<span style="font-family:monospace;font-size:11px;color:${color};letter-spacing:0.05em"><span style="opacity:${this.blink ? 1 : 0.4}">SYS·BOOTING</span></span>`;
    }
  }
}

customElements.define("mg-boot-sequence", MgBootSequence);
