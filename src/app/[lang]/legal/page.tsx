import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import RevealHeading from "@/components/RevealHeading";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang);
  return { title: dict.meta.legal.title, description: dict.meta.legal.description };
}

export default async function LegalPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <>
      <section className="pt-40 pb-16 md:pt-52 md:pb-20">
        <div className="mx-auto max-w-350 px-6 md:px-10">
          <p className="h-eyebrow text-blue" data-reveal>
            {dict.legal.hero.eyebrow}
          </p>
          <RevealHeading as="h1" className="mt-6 max-w-4xl text-5xl md:text-7xl" lines={[dict.legal.hero.heading]} />
        </div>
      </section>

      <section className="border-t border-line pb-28">
        <div className="mx-auto max-w-350 px-6 md:px-10">
          {dict.legal.sections.map((s, i) => (
            <article key={s.title} className="grid gap-6 border-b border-line py-14 md:grid-cols-12">
              <div className="md:col-span-4">
                <div className="idx text-xs text-copper" data-reveal>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h2 className="h-display mt-3 text-2xl md:text-3xl" data-reveal>
                  {s.title}
                </h2>
              </div>
              <p className="max-w-3xl leading-loose text-muted md:col-span-8" data-reveal>
                {s.body}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
