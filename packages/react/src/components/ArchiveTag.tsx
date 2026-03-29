import { seeded } from "@micrographics-js/core";

export interface ArchiveTagProps {
  id?: string | number;
  label?: string;
  date?: string;
  color?: string;
  seed?: number;
}

export function ArchiveTag({ id = "NAS-001", label = "INTERNAL", date, color = "var(--fg-dim)", seed = 42 }: ArchiveTagProps) {
  const fakeDate = date ?? `${2024 + Math.floor(seeded(seed) * 2)}.${String(Math.floor(seeded(seed + 1) * 12) + 1).padStart(2, "0")}`;
  const vol = String(Math.floor(seeded(seed + 2) * 9) + 1);
  const track = String(Math.floor(seeded(seed + 3) * 99) + 1).padStart(2, "0");

  return (
    <div
      style={{
        fontFamily: "monospace",
        border: "1px solid var(--border-strong)",
        padding: "6px 8px",
        display: "inline-flex",
        flexDirection: "column",
        gap: "3px",
        minWidth: "100px",
      }}
    >
      <div style={{ fontSize: "7px", color: "var(--fg-dimmer)", letterSpacing: "0.15em" }}>ARCHIVE</div>
      <div style={{ fontSize: "14px", color, fontWeight: "bold", letterSpacing: "0.05em" }}>{id}</div>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "8px" }}>
        <span style={{ fontSize: "8px", color: "var(--fg-dimmer)" }}>{label}</span>
        <span style={{ fontSize: "8px", color: "var(--fg-dimmer)" }}>{fakeDate}</span>
      </div>
      <div style={{ display: "flex", gap: "4px", marginTop: "1px" }}>
        <span style={{ fontSize: "7px", color: "var(--fg-dimmer)", opacity: 0.6 }}>VOL.{vol}</span>
        <span style={{ fontSize: "7px", color: "var(--fg-dimmer)", opacity: 0.6 }}>TRK.{track}</span>
      </div>
    </div>
  );
}
