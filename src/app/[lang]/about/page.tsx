import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";
import { siteImage } from "@/lib/images";
import RevealHeading from "@/components/RevealHeading";
import MagneticButton from "@/components/MagneticButton";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang);
  return { title: dict.meta.about.title, description: dict.meta.about.description };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = getDictionary(lang);
  const a = dict.about;

  return (
    <>
      {/* hero */}
      <section className="pt-40 pb-20 md:pt-52 md:pb-28">
        <div className="mx-auto max-w-350 px-6 md:px-10">
          <p className="h-eyebrow text-copper" data-reveal>
            {a.hero.eyebrow}
          </p>
          <RevealHeading as="h1" className="mt-6 max-w-5xl text-5xl md:text-7xl" lines={split(a.hero.heading)} />
          <p className="mt-8 max-w-xl text-lg text-muted" data-reveal>
            {a.hero.sub}
          </p>
        </div>
      </section>

      {/* story + workshop image */}
      <section className="border-t border-line py-20 md:py-28">
        <div className="mx-auto grid max-w-350 gap-14 px-6 md:grid-cols-2 md:px-10">
          <div>
            <RevealHeading className="text-3xl md:text-5xl" lines={split(a.story.heading)} />
            <p className="mt-8 leading-relaxed text-muted" data-reveal>
              {a.story.body1}
            </p>
            <p className="mt-5 leading-relaxed text-muted" data-reveal>
              {a.story.body2}
            </p>
          </div>
          <div className="relative">
            <div className="mask-reveal duotone relative aspect-[4/5] overflow-hidden bg-grey">
              <div data-parallax data-speed="5" className="absolute inset-[-8%]">
                <Image src={siteImage("about-workshop.png", "mavo-workshop", 1200, 1600)} alt="Workshop" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
              </div>
            </div>
            <div className="mask-reveal duotone absolute -bottom-10 -left-6 hidden aspect-[4/3] w-56 overflow-hidden border-8 border-paper bg-grey md:block">
              <Image src={siteImage("about-detail.png", "mavo-detail", 800, 600)} alt="" fill sizes="14rem" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* timeline */}
      <section className="dark-section grain py-20 md:py-28">
        <div className="mx-auto max-w-350 px-6 md:px-10">
          <p className="h-eyebrow text-copper" data-reveal>
            {a.timeline.eyebrow}
          </p>
          <RevealHeading className="mt-4 text-3xl md:text-5xl" lines={[a.timeline.heading]} />
          <ol className="mt-16">
            {a.timeline.items.map((t) => (
              <li key={t.year} className="grid gap-4 border-t border-line-dark py-8 md:grid-cols-12 md:items-baseline" data-reveal>
                <div className="h-display text-3xl text-copper md:col-span-2 md:text-4xl">{t.year}</div>
                <p className="max-w-2xl leading-relaxed text-muted-dark md:col-span-10">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* mission + values */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-350 px-6 md:px-10">
          <div className="grid gap-14 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="h-eyebrow text-copper" data-reveal>
                {a.mission.eyebrow}
              </p>
              <RevealHeading className="mt-4 text-3xl md:text-5xl" lines={split(a.mission.heading)} />
              <p className="mt-8 leading-relaxed text-muted" data-reveal>
                {a.mission.body}
              </p>
            </div>
            <div className="md:col-span-7">
              <p className="h-eyebrow text-copper" data-reveal>
                {a.values.eyebrow}
              </p>
              <div className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2">
                {a.values.items.map((v, i) => (
                  <div key={v.title} className="bg-paper p-7" data-reveal data-delay={`${(i % 2) * 0.1}`}>
                    <div className="idx text-xs text-copper">{String(i + 1).padStart(2, "0")}</div>
                    <h3 className="h-display mt-4 text-xl">{v.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{v.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* facilities */}
      <section className="border-t border-line bg-grey py-20 md:py-28">
        <div className="mx-auto grid max-w-350 gap-14 px-6 md:grid-cols-2 md:px-10">
          <div className="mask-reveal duotone relative aspect-[4/3] overflow-hidden bg-line">
            <div data-parallax data-speed="5" className="absolute inset-[-8%]">
              <Image src={siteImage("about-hall.png", "mavo-hall", 1400, 1050)} alt="Production hall" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
            </div>
          </div>
          <div>
            <p className="h-eyebrow text-copper" data-reveal>
              {a.facilities.eyebrow}
            </p>
            <RevealHeading className="mt-4 text-3xl md:text-5xl" lines={split(a.facilities.heading)} />
            <p className="mt-8 leading-relaxed text-muted" data-reveal>
              {a.facilities.body}
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {a.facilities.items.map((f) => (
                <li key={f} className="flex items-center gap-3 border-b border-line py-3 text-sm" data-reveal>
                  <span className="h-1.5 w-1.5 shrink-0 bg-copper" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* certifications + markets */}
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-350 gap-14 px-6 md:grid-cols-2 md:px-10">
          <div>
            <p className="h-eyebrow text-copper" data-reveal>
              {a.certifications.eyebrow}
            </p>
            <RevealHeading className="mt-4 text-3xl md:text-4xl" lines={split(a.certifications.heading)} />
            <ul className="mt-8 space-y-0">
              {a.certifications.items.map((c, i) => (
                <li key={c} className="flex items-baseline gap-4 border-b border-line py-4" data-reveal>
                  <span className="idx text-xs text-copper">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm md:text-base">{c}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="h-eyebrow text-copper" data-reveal>
              {a.markets.eyebrow}
            </p>
            <RevealHeading className="mt-4 text-3xl md:text-4xl" lines={split(a.markets.heading)} />
            <p className="mt-8 text-lg leading-loose text-muted" data-reveal>
              {a.markets.body}
            </p>
            <div className="mt-10" data-reveal>
              <MagneticButton>
                <Link href={`/${locale}/contact`} className="btn btn-dark">
                  {dict.common.startProject}
                  <span aria-hidden>→</span>
                </Link>
              </MagneticButton>
            </div>
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
