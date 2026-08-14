import type { Dictionary, Locale } from "@/lib/i18n";
import type { ClientWork } from "@/lib/clientWork";
import Gallery from "./Gallery";

/**
 * Real client stands, presented as photography grouped by client.
 *
 * Each group reuses <Gallery> so the lightbox, keyboard navigation and hover
 * treatment match the project detail pages rather than being reimplemented.
 * There is no case-study copy here by design — see ./../lib/clientWork.
 */
export default function ClientWorkGallery({
  clients,
  lang,
  dict,
}: {
  clients: ClientWork[];
  lang: Locale;
  dict: Dictionary;
}) {
  const t = dict.portfolio.clientWork;

  // Polish has three plural forms (1 zdjęcie / 2–4 zdjęcia / 5+ zdjęć), so the
  // count cannot just take a single suffix the way English does.
  const plurals = new Intl.PluralRules(lang);
  const photoWord = (n: number) => {
    const form = plurals.select(n) as keyof typeof t.photos;
    return t.photos[form] ?? t.photos.other;
  };

  return (
    <div className="space-y-20 md:space-y-28">
      {clients.map((client, i) => (
        <section key={client.key} id={`client-${client.key}`} aria-labelledby={`client-${client.key}-name`}>
          <div className="mb-6 flex items-baseline gap-4 border-b border-line pb-4" data-reveal>
            <span className="idx text-xs text-copper">{String(i + 1).padStart(2, "0")}</span>
            <h3 id={`client-${client.key}-name`} className="h-display text-2xl md:text-3xl">
              {client.name}
            </h3>
            <span className="ml-auto shrink-0 text-sm text-muted">
              {client.images.length} {photoWord(client.images.length)}
            </span>
          </div>
          <div data-reveal>
            <Gallery images={client.images} alt={client.name} />
          </div>
        </section>
      ))}
    </div>
  );
}
