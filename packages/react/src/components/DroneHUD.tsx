"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics-js/core";

export interface DroneHUDProps {
  altitude?: number;
  speed?: number;
  heading?: number;
  battery?: number;
  width?: number;
  height?: number;
  color?: string;
}

export function DroneHUD({
  altitude = 120,
  speed = 45,
  heading = 270,
  battery = 85,
  width = 320,
  height = 200,
  color = "var(--accent, #00ff41)",
}: DroneHUDProps) {
  const [tick, setTick] = useState(0);
  const [flicker, setFlicker] = useState(1);

  useEffect(() => {
    return createTicker(80, () => {
      setTick((t) => t + 1);
      setFlicker(Math.random() > 0.92 ? 0.6 : 1);
    });
  }, []);

  const altDisplay = (altitude + Math.sin(tick * 0.03) * 0.4).toFixed(1);
  const spdDisplay = (speed + Math.sin(tick * 0.05) * 0.3).toFixed(1);
  const hdgDisplay = ((heading + tick * 0.1) % 360).toFixed(0);
  const batDisplay = Math.max(0, battery - tick * 0.002).toFixed(0);

  const ladderStep = 10;
  const ladderCount = 7;
  const ladderY0 = 40;
  const ladderH = height - 60;

  // Heading compass marks
  const compassDirs: Record<number, string> = { 0: "N", 90: "E", 180: "S", 270: "W" };
  const compassWidth = width - 80;
  const compassX0 = 40;

  return (
    <svg
      width={width}
      height={height}
      style={{ display: "block", background: "rgba(0,0,0,0.85)" }}
      shapeRendering="crispEdges"
    >
      {/* Border frame */}
      <rect x={1} y={1} width={width - 2} height={height - 2} fill="none" stroke={color} strokeWidth={1} opacity={0.4} />

      {/* Heading compass strip at top */}
      <line x1={compassX0} y1={18} x2={compassX0 + compassWidth} y2={18} stroke={color} strokeWidth={0.5} opacity={0.3} />
      {Array.from({ length: 37 }, (_, i) => {
        const deg = (i * 10 + Math.round(parseFloat(hdgDisplay)) - 180 + 3600) % 360;
        const x = compassX0 + (i / 36) * compassWidth;
        const isMajor = deg % 30 === 0;
        const label = compassDirs[deg];
        return (
          <g key={i}>
            <line x1={x} y1={14} x2={x} y2={isMajor ? 22 : 19} stroke={color} strokeWidth={isMajor ? 1 : 0.5} opacity={0.5} />
            {label && (
              <text x={x} y={30} textAnchor="middle" fill={color} fontSize="7" fontFamily="monospace" opacity={0.8}>
                {label}
              </text>
            )}
          </g>
        );
      })}
      {/* Heading center indicator */}
      <polygon
        points={`${width / 2 - 4},12 ${width / 2 + 4},12 ${width / 2},18`}
        fill={color}
        opacity={0.7}
      />
      <text x={width / 2} y={10} textAnchor="middle" fill={color} fontSize="8" fontFamily="monospace" fontWeight="bold" opacity={flicker}>
        {hdgDisplay.padStart(3, "0")}°
      </text>

      {/* Altitude ladder - left side */}
      <text x={8} y={38} fill={color} fontSize="6" fontFamily="monospace" opacity={0.5}>
        ALT m
      </text>
      {Array.from({ length: ladderCount }, (_, i) => {
        const val = parseFloat(altDisplay) - (i - Math.floor(ladderCount / 2)) * ladderStep;
        const y = ladderY0 + (i / (ladderCount - 1)) * ladderH;
        return (
          <g key={i}>
            <line x1={28} y1={y} x2={35} y2={y} stroke={color} strokeWidth={0.5} opacity={0.4} />
            <text x={6} y={y + 3} fill={color} fontSize="7" fontFamily="monospace" opacity={i === Math.floor(ladderCount / 2) ? flicker : 0.4}>
              {val.toFixed(0)}
            </text>
          </g>
        );
      })}
      {/* Current altitude indicator arrow */}
      <polygon
        points={`36,${ladderY0 + ladderH / 2 - 4} 42,${ladderY0 + ladderH / 2} 36,${ladderY0 + ladderH / 2 + 4}`}
        fill={color}
        opacity={0.8}
      />

      {/* Speed ladder - right side */}
      <text x={width - 8} y={38} textAnchor="end" fill={color} fontSize="6" fontFamily="monospace" opacity={0.5}>
        SPD kts
      </text>
      {Array.from({ length: ladderCount }, (_, i) => {
        const val = parseFloat(spdDisplay) - (i - Math.floor(ladderCount / 2)) * 5;
        const y = ladderY0 + (i / (ladderCount - 1)) * ladderH;
        return (
          <g key={i}>
            <line x1={width - 35} y1={y} x2={width - 28} y2={y} stroke={color} strokeWidth={0.5} opacity={0.4} />
            <text x={width - 6} y={y + 3} textAnchor="end" fill={color} fontSize="7" fontFamily="monospace" opacity={i === Math.floor(ladderCount / 2) ? flicker : 0.4}>
              {val.toFixed(0)}
            </text>
          </g>
        );
      })}
      {/* Current speed indicator arrow */}
      <polygon
        points={`${width - 36},${ladderY0 + ladderH / 2 - 4} ${width - 42},${ladderY0 + ladderH / 2} ${width - 36},${ladderY0 + ladderH / 2 + 4}`}
        fill={color}
        opacity={0.8}
      />

      {/* Battery indicator - top right */}
      <rect x={width - 48} y={3} width={28} height={10} fill="none" stroke={color} strokeWidth={0.5} opacity={0.5} />
      <rect x={width - 20} y={5} width={2} height={6} fill={color} opacity={0.5} />
      <rect
        x={width - 47}
        y={4}
        width={Math.max(0, (parseFloat(batDisplay) / 100) * 26)}
        height={8}
        fill={parseFloat(batDisplay) < 20 ? "var(--accent-red, #ff0040)" : color}
        opacity={parseFloat(batDisplay) < 20 ? (tick % 10 < 5 ? 0.8 : 0.3) : 0.6}
      />
      <text x={width - 50} y={11} textAnchor="end" fill={color} fontSize="6" fontFamily="monospace" opacity={0.6}>
        {batDisplay}%
      </text>

      {/* Center crosshair */}
      <line x1={width / 2 - 12} y1={height / 2} x2={width / 2 - 4} y2={height / 2} stroke={color} strokeWidth={0.5} opacity={0.5} />
      <line x1={width / 2 + 4} y1={height / 2} x2={width / 2 + 12} y2={height / 2} stroke={color} strokeWidth={0.5} opacity={0.5} />
      <line x1={width / 2} y1={height / 2 - 12} x2={width / 2} y2={height / 2 - 4} stroke={color} strokeWidth={0.5} opacity={0.5} />
      <line x1={width / 2} y1={height / 2 + 4} x2={width / 2} y2={height / 2 + 12} stroke={color} strokeWidth={0.5} opacity={0.5} />

      {/* Bottom telemetry bar */}
      <text x={8} y={height - 6} fill={color} fontSize="6" fontFamily="monospace" opacity={0.5}>
        ALT:{altDisplay}m SPD:{spdDisplay}kts HDG:{hdgDisplay.padStart(3, "0")}°
      </text>
      <text x={width - 8} y={height - 6} textAnchor="end" fill={color} fontSize="6" fontFamily="monospace" opacity={0.4}>
        REC ●
      </text>
    </svg>
  );
}
