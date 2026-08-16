import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";
import { clientPhoto, siteImage } from "@/lib/images";
import RevealHeading from "@/components/RevealHeading";
import HorizontalSteps from "@/components/HorizontalSteps";
import MagneticButton from "@/components/MagneticButton";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang);
  return { title: dict.meta.process.title, description: dict.meta.process.description };
}

export default async function ProcessPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = getDictionary(lang);

  /**
   * One real stand per stage, in place of stock placeholders. The order runs
   * from stands still going up to finished ones, so the sequence tracks the
   * process the steps describe. Illustrative — no step claims a specific job.
   */
  const stepPhotos = [
    clientPhoto("botanicall", 1), // brief — build still in progress behind
    clientPhoto("natural", 2),
    clientPhoto("sesa-chem", 1),
    clientPhoto("technic", 1),
    clientPhoto("master-lock", 1),
    clientPhoto("american-orthodontics", 1),
    clientPhoto("allana", 1),
    clientPhoto("dji", 1), // handover — finished and lit
  ];

  return (
    <>
      <section className="pt-40 pb-20 md:pt-52 md:pb-28">
        <div className="mx-auto max-w-350 px-6 md:px-10">
          <p className="h-eyebrow text-copper" data-reveal>
            {dict.process.hero.eyebrow}
          </p>
          <RevealHeading as="h1" className="mt-6 max-w-5xl text-5xl md:text-7xl" lines={split(dict.process.hero.heading)} />
          <p className="mt-8 max-w-xl text-lg text-muted" data-reveal>
            {dict.process.hero.sub}
          </p>
        </div>
      </section>

      {/* pinned horizontal journey */}
      <HorizontalSteps
        steps={dict.process.steps.map((s, i) => ({
          ...s,
          img: stepPhotos[i] || siteImage(`process-${i + 1}.png`, `mavo-process-${i + 1}`, 1400, 1600),
        }))}
      />

      <section className="py-24 text-center md:py-36">
        <div className="mx-auto max-w-350 px-6 md:px-10">
          <RevealHeading className="mx-auto max-w-3xl text-balance text-4xl md:text-6xl" lines={split(dict.home.cta.heading)} />
          <p className="mx-auto mt-8 max-w-xl text-lg text-muted" data-reveal>
            {dict.home.cta.body}
          </p>
          <div className="mt-12" data-reveal>
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
