import type { Review } from "@/lib/testimonials";

/**
 * The public review cards. Unlike the quote wall, these are credited to the
 * person who wrote them, because that is how they were published — see the
 * note on `reviews` in lib/testimonials.ts.
 *
 * Rendered on the server: the hover treatment is CSS and the entrance is
 * [data-reveal], which Fx picks up like any other static section.
 */
export default function ReviewGrid({
  items,
  role,
  standLabel,
  ratingLabel,
}: {
  items: Review[];
  role: string;
  standLabel: string;
  /** Localised "%s out of 5", with %s standing in for the score. */
  ratingLabel: string;
}) {
  return (
    <ol className="mt-16 grid gap-px border border-line bg-line md:grid-cols-2">
      {items.map((r, i) => (
        <li
          key={r.id}
          className="fb-card group relative flex flex-col overflow-hidden bg-paper p-8 md:p-12"
          data-reveal
          data-delay={`${(i % 2) * 0.08}`}
        >
          <div className="relative flex items-center justify-between">
            <Stars count={r.stars} label={ratingLabel.replace("%s", String(r.stars))} />
            <span className="idx text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
          </div>

          <blockquote className="relative mt-8 flex flex-1 flex-col">
            {/* grows so every footer in a row sits on the same baseline */}
            <p className="flex-1 text-lg leading-relaxed text-ink md:text-xl">
              <span aria-hidden className="text-copper">&ldquo;</span>
              {r.quote}
              <span aria-hidden className="text-copper">&rdquo;</span>
            </p>

            <footer className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-line pt-6 text-sm md:mt-10">
              <cite className="h-display not-italic text-xl text-ink">{r.name}</cite>
              <span className="text-muted">{role}</span>
              <span className="ml-auto h-eyebrow text-copper">
                {standLabel} &middot; {r.city}
              </span>
            </footer>
          </blockquote>
        </li>
      ))}
    </ol>
  );
}

/** Five marks, filled to the score. One label for the row, not five. */
function Stars({ count, label }: { count: number; label: string }) {
  return (
    <span className="flex items-center gap-1 text-sm" role="img" aria-label={label}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} aria-hidden className={i < count ? "text-copper" : "text-line"}>
          &#9733;
        </span>
      ))}
    </span>
  );
}
