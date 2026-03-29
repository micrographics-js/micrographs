export class MgConnectionStatus extends HTMLElement {
  private flickerTimeout?: ReturnType<typeof setTimeout>;
  private flicker = false;

  static get observedAttributes() {
    return ["connected"];
  }

  private get connected() {
    const attr = this.getAttribute("connected");
    return attr !== "false" && attr !== null ? (attr === "" ? true : attr !== "false") : true;
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    clearTimeout(this.flickerTimeout);
  }

  attributeChangedCallback() {
    this.flicker = true;
    this.render();
    clearTimeout(this.flickerTimeout);
    this.flickerTimeout = setTimeout(() => {
      this.flicker = false;
      this.render();
    }, 300);
  }

  private render() {
    const connected = this.connected;
    const color = connected ? "var(--accent)" : "var(--accent-red)";
    const text = connected ? "CONN·OK" : "CONN·LOST";
    this.innerHTML = `<span style="font-family:monospace;font-size:11px;color:${color};opacity:${this.flicker ? 0.2 : 1};transition:opacity 0.05s;letter-spacing:0.05em">${text}</span>`;
  }
}

customElements.define("mg-connection-status", MgConnectionStatus);
