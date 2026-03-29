# @micrographics-js/tailwind

Tailwind CSS plugin + preset for the [Micrographics](https://github.com/micrographics-js/micrographs) component library. Injects dark terminal theme tokens, utility classes, animations, and layout helpers.

**Free and open source** (MIT). Works standalone or alongside `@micrographics-js/react` etc.

## Install

```bash
npm install @micrographics-js/tailwind
```

## Usage

### Full preset (recommended)

```js
// tailwind.config.js
module.exports = {
  presets: [require("@micrographics-js/tailwind/preset")],
  content: ["./src/**/*.{js,ts,jsx,tsx,vue,svelte}"],
};
```

### Plugin only

```js
const micrographics = require("@micrographics-js/tailwind");
module.exports = { plugins: [micrographics.plugin] };
```

## What you get

### Theme tokens (auto-injected on `:root`)

| Variable | Default | Description |
|---|---|---|
| `--mg-accent` | `#3ecf8e` | Primary accent (green) |
| `--mg-accent-amber` | `#f5a623` | Warning |
| `--mg-accent-red` | `#e05252` | Error |
| `--mg-bg` | `#0d0e17` | Dark background |
| `--mg-fg` | `#e8e8e8` | Primary text |

### Utility classes

```html
<!-- Text & colors -->
<span class="text-mg-accent">ACTIVE</span>
<span class="text-mg-accent-amber">WARNING</span>
<div class="bg-mg-bg font-mg">Monospace dark panel</div>

<!-- Component shells -->
<div class="mg-card">...</div>
<div class="mg-panel"><div class="mg-panel-header">TITLE</div><div class="mg-panel-body">Content</div></div>

<!-- Badges -->
<span class="mg-badge mg-badge-active">ONLINE</span>
<span class="mg-badge mg-badge-warn">DEGRADED</span>
<span class="mg-badge mg-badge-error">FAILED</span>

<!-- Effects -->
<span class="mg-glow">Glowing text</span>
<div class="mg-scanlines">CRT scanline overlay</div>
<div class="mg-hud"><div class="mg-hud-corner mg-hud-corner-tl"></div></div>

<!-- Animations (from preset) -->
<span class="animate-mg-pulse">pulsing</span>
<span class="animate-mg-blink">blinking cursor</span>
```

### Override accent color

```html
<div class="[--mg-accent:#8b5cf6] [--accent:#8b5cf6]">
  <!-- all Micrographics components here render in violet -->
</div>
```

## Part of Micrographics

84 animated micro-UI components for React, Vue, Svelte & Vanilla.

- [`@micrographics-js/react`](https://github.com/micrographics-js/micrographs/tree/main/packages/react)
- [`@micrographics-js/vue`](https://github.com/micrographics-js/micrographs/tree/main/packages/vue)
- [`@micrographics-js/svelte`](https://github.com/micrographics-js/micrographs/tree/main/packages/svelte)
- [`@micrographics-js/vanilla`](https://github.com/micrographics-js/micrographs/tree/main/packages/vanilla)

## License

MIT
