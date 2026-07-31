import type { ElementType, ReactNode } from "react";

/** Editorial heading whose lines slide up from a mask (animated by Fx). */
export default function RevealHeading({
  lines,
  as: Tag = "h2",
  className = "",
}: {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
}) {
  return (
    <Tag className={`h-display ${className}`} data-reveal-group>
      {lines.map((line, i) => (
        <span key={i} className="reveal-line">
          <span>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
