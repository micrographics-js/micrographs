"use client";
import { useEffect, useState } from "react";

export interface DayProgressProps {
  unit?: "day" | "year" | "month";
  color?: string;
  accentColor?: string;
}

function getProgress(unit: string): { pct: number; label: string } {
  const now = new Date();
  if (unit === "day") {
    const pct = (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) / 86400;
    return { pct, label: "DAY" };
  }
  if (unit === "year") {
    const start = new Date(now.getFullYear(), 0, 1);
    const end = new Date(now.getFullYear() + 1, 0, 1);
    const pct = (now.getTime() - start.getTime()) / (end.getTime() - start.getTime());
    return { pct, label: "YEAR" };
  }
  // month
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const pct = (now.getDate() - 1 + (now.getHours() / 24)) / daysInMonth;
  return { pct, label: "MONTH" };
}

export function DayProgress({ unit = "day", color = "var(--fg-dim)", accentColor = "var(--accent)" }: DayProgressProps) {
  const [progress, setProgress] = useState(() => getProgress(unit));
  useEffect(() => {
    const id = setInterval(() => setProgress(getProgress(unit)), 1000);
    return () => clearInterval(id);
  }, [unit]);

  return (
    <span style={{ fontFamily: "monospace", fontSize: "11px", color }}>
      <span style={{ color: accentColor }}>{progress.label}</span>
      {" "}{(progress.pct * 100).toFixed(1)}%
    </span>
  );
}
