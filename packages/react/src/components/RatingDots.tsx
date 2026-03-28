export interface RatingDotsProps {
  value?: number;
  max?: number;
  color?: string;
  emptyColor?: string;
}

export function RatingDots({ value = 3, max = 5, color = "var(--accent)", emptyColor = "var(--fg-dimmer)" }: RatingDotsProps) {
  return (
    <span style={{ fontFamily: "monospace", fontSize: "12px", letterSpacing: "0.15em" }}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} style={{ color: i < value ? color : emptyColor }}>◆</span>
      ))}
    </span>
  );
}
