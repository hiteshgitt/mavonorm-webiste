import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";
import { projects } from "@/lib/projects";
import RevealHeading from "@/components/RevealHeading";
import PortfolioGrid from "@/components/PortfolioGrid";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang);
  return { title: dict.meta.portfolio.title, description: dict.meta.portfolio.description };
}

export default async function PortfolioPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = getDictionary(lang);

  return (
    <>
      <section className="pt-40 pb-16 md:pt-52 md:pb-20">
        <div className="mx-auto max-w-350 px-6 md:px-10">
          <p className="h-eyebrow text-copper" data-reveal>
            {dict.portfolio.hero.eyebrow}
          </p>
          <RevealHeading as="h1" className="mt-6 max-w-5xl text-5xl md:text-7xl" lines={split(dict.portfolio.hero.heading)} />
          <p className="mt-8 max-w-xl text-lg text-muted" data-reveal>
            {dict.portfolio.hero.sub}
          </p>
        </div>
      </section>

      <section className="pb-28">
        <div className="mx-auto max-w-350 px-6 md:px-10">
          <PortfolioGrid projects={projects} lang={locale} dict={dict} />
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
