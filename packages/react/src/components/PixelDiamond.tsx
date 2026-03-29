import { pixelDiamondPath } from "@micrographics-js/core";

export interface PixelDiamondProps {
  size?: number;
  color?: string;
  glow?: boolean;
}

export function PixelDiamond({ size = 2, color = "var(--accent)", glow = true }: PixelDiamondProps) {
  const margin = size * 4;
  const svgSize = size * 6 + margin * 2;
  const cx = svgSize / 2;
  const cy = svgSize / 2;

  return (
    <svg width={svgSize} height={svgSize} style={{ display: "block" }} shapeRendering="crispEdges">
      {glow && (
        <defs>
          <filter id="diamond-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
      )}
      <path d={pixelDiamondPath(cx, cy, size)} fill={color} filter={glow ? "url(#diamond-glow)" : undefined} />
    </svg>
  );
}
