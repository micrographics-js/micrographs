/** Simple seeded LCG — deterministic, SSR-safe */
export function seeded(n: number): number {
  const x = Math.sin(n + 1) * 10000;
  return x - Math.floor(x);
}

export function seededInt(n: number, min: number, max: number): number {
  return Math.floor(seeded(n) * (max - min + 1)) + min;
}

export class SeededRandom {
  private seed: number;
  constructor(seed: number) { this.seed = seed; }
  next(): number { return seeded(this.seed++); }
  nextInt(min: number, max: number): number { return Math.floor(this.next() * (max - min + 1)) + min; }
}
