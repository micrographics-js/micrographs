"use client";
import { useEffect, useState } from "react";
import { createTicker } from "@micrographics/core";

export interface WireFrameProps {
  width?: number;
  height?: number;
  color?: string;
  depth?: number;
  animated?: boolean;
}

export function WireFrame({ width = 40, height = 30, color = "var(--accent)", depth = 15, animated = false }: WireFrameProps) {
  const [angle, setAngle] = useState(0);
  useEffect(() => {
    if (!animated) return;
    return createTicker(60, () => setAngle(a => (a + 1) % 360));
  }, [animated]);

  // isometric projection with optional rotation
  const isoProject = (x: number, y: number, z: number) => {
    const rad = (angle * Math.PI) / 180;
    const rx = x * Math.cos(rad) - z * Math.sin(rad);
    const rz = x * Math.sin(rad) + z * Math.cos(rad);
    return {
      px: rx - rz * 0.5,
      py: -y + rz * 0.25,
    };
  };

  const svgW = width + depth + 20;
  const svgH = height + depth * 0.5 + 20;
  const ox = svgW / 2;
  const oy = svgH * 0.6;

  const hw = width / 2;
  const hh = height / 2;
  const hd = depth / 2;

  // 8 corners: [x, y, z]
  const corners: [number, number, number][] = [
    [-hw, -hh, -hd], [hw, -hh, -hd], [hw, hh, -hd], [-hw, hh, -hd],
    [-hw, -hh,  hd], [hw, -hh,  hd], [hw, hh,  hd], [-hw, hh,  hd],
  ];

  const edges: [number, number][] = [
    [0,1],[1,2],[2,3],[3,0], // back face
    [4,5],[5,6],[6,7],[7,4], // front face
    [0,4],[1,5],[2,6],[3,7], // connecting
  ];

  const projected = corners.map(([x, y, z]) => {
    const { px, py } = isoProject(x, y, z);
    return [ox + px, oy + py];
  });

  return (
    <svg width={svgW} height={svgH} style={{ display: "block" }}>
      {edges.map(([a, b], i) => {
        const isFront = a >= 4 || b >= 4;
        return (
          <line
            key={i}
            x1={projected[a][0]}
            y1={projected[a][1]}
            x2={projected[b][0]}
            y2={projected[b][1]}
            stroke={color}
            strokeWidth={isFront ? 1.5 : 0.75}
            opacity={isFront ? 0.85 : 0.4}
            strokeDasharray={isFront ? undefined : "3 2"}
          />
        );
      })}
      {projected.map(([px, py], i) => (
        <circle key={i} cx={px} cy={py} r={1} fill={color} opacity={0.6} />
      ))}
    </svg>
  );
}
