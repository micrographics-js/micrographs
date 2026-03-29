"use client";
import { useState, useEffect } from "react";
import { shouldRender, onTrialExpire } from "@micrographics-js/core";

/**
 * React hook that returns whether components should render.
 * Re-renders the component when trial expires.
 */
export function useLicense(): boolean {
  const [render, setRender] = useState(() => shouldRender());

  useEffect(() => {
    // Re-check periodically during trial
    const interval = setInterval(() => {
      const should = shouldRender();
      setRender(should);
      if (!should) clearInterval(interval);
    }, 5000);

    // Listen for trial expiry
    const unsub = onTrialExpire(() => {
      setRender(false);
      clearInterval(interval);
    });

    return () => {
      clearInterval(interval);
      unsub();
    };
  }, []);

  return render;
}
