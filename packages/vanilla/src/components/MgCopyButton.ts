export class MgCopyButton extends HTMLElement {
  private state: "idle" | "copied" = "idle";
  private resetTimeout?: ReturnType<typeof setTimeout>;

  static get observedAttributes() {
    return ["text", "color"];
  }

  private get text() { return this.getAttribute("text") || "copy me"; }
  private get color() { return this.getAttribute("color") || "var(--fg-dim)"; }

  connectedCallback() {
    this.render();
    this.addEventListener("click", this.handleClick);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleClick);
    clearTimeout(this.resetTimeout);
  }

  attributeChangedCallback() {
    this.render();
  }

  private handleClick = () => {
    navigator.clipboard?.writeText(this.text).catch(() => {});
    this.state = "copied";
    this.render();
    clearTimeout(this.resetTimeout);
    this.resetTimeout = setTimeout(() => { this.state = "idle"; this.render(); }, 2000);
  };

  private render() {
    const color = this.color;
    const copied = this.state === "copied";
    const btnColor = copied ? "var(--accent)" : color;
    const label = copied ? "[COPIED ✓]" : "[COPY]";
    this.innerHTML = `<button style="font-family:monospace;font-size:10px;color:${btnColor};background:none;border:1px solid ${btnColor};padding:2px 6px;cursor:pointer;letter-spacing:0.05em;transition:color 0.1s,border-color 0.1s">${label}</button>`;
  }
}

customElements.define("mg-copy-button", MgCopyButton);
