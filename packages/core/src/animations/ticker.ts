export function createTicker(intervalMs: number, cb: () => void): () => void {
  const id = setInterval(cb, intervalMs);
  return () => clearInterval(id);
}
