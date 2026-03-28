/** Pixel-crisp diamond path (axis-aligned segments only) */
export function pixelDiamondPath(cx: number, cy: number, u = 2): string {
  return [
    `M ${cx - u},${cy - 3 * u}`, `L ${cx + u},${cy - 3 * u}`,
    `L ${cx + u},${cy - 2 * u}`, `L ${cx + 2 * u},${cy - 2 * u}`,
    `L ${cx + 2 * u},${cy - u}`, `L ${cx + 3 * u},${cy - u}`,
    `L ${cx + 3 * u},${cy + u}`, `L ${cx + 2 * u},${cy + u}`,
    `L ${cx + 2 * u},${cy + 2 * u}`, `L ${cx + u},${cy + 2 * u}`,
    `L ${cx + u},${cy + 3 * u}`, `L ${cx - u},${cy + 3 * u}`,
    `L ${cx - u},${cy + 2 * u}`, `L ${cx - 2 * u},${cy + 2 * u}`,
    `L ${cx - 2 * u},${cy + u}`, `L ${cx - 3 * u},${cy + u}`,
    `L ${cx - 3 * u},${cy - u}`, `L ${cx - 2 * u},${cy - u}`,
    `L ${cx - 2 * u},${cy - 2 * u}`, `L ${cx - u},${cy - 2 * u}`, "Z",
  ].join(" ");
}

export function staircasePath(points: [number, number][]): string {
  if (points.length === 0) return "";
  let d = `M ${points[0][0]},${points[0][1]}`;
  for (let i = 1; i < points.length; i++) {
    d += ` L ${points[i][0]},${points[i - 1][1]} L ${points[i][0]},${points[i][1]}`;
  }
  return d;
}
