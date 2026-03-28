const GLITCH_CHARS = "█▓▒░▄▀■╗╔═║┼╱╲±×÷@#$%&?!";

export async function typeIn(
  text: string,
  onChar: (s: string) => void,
  isCancelled: () => boolean,
  charDelay = 20,
): Promise<void> {
  for (let i = 1; i <= text.length; i++) {
    if (isCancelled()) return;
    onChar(text.slice(0, i));
    await delay(charDelay);
  }
}

export async function scramble(
  length: number,
  onFrame: (s: string) => void,
  isCancelled: () => boolean,
  rounds = 4,
  frameDelay = 40,
): Promise<void> {
  for (let r = 0; r < rounds; r++) {
    if (isCancelled()) return;
    onFrame(
      Array.from({ length }, () =>
        GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)],
      ).join(""),
    );
    await delay(frameDelay);
  }
}

export async function typeInWithScramble(
  text: string,
  onFrame: (s: string) => void,
  isCancelled: () => boolean,
  opts: { scrambleRounds?: number; charDelay?: number; frameDelay?: number } = {},
): Promise<void> {
  const { scrambleRounds = 3, charDelay = 25, frameDelay = 40 } = opts;
  await scramble(text.length, onFrame, isCancelled, scrambleRounds, frameDelay);
  if (isCancelled()) return;
  await typeIn(text, onFrame, isCancelled, charDelay);
}

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
