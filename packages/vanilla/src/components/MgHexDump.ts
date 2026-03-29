import { createTicker, seeded } from "@micrographics/core";

export class MgHexDump extends HTMLElement {
  private cleanup?: () => void;
  private cells: string[][] = [];
  private flashCell: [number, number] | null = null;
  private flashTimeout?: ReturnType<typeof setTimeout>;

  static get observedAttributes() {
    return ["rows", "cols", "speed", "color", "seed"];
  }

  private get rows() { return parseInt(this.getAttribute("rows") || "4"); }
  private get cols() { return parseInt(this.getAttribute("cols") || "8"); }
  private get speed() { return parseInt(this.getAttribute("speed") || "200"); }
  private get color() { return this.getAttribute("color") || "var(--fg-dimmer)"; }
  private get seed() { return parseInt(this.getAttribute("seed") || "42"); }

  connectedCallback() {
    this.initCells();
    this.render();
    this.startTicker();
  }

  disconnectedCallback() {
    this.cleanup?.();
    clearTimeout(this.flashTimeout);
  }

  attributeChangedCallback() {
    this.cleanup?.();
    this.initCells();
    this.render();
    this.startTicker();
  }

  private initCells() {
    const rows = this.rows, cols = this.cols, seed = this.seed;
    this.cells = Array.from({ length: rows }, (_, ri) =>
      Array.from({ length: cols }, (_, ci) =>
        Math.floor(seeded(seed + ri * cols + ci) * 256).toString(16).toUpperCase().padStart(2, "0"),
      )
    );
  }

  private startTicker() {
    this.cleanup = createTicker(this.speed, () => {
      const r = Math.floor(Math.random() * this.rows);
      const c = Math.floor(Math.random() * this.cols);
      const val = Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, "0");
      this.cells[r][c] = val;
      this.flashCell = [r, c];
      this.render();
      clearTimeout(this.flashTimeout);
      this.flashTimeout = setTimeout(() => { this.flashCell = null; this.render(); }, 150);
    });
  }

  private render() {
    const color = this.color, cols = this.cols;
    const rowsHtml = this.cells.map((row, ri) => {
      const addr = (ri * cols).toString(16).toUpperCase().padStart(4, "0");
      const cells = row.map((cell, ci) => {
        const isFlash = this.flashCell?.[0] === ri && this.flashCell?.[1] === ci;
        const cellColor = isFlash ? "var(--accent)" : color;
        return `<span style="color:${cellColor};transition:color 0.1s">${cell}</span>`;
      }).join("");
      return `<div style="display:flex;gap:4px"><span style="color:var(--fg-dimmer);opacity:0.5">${addr}:</span>${cells}</div>`;
    }).join("");
    this.innerHTML = `<div style="font-family:monospace;font-size:10px;color:${color};line-height:1.6">${rowsHtml}</div>`;
  }
}

customElements.define("mg-hex-dump", MgHexDump);
