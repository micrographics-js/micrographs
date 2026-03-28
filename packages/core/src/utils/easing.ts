export function sine(t: number): number {
  return Math.sin(t * Math.PI * 2);
}

export function pulse(t: number, period = 1000): number {
  return (Math.sin((t / period) * Math.PI * 2) + 1) / 2;
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}
