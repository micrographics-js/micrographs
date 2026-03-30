# Micrographics — Claude Code Agent Guide

Instructions for using Claude Code to integrate, customize, and extend Micrographics components.

---

## Context for the Agent

When starting a conversation about Micrographics, paste this context block or reference the CLAUDE.md:

```
I'm integrating Micrographics — a commercial micro-animation component library.
Repo: https://github.com/micrographics-js/micrographs
npm scope: @micrographics-js (public on npmjs.org)
Monorepo: pnpm workspaces. Packages: core, react, vue, svelte, vanilla, tailwind.
84 SVG-based animated components across 8 packs.
Tech: TypeScript, CSS custom properties, zero runtime deps.
Components accept `color`, `width`, `height` props. Colors use CSS vars like `var(--accent)`.
Install: npm install @micrographics-js/react @micrographics-js/core
License: call initLicense("key") once in app entry point (app/layout.tsx or main.tsx).
Without a license key, components render for 60 seconds then stop (trial mode).
Free packages: @micrographics-js/core, @micrographics-js/tailwind
```

---

## Common Tasks

### 1. Add Micrographics to an existing React/Next.js project

**Prompt:**
```
Install @micrographics-js/react and @micrographics-js/core. Add the CSS variables
to my global stylesheet. Create a dashboard section using SignalMeter, DialGauge,
RadarSweep, PulseTag, and PixelClock. Use the dark terminal aesthetic.
```

**What the agent should do:**
1. Run `npm install @micrographics-js/react @micrographics-js/core`
2. Add `initLicense("key")` call in `app/layout.tsx` or `src/main.tsx`
3. Add CSS variables to `globals.css` or `index.css`
4. Add JetBrains Mono font import
5. Create the dashboard component using the imported components

### 2. Add Tailwind integration

**Prompt:**
```
Install @micrographics-js/tailwind and add it as a preset to my tailwind.config.
Then use mg-card, mg-badge, mg-glow classes in my dashboard layout.
```

**What the agent should do:**
1. Run `npm install @micrographics-js/tailwind`
2. Add `presets: [require("@micrographics-js/tailwind/preset")]` to tailwind config
3. Use the utility classes in the component

### 3. Create a custom theme

**Prompt:**
```
Create a cyberpunk violet theme for Micrographics. Override the CSS custom
properties to use violet (#8b5cf6) as accent, dark purple background,
and warm-toned text colors.
```

**What the agent should do:**
1. Create a CSS class or `:root` override:
```css
.cyberpunk-theme {
  --bg: #0a0520;
  --bg-secondary: #120830;
  --fg: #e0d8f0;
  --fg-dim: #a090c0;
  --fg-dimmer: #605080;
  --accent: #8b5cf6;
  --accent-amber: #f59e0b;
  --accent-red: #ef4444;
  --border: rgba(139, 92, 246, 0.1);
  --border-strong: rgba(139, 92, 246, 0.25);
}
```
2. Wrap the component section with the theme class

### 4. Build a HUD overlay

**Prompt:**
```
Create a tactical HUD overlay using CornerOrnament, CoordLabel, RadarSweep,
MissionStatus, CrosshairTarget, and TargetReticle. Position them at corners
and edges of a container, military-style.
```

### 5. Create a monitoring dashboard

**Prompt:**
```
Build a system monitoring dashboard with:
- CPU usage (SystemLoad, CPUSparkline)
- Memory (MemoryBar)
- Network (NetworkPulse, PacketFlow)
- Storage (TankLevel)
- Status (ConnectionStatus, PulseTag)
- Time (PixelClock, Uptime)
Arrange in a grid with mg-card styling. Add section headers with PanelTitle.
```

### 6. Embed demo in marketing site

**Prompt:**
```
Add a Micrographics demo section to my homepage. Show 20 different components
in a grid. Include a "Get Micrographics" CTA linking to the LemonSqueezy store.
Make it auto-themed to match my site's accent color.
```

**Reference:** See `docs/website-integration.md` for the full demo component code.

### 7. Add Vanilla Web Components to a static site

**Prompt:**
```
I have a static HTML site. Add Micrographics Web Components without any build
step. Use <mg-signal-meter>, <mg-dial-gauge>, <mg-radar-sweep> etc.
```

**What the agent should do:**
1. Add script tag: `<script type="module" src="https://unpkg.com/@micrographics-js/vanilla"></script>`
2. Add CSS variables to a `<style>` block
3. Use custom elements directly in HTML

---

## Component API Quick Reference (for the agent)

All components follow this pattern:

```tsx
// React
import { ComponentName } from "@micrographics-js/react";
<ComponentName prop1={value} prop2={value} color="var(--accent)" />

// Vue
import { ComponentName } from "@micrographics-js/vue";
<ComponentName :prop1="value" :prop2="value" color="var(--accent)" />

// Svelte
import { ComponentName } from "@micrographics-js/svelte";
<ComponentName prop1={value} prop2={value} color="var(--accent)" />

// Vanilla
<mg-component-name prop1="value" prop2="value" color="var(--accent)"></mg-component-name>
```

### Naming conventions

| React/Vue/Svelte | Vanilla custom element |
|------------------|----------------------|
| `SignalMeter` | `<mg-signal-meter>` |
| `PulseTag` | `<mg-pulse-tag>` |
| `RadarSweep` | `<mg-radar-sweep>` |
| `DialGauge` | `<mg-dial-gauge>` |
| `CrosshairTarget` | `<mg-crosshair-target>` |

### Common props (most components)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `string` | `"var(--accent)"` | Primary color |
| `width` | `number` | varies | SVG width in px |
| `height` | `number` | varies | SVG height in px |
| `size` | `number` | varies | Used for square components |
| `speed` | `number` | varies | Animation interval in ms |

---

## Extending Micrographics

### Creating a new component

**Prompt for the agent:**
```
Create a new Micrographics component called "NetworkTopology" that shows
a mini network graph with 4 nodes connected by lines. Nodes pulse when
"active". Follow the existing pattern in packages/react/src/components/.
```

**Pattern the agent should follow:**

```tsx
"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics-js/core";

export interface NewComponentProps {
  width?: number;
  height?: number;
  color?: string;
  speed?: number;
}

export function NewComponent({
  width = 80,
  height = 40,
  color = "var(--accent)",
  speed = 200,
}: NewComponentProps) {
  const [tick, setTick] = useState(0);
  useEffect(() => createTicker(speed, () => setTick(t => t + 1)), [speed]);

  return (
    <svg width={width} height={height} style={{ display: "block" }} shapeRendering="crispEdges">
      {/* SVG content using CSS vars */}
    </svg>
  );
}
```

**Checklist:**
- [ ] `"use client"` directive at top
- [ ] Props interface exported
- [ ] Default colors use CSS vars (`var(--accent)`, `var(--fg-dimmer)`)
- [ ] SVG rendering with `shapeRendering="crispEdges"`
- [ ] Animation via `createTicker` from `@micrographics-js/core`
- [ ] Cleanup function returned from `useEffect`
- [ ] Added to `packages/react/src/index.ts`

---

## Troubleshooting

### "Components render but no colors"
Missing CSS variables. Add the `:root` variables or install `@micrographics-js/tailwind`.

### "Components don't animate"
Check that `@micrographics-js/core` is installed. The `createTicker()` function lives there.

### "SSR error in Next.js"
All components have `"use client"` — but if you're importing in a server component, wrap with `dynamic(() => import(...), { ssr: false })`.

### "Vanilla components not registering"
Import the package with side effects: `import "@micrographics-js/vanilla"` (not just types).

---

## File Locations in the Monorepo

```
packages/react/src/components/   # 84 React component files (.tsx)
packages/vue/src/components/     # Vue 3 component files (.vue)
packages/svelte/src/components/  # Svelte 5 component files (.svelte)
packages/vanilla/src/components/ # Vanilla Web Component files (.ts)
packages/core/src/               # Shared utilities
packages/tailwind/src/           # Tailwind plugin + preset
apps/test-app/src/App.tsx        # Gallery app with all components
docs/                            # Documentation
```
