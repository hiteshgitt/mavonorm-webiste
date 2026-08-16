"use client";

import { useState } from "react";
import FloatingThumb from "./FloatingThumb";

export interface TimelineItem {
  year: string;
  text: string;
  img: string;
}

/**
 * "Key moments" list. Each row reveals a cursor-following thumbnail on hover,
 * the same treatment the sector list uses.
 *
 * The images are of our own workshop and production floor, not client stands:
 * pairing a specific client's stand with a specific year would assert when that
 * project happened, which we do not know.
 */
export default function Timeline({ items }: { items: TimelineItem[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <ol className="mt-16" onMouseLeave={() => setActive(null)}>
        {items.map((t, i) => (
          <li
            key={t.year}
            className="group grid cursor-default gap-4 border-t border-line-dark py-8 transition-colors md:grid-cols-12 md:items-baseline"
            data-reveal
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            tabIndex={0}
          >
            <div className="h-display text-3xl text-copper transition-transform duration-300 group-hover:translate-x-2 md:col-span-2 md:text-4xl">
              {t.year}
            </div>
            <p className="max-w-2xl leading-relaxed text-muted-dark transition-colors duration-300 group-hover:text-paper md:col-span-10">
              {t.text}
            </p>
          </li>
        ))}
      </ol>

      <FloatingThumb items={items.map((t) => ({ img: t.img, label: t.year }))} active={active} />
    </>
  );
}
