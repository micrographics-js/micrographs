# @micrographics-js/vanilla

**52 animated micro-UI Web Components.** No framework required. Dark industrial terminal aesthetic. Pure SVG. Works in any HTML page.

Drop `<mg-signal-meter>`, `<mg-dial-gauge>`, `<mg-radar-sweep>` into any page — static sites, WordPress, Rails, plain HTML.

## Install

```bash
npm install @micrographics-js/vanilla @micrographics-js/core
```

Or via CDN (after setting up auth):
```html
<script type="module">
  import "@micrographics-js/vanilla";
</script>
```

> Requires a license token. See [setup](#setup) below.

## Quick Start

```html
<style>
  .dashboard {
    --bg: #0d0e17; --fg: #e8e8e8; --fg-dimmer: #555566;
    --accent: #3ecf8e; --border: rgba(255,255,255,0.07);
    background: var(--bg); padding: 24px; font-family: monospace;
  }
</style>

<div class="dashboard">
  <mg-signal-meter bars="5" speed="180"></mg-signal-meter>
  <mg-pulse-tag label="ONLINE"></mg-pulse-tag>
  <mg-dial-gauge value="72" size="60"></mg-dial-gauge>
  <mg-radar-sweep size="80"></mg-radar-sweep>
  <mg-pixel-clock></mg-pixel-clock>
</div>

<script type="module">
  import "@micrographics-js/vanilla";
</script>
```

## Custom Elements (52)

All elements use the `mg-` prefix:

| React/Vue/Svelte | Web Component |
|-------------------|---------------|
| `<SignalMeter>` | `<mg-signal-meter>` |
| `<PulseTag>` | `<mg-pulse-tag>` |
| `<DialGauge>` | `<mg-dial-gauge>` |
| `<RadarSweep>` | `<mg-radar-sweep>` |
| `<PixelClock>` | `<mg-pixel-clock>` |
| `<OrbitSystem>` | `<mg-orbit-system>` |
| ... | ... |

Props become HTML attributes (kebab-case):

```html
<mg-signal-meter bars="5" speed="180" color="var(--accent)"></mg-signal-meter>
<mg-battery-meter level="0.75" charging="true"></mg-battery-meter>
<mg-target-reticle size="64" animate="true" label="TGT-01"></mg-target-reticle>
```

## Theming

Same CSS custom properties as the framework versions:

```css
.my-theme { --accent: #8b5cf6; }
```

```html
<div class="my-theme">
  <mg-signal-meter></mg-signal-meter>  <!-- renders violet -->
</div>
```

## Setup

1. Purchase at [micrographics.lemonsqueezy.com](https://micrographics.lemonsqueezy.com)
2. Create `.npmrc`:

```ini
@micrographics-js:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_TOKEN
```

3. `npm install @micrographics-js/vanilla @micrographics-js/core`

## License

Commercial license. Free for personal use. Purchase required for production.
