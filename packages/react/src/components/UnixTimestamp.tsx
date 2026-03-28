"use client";
import { useEffect, useState } from "react";

export interface UnixTimestampProps {
  color?: string;
}

export function UnixTimestamp({ color = "var(--fg-dim)" }: UnixTimestampProps) {
  const [ts, setTs] = useState(Math.floor(Date.now() / 1000));
  useEffect(() => {
    const id = setInterval(() => setTs(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span style={{ fontFamily: "monospace", fontSize: "11px", color, letterSpacing: "0.05em" }}>
      {ts}
    </span>
  );
}
