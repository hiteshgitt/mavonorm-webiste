import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";
import { clientPhoto, siteImage } from "@/lib/images";
import RevealHeading from "@/components/RevealHeading";
import MagneticButton from "@/components/MagneticButton";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang);
  return { title: dict.meta.services.title, description: dict.meta.services.description };
}

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = getDictionary(lang);

  /**
   * Real stands in place of stock artwork. These illustrate the service and are
   * captioned only with its title, so a stand photo is honest here — unlike the
   * contact page, where the image is captioned as our production facility.
   * CNC and interiors keep their existing artwork: they describe our machinery
   * and fit-out work, which a finished stand does not show.
   */
  const servicePhoto: Record<string, string> = {
    "exhibition-design": clientPhoto("botanicall", 3),
    "booth-fabrication": clientPhoto("master-lock", 1),
    installation: clientPhoto("allana", 1),
    custom: clientPhoto("atelier-emocio", 2),
    logistics: clientPhoto("natural", 2), // pallets and a forklift still on the floor
    storage: clientPhoto("general", 2),
    maintenance: clientPhoto("american-orthodontics", 4),
  };

  return (
    <>
      <section className="pt-40 pb-20 md:pt-52 md:pb-28">
        <div className="mx-auto max-w-350 px-6 md:px-10">
          <p className="h-eyebrow text-copper" data-reveal>
            {dict.services.hero.eyebrow}
          </p>
          <RevealHeading as="h1" className="mt-6 max-w-5xl text-5xl md:text-7xl" lines={split(dict.services.hero.heading)} />
          <p className="mt-8 max-w-xl text-lg text-muted" data-reveal>
            {dict.services.hero.sub}
          </p>
        </div>
      </section>

      <div className="border-t border-line">
        {dict.servicesList.map((s, i) => {
          const even = i % 2 === 0;
          return (
            <section
              key={s.slug}
              id={s.slug}
              className={`scroll-mt-24 border-b border-line ${i % 3 === 2 ? "dark-section" : even ? "" : "bg-grey"}`}
            >
              <div className="mx-auto grid max-w-350 items-center gap-12 px-6 py-20 md:grid-cols-2 md:px-10 md:py-28">
                <div className={even ? "" : "md:order-2"}>
                  <div className="idx text-sm text-copper" data-reveal>
                    {String(i + 1).padStart(2, "0")} / {String(dict.servicesList.length).padStart(2, "0")}
                  </div>
                  <RevealHeading className="mt-5 text-3xl md:text-5xl" lines={split(s.title)} />
                  <p className={`mt-7 max-w-lg leading-relaxed ${i % 3 === 2 ? "text-muted-dark" : "text-muted"}`} data-reveal>
                    {s.body}
                  </p>
                  <div className="mt-9" data-reveal>
                    <Link
                      href={`/${locale}/contact`}
                      className="link-line h-eyebrow !tracking-[0.18em]"
                    >
                      {dict.common.getQuote} →
                    </Link>
                  </div>
                </div>
                <div className={even ? "" : "md:order-1"}>
                  <div className="mask-reveal duotone relative aspect-[4/3] overflow-hidden bg-line">
                    <div data-parallax data-speed="5" className="absolute inset-[-8%]">
                      <Image
                        src={servicePhoto[s.slug] || siteImage(`service-${s.slug}.png`, `mavo-srv-${s.slug}`, 1400, 1050)}
                        alt={s.title}
                        fill
                        sizes="(max-width:768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <section className="py-24 text-center md:py-32">
        <div className="mx-auto max-w-350 px-6 md:px-10">
          <RevealHeading className="mx-auto max-w-3xl text-balance text-4xl md:text-6xl" lines={split(dict.home.cta.heading)} />
          <div className="mt-10" data-reveal>
            <MagneticButton>
              <Link href={`/${locale}/contact`} className="btn btn-dark !px-10 !py-4">
                {dict.home.cta.button}
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
