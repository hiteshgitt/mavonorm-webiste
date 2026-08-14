import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import FlowArt, { FlowSection } from "@/components/ui/story-scroll";

/**
 * "What we do" as a stacked story-scroll: each panel pins while the next one
 * rotates up over it. Colours come from the site palette (globals.css @theme)
 * rather than the component demo's, so the panels read as part of the brand.
 */
const PANELS = [
  { bg: "var(--color-ink)", fg: "var(--color-paper)", lead: 0, support: [3] },
  { bg: "var(--color-grey)", fg: "var(--color-ink)", lead: 1, support: [4, 5] },
  { bg: "var(--color-copper)", fg: "var(--color-paper)", lead: 2, support: [6, 7] },
] as const;

export default function ServicesFlow({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const h = dict.home;
  const list = dict.servicesList;
  const closing = list[8];

  // NB: no `border-none` here — it sets border-style:none and wins over
  // `border-t`, collapsing the rule to 0px (the component demo has this bug).
  const rule = <hr className="my-[2vw] border-t border-current opacity-30" />;

  return (
    <FlowArt as="div" aria-label={h.services.eyebrow}>
      {/* 01 — section opener, carries the heading this section is known by */}
      <FlowSection
        aria-label={h.services.eyebrow}
        style={{ backgroundColor: "var(--color-copper)", color: "var(--color-paper)" }}
      >
        <p className="h-eyebrow">01 — {h.services.eyebrow}</p>
        {rule}
        <div>
          <h2 className="h-display text-[clamp(2.75rem,9vw,9rem)] text-balance">
            {h.services.heading}
          </h2>
        </div>
        {rule}
        <p className="mt-auto max-w-[46ch] text-[clamp(1rem,2vw,1.6rem)] leading-relaxed">
          {h.intro.body}
        </p>
      </FlowSection>

      {PANELS.map((panel, i) => {
        const lead = list[panel.lead];
        return (
          <FlowSection
            key={lead.slug}
            aria-label={lead.title}
            style={{ backgroundColor: panel.bg, color: panel.fg }}
          >
            <p className="h-eyebrow">
              {String(i + 2).padStart(2, "0")} — {h.services.eyebrow}
            </p>
            {rule}
            <div>
              <h3 className="h-display text-[clamp(2.25rem,6.5vw,6.5rem)] text-balance">
                {lead.title}
              </h3>
            </div>
            {rule}
            <p className="max-w-[52ch] text-[clamp(0.95rem,1.8vw,1.45rem)] leading-relaxed opacity-85">
              {lead.body}
            </p>
            {rule}
            <div className="flex flex-wrap gap-[3vw]">
              {panel.support.map((idx) => {
                const s = list[idx];
                return (
                  <div key={s.slug} className="min-w-[180px] flex-1">
                    <p className="h-eyebrow mb-2 !tracking-[0.18em]">{s.title}</p>
                    <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-70">
                      {s.short}
                    </p>
                  </div>
                );
              })}
            </div>
          </FlowSection>
        );
      })}

      {/* 05 — closes the run and hands off to the full services page */}
      <FlowSection
        aria-label={closing.title}
        style={{ backgroundColor: "var(--color-ink)", color: "var(--color-paper)" }}
      >
        <p className="h-eyebrow">05 — {h.services.eyebrow}</p>
        {rule}
        <div>
          <h3 className="h-display text-[clamp(2.25rem,6.5vw,6.5rem)] text-balance">
            {closing.title}
          </h3>
        </div>
        {rule}
        <p className="max-w-[52ch] text-[clamp(0.95rem,1.8vw,1.45rem)] leading-relaxed opacity-85">
          {closing.body}
        </p>
        <div className="mt-auto pt-[3vw]">
          <Link
            href={`/${lang}/services`}
            className="btn btn-light"
          >
            {h.services.link} <span aria-hidden>→</span>
          </Link>
        </div>
      </FlowSection>
    </FlowArt>
  );
}
