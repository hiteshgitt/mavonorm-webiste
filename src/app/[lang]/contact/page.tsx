import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import RevealHeading from "@/components/RevealHeading";
import ContactForm from "@/components/ContactForm";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang);
  return { title: dict.meta.contact.title, description: dict.meta.contact.description };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const c = dict.contact;

  return (
    <>
      <section className="pt-40 pb-16 md:pt-52 md:pb-20">
        <div className="mx-auto max-w-350 px-6 md:px-10">
          <p className="h-eyebrow text-copper" data-reveal>
            {c.hero.eyebrow}
          </p>
          <RevealHeading as="h1" className="mt-6 max-w-5xl text-5xl md:text-7xl" lines={split(c.hero.heading)} />
          <p className="mt-8 max-w-xl text-lg text-muted" data-reveal>
            {c.hero.sub}
          </p>
        </div>
      </section>

      <section className="border-t border-line py-20 md:py-28">
        <div className="mx-auto grid max-w-350 gap-16 px-6 md:px-10 lg:grid-cols-12">
          <div className="lg:col-span-7" data-reveal>
            <ContactForm dict={dict} />
          </div>

          <aside className="space-y-12 lg:col-span-5">
            <div data-reveal>
              <h2 className="h-eyebrow text-muted">{c.details.heading}</h2>
              <a href={`mailto:${c.details.email}`} className="link-line mt-4 inline-block font-(family-name:--font-display) text-2xl">
                {c.details.email}
              </a>
              <a
                href={`mailto:${c.details.emailSecondary}`}
                className="link-line mt-1 block font-(family-name:--font-display) text-xl text-muted"
              >
                {c.details.emailSecondary}
              </a>
              <a
                href={`tel:${c.details.phone.replace(/[^+\d]/g, "")}`}
                className="link-line mt-2 block font-(family-name:--font-display) text-xl text-muted"
              >
                {c.details.phone}
              </a>
              <div className="mt-1 font-(family-name:--font-display) text-sm text-muted">FAX {c.details.fax}</div>
              {/* same mobile number, reached over WhatsApp — wa.me wants bare digits */}
              <a
                href={`https://wa.me/${c.details.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line mt-4 inline-block text-sm text-muted"
              >
                {c.details.whatsapp}
              </a>
              <address className="mt-6 space-y-1 text-sm not-italic leading-relaxed text-muted">
                {c.details.address.map((l) => (
                  <div key={l}>{l}</div>
                ))}
                <div className="pt-2">{c.details.hours}</div>
              </address>
            </div>

            <div className="border border-line p-8" data-reveal>
              <h2 className="h-display text-2xl">{c.quickCta.heading}</h2>
              <p className="mt-3 text-sm text-muted">
                {c.quickCta.body}{" "}
                <a href={`mailto:${c.details.email}`} className="link-line text-ink">
                  {c.details.email}
                </a>
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* map strip */}
      <section className="dark-section relative h-72 overflow-hidden md:h-96" aria-label={c.map.label}>
        <div className="blueprint-grid absolute inset-0" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="mx-auto flex h-5 w-5 items-center justify-center">
            <span className="absolute h-5 w-5 animate-ping rounded-full bg-copper/40" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-copper" />
          </div>
          <div className="mt-4 text-sm text-muted-dark">{c.map.label}</div>
          <div className="idx mt-1 text-xs text-muted-dark">52.4637° N, 16.6620° E</div>
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
