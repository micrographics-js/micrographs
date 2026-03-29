"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics-js/core";

export interface PacketFlowProps {
  width?: number;
  height?: number;
  color?: string;
  packets?: number;
  speed?: number;
}

interface Packet {
  id: number;
  x: number;
  offset: number;
  size: number;
}

export function PacketFlow({ width = 80, height = 12, color = "var(--accent)", packets = 4, speed = 40 }: PacketFlowProps) {
  const [pkts, setPkts] = useState<Packet[]>(() =>
    Array.from({ length: packets }, (_, i) => ({
      id: i,
      x: (i / packets) * width,
      offset: (i / packets) * width,
      size: 4 + Math.floor(i % 3) * 2,
    }))
  );

  useEffect(() => {
    return createTicker(speed, () => {
      setPkts(prev => prev.map(p => ({
        ...p,
        x: ((p.x + 2) % (width + p.size + 4)),
      })));
    });
  }, [speed, width]);

  const mid = height / 2;

  return (
    <svg width={width} height={height} style={{ display: "block" }} shapeRendering="crispEdges">
      {/* track line */}
      <line x1={0} y1={mid} x2={width} y2={mid} stroke="var(--fg-dimmer)" strokeWidth={1} />
      {pkts.map(p => (
        <g key={p.id}>
          <rect
            x={p.x - p.size / 2}
            y={mid - 2}
            width={p.size}
            height={4}
            fill={color}
            opacity={0.85}
          />
        </g>
      ))}
    </svg>
  );
}
