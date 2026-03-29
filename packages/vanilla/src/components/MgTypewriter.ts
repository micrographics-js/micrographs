export class MgTypewriter extends HTMLElement {
  private cancelled = false;
  private cursorInterval?: ReturnType<typeof setInterval>;
  private cursor = true;
  private displayed = "";

  static get observedAttributes() {
    return ["text", "speed", "color", "loop"];
  }

  private get text() { return this.getAttribute("text") || "SYSTEM·ONLINE"; }
  private get speed() { return parseInt(this.getAttribute("speed") || "50"); }
  private get color() { return this.getAttribute("color") || "var(--fg)"; }
  private get loop() { return this.getAttribute("loop") !== "false"; }

  connectedCallback() {
    this.cursor = true;
    this.cursorInterval = setInterval(() => { this.cursor = !this.cursor; this.render(); }, 530);
    this.cancelled = false;
    this.startTyping();
  }

  disconnectedCallback() {
    this.cancelled = true;
    clearInterval(this.cursorInterval);
  }

  attributeChangedCallback() {
    this.cancelled = true;
    clearInterval(this.cursorInterval);
    setTimeout(() => {
      this.cancelled = false;
      this.displayed = "";
      this.cursor = true;
      this.cursorInterval = setInterval(() => { this.cursor = !this.cursor; this.render(); }, 530);
      this.startTyping();
    }, 50);
  }

  private startTyping() {
    const text = this.text;
    const speed = this.speed;
    const loop = this.loop;
    let i = 0;
    this.displayed = "";
    this.render();

    const tick = () => {
      if (this.cancelled) return;
      i++;
      this.displayed = text.slice(0, i);
      this.render();
      if (i < text.length) {
        setTimeout(tick, speed);
      } else if (loop) {
        setTimeout(() => {
          if (!this.cancelled) { i = 0; this.displayed = ""; setTimeout(tick, speed); }
        }, 1500);
      }
    };
    setTimeout(tick, speed);
  }

  private render() {
    const color = this.color;
    this.innerHTML = `<span style="font-family:monospace;font-size:11px;color:${color}">${this.displayed}<span style="opacity:${this.cursor ? 1 : 0}">█</span></span>`;
  }
}

customElements.define("mg-typewriter", MgTypewriter);
