import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";

export default function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  const nav = [
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/services`, label: dict.nav.services },
    { href: `/${lang}/process`, label: dict.nav.process },
    { href: `/${lang}/portfolio`, label: dict.nav.portfolio },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  return (
    <footer className="dark-section relative overflow-hidden">
      <div className="mx-auto max-w-350 px-6 py-20 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="h-display text-3xl">
              mavo<span className="text-copper">NORM</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-dark">{dict.footer.tagline}</p>
            <a
              href={`mailto:${dict.contact.details.email}`}
              className="link-line mt-8 inline-block font-(family-name:--font-display) text-xl md:text-2xl"
            >
              {dict.contact.details.email}
            </a>
          </div>

          <div className="md:col-span-3">
            <div className="h-eyebrow text-muted-dark">{dict.footer.nav}</div>
            <ul className="mt-5 space-y-3">
              {nav.map((it) => (
                <li key={it.href}>
                  <Link href={it.href} className="link-line text-sm">
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="h-eyebrow text-muted-dark">{dict.footer.officeLabel}</div>
            <address className="mt-5 space-y-1 text-sm not-italic leading-relaxed">
              {dict.contact.details.address.map((l) => (
                <div key={l}>{l}</div>
              ))}
              <div className="pt-2 text-muted-dark">{dict.contact.details.phone}</div>
            </address>
          </div>

          <div className="md:col-span-2">
            <div className="h-eyebrow text-muted-dark">{dict.footer.followLabel}</div>
            <ul className="mt-5 space-y-3 text-sm">
              {["LinkedIn", "Instagram", "Behance"].map((s) => (
                <li key={s}>
                  <a href="#" className="link-line" aria-label={s}>
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line-dark pt-8 text-xs text-muted-dark md:flex-row md:items-center md:justify-between">
          <div>
            © {year} mavoNORM. {dict.footer.rights}
          </div>
          <div className="flex gap-6">
            <Link href={`/${lang}/legal`} className="link-line">
              {dict.footer.legalLink}
            </Link>
            <Link href={`/${lang}/legal`} className="link-line">
              {dict.footer.privacyLink}
            </Link>
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="footer-mark h-display pointer-events-none absolute -bottom-10 left-0 w-full select-none whitespace-nowrap text-[18vw] leading-none"
      >
        mavoNORM
      </div>
    </footer>
  );
}
