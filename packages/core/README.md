# @micrographics-js/core

Shared animation utilities for the [Micrographics](https://github.com/micrographics-js/micrographs) component library.

This package provides the low-level primitives that power all Micrographics components: deterministic RNG, easing functions, animation tickers, typewriter effects, and glitch text generators.

## Install

```bash
npm install @micrographics-js/core
```

> This package is **free and open source** (MIT license). It's automatically installed as a dependency of all Micrographics framework packages.

## What's inside

| Module | Exports | Description |
|--------|---------|-------------|
| `utils/rng` | `seeded(n)` | Deterministic pseudo-random number generator for consistent visuals |
| `utils/easing` | `easeInOut`, `easeOut`, `linear` | Standard easing functions for smooth animations |
| `utils/paths` | `pixelDiamondPath`, `cornerPath` | SVG path generators for pixel-crisp shapes |
| `animations/ticker` | `createTicker(ms, cb)` | Interval-based animation loop with automatic cleanup |
| `animations/typewriter` | `typeIn(text, speed)` | Character-by-character text reveal |
| `animations/glitch` | `glitchText(text, intensity)`, `scramble(text)` | Text distortion effects |

## Usage

```ts
import { createTicker, seeded, glitchText } from "@micrographics-js/core";

// Animation loop — returns cleanup function
const stop = createTicker(200, () => {
  console.log("tick");
});
// Later: stop();

// Deterministic random
seeded(42); // always returns the same value

// Glitch text
glitchText("HELLO", 0.3); // "HE▓LO" (random distortion)
```

## Part of Micrographics

84 animated micro-UI components for React, Vue, Svelte & Vanilla Web Components.
Dark industrial terminal aesthetic. Pure SVG. CSS custom properties. Zero runtime dependencies.

- [`@micrographics-js/react`](https://github.com/micrographics-js/micrographs/tree/main/packages/react)
- [`@micrographics-js/vue`](https://github.com/micrographics-js/micrographs/tree/main/packages/vue)
- [`@micrographics-js/svelte`](https://github.com/micrographics-js/micrographs/tree/main/packages/svelte)
- [`@micrographics-js/vanilla`](https://github.com/micrographics-js/micrographs/tree/main/packages/vanilla)
- [`@micrographics-js/tailwind`](https://github.com/micrographics-js/micrographs/tree/main/packages/tailwind)

## License

MIT
