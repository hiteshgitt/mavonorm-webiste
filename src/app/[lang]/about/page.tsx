import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";
import { fairPhotos, siteImage } from "@/lib/images";
import { projects } from "@/lib/projects";
import RevealHeading from "@/components/RevealHeading";
import MagneticButton from "@/components/MagneticButton";
import Timeline from "@/components/Timeline";

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

  // hover previews for "Key moments" — our own workshop and hall, cycled, so no
  // year is paired with a client stand whose date we cannot verify
  const momentImgs = [
    siteImage("about-workshop.png", "mavo-workshop", 800, 600),
    siteImage("about-hall.png", "mavo-hall", 800, 600),
    siteImage("about-detail.png", "mavo-detail", 800, 600),
    siteImage("about-production-hall.png", "mavo-prod", 800, 600),
  ];
  const timelineItems = a.timeline.items.map((t, i) => ({ ...t, img: momentImgs[i % momentImgs.length] }));

  // every photo we hold per fair, one tile each; a fair with no files on disk
  // drops out rather than rendering a placeholder that would misrepresent
  // where we have built
  const fairs = a.fairs.items.flatMap((f) => fairPhotos(f.key).map((img) => ({ ...f, img })));

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

      {/* philosophy */}
      <section className="border-t border-line py-20 md:py-28">
        <div className="mx-auto grid max-w-350 gap-14 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-4">
            <p className="h-eyebrow text-copper" data-reveal>
              {a.philosophy.eyebrow}
            </p>
            <RevealHeading className="mt-4 text-3xl md:text-5xl" lines={split(a.philosophy.heading)} />
          </div>
          <div className="md:col-span-8">
            <p className="font-(family-name:--font-display) text-2xl leading-snug md:text-3xl" data-reveal>
              {a.philosophy.body1}
            </p>
            <p className="mt-8 max-w-2xl leading-relaxed text-muted" data-reveal>
              {a.philosophy.body2}
            </p>
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
          <Timeline items={timelineItems} />
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

      {/* clients — real stands, linking through to the project pages */}
      {projects.length > 0 && (
        <section className="border-t border-line py-20 md:py-28">
          <div className="mx-auto max-w-350 px-6 md:px-10">
            <div data-reveal-group>
              <p className="h-eyebrow text-copper">{a.clients.eyebrow}</p>
              <RevealHeading className="mt-4 text-3xl md:text-5xl" lines={split(a.clients.heading)} />
              <p className="mt-8 max-w-xl text-lg text-muted" data-reveal>
                {a.clients.sub}
              </p>
            </div>
            <ul className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p, i) => (
                <li key={p.slug} data-reveal data-delay={`${(i % 3) * 0.08}`}>
                  <Link href={`/${locale}/portfolio/${p.slug}`} className="group block" data-cursor="view">
                    <div className="duotone relative aspect-[4/3] overflow-hidden bg-grey">
                      <Image
                        src={p.hero}
                        alt={p.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-4 flex items-baseline gap-3">
                      <span className="idx text-xs text-copper">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-(family-name:--font-display) text-lg">{p.client ?? p.title}</span>
                    </div>
                    <div className="mt-1 text-sm text-muted">{p.industry[locale]}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

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

      {/* fairs — real builds behind the country list above */}
      <section className="border-t border-line bg-grey py-20 md:py-28">
        <div className="mx-auto max-w-350 px-6 md:px-10">
          <p className="h-eyebrow text-copper" data-reveal>
            {a.fairs.eyebrow}
          </p>
          <RevealHeading className="mt-4 text-3xl md:text-5xl" lines={split(a.fairs.heading)} />
          <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {fairs.map((f) => (
              <li key={f.img} data-reveal>
                <div className="mask-reveal duotone relative aspect-[4/3] overflow-hidden bg-line">
                  <Image
                    src={f.img}
                    alt={f.label}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-3 text-sm text-muted">{f.label}</div>
              </li>
            ))}
          </ul>
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
