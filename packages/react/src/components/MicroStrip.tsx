"use client";
import { Barcode } from "./Barcode.js";
import { KanaTag } from "./KanaTag.js";
import { DataLabel } from "./DataLabel.js";
import { SpinDial } from "./SpinDial.js";

export interface MicroStripProps {
  section?: string;
  done?: boolean;
}

export function MicroStrip({ section = "home", done = false }: MicroStripProps) {
  const seed = section.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "8px",
      padding: "4px 0",
      borderBottom: "1px solid var(--border)",
      fontFamily: "monospace",
      fontSize: "9px",
    }}>
      <Barcode seed={seed} width={40} height={12} color="var(--fg-dimmer)" />
      <KanaTag section={section} color="var(--fg-dim)" />
      <DataLabel label="SEC" value={section.toUpperCase().slice(0, 4)} color="var(--fg-dimmer)" valueColor="var(--fg)" />
      <SpinDial done={done} size={12} color="var(--accent)" />
    </div>
  );
}
