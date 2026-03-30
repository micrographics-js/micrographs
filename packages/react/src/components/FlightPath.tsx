"use client";
import { useState, useEffect } from "react";

export interface FlightPathProps {
  waypoints?: number;
  currentWaypoint?: number;
  width?: number;
  height?: number;
  color?: string;
}

export function FlightPath({
  waypoints = 6,
  currentWaypoint = 3,
  width = 200,
  height = 60,
  color = "var(--accent, #00ff41)",
}: FlightPathProps) {
  // Generate waypoint positions in a path-like layout
  const padding = 20;
  const usableW = width - padding * 2;
  const usableH = height - padding * 2;

  const points = Array.from({ length: waypoints }, (_, i) => {
    const x = padding + (i / (waypoints - 1)) * usableW;
    const y = padding + usableH / 2 + Math.sin((i / waypoints) * Math.PI * 2) * usableH * 0.35;
    return { x, y };
  });

  return (
    <svg width={width} height={height} style={{ display: "block" }} shapeRendering="crispEdges">
      <rect x={0} y={0} width={width} height={height} fill="rgba(0,0,0,0.6)" />

      {/* Dotted path line - completed */}
      {points.map((p, i) => {
        if (i === 0) return null;
        const prev = points[i - 1];
        const isCompleted = i <= currentWaypoint;
        const isCurrent = i === currentWaypoint;
        return (
          <line
            key={`line-${i}`}
            x1={prev.x}
            y1={prev.y}
            x2={p.x}
            y2={p.y}
            stroke={isCompleted ? color : color}
            strokeWidth={isCompleted ? 1.5 : 0.5}
            strokeDasharray={isCompleted ? undefined : "3 3"}
            opacity={isCompleted ? 0.8 : 0.3}
          />
        );
      })}

      {/* Waypoint markers */}
      {points.map((p, i) => {
        const isCompleted = i < currentWaypoint;
        const isCurrent = i === currentWaypoint;
        const isFuture = i > currentWaypoint;
        return (
          <g key={`wp-${i}`}>
            <circle
              cx={p.x}
              cy={p.y}
              r={isCurrent ? 5 : 3.5}
              fill={isCurrent ? color : isCompleted ? color : "rgba(0,0,0,0.8)"}
              stroke={color}
              strokeWidth={isCurrent ? 1.5 : 0.75}
              opacity={isCompleted ? 0.4 : isCurrent ? 1 : 0.5}
            />
            <text
              x={p.x}
              y={p.y + (isCurrent ? 3.5 : 2.5)}
              textAnchor="middle"
              fill={isCurrent ? "black" : isCompleted ? "black" : color}
              fontSize={isCurrent ? "6" : "5"}
              fontFamily="monospace"
              fontWeight="bold"
              opacity={isCompleted ? 0.5 : 1}
            >
              {i + 1}
            </text>
            {/* Waypoint label */}
            <text
              x={p.x}
              y={p.y - 8}
              textAnchor="middle"
              fill={color}
              fontSize="4"
              fontFamily="monospace"
              opacity={isCurrent ? 0.8 : 0.3}
            >
              WP{(i + 1).toString().padStart(2, "0")}
            </text>
          </g>
        );
      })}

      {/* Current position diamond on current waypoint */}
      {currentWaypoint < waypoints && (
        <polygon
          points={`${points[currentWaypoint].x},${points[currentWaypoint].y - 8} ${points[currentWaypoint].x + 3},${points[currentWaypoint].y - 5} ${points[currentWaypoint].x},${points[currentWaypoint].y - 2} ${points[currentWaypoint].x - 3},${points[currentWaypoint].y - 5}`}
          fill={color}
          opacity={0.7}
        />
      )}

      {/* Progress label */}
      <text x={4} y={height - 4} fill={color} fontSize="5" fontFamily="monospace" opacity={0.4}>
        WP {currentWaypoint + 1}/{waypoints}
      </text>
      <text x={width - 4} y={height - 4} textAnchor="end" fill={color} fontSize="5" fontFamily="monospace" opacity={0.4}>
        NAV
      </text>
    </svg>
  );
}
