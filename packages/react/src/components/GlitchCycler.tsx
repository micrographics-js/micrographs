"use client";
import { useEffect, useState, useRef } from "react";
import { typeIn, scramble } from "@micrographics/core";

const DEFAULT_SENTENCES = [
  "LOADING SUBSYSTEMS...",
  "SIGNAL ACQUIRED",
  "READY FOR TRANSMISSION",
  "AWAITING FURTHER ORDERS",
];

export interface GlitchCyclerProps {
  sentences?: string[];
  pauseMs?: number;
  color?: string;
}

export function GlitchCycler({ sentences = DEFAULT_SENTENCES, pauseMs = 2000, color = "var(--accent)" }: GlitchCyclerProps) {
  const [displayed, setDisplayed] = useState("");
  const cancelRef = useRef(false);

  useEffect(() => {
    cancelRef.current = false;
    let idx = 0;

    const run = async () => {
      while (!cancelRef.current) {
        const text = sentences[idx % sentences.length];
        idx++;
        await scramble(text.length, setDisplayed, () => cancelRef.current, 4, 40);
        if (cancelRef.current) break;
        await typeIn(text, setDisplayed, () => cancelRef.current, 25);
        if (cancelRef.current) break;
        await new Promise<void>(r => setTimeout(r, pauseMs));
      }
    };
    run();
    return () => { cancelRef.current = true; };
  }, [sentences, pauseMs]);

  return (
    <span style={{ fontFamily: "monospace", fontSize: "11px", color, letterSpacing: "0.05em" }}>
      {displayed}
    </span>
  );
}
