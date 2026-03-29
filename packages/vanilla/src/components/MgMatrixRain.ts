import { createTicker } from "@micrographics-js/core";

const CHARS = "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉ01";

export class MgMatrixRain extends HTMLElement {
  private cleanup?: () => void;
  private grid: { char: string; bright: boolean }[][] = [];
  private heads: number[] = [];

  static get observedAttributes() {
    return ["cols", "rows", "speed", "color"];
  }

  private get cols() { return parseInt(this.getAttribute("cols") || "8"); }
  private get rows() { return parseInt(this.getAttribute("rows") || "6"); }
  private get speed() { return parseInt(this.getAttribute("speed") || "100"); }
  private get color() { return this.getAttribute("color") || "var(--accent)"; }

  connectedCallback() {
    this.initGrid();
    this.render();
    this.startTicker();
  }

  disconnectedCallback() {
    this.cleanup?.();
  }

  attributeChangedCallback() {
    this.cleanup?.();
    this.initGrid();
    this.render();
    this.startTicker();
  }

  private initGrid() {
    const cols = this.cols, rows = this.rows;
    this.grid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({ char: " ", bright: false }))
    );
    this.heads = Array.from({ length: cols }, () => -1);
  }

  private startTicker() {
    const rows = this.rows, cols = this.cols;
    this.cleanup = createTicker(this.speed, () => {
      this.heads = this.heads.map(h => {
        if (h === -1 && Math.random() < 0.1) return 0;
        if (h >= rows + 3) return -1;
        return h === -1 ? -1 : h + 1;
      });

      this.grid = this.grid.map(row => row.map(c => ({
        ...c,
        bright: false,
        char: Math.random() < 0.05 ? CHARS[Math.floor(Math.random() * CHARS.length)] : c.char,
      })));

      this.heads.forEach((h, col) => {
        if (h >= 0 && h < rows) {
          this.grid[h][col] = { char: CHARS[Math.floor(Math.random() * CHARS.length)], bright: true };
        }
      });

      this.render();
    });
  }

  private render() {
    const color = this.color;
    const rowsHtml = this.grid.map(row => {
      const cells = row.map(cell => {
        const cellColor = cell.bright ? "#ffffff" : color;
        const opacity = cell.char === " " ? 0 : cell.bright ? 1 : 0.6;
        return `<span style="color:${cellColor};opacity:${opacity};width:12px;display:inline-block;text-align:center">${cell.char}</span>`;
      }).join("");
      return `<div style="display:flex;gap:2px">${cells}</div>`;
    }).join("");
    this.innerHTML = `<div style="font-family:monospace;font-size:11px;line-height:1.4;user-select:none">${rowsHtml}</div>`;
  }
}

customElements.define("mg-matrix-rain", MgMatrixRain);
