import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";
import { clientPhoto, siteImage } from "@/lib/images";
import { featuredProjects } from "@/lib/projects";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import SectorsList from "@/components/SectorsList";
import ServicesFlow from "@/components/ServicesFlow";
import RevealHeading from "@/components/RevealHeading";
import FeaturedProjects from "@/components/FeaturedProjects";
import Testimonials from "@/components/Testimonials";
import MagneticButton from "@/components/MagneticButton";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang);
  return { title: dict.meta.home.title, description: dict.meta.home.description };
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = getDictionary(lang);
  const h = dict.home;

  const clientNames = ["HELION", "NORDICWARE", "VANTUM", "ARCLINE", "GRIDPOWER", "ATLAS", "KORM", "POLAR BANK", "HELIX"];

  /**
   * Sector hover thumbnails, each a real stand we built for a client in that
   * sector rather than a stock placeholder. Finance is the one sector with no
   * matching client yet, so it borrows the most corporate of the stands.
   */
  const sectorKeys = ["automotive", "technology", "medical", "industrial", "fmcg", "furniture", "energy", "finance"];
  const sectorPhoto: Record<string, string> = {
    automotive: clientPhoto("lg-chem", 1), // their wall is Advanced Automotive Battery
    technology: clientPhoto("dji", 1),
    medical: clientPhoto("american-orthodontics", 1),
    industrial: clientPhoto("master-lock", 1),
    fmcg: clientPhoto("allana", 1),
    furniture: clientPhoto("sesa-chem", 1), // decorative surfaces and flooring
    energy: clientPhoto("lg-chem", 2),
    finance: clientPhoto("technic", 1),
  };
  const sectors = h.sectors.items.map((label, i) => {
    const key = sectorKeys[i] ?? String(i);
    return {
      label,
      img: sectorPhoto[key] || siteImage(`sector-${key}.png`, `mavo-sector-${key}`, 800, 600),
    };
  });

  return (
    <>
      {/* ---------- HERO (scroll-expansion) ---------- */}
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="/images/home-hero-card.webp"
        bgVideoSrc="/video/booth-assembly.mp4"
        bgVideoScrub={false}
        bgImageSrc="/images/mavonorm-stand-front.webp"
        titleLeft={`${h.hero.line1} ${h.hero.line2}`}
        titleRight={h.hero.line3}
        date={h.hero.eyebrow}
        scrollToExpand={dict.common.scroll}
      >
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md leading-relaxed text-muted-dark">{h.hero.sub}</p>
          <div className="flex flex-wrap gap-4">
            <MagneticButton>
              <Link href={`/${locale}/portfolio`} className="btn btn-light">
                {h.hero.cta1}
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link href={`/${locale}/contact`} className="btn btn-outline">
                {h.hero.cta2}
              </Link>
            </MagneticButton>
          </div>
        </div>
      </ScrollExpandMedia>

      {/* ---------- INTRO ---------- */}
      <section className="relative py-24 md:py-36">
        <div className="mx-auto grid max-w-350 gap-12 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-4">
            <p className="h-eyebrow text-copper" data-reveal>
              {h.intro.eyebrow}
            </p>
          </div>
          <div className="md:col-span-8">
            <RevealHeading className="text-4xl md:text-6xl" lines={splitTwo(h.intro.heading)} />
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted" data-reveal>
              {h.intro.body}
            </p>
            <div className="mt-10" data-reveal>
              <Link href={`/${locale}/about`} className="link-line h-eyebrow !tracking-[0.18em] text-ink">
                {h.intro.link} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- SERVICES OVERVIEW (stacked story scroll) ---------- */}
      <ServicesFlow lang={locale} dict={dict} />

      {/* ---------- FEATURED PROJECTS ---------- */}
      <section className="overflow-hidden py-24 md:py-32">
        <div className="mx-auto max-w-350 px-6 md:px-10">
          <div data-reveal-group>
            <p className="h-eyebrow text-copper">{h.featured.eyebrow}</p>
            <RevealHeading className="mt-4 text-4xl md:text-6xl" lines={splitTwo(h.featured.heading)} />
          </div>
          <div className="mt-16" data-reveal>
            <FeaturedProjects projects={featuredProjects} lang={locale} dict={dict} />
          </div>
          <div className="mt-12" data-reveal>
            <MagneticButton>
              <Link href={`/${locale}/portfolio`} className="btn btn-outline">
                {dict.common.viewAll}
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* ---------- WHY + CAPABILITIES (dark) ---------- */}
      <section className="dark-section grain relative py-24 md:py-32">
        <div className="mx-auto max-w-350 px-6 md:px-10">
          <p className="h-eyebrow text-copper" data-reveal>
            {h.why.eyebrow}
          </p>
          <RevealHeading className="mt-4 text-4xl md:text-6xl" lines={splitTwo(h.why.heading)} />

          <div className="mt-16 grid gap-px overflow-hidden border border-line-dark bg-line-dark md:grid-cols-2">
            {h.why.items.map((item, i) => (
              <div key={item.title} className="bg-ink p-8 md:p-12" data-reveal data-delay={`${(i % 2) * 0.12}`}>
                <div className="idx text-xs text-copper">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="h-display mt-5 text-2xl md:text-3xl">{item.title}</h3>
                <p className="mt-4 max-w-md leading-relaxed text-muted-dark">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-24 border-t border-line-dark pt-16">
            <p className="h-eyebrow text-copper" data-reveal>
              {h.capabilities.eyebrow}
            </p>
            <RevealHeading className="mt-4 text-3xl md:text-5xl" lines={splitTwo(h.capabilities.heading)} />
            <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {h.capabilities.items.map((s) => (
                <div key={s.label} data-reveal>
                  <div className="h-display text-5xl md:text-6xl">
                    <span data-counter data-value={s.value}>
                      0
                    </span>
                    <span className="text-copper">{s.suffix}</span>
                  </div>
                  <div className="mt-3 text-sm text-muted-dark">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- SECTORS + CLIENTS ---------- */}
      <section className="border-b border-line py-24 md:py-32">
        <div className="mx-auto max-w-350 px-6 md:px-10">
          <div className="grid gap-16 lg:grid-cols-2">
            <div data-reveal-group>
              <p className="h-eyebrow text-copper">{h.sectors.eyebrow}</p>
              <RevealHeading className="mt-4 text-3xl md:text-5xl" lines={splitTwo(h.sectors.heading)} />
            </div>
            <SectorsList sectors={sectors} />
          </div>
        </div>

        <div className="marquee mt-24 overflow-hidden border-y border-line py-8" aria-label={h.clients.eyebrow}>
          <div className="marquee-track items-center gap-20 pr-20">
            {[...clientNames, ...clientNames].map((c, i) => (
              <span key={i} className="h-display shrink-0 text-2xl text-muted/60 md:text-3xl" aria-hidden={i >= clientNames.length}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- TESTIMONIALS + STATS (dark) ---------- */}
      <section className="dark-section py-24 md:py-32">
        <div className="mx-auto max-w-350 px-6 md:px-10">
          <p className="h-eyebrow text-copper" data-reveal>
            {h.testimonials.eyebrow}
          </p>
          <div className="mt-12 max-w-4xl">
            <Testimonials dict={dict} />
          </div>

          <div className="mt-24 grid gap-10 border-t border-line-dark pt-16 sm:grid-cols-2 lg:grid-cols-4">
            {h.stats.items.map((s) => (
              <div key={s.label} data-reveal>
                <div className="h-display text-5xl md:text-6xl">
                  <span data-counter data-value={s.value}>
                    0
                  </span>
                  <span className="text-copper">{s.suffix}</span>
                </div>
                <div className="mt-3 text-sm text-muted-dark">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FINAL CTA ---------- */}
      <section className="relative overflow-hidden py-28 md:py-40">
        <div className="mx-auto max-w-350 px-6 text-center md:px-10">
          <RevealHeading className="mx-auto max-w-4xl text-balance text-4xl md:text-6xl" lines={splitTwo(h.cta.heading)} />
          <p className="mx-auto mt-8 max-w-xl text-lg text-muted" data-reveal>
            {h.cta.body}
          </p>
          <div className="mt-12" data-reveal>
            <MagneticButton>
              <Link href={`/${locale}/contact`} className="btn btn-dark !px-12 !py-5 !text-sm">
                {h.cta.button}
                <span aria-hidden>→</span>
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}

/** Split a sentence into two visually balanced reveal lines. */
function splitTwo(text: string): string[] {
  const words = text.split(" ");
  if (words.length < 4) return [text];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}
