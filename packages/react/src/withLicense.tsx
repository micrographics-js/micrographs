"use client";
import { useLicense } from "./useLicense.js";

/**
 * HOC that wraps a component with license checking.
 * Returns null when trial has expired.
 */
export function withLicense<P extends object>(
  Component: React.ComponentType<P>,
  displayName?: string
): React.FC<P> {
  const Wrapped: React.FC<P> = (props) => {
    const canRender = useLicense();
    if (!canRender) return null;
    return <Component {...props} />;
  };
  Wrapped.displayName = displayName || Component.displayName || Component.name || "Licensed";
  return Wrapped;
}
