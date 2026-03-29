# @micrographics-js/svelte

**84 animated micro-UI components for Svelte 5.** Dark industrial terminal aesthetic. Pure SVG. Fully themeable via CSS custom properties.

## Install

```bash
npm install @micrographics-js/svelte @micrographics-js/core
```

> Requires a license token. See [setup](#setup) below.

## Quick Start

```svelte
<script>
import { SignalMeter, PulseTag, DialGauge, RadarSweep } from "@micrographics-js/svelte";
</script>

<div style="background: #0d0e17; padding: 24px; font-family: monospace">
  <SignalMeter bars={5} speed={180} />
  <PulseTag label="ONLINE" />
  <DialGauge value={72} />
  <RadarSweep size={80} />
</div>
```

## 84 Components across 8 Packs

Signals (23) | Data (11) | Text (12) | Chrome (11) | Clocks (6) | Gauges (8) | Interaction (5) | Orbit & Nav (8)

Full component list: [documentation](https://github.com/micrographics-js/micrographs/blob/main/docs/documentation.md)

## Theming

```css
:root { --accent: #3ecf8e; }       /* default green */
.custom { --accent: #8b5cf6; }     /* override per section */
```

```svelte
<SignalMeter color="#ff6b6b" />     <!-- per-component -->
```

## Setup

1. Purchase at [recursivevoid.lemonsqueezy.com](https://recursivevoid.lemonsqueezy.com)
2. Add your license key to `.env`:

```bash
MICROGRAPHICS_KEY=your-license-key

# Next.js: NEXT_PUBLIC_MICROGRAPHICS_KEY=your-license-key
# Vite: VITE_MICROGRAPHICS_KEY=your-license-key
```

3. Install (no tokens, no .npmrc needed):

## Tech

- Svelte 5 runes (`$props`, `$state`, `$derived`, `$effect`)
- `.svelte` source files published directly
- CSS custom properties only
- SVG with `shape-rendering="crispEdges"`

## License

Commercial license. Free for personal use. Purchase required for production.
