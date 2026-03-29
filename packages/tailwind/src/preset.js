/**
 * @micrographics/tailwind/preset
 *
 * Full Tailwind preset — includes the plugin PLUS extends the theme with
 * Micrographics colour tokens, so you can use them via Tailwind's standard
 * colour palette (e.g. text-mg-accent, bg-mg-bg, border-mg-border-strong).
 *
 * Usage:
 *   // tailwind.config.js
 *   module.exports = {
 *     presets: [require("@micrographics/tailwind/preset")],
 *     content: ["./src/**/*.{js,ts,jsx,tsx,vue,svelte}"],
 *   };
 */

import { plugin } from "./index.js";

/** @type {import('tailwindcss').Config} */
const preset = {
  theme: {
    extend: {
      colors: {
        mg: {
          bg:            "var(--mg-bg)",
          "bg-secondary": "var(--mg-bg-secondary)",
          fg:            "var(--mg-fg)",
          "fg-dim":      "var(--mg-fg-dim)",
          "fg-dimmer":   "var(--mg-fg-dimmer)",
          accent:        "var(--mg-accent)",
          "accent-amber": "var(--mg-accent-amber)",
          "accent-red":   "var(--mg-accent-red)",
          border:        "var(--mg-border)",
          "border-strong": "var(--mg-border-strong)",
        },
      },
      fontFamily: {
        mg: ['"JetBrains Mono"', '"Fira Code"', '"Cascadia Code"', "ui-monospace", "monospace"],
      },
      borderColor: {
        "mg":        "var(--mg-border)",
        "mg-strong": "var(--mg-border-strong)",
      },
      keyframes: {
        "mg-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%":       { opacity: "0.25" },
        },
        "mg-scan": {
          "0%":   { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "mg-blink": {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "mg-spin": {
          "from": { transform: "rotate(0deg)" },
          "to":   { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "mg-pulse":  "mg-pulse 1.4s ease-in-out infinite",
        "mg-scan":   "mg-scan 2s linear infinite",
        "mg-blink":  "mg-blink 1s step-end infinite",
        "mg-spin":   "mg-spin 2s linear infinite",
      },
    },
  },
  plugins: [plugin],
};

export default preset;
