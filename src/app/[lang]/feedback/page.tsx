import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";
import { references, testimonials, voices } from "@/lib/testimonials";
import RevealHeading from "@/components/RevealHeading";
import FeedbackWall from "@/components/FeedbackWall";
import ReferenceList from "@/components/ReferenceList";
import MagneticButton from "@/components/MagneticButton";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang);
  return { title: dict.meta.feedback.title, description: dict.meta.feedback.description };
}

export default async function FeedbackPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = getDictionary(lang);
  const f = dict.feedback;

  /** Counted off the list itself, so the page can never claim more than it shows. */
  const companies = new Set(testimonials.map((t) => t.company)).size;
  const stats = [
    { value: voices.length, label: f.stats.voices },
    { value: references.length, label: f.stats.references },
    { value: companies, label: f.stats.companies },
  ];

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="pt-40 pb-16 md:pt-52 md:pb-24">
        <div className="mx-auto max-w-350 px-6 md:px-10">
          <p className="h-eyebrow text-copper" data-reveal>
            {f.hero.eyebrow}
          </p>
          <RevealHeading as="h1" className="mt-6 max-w-5xl text-5xl md:text-7xl" lines={split(f.hero.heading)} />
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted" data-reveal>
            {f.hero.sub}
          </p>

          <div className="mt-20 grid gap-10 border-t border-line pt-12 sm:grid-cols-3">
            {stats.map((s, i) => (
              <div key={s.label} data-reveal data-delay={`${i * 0.08}`}>
                <div className="h-display text-5xl md:text-6xl">
                  <span data-counter data-value={s.value}>
                    0
                  </span>
                </div>
                <div className="mt-3 max-w-3xs text-sm leading-relaxed text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CLIENT NAMES ---------- */}
      <div className="marquee overflow-hidden border-y border-line py-8" aria-label={f.hero.eyebrow}>
        <div className="marquee-track items-center gap-16 pr-16">
          {[...testimonials, ...testimonials].map((t, i) => (
            <span
              key={i}
              aria-hidden={i >= testimonials.length}
              className="h-display shrink-0 text-2xl uppercase text-muted/60 md:text-3xl"
            >
              {t.company}
            </span>
          ))}
        </div>
      </div>

      {/* ---------- THE QUOTES (dark, pins on desktop) ---------- */}
      <section className="dark-section pt-24 md:pt-32">
        <div className="mx-auto max-w-350 px-6 md:px-10">
          <div data-reveal-group>
            <p className="h-eyebrow text-copper">{f.voices.eyebrow}</p>
            <RevealHeading className="mt-4 text-4xl md:text-6xl" lines={split(f.voices.heading)} />
          </div>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-dark" data-reveal>
            {f.originalNote}
          </p>
        </div>
        <div className="h-20 md:h-28" />
      </section>

      <FeedbackWall items={voices} hint={f.voices.hint} />

      {/* ---------- REFERENCES ---------- */}
      <section className="py-24 md:py-36">
        <div className="mx-auto max-w-350 px-6 md:px-10">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5" data-reveal-group>
              <p className="h-eyebrow text-copper">{f.references.eyebrow}</p>
              <RevealHeading className="mt-4 text-4xl md:text-5xl" lines={split(f.references.heading)} />
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <p className="max-w-xl text-lg leading-relaxed text-muted" data-reveal>
                {f.references.body}
              </p>
              <div className="mt-8" data-reveal>
                <Link href={`/${locale}/contact`} className="link-line h-eyebrow !tracking-[0.18em] text-ink">
                  {f.references.cta} &rarr;
                </Link>
              </div>
            </div>
          </div>

          <ReferenceList
            items={references}
            lang={locale}
            badge={f.references.badge}
            seeProject={f.references.seeProject}
          />
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="py-24 text-center md:py-36">
        <div className="mx-auto max-w-350 px-6 md:px-10">
          <RevealHeading className="mx-auto max-w-3xl text-balance text-4xl md:text-6xl" lines={split(f.cta.heading)} />
          <p className="mx-auto mt-8 max-w-xl text-lg text-muted" data-reveal>
            {f.cta.body}
          </p>
          <div className="mt-12" data-reveal>
            <MagneticButton>
              <Link href={`/${locale}/contact`} className="btn btn-dark !px-10 !py-4">
                {f.cta.button}
                <span aria-hidden>→</span>
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}

function split(text: string): string[] {
  const words = text.split(" ");
  if (words.length < 4) return [text];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}
