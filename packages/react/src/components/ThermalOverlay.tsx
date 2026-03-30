"use client";
import { useEffect, useState, useRef } from "react";
import { createTicker } from "@micrographics-js/core";

export interface ThermalOverlayProps {
  cols?: number;
  rows?: number;
  hotspots?: number;
  width?: number;
  height?: number;
  speed?: number;
}

export function ThermalOverlay({
  cols = 16,
  rows = 12,
  hotspots = 3,
  width = 200,
  height = 150,
  speed = 100,
}: ThermalOverlayProps) {
  const total = cols * rows;
  const hotspotRef = useRef<{ x: number; y: number; intensity: number }[]>([]);
  const [values, setValues] = useState<number[]>(() => Array.from({ length: total }, () => 0.1));
  const [tick, setTick] = useState(0);

  // Initialize hotspots
  useEffect(() => {
    hotspotRef.current = Array.from({ length: hotspots }, () => ({
      x: Math.random() * cols,
      y: Math.random() * rows,
      intensity: 0.6 + Math.random() * 0.4,
    }));
  }, [hotspots, cols, rows]);

  useEffect(() => {
    return createTicker(speed, () => setTick((t) => t + 1));
  }, [speed]);

  useEffect(() => {
    setValues((prev) =>
      prev.map((v, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        let heat = 0.05 + Math.sin(tick * 0.02 + col * 0.3 + row * 0.2) * 0.05;

        // Add hotspot influence
        for (const hs of hotspotRef.current) {
          const dx = col - hs.x;
          const dy = row - hs.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const radius = 4;
          if (dist < radius) {
            const pulse = hs.intensity * (0.85 + 0.15 * Math.sin(tick * 0.06 + hs.x));
            heat += pulse * Math.max(0, 1 - dist / radius);
          }
        }

        heat = Math.min(1, Math.max(0, heat));
        return v + (heat - v) * 0.15;
      })
    );
  }, [tick, cols, rows]);

  const cellW = width / cols;
  const cellH = height / rows;

  // Thermal palette: dark blue → cyan → green → yellow → white-hot
  const thermalColor = (v: number): string => {
    if (v < 0.2) return `rgb(${Math.round(v * 5 * 20)}, ${Math.round(v * 5 * 20)}, ${Math.round(60 + v * 5 * 100)})`;
    if (v < 0.4) return `rgb(0, ${Math.round((v - 0.2) * 5 * 200)}, ${Math.round(160 - (v - 0.2) * 5 * 60)})`;
    if (v < 0.6) return `rgb(0, ${Math.round(200 - (v - 0.4) * 5 * 50)}, ${Math.round(100 - (v - 0.4) * 5 * 100)})`;
    if (v < 0.8) return `rgb(${Math.round((v - 0.6) * 5 * 255)}, ${Math.round(150 + (v - 0.6) * 5 * 105)}, 0)`;
    return `rgb(255, ${Math.round(255)}, ${Math.round((v - 0.8) * 5 * 255)})`;
  };

  return (
    <svg width={width} height={height} style={{ display: "block" }} shapeRendering="crispEdges">
      {values.map((v, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        return (
          <rect
            key={i}
            x={col * cellW}
            y={row * cellH}
            width={cellW + 0.5}
            height={cellH + 0.5}
            fill={thermalColor(v)}
          />
        );
      })}

      {/* FLIR overlay text */}
      <text x={4} y={10} fill="white" fontSize="6" fontFamily="monospace" opacity={0.6}>
        FLIR
      </text>
      <text x={width - 4} y={10} textAnchor="end" fill="white" fontSize="6" fontFamily="monospace" opacity={0.6}>
        WHT-HOT
      </text>

      {/* Temperature scale bar */}
      {Array.from({ length: 10 }, (_, i) => (
        <rect
          key={i}
          x={width - 8}
          y={16 + i * ((height - 24) / 10)}
          width={4}
          height={(height - 24) / 10}
          fill={thermalColor(1 - i / 9)}
        />
      ))}
    </svg>
  );
}
