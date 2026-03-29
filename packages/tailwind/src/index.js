/**
 * @micrographics/tailwind
 *
 * Tailwind CSS plugin that bridges Micrographics CSS custom properties
 * to Tailwind utility classes, and exposes a dark industrial theme preset.
 *
 * Usage in tailwind.config.js:
 *   const micrographics = require("@micrographics/tailwind");
 *   module.exports = {
 *     plugins: [micrographics.plugin],
 *     // or use the full preset:
 *     presets: [require("@micrographics/tailwind/preset")],
 *   };
 *
 * Then in HTML/JSX:
 *   <div class="bg-mg-bg text-mg-fg border-mg-border">
 *   <span class="text-mg-accent">ACTIVE</span>
 *   <div class="text-mg-accent-amber">WARNING</div>
 *   <div class="text-mg-accent-red">ERROR</div>
 */

/** @param {import('tailwindcss/types/config').PluginAPI} api */
function micrographicsPlugin({ addBase, addUtilities, matchUtilities, theme }) {
  // Inject CSS custom properties on :root
  addBase({
    ":root": {
      "--mg-bg":            "#0d0e17",
      "--mg-bg-secondary":  "#13141f",
      "--mg-fg":            "#e8e8e8",
      "--mg-fg-dim":        "#9a9aaa",
      "--mg-fg-dimmer":     "#555566",
      "--mg-border":        "rgba(255,255,255,0.07)",
      "--mg-border-strong": "rgba(255,255,255,0.15)",
      "--mg-accent":        "#3ecf8e",
      "--mg-accent-amber":  "#f5a623",
      "--mg-accent-red":    "#e05252",
      // Aliases for components that use --fg, --accent etc. without the mg- prefix
      "--bg":            "var(--mg-bg)",
      "--bg-secondary":  "var(--mg-bg-secondary)",
      "--fg":            "var(--mg-fg)",
      "--fg-dim":        "var(--mg-fg-dim)",
      "--fg-dimmer":     "var(--mg-fg-dimmer)",
      "--border":        "var(--mg-border)",
      "--border-strong": "var(--mg-border-strong)",
      "--accent":        "var(--mg-accent)",
      "--accent-amber":  "var(--mg-accent-amber)",
      "--accent-red":    "var(--mg-accent-red)",
    },
  });

  // Semantic colour utilities
  addUtilities({
    // Backgrounds
    ".bg-mg-bg":           { backgroundColor: "var(--mg-bg)" },
    ".bg-mg-bg-secondary": { backgroundColor: "var(--mg-bg-secondary)" },
    ".bg-mg-accent":       { backgroundColor: "var(--mg-accent)" },
    ".bg-mg-accent-amber": { backgroundColor: "var(--mg-accent-amber)" },
    ".bg-mg-accent-red":   { backgroundColor: "var(--mg-accent-red)" },

    // Text
    ".text-mg-fg":           { color: "var(--mg-fg)" },
    ".text-mg-fg-dim":       { color: "var(--mg-fg-dim)" },
    ".text-mg-fg-dimmer":    { color: "var(--mg-fg-dimmer)" },
    ".text-mg-accent":       { color: "var(--mg-accent)" },
    ".text-mg-accent-amber": { color: "var(--mg-accent-amber)" },
    ".text-mg-accent-red":   { color: "var(--mg-accent-red)" },

    // Borders
    ".border-mg":        { borderColor: "var(--mg-border)" },
    ".border-mg-strong": { borderColor: "var(--mg-border-strong)" },

    // Monospace font (required by all Micrographics components)
    ".font-mg": {
      fontFamily: '"JetBrains Mono", "Fira Code", "Cascadia Code", ui-monospace, monospace',
    },

    // Component card shell — matches the gallery card look
    ".mg-card": {
      backgroundColor: "var(--mg-bg-secondary)",
      border:          "1px solid var(--mg-border)",
      padding:         "16px",
      display:         "flex",
      flexDirection:   "column",
      gap:             "10px",
      transition:      "border-color 0.15s",
      fontFamily:      '"JetBrains Mono", monospace',
    },
    ".mg-card:hover": {
      borderColor: "var(--mg-border-strong)",
    },

    // Panel title bar
    ".mg-panel": {
      backgroundColor: "var(--mg-bg)",
      border:          "1px solid var(--mg-border-strong)",
      fontFamily:      '"JetBrains Mono", monospace',
    },
    ".mg-panel-header": {
      borderBottom:    "1px solid var(--mg-border-strong)",
      padding:         "6px 12px",
      fontSize:        "9px",
      letterSpacing:   "0.15em",
      textTransform:   "uppercase",
      color:           "var(--mg-fg-dimmer)",
      display:         "flex",
      alignItems:      "center",
      justifyContent:  "space-between",
    },
    ".mg-panel-body": {
      padding: "12px",
    },

    // Status badge variants
    ".mg-badge": {
      display:        "inline-flex",
      alignItems:     "center",
      gap:            "4px",
      padding:        "1px 6px",
      fontSize:       "9px",
      letterSpacing:  "0.1em",
      textTransform:  "uppercase",
      border:         "1px solid var(--mg-border)",
      fontFamily:     '"JetBrains Mono", monospace',
      color:          "var(--mg-fg-dim)",
    },
    ".mg-badge-active": {
      borderColor: "var(--mg-accent)",
      color:       "var(--mg-accent)",
    },
    ".mg-badge-warn": {
      borderColor: "var(--mg-accent-amber)",
      color:       "var(--mg-accent-amber)",
    },
    ".mg-badge-error": {
      borderColor: "var(--mg-accent-red)",
      color:       "var(--mg-accent-red)",
    },

    // HUD overlay layer
    ".mg-hud": {
      position:   "relative",
      background: "var(--mg-bg)",
      overflow:   "hidden",
    },
    ".mg-hud-corner": {
      position:    "absolute",
      width:       "12px",
      height:      "12px",
      borderColor: "var(--mg-border-strong)",
      borderStyle: "solid",
    },
    ".mg-hud-corner-tl": {
      top:         "0",
      left:        "0",
      borderWidth: "1px 0 0 1px",
    },
    ".mg-hud-corner-tr": {
      top:         "0",
      right:       "0",
      borderWidth: "1px 1px 0 0",
    },
    ".mg-hud-corner-bl": {
      bottom:      "0",
      left:        "0",
      borderWidth: "0 0 1px 1px",
    },
    ".mg-hud-corner-br": {
      bottom:      "0",
      right:       "0",
      borderWidth: "0 1px 1px 0",
    },

    // Scanline overlay effect
    ".mg-scanlines": {
      position:          "relative",
    },
    ".mg-scanlines::after": {
      content:        '""',
      position:       "absolute",
      inset:          "0",
      backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
      pointerEvents:  "none",
    },

    // Pixel-crisp text (useful for number displays)
    ".mg-display": {
      fontFamily:    '"JetBrains Mono", monospace',
      fontVariantNumeric: "tabular-nums",
      letterSpacing: "0.05em",
      lineHeight:    "1",
    },

    // Glowing accent text
    ".mg-glow": {
      color:      "var(--mg-accent)",
      textShadow: "0 0 8px var(--mg-accent)",
    },
    ".mg-glow-amber": {
      color:      "var(--mg-accent-amber)",
      textShadow: "0 0 8px var(--mg-accent-amber)",
    },
    ".mg-glow-red": {
      color:      "var(--mg-accent-red)",
      textShadow: "0 0 8px var(--mg-accent-red)",
    },
  });

  // Dynamic colour overrides — lets users override the theme via inline class
  // e.g. [--mg-accent:#ff0066] to use pink accent
  matchUtilities(
    {
      "mg-accent": (value) => ({ "--mg-accent": value, "--accent": value }),
      "mg-bg":     (value) => ({ "--mg-bg": value, "--bg": value }),
      "mg-fg":     (value) => ({ "--mg-fg": value, "--fg": value }),
    },
    { values: theme("colors") }
  );
}

export const plugin = { handler: micrographicsPlugin };
export default { handler: micrographicsPlugin };
