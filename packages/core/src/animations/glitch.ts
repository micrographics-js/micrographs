const GLITCH_CHARS = "█▓▒░▄▀■╗╔═║┼╱╲±×÷";

export function glitchChar(c: string): string {
  if (Math.random() < 0.3) {
    return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
  }
  return c;
}

export function glitchText(text: string, intensity = 0.3): string {
  return text
    .split("")
    .map((c) => (Math.random() < intensity ? glitchChar(c) : c))
    .join("");
}

export function glitchLine(width: number): string {
  return Array.from({ length: width }, () =>
    GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)],
  ).join("");
}
