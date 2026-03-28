"use client";
import { useEffect, useState } from "react";

export interface ConnectionStatusProps {
  connected?: boolean;
}

export function ConnectionStatus({ connected = true }: ConnectionStatusProps) {
  const [flicker, setFlicker] = useState(false);

  useEffect(() => {
    setFlicker(true);
    const t = setTimeout(() => setFlicker(false), 300);
    return () => clearTimeout(t);
  }, [connected]);

  const color = connected ? "var(--accent)" : "var(--accent-red)";
  return (
    <span style={{
      fontFamily: "monospace",
      fontSize: "11px",
      color,
      opacity: flicker ? 0.2 : 1,
      transition: "opacity 0.05s",
      letterSpacing: "0.05em",
    }}>
      {connected ? "CONN·OK" : "CONN·LOST"}
    </span>
  );
}
