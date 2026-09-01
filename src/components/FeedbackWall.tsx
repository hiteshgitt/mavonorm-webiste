"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Testimonial } from "@/lib/testimonials";

/**
 * The quote wall: on a large pointer-friendly screen the section pins and each
 * client's words take the whole viewport, swapping as you scroll through it.
 * Below 1024px — and whenever the visitor asked for reduced motion — it falls
 * back to a plain stacked list, which is also what renders without JavaScript.
 *
 * The pinned stage deliberately avoids [data-reveal]: those elements start at
 * opacity 0 and are animated by Fx, which scans the DOM once on mount, before
 * this component has decided whether to pin. Anything it added afterwards
 * would never be found and would stay invisible, so the stage animates itself.
 */
export default function FeedbackWall({ items, hint }: { items: Testimonial[]; hint: string }) {
  const wrapRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [idx, setIdx] = useState(0);
  const [pinned, setPinned] = useState(false);

  // Decide the mode first, in its own pass, so the pinned markup exists in the
  // DOM before the ScrollTrigger below measures it.
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPinned(wide.matches && !still.matches);
    sync();
    wide.addEventListener("change", sync);
    still.addEventListener("change", sync);
    return () => {
      wide.removeEventListener("change", sync);
      still.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!pinned || !wrap) return;

    gsap.registerPlugin(ScrollTrigger);
    const n = items.length;
    const st = ScrollTrigger.create({
      trigger: wrap,
      start: "top top",
      // one screenful of scroll per quote, minus a little so the section does
      // not outstay its welcome on the way out
      end: () => `+=${window.innerHeight * n * 0.85}`,
      pin: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const i = Math.min(n - 1, Math.max(0, Math.floor(self.progress * n)));
        setIdx((prev) => (prev === i ? prev : i));
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress})`;
      },
    });
    triggerRef.current = st;
    ScrollTrigger.refresh();

    return () => {
      triggerRef.current = null;
      st.kill();
    };
  }, [pinned, items.length]);

  /** Jump the page to the stretch of scroll that shows quote `i`. */
  const goTo = (i: number) => {
    const st = triggerRef.current;
    if (!st) return;
    const y = st.start + ((i + 0.5) / items.length) * (st.end - st.start);
    // Lenis owns the scroll position while smooth scrolling is running
    if (window.__lenis) window.__lenis.scrollTo(y);
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  const active = items[idx];

  return (
    <section
      ref={wrapRef}
      className={`dark-section grain relative overflow-hidden ${pinned ? "flex h-screen items-center" : "py-20 md:py-28"}`}
    >
      <div aria-hidden className="blueprint-grid pointer-events-none absolute inset-0" />

      {pinned ? (
        <div className="relative mx-auto w-full max-w-350 px-6 md:px-10">
          {/* oversized opening mark, parked behind the quote */}
          <span
            aria-hidden
            className="pointer-events-none absolute -top-[22vh] left-2 select-none font-(family-name:--font-display) text-[40vh] leading-none text-copper/10"
          >
            &ldquo;
          </span>

          <div className="relative grid gap-12 lg:grid-cols-12">
            <ol className="lg:col-span-2" aria-label={hint}>
              {items.map((t, i) => (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={i === idx}
                    className="group flex w-full items-center gap-3 py-1.5 text-left"
                  >
                    <span
                      className={`idx text-xs transition-colors duration-500 ${
                        i === idx ? "text-copper" : "text-muted-dark group-hover:text-paper"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`h-px transition-all duration-500 ${
                        i === idx ? "w-12 bg-copper" : "w-5 bg-line-dark group-hover:w-8 group-hover:bg-muted-dark"
                      }`}
                    />
                  </button>
                </li>
              ))}
            </ol>

            <div className="lg:col-span-10">
              <Quote key={active.id} item={active} />
            </div>
          </div>

          <p className="mt-14 hidden h-eyebrow text-muted-dark lg:block">
            <span className="mr-3 text-copper">&darr;</span>
            {hint}
          </p>
        </div>
      ) : (
        <div className="relative mx-auto max-w-350 px-6 md:px-10">
          <ol className="divide-y divide-line-dark">
            {items.map((t, i) => (
              <li key={t.id} className="py-12 first:pt-0 last:pb-0">
                <span className="idx text-xs text-copper">{String(i + 1).padStart(2, "0")}</span>
                <blockquote className="mt-5">
                  <p className={`h-display ${quoteSize(t.quote)}`}>
                    <span aria-hidden className="text-copper">&ldquo;</span>
                    {t.quote}
                    <span aria-hidden className="text-copper">&rdquo;</span>
                  </p>
                  <Cite item={t} />
                </blockquote>
              </li>
            ))}
          </ol>
        </div>
      )}

      {pinned && (
        <div aria-hidden className="pointer-events-none absolute inset-x-6 bottom-8 h-px bg-line-dark md:inset-x-10">
          <div ref={progressRef} className="h-full w-full origin-left bg-copper" style={{ transform: "scaleX(0)" }} />
        </div>
      )}
    </section>
  );
}

/** One quote on the pinned stage. Remounted per client so the entrance replays. */
function Quote({ item }: { item: Testimonial }) {
  const words = item.quote.split(" ");

  return (
    <blockquote>
      <p className={`h-display ${quoteSize(item.quote)}`}>
        <span aria-hidden className="text-copper">&ldquo;</span>
        {words.map((w, i) => (
          <Fragment key={i}>
            <span className="fb-word" style={{ animationDelay: `${0.05 + i * 0.022}s` }}>
              {w}
            </span>{" "}
          </Fragment>
        ))}
        <span aria-hidden className="text-copper">&rdquo;</span>
      </p>
      <div className="fb-cite" style={{ animationDelay: `${0.15 + Math.min(words.length, 40) * 0.022}s` }}>
        <Cite item={item} />
      </div>
    </blockquote>
  );
}

/** Attribution: which client, and about which show. Feedback is credited to
 * the company, never to the individual — see lib/testimonials.ts. */
function Cite({ item }: { item: Testimonial }) {
  return (
    <footer className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm md:mt-10">
      <span aria-hidden className="h-px w-8 self-center bg-copper" />
      <cite className="font-(family-name:--font-display) not-italic text-paper">{item.company}</cite>
      {item.country && <span className="text-muted-dark">{item.country}</span>}
      {item.event && (
        <>
          <span aria-hidden className="text-line-dark">/</span>
          <span className="h-eyebrow text-copper">{item.event}</span>
        </>
      )}
    </footer>
  );
}

/**
 * Longer quotes step down a size so every one of them still lands inside a
 * single viewport on the pinned stage — the alternative is a quote that has to
 * be scrolled while the section is holding the scroll.
 */
function quoteSize(quote: string): string {
  if (quote.length > 250) return "text-xl leading-snug md:text-3xl xl:text-4xl";
  if (quote.length > 160) return "text-2xl leading-snug md:text-4xl xl:text-5xl";
  return "text-2xl leading-snug md:text-5xl xl:text-6xl";
}
