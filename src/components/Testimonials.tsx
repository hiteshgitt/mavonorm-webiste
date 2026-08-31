"use client";

import { useState } from "react";
import { voices } from "@/lib/testimonials";

/**
 * Homepage quote slider. Reads the real client feedback straight from
 * lib/testimonials.ts — the same source the feedback page uses — so a quote
 * only has to be added in one place, and the homepage can never drift into
 * showing something no client actually said.
 */
export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const t = voices[idx];

  return (
    <div className="relative">
      {/* Reserved to the tallest quote so switching does not shunt the button
          below it up and down the page. */}
      <blockquote key={idx} className="min-h-115 sm:min-h-96 md:min-h-76">
        <p className="h-display text-2xl leading-snug md:text-4xl">
          <span aria-hidden className="text-copper">“</span>
          {t.quote}
          <span aria-hidden className="text-copper">”</span>
        </p>
        <footer className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm text-muted-dark">
          <cite className="font-(family-name:--font-display) not-italic text-paper">{t.author}</cite>
          {t.role && <span>{t.role}</span>}
          <span aria-hidden className="text-line-dark">/</span>
          <span className="text-paper/80">{t.company}</span>
          {t.country && <span>{t.country}</span>}
          {t.event && <span className="h-eyebrow text-copper">{t.event}</span>}
        </footer>
      </blockquote>

      <div className="mt-10 flex items-center gap-4">
        {voices.map((v, i) => (
          <button
            key={v.id}
            onClick={() => setIdx(i)}
            className={`h-px transition-all duration-500 ${i === idx ? "w-14 bg-copper" : "w-7 bg-line-dark hover:bg-muted-dark"}`}
            aria-label={v.author}
            aria-current={i === idx}
          />
        ))}
        <span className="idx ml-auto text-xs text-muted-dark">
          {String(idx + 1).padStart(2, "0")} / {String(voices.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
