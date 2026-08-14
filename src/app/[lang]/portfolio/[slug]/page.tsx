import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, locales, type Locale } from "@/lib/i18n";
import { getProject, projects, relatedProjects } from "@/lib/projects";
import RevealHeading from "@/components/RevealHeading";
import Gallery from "@/components/Gallery";
import ProjectCard from "@/components/ProjectCard";
import MagneticButton from "@/components/MagneticButton";

export function generateStaticParams() {
  return locales.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = getProject(slug);
  const dict = getDictionary(lang);
  if (!project) return { title: dict.meta.portfolio.title };
  return {
    title: `${project.title} — mavoNORM`,
    description: project.excerpt[lang as Locale] ?? project.excerpt.pl,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  const dict = getDictionary(lang);
  const project = getProject(slug);
  if (!project) notFound();

  // only the facts we actually hold — year, location and area are absent until
  // the real figures are supplied, and an empty row reads worse than no row
  const facts = (
    [
      [dict.common.client, project.client],
      [dict.common.industry, project.industry[locale]],
      [dict.common.year, project.year],
      [dict.common.location, project.location],
      [dict.common.area, project.area],
    ] as [string, string | undefined][]
  ).filter((f): f is [string, string] => Boolean(f[1]));

  const chapters: { label: string; text: string }[] = [
    { label: dict.common.overview, text: project.overview[locale] },
    { label: dict.common.fabrication, text: project.fabrication[locale] },
  ];

  return (
    <>
      {/* hero */}
      <section className="dark-section relative flex min-h-[85svh] items-end overflow-hidden">
        <div className="absolute inset-0">
          <div data-parallax data-speed="6" className="duotone absolute inset-[-6%]">
            <Image src={project.hero} alt={project.title} fill priority sizes="100vw" className="object-cover opacity-55" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
        </div>
        <div className="relative mx-auto w-full max-w-350 px-6 pb-16 pt-48 md:px-10">
          <Link href={`/${locale}/portfolio`} className="link-line h-eyebrow !tracking-[0.18em] text-muted-dark" data-reveal>
            ← {dict.common.backToPortfolio}
          </Link>
          <RevealHeading as="h1" className="mt-8 max-w-5xl text-4xl md:text-7xl" lines={split(project.title)} />
          <p className="mt-6 max-w-xl text-lg text-muted-dark" data-reveal>
            {project.excerpt[locale]}
          </p>
        </div>
      </section>

      {/* facts + services */}
      <section className="border-b border-line py-14">
        <div className="mx-auto grid max-w-350 gap-10 px-6 md:grid-cols-12 md:px-10">
          <dl className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8 lg:grid-cols-5">
            {facts.map(([k, v]) => (
              <div key={k} data-reveal>
                <dt className="h-eyebrow text-muted">{k}</dt>
                <dd className="mt-2 font-(family-name:--font-display) text-lg">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="md:col-span-4" data-reveal>
            <div className="h-eyebrow text-muted">{dict.common.servicesDelivered}</div>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.services[locale].map((s) => (
                <li key={s} className="border border-line px-3 py-1.5 text-xs">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* story chapters */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-350 space-y-20 px-6 md:px-10">
          {chapters.map((c, i) => (
            <div key={c.label} className="grid gap-8 md:grid-cols-12">
              <div className="md:col-span-4">
                <div className="idx text-xs text-copper" data-reveal>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h2 className="h-display mt-3 text-2xl md:text-3xl" data-reveal>
                  {c.label}
                </h2>
              </div>
              <p className="text-lg leading-relaxed text-muted md:col-span-8 md:max-w-3xl" data-reveal>
                {c.text}
              </p>
            </div>
          ))}

          {/* materials (+ results once we have them) */}
          <div className="grid gap-8 border-t border-line pt-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <h2 className="h-display text-2xl md:text-3xl" data-reveal>
                {dict.common.materials}
              </h2>
              <ul className="mt-6 space-y-2" data-reveal>
                {project.materials[locale].map((m) => (
                  <li key={m} className="flex items-center gap-3 text-sm text-muted">
                    <span className="h-1 w-1 bg-copper" aria-hidden />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
            {project.results && (
              <div className="md:col-span-8">
                <h2 className="h-display text-2xl md:text-3xl" data-reveal>
                  {dict.common.results}
                </h2>
                <p className="mt-6 max-w-3xl font-(family-name:--font-display) text-2xl leading-snug md:text-3xl" data-reveal>
                  {project.results[locale]}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* gallery */}
      <section className="bg-grey py-20 md:py-28">
        <div className="mx-auto max-w-350 px-6 md:px-10">
          <h2 className="h-eyebrow text-copper" data-reveal>
            {dict.common.gallery}
          </h2>
          <div className="mt-10" data-reveal>
            <Gallery images={[project.hero, ...project.gallery]} alt={project.title} />
          </div>
        </div>
      </section>

      {/* related + CTA */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-350 px-6 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <RevealHeading className="text-3xl md:text-5xl" lines={[dict.common.relatedProjects]} />
            <Link href={`/${locale}/portfolio`} className="link-line h-eyebrow !tracking-[0.18em]" data-reveal>
              {dict.common.viewAll} →
            </Link>
          </div>
          <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProjects(project.slug).map((p) => (
              <ProjectCard key={p.slug} project={p} lang={locale} dict={dict} />
            ))}
          </div>
          <div className="mt-24 border-t border-line pt-16 text-center">
            <RevealHeading className="mx-auto max-w-3xl text-balance text-3xl md:text-5xl" lines={split(dict.home.cta.heading)} />
            <div className="mt-10" data-reveal>
              <MagneticButton>
                <Link href={`/${locale}/contact`} className="btn btn-dark !px-10 !py-4">
                  {dict.home.cta.button}
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
