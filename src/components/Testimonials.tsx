"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";

export default function Testimonials({ dict }: { dict: Dictionary }) {
  const items = dict.home.testimonials.items;
  const [idx, setIdx] = useState(0);
  const t = items[idx];

  return (
    <div className="relative">
      <blockquote key={idx} className="min-h-56 md:min-h-44" data-reveal>
        <p className="h-display text-2xl leading-snug md:text-4xl">
          <span aria-hidden className="text-copper">“</span>
          {t.quote}
          <span aria-hidden className="text-copper">”</span>
        </p>
        <footer className="mt-8 text-sm text-muted-dark">
          <span className="text-paper">{t.author}</span> — {t.company}
        </footer>
      </blockquote>

      <div className="mt-10 flex items-center gap-4">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`h-px transition-all duration-500 ${i === idx ? "w-14 bg-copper" : "w-7 bg-line-dark hover:bg-muted-dark"}`}
            aria-label={`${i + 1}`}
            aria-current={i === idx}
          />
        ))}
        <span className="idx ml-auto text-xs text-muted-dark">
          {String(idx + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
