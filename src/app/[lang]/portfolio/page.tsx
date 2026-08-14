import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";
import { projects } from "@/lib/projects";
import { clientWork } from "@/lib/clientWork";
import RevealHeading from "@/components/RevealHeading";
import PortfolioGrid from "@/components/PortfolioGrid";
import ClientWorkGallery from "@/components/ClientWorkGallery";

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

      {/* ---------- CLIENT WORK (photography only) ---------- */}
      {clientWork.length > 0 && (
        <section className="border-t border-line py-24 md:py-32">
          <div className="mx-auto max-w-350 px-6 md:px-10">
            <div className="mb-16 md:mb-20" data-reveal-group>
              <p className="h-eyebrow text-copper">{dict.portfolio.clientWork.eyebrow}</p>
              <RevealHeading className="mt-4 text-4xl md:text-6xl" lines={split(dict.portfolio.clientWork.heading)} />
              <p className="mt-8 max-w-xl text-lg text-muted" data-reveal>
                {dict.portfolio.clientWork.sub}
              </p>
            </div>
            <ClientWorkGallery clients={clientWork} lang={locale} dict={dict} />
          </div>
        </section>
      )}
    </>
  );
}

function split(text: string): string[] {
  const words = text.split(" ");
  if (words.length < 4) return [text];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}
