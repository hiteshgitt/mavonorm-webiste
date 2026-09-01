import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Testimonial } from "@/lib/testimonials";

/**
 * The clients who offered to be contacted rather than quoted. Rendered on the
 * server: the row treatment is CSS hover and the entrance is [data-reveal],
 * which Fx picks up like any other statically rendered section.
 */
export default function ReferenceList({
  items,
  lang,
  badge,
  seeProject,
}: {
  items: Testimonial[];
  lang: Locale;
  badge: string;
  seeProject: string;
}) {
  return (
    <ol className="mt-16 border-t border-line">
      {items.map((t, i) => (
        <li key={t.id} className="fb-ref group relative overflow-hidden border-b border-line" data-reveal data-delay={`${i * 0.05}`}>
          <div className="relative grid gap-6 px-1 py-10 md:grid-cols-12 md:gap-10 md:px-4 md:py-12">
            <div className="md:col-span-1">
              <span className="idx text-xs text-muted transition-colors duration-500 group-hover:text-copper">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="md:col-span-4">
              <h3 className="h-display text-2xl transition-transform duration-500 group-hover:translate-x-2 md:text-3xl">
                {t.company}
              </h3>
              {t.project && (
                <Link
                  href={`/${lang}/portfolio/${t.project}`}
                  className="link-line mt-5 inline-block h-eyebrow !tracking-[0.18em] text-copper"
                >
                  {seeProject} &rarr;
                </Link>
              )}
            </div>

            <div className="md:col-span-7">
              <p className="max-w-2xl text-lg leading-relaxed text-muted transition-colors duration-500 group-hover:text-ink">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="mt-5 inline-flex items-center gap-2 h-eyebrow text-muted">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-copper" />
                {badge}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
