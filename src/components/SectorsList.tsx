"use client";

import { useState } from "react";
import FloatingThumb from "./FloatingThumb";

export interface SectorItem {
  label: string;
  img: string;
}

/**
 * Sector list whose rows reveal a floating, cursor-following thumbnail on
 * hover (fine pointers only — touch devices just get the list).
 */
export default function SectorsList({ sectors }: { sectors: SectorItem[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <ul className="grid grid-cols-2 gap-x-8" onMouseLeave={() => setActive(null)}>
        {sectors.map((s, i) => (
          <li
            key={s.label}
            className="group flex items-baseline gap-4 border-b border-line py-4"
            data-reveal
            data-delay={`${(i % 4) * 0.06}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
          >
            {/* copper marks the active row; the rest recede to muted, since the
                palette no longer has a second accent to switch between */}
            <span className={`idx text-xs transition-colors ${active === i ? "text-copper" : "text-muted"}`}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-(family-name:--font-display) text-lg transition-transform duration-300 group-hover:translate-x-2">
              {s.label}
            </span>
          </li>
        ))}
      </ul>

      <FloatingThumb items={sectors} active={active} />
    </>
  );
}
