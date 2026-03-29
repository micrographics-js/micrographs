# @micrographics/tailwind

Tailwind CSS plugin + preset for the Micrographics component library.

## Install

```bash
npm install @micrographics/tailwind
```

## Usage

### Option A — Plugin only

```js
// tailwind.config.js
const micrographics = require("@micrographics/tailwind");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,vue,svelte}"],
  plugins: [micrographics.plugin],
};
```

### Option B — Full preset (recommended)

```js
// tailwind.config.js
module.exports = {
  presets: [require("@micrographics/tailwind/preset")],
  content: ["./src/**/*.{js,ts,jsx,tsx,vue,svelte}"],
};
```

## What it provides

### CSS variables (auto-injected on `:root`)

| Variable | Default | Description |
|---|---|---|
| `--mg-bg` | `#0d0e17` | Dark background |
| `--mg-bg-secondary` | `#13141f` | Card/panel background |
| `--mg-fg` | `#e8e8e8` | Primary text |
| `--mg-fg-dim` | `#9a9aaa` | Secondary text |
| `--mg-fg-dimmer` | `#555566` | Muted text |
| `--mg-accent` | `#3ecf8e` | Primary accent (green) |
| `--mg-accent-amber` | `#f5a623` | Warning amber |
| `--mg-accent-red` | `#e05252` | Error/alert red |
| `--mg-border` | `rgba(255,255,255,0.07)` | Subtle border |
| `--mg-border-strong` | `rgba(255,255,255,0.15)` | Strong border |

Also aliases without the `mg-` prefix (`--bg`, `--fg`, `--accent`, etc.) so Micrographics components work without extra config.

### Utility classes

```html
<!-- Backgrounds -->
<div class="bg-mg-bg">
<div class="bg-mg-bg-secondary">

<!-- Text colours -->
<span class="text-mg-fg">Primary text</span>
<span class="text-mg-fg-dim">Secondary text</span>
<span class="text-mg-accent">Active / OK</span>
<span class="text-mg-accent-amber">Warning</span>
<span class="text-mg-accent-red">Error</span>

<!-- Borders -->
<div class="border border-mg">
<div class="border border-mg-strong">

<!-- Font -->
<p class="font-mg">Monospace terminal text</p>

<!-- Components shells -->
<div class="mg-card">...</div>

<div class="mg-panel">
  <div class="mg-panel-header">SYSTEM STATUS <span>●</span></div>
  <div class="mg-panel-body">...</div>
</div>

<!-- Status badges -->
<span class="mg-badge mg-badge-active">ONLINE</span>
<span class="mg-badge mg-badge-warn">DEGRADED</span>
<span class="mg-badge mg-badge-error">FAILED</span>

<!-- HUD corners -->
<div class="mg-hud p-8">
  <div class="mg-hud-corner mg-hud-corner-tl"></div>
  <div class="mg-hud-corner mg-hud-corner-tr"></div>
  <div class="mg-hud-corner mg-hud-corner-bl"></div>
  <div class="mg-hud-corner mg-hud-corner-br"></div>
  Content here
</div>

<!-- Scanline overlay -->
<div class="mg-scanlines bg-mg-bg">
  <img src="..." />
</div>

<!-- Pixel display text -->
<span class="mg-display text-mg-accent text-2xl">042.7</span>

<!-- Glowing text -->
<span class="mg-glow">ACTIVE</span>
<span class="mg-glow-amber">WARNING</span>
<span class="mg-glow-red">CRITICAL</span>

<!-- Animations (from preset) -->
<span class="animate-mg-pulse">●</span>
<div class="animate-mg-blink">_</div>
```

### Overriding the accent colour

Use the `mg-accent-*` dynamic utility with any Tailwind colour:

```html
<!-- Override accent to violet for this section -->
<div class="[--mg-accent:#8b5cf6] [--accent:#8b5cf6]">
  <SignalMeter />  <!-- will render in violet -->
</div>
```

Or via CSS:

```css
.my-dashboard {
  --mg-accent: #f59e0b;    /* amber theme */
  --accent: var(--mg-accent);
}
```
