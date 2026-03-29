import { createTicker } from "@micrographics/core";

export class MgBinaryStream extends HTMLElement {
  private cleanup?: () => void;
  private grid: string[][] = [];

  static get observedAttributes() {
    return ["cols", "rows", "speed", "color"];
  }

  private get cols() { return parseInt(this.getAttribute("cols") || "8"); }
  private get rows() { return parseInt(this.getAttribute("rows") || "5"); }
  private get speed() { return parseInt(this.getAttribute("speed") || "120"); }
  private get color() { return this.getAttribute("color") || "var(--fg-dimmer)"; }

  connectedCallback() {
    this.initGrid();
    this.render();
    this.cleanup = createTicker(this.speed, () => {
      const col = Math.floor(Math.random() * this.cols);
      const row = Math.floor(Math.random() * this.rows);
      this.grid[row][col] = this.grid[row][col] === "0" ? "1" : "0";
      this.render();
    });
  }

  disconnectedCallback() {
    this.cleanup?.();
  }

  attributeChangedCallback() {
    this.cleanup?.();
    this.initGrid();
    this.render();
    this.cleanup = createTicker(this.speed, () => {
      const col = Math.floor(Math.random() * this.cols);
      const row = Math.floor(Math.random() * this.rows);
      this.grid[row][col] = this.grid[row][col] === "0" ? "1" : "0";
      this.render();
    });
  }

  private initGrid() {
    this.grid = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => (Math.random() > 0.5 ? "1" : "0")),
    );
  }

  private render() {
    const color = this.color;
    const rows = this.grid.map(row =>
      `<div>${row.join(" ")}</div>`
    ).join("");
    this.innerHTML = `<div style="font-family:monospace;font-size:10px;color:${color};line-height:1.4;user-select:none">${rows}</div>`;
  }
}

customElements.define("mg-binary-stream", MgBinaryStream);
