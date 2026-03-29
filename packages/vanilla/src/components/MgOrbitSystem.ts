import { createTicker } from "@micrographics/core";

interface OrbitSatellite {
  label: string;
  radius: number;
  speed: number;
  color?: string;
  size?: number;
  startAngle?: number;
}

const DEFAULT_SATELLITES: OrbitSatellite[] = [
  { label: "NODE·A", radius: 28, speed: 4000, color: "var(--accent)", startAngle: 0 },
  { label: "NODE·B", radius: 44, speed: 7000, color: "var(--fg-dim)", startAngle: 120 },
  { label: "NODE·C", radius: 58, speed: 11000, color: "var(--accent-amber)", startAngle: 240 },
];

export class MgOrbitSystem extends HTMLElement {
  private cleanup?: () => void;
  private angles: number[] = [];

  static get observedAttributes() {
    return ["center", "size", "show-rings", "show-labels", "glow-center", "color"];
  }

  private get center() { return this.getAttribute("center") || "SYS"; }
  private get size() { return parseInt(this.getAttribute("size") || "140"); }
  private get showRings() { return this.getAttribute("show-rings") !== "false"; }
  private get showLabels() { return this.getAttribute("show-labels") !== "false"; }
  private get glowCenter() { return this.getAttribute("glow-center") !== "false"; }
  private get color() { return this.getAttribute("color") || "var(--accent)"; }

  private get satellites(): OrbitSatellite[] {
    const attr = this.getAttribute("satellites");
    if (attr) {
      try { return JSON.parse(attr); } catch { /* fallthrough */ }
    }
    return DEFAULT_SATELLITES;
  }

  connectedCallback() {
    this.angles = this.satellites.map(s => s.startAngle ?? 0);
    this.render();
    this.cleanup = createTicker(40, () => {
      const sats = this.satellites;
      this.angles = this.angles.map((a, i) => (a + (360 / sats[i].speed) * 40) % 360);
      this.render();
    });
  }

  disconnectedCallback() {
    this.cleanup?.();
  }

  attributeChangedCallback() {
    this.cleanup?.();
    this.angles = this.satellites.map(s => s.startAngle ?? 0);
    this.render();
    this.cleanup = createTicker(40, () => {
      const sats = this.satellites;
      this.angles = this.angles.map((a, i) => (a + (360 / sats[i].speed) * 40) % 360);
      this.render();
    });
  }

  private render() {
    const size = this.size, color = this.color;
    const cx = size / 2, cy = size / 2;
    const sats = this.satellites;
    const showRings = this.showRings, showLabels = this.showLabels, glowCenter = this.glowCenter;

    const rings = showRings ? sats.map(sat =>
      `<circle cx="${cx}" cy="${cy}" r="${sat.radius}" fill="none" stroke="var(--fg-dimmer)" stroke-width="0.5" stroke-dasharray="3 5" />`
    ).join("") : "";

    const glowFilter = glowCenter ? `<filter id="orbit-glow" x="-200%" y="-200%" width="500%" height="500%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
    </filter>` : "";

    const satFilter = `<filter id="sat-glow" x="-200%" y="-200%" width="500%" height="500%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
    </filter>`;

    const centerFilter = glowCenter ? ` filter="url(#orbit-glow)"` : "";
    const centerLabel = showLabels ? `<text x="${cx}" y="${cy - 9}" text-anchor="middle" fill="${color}" font-size="6" font-family="monospace" letter-spacing="0.1em">${this.center}</text>` : "";

    const satellitesSvg = sats.map((sat, i) => {
      const rad = (this.angles[i] * Math.PI) / 180;
      const sx = cx + sat.radius * Math.cos(rad);
      const sy = cy + sat.radius * Math.sin(rad);
      const satColor = sat.color ?? "var(--fg-dim)";
      const satSize = sat.size ?? 3;

      const trail = [0.4, 0.6, 0.8].map((t, ti) => {
        const trailAngle = this.angles[i] - (360 / sat.speed) * 40 * (ti + 1) * 3;
        const tr = (trailAngle * Math.PI) / 180;
        const tx = cx + sat.radius * Math.cos(tr);
        const ty = cy + sat.radius * Math.sin(tr);
        return `<circle cx="${tx}" cy="${ty}" r="${satSize * (1 - t * 0.5)}" fill="${satColor}" opacity="${1 - t}" />`;
      }).join("");

      const label = showLabels ? `<text x="${sx + satSize + 3}" y="${sy + 3}" fill="${satColor}" font-size="6" font-family="monospace" letter-spacing="0.05em" opacity="0.85">${sat.label}</text>` : "";

      return `<g filter="url(#sat-glow)">${trail}<circle cx="${sx}" cy="${sy}" r="${satSize}" fill="${satColor}" />${label}</g>`;
    }).join("");

    this.innerHTML = `<svg width="${size}" height="${size}" style="display:block;overflow:visible">
      <defs>${glowFilter}${satFilter}</defs>
      ${rings}
      <line x1="${cx - 6}" y1="${cy}" x2="${cx + 6}" y2="${cy}" stroke="var(--fg-dimmer)" stroke-width="0.5" />
      <line x1="${cx}" y1="${cy - 6}" x2="${cx}" y2="${cy + 6}" stroke="var(--fg-dimmer)" stroke-width="0.5" />
      <circle cx="${cx}" cy="${cy}" r="5" fill="none" stroke="${color}" stroke-width="1"${centerFilter} />
      <circle cx="${cx}" cy="${cy}" r="2" fill="${color}"${centerFilter} />
      ${centerLabel}
      ${satellitesSvg}
    </svg>`;
  }
}

customElements.define("mg-orbit-system", MgOrbitSystem);
