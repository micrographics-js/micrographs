/**
 * Micrographics License Validation
 *
 * Validates license keys against the LemonSqueezy License API.
 * Unlicensed usage gets a 60-second trial, then components stop rendering.
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
const TRIAL_DURATION_MS = 60_000; // 60 seconds

let _licenseStatus: "unchecked" | "valid" | "invalid" | "checking" | "expired" = "unchecked";
let _licenseKey: string | null = null;
let _validated = false;
let _suppressWarning = false;
let _trialStart: number | null = null;
let _trialTimerId: ReturnType<typeof setTimeout> | null = null;
let _trialWarningShown = false;
let _onExpireCallbacks: Array<() => void> = [];

/** Set the license key and trigger validation */
export function initLicense(key: string) {
  _licenseKey = key;
  _licenseStatus = "unchecked";
  _validated = false;
  _clearTrial();
  _checkLicense();
}

/** Suppress the console warning (for development/testing) */
export function suppressLicenseWarning() {
  _suppressWarning = true;
}

/** Get current license status */
export function getLicenseStatus(): "unchecked" | "valid" | "invalid" | "checking" | "expired" {
  return _licenseStatus;
}

/** Check if license is valid (returns cached result after first check) */
export function isLicensed(): boolean {
  return _licenseStatus === "valid";
}

/**
 * Check if components should render.
 * Returns true if licensed OR within trial period.
 * Returns false if trial has expired.
 * Call this from components to decide whether to render.
 */
export function shouldRender(): boolean {
  if (_licenseStatus === "valid") return true;
  if (_licenseStatus === "expired") return false;
  if (_licenseStatus === "unchecked" || _licenseStatus === "checking") return true; // allow during check

  // Invalid license — check trial timer
  if (_trialStart === null) {
    _startTrial();
    return true;
  }

  const elapsed = Date.now() - _trialStart;
  if (elapsed >= TRIAL_DURATION_MS) {
    _expireTrial();
    return false;
  }

  return true;
}

/** Register a callback for when the trial expires (used by framework adapters to force re-render) */
export function onTrialExpire(cb: () => void) {
  _onExpireCallbacks.push(cb);
  return () => {
    _onExpireCallbacks = _onExpireCallbacks.filter(c => c !== cb);
  };
}

/** Get remaining trial seconds (returns null if licensed or no trial active) */
export function getTrialRemaining(): number | null {
  if (_licenseStatus === "valid") return null;
  if (_trialStart === null) return null;
  const remaining = Math.max(0, TRIAL_DURATION_MS - (Date.now() - _trialStart));
  return Math.ceil(remaining / 1000);
}

function _resolveKey(): string | null {
  if (_licenseKey) return _licenseKey;

  // 1. Check global window/globalThis variable (works everywhere)
  try {
    const g = globalThis as any;
    if (g.__MICROGRAPHICS_KEY) return g.__MICROGRAPHICS_KEY;
    if (typeof window !== "undefined" && (window as any).__MICROGRAPHICS_KEY) return (window as any).__MICROGRAPHICS_KEY;
  } catch {}

  // 2. Check process.env (Node.js / SSR)
  try {
    const p = (globalThis as any).process;
    if (p?.env) {
      return p.env.MICROGRAPHICS_KEY || p.env.NEXT_PUBLIC_MICROGRAPHICS_KEY || p.env.VITE_MICROGRAPHICS_KEY || null;
    }
  } catch {}

  // 3. Check import.meta.env (Vite)
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
    _showTrialWarning();
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
      _showTrialWarning();
      return;
    }

    const data = await res.json();
    if (data.valid === true) {
      _licenseStatus = "valid";
      _validated = true;
      _clearTrial();
    } else {
      _licenseStatus = "invalid";
      _showTrialWarning();
    }
  } catch {
    // Network error — allow offline usage
    _licenseStatus = "valid";
    _validated = true;
    _clearTrial();
  }
}

function _startTrial() {
  if (_trialStart !== null) return;
  _trialStart = Date.now();

  if (typeof console !== "undefined" && !_suppressWarning) {
    console.log(
      "%c[Micrographics]%c Trial mode — components will stop rendering in 60 seconds.\n" +
      "Purchase at https://recursivevoid.lemonsqueezy.com",
      "color: #3ecf8e; font-weight: bold;",
      "color: #f5a623;"
    );
  }

  // Set timer to expire
  _trialTimerId = setTimeout(() => {
    _expireTrial();
  }, TRIAL_DURATION_MS);

  // Log countdown at 30s and 10s
  setTimeout(() => {
    if (_licenseStatus !== "valid" && _licenseStatus !== "expired" && !_suppressWarning) {
      console.warn(
        "%c[Micrographics]%c 30 seconds remaining. Add your license key to continue using components.",
        "color: #3ecf8e; font-weight: bold;",
        "color: #f5a623;"
      );
    }
  }, 30_000);

  setTimeout(() => {
    if (_licenseStatus !== "valid" && _licenseStatus !== "expired" && !_suppressWarning) {
      console.warn(
        "%c[Micrographics]%c 10 seconds remaining!",
        "color: #3ecf8e; font-weight: bold;",
        "color: #e05252;"
      );
    }
  }, 50_000);
}

function _expireTrial() {
  if (_licenseStatus === "valid") return; // don't expire if validated in the meantime
  _licenseStatus = "expired";

  if (typeof console !== "undefined" && !_suppressWarning) {
    console.warn(
      "%c[Micrographics]%c Trial expired. Components will no longer render.\n" +
      "Purchase at https://recursivevoid.lemonsqueezy.com\n" +
      "Then add MICROGRAPHICS_KEY=your-key to your .env file and restart.",
      "color: #3ecf8e; font-weight: bold;",
      "color: #e05252;"
    );
  }

  // Notify all registered callbacks (triggers re-render in React/Vue/Svelte)
  _onExpireCallbacks.forEach(cb => { try { cb(); } catch {} });
}

function _clearTrial() {
  if (_trialTimerId !== null) {
    clearTimeout(_trialTimerId);
    _trialTimerId = null;
  }
  _trialStart = null;
}

function _showTrialWarning() {
  if (_trialWarningShown || _suppressWarning) return;
  _trialWarningShown = true;

  if (typeof console === "undefined") return;

  console.warn(
    "%c[Micrographics]%c License key missing or invalid. Running in trial mode (60s).\n" +
    "Purchase at https://recursivevoid.lemonsqueezy.com\n" +
    "Then add: MICROGRAPHICS_KEY=your-key to your .env file.",
    "color: #3ecf8e; font-weight: bold;",
    "color: inherit;"
  );
}

// Auto-check on import (non-blocking)
if (typeof globalThis !== "undefined") {
  setTimeout(() => {
    if (_licenseStatus === "unchecked") {
      _checkLicense();
    }
  }, 1000);
}
