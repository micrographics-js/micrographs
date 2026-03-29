/**
 * Micrographics License Validation
 *
 * Validates license keys against the LemonSqueezy License API.
 * Runs once per session, caches the result, and shows a console
 * warning if no valid license is found.
 *
 * Usage:
 *   import { initLicense } from "@micrographics-js/core";
 *   initLicense("your-license-key");
 *
 * Or via environment variable:
 *   MICROGRAPHICS_KEY=your-license-key
 *   NEXT_PUBLIC_MICROGRAPHICS_KEY=your-license-key (Next.js)
 *   VITE_MICROGRAPHICS_KEY=your-license-key (Vite)
 */

const VALIDATION_URL = "https://api.lemonsqueezy.com/v1/licenses/validate";

let _licenseStatus: "unchecked" | "valid" | "invalid" | "checking" = "unchecked";
let _licenseKey: string | null = null;
let _validated = false;
let _suppressWarning = false;

/** Set the license key and trigger validation */
export function initLicense(key: string) {
  _licenseKey = key;
  _licenseStatus = "unchecked";
  _validated = false;
  _checkLicense();
}

/** Suppress the console warning (for development/testing) */
export function suppressLicenseWarning() {
  _suppressWarning = true;
}

/** Get current license status */
export function getLicenseStatus(): "unchecked" | "valid" | "invalid" | "checking" {
  return _licenseStatus;
}

/** Check if license is valid (returns cached result after first check) */
export function isLicensed(): boolean {
  return _licenseStatus === "valid";
}

function _resolveKey(): string | null {
  if (_licenseKey) return _licenseKey;

  // Try environment variables (works in Node.js, Vite, Next.js, etc.)
  try {
    const p = (globalThis as any).process;
    if (p?.env) {
      return p.env.MICROGRAPHICS_KEY || p.env.NEXT_PUBLIC_MICROGRAPHICS_KEY || p.env.VITE_MICROGRAPHICS_KEY || null;
    }
  } catch {}

  // Try Vite's import.meta.env (client-side)
  try {
    // @ts-ignore — Vite-specific
    if (typeof import.meta !== "undefined" && import.meta.env) {
      // @ts-ignore
      return import.meta.env.VITE_MICROGRAPHICS_KEY || import.meta.env.NEXT_PUBLIC_MICROGRAPHICS_KEY || null;
    }
  } catch {}

  return null;
}

async function _checkLicense() {
  if (_validated || _licenseStatus === "checking") return;

  const key = _resolveKey();
  if (!key) {
    _licenseStatus = "invalid";
    _showWarning();
    return;
  }

  _licenseStatus = "checking";

  try {
    const res = await fetch(VALIDATION_URL, {
      method: "POST",
      headers: { "Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded" },
      body: `license_key=${encodeURIComponent(key)}`,
    });

    if (!res.ok) {
      _licenseStatus = "invalid";
      _showWarning();
      return;
    }

    const data = await res.json();
    if (data.valid === true) {
      _licenseStatus = "valid";
      _validated = true;
    } else {
      _licenseStatus = "invalid";
      _showWarning();
    }
  } catch {
    // Network error — allow offline usage, don't block
    _licenseStatus = "valid";
    _validated = true;
  }
}

function _showWarning() {
  if (_suppressWarning) return;
  if (typeof console === "undefined") return;

  console.warn(
    "%c[Micrographics]%c License key missing or invalid.\n" +
    "Purchase at https://recursivevoid.lemonsqueezy.com\n" +
    "Then add: MICROGRAPHICS_KEY=your-key to your .env file.",
    "color: #3ecf8e; font-weight: bold;",
    "color: inherit;"
  );
}

// Auto-check on import (non-blocking)
if (typeof globalThis !== "undefined") {
  // Small delay so the app can call initLicense() first
  setTimeout(() => {
    if (_licenseStatus === "unchecked") {
      _checkLicense();
    }
  }, 1000);
}
