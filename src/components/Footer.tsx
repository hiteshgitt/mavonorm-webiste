import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import Logo from "./Logo";

/**
 * Only the channels we actually publish to. Instagram and Behance were
 * placeholder rows pointing at "#" and have been dropped rather than left as
 * dead links.
 *
 * The Google Photos address is the resolved share URL, not the goo.gl short
 * link it was given as — Google has been retiring goo.gl, and a dead shortener
 * would take the album with it.
 */
const socials = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/lena-d%C4%99bosz-428071b3" },
  {
    name: "Google Photos",
    href: "https://photos.google.com/share/AF1QipP1g0EQSuip27cqS7kInd4ZjAZlo8dAfF2WXiHAObGSL00E_E94aqR_UBxMZFu15w?key=SVc4dGtLU25ST2FhRVdzRFdlUEFSV0R6UHRUV1RB",
  },
];

export default function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  const nav = [
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/services`, label: dict.nav.services },
    { href: `/${lang}/process`, label: dict.nav.process },
    { href: `/${lang}/portfolio`, label: dict.nav.portfolio },
    { href: `/${lang}/feedback`, label: dict.nav.feedback },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  return (
    <footer className="dark-section relative overflow-hidden">
      <div className="mx-auto max-w-350 px-6 py-20 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo className="h-9 w-auto text-paper" />
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

          <div className="md:col-span-3">
            <div className="h-eyebrow text-muted-dark">{dict.footer.officeLabel}</div>
            <address className="mt-5 space-y-1 text-sm not-italic leading-relaxed">
              {dict.contact.details.address.map((l) => (
                <div key={l}>{l}</div>
              ))}
              <div className="whitespace-nowrap pt-2 text-muted-dark">{dict.contact.details.phone}</div>
              <div className="whitespace-nowrap text-muted-dark">FAX {dict.contact.details.fax}</div>
              {/* each address needs a block-level wrapper: the anchors are
                  inline-block for the underline, so on their own they sit side
                  by side and read as one run-on address */}
              <div className="pt-2">
                <a href={`mailto:${dict.contact.details.email}`} className="link-line inline-block">
                  {dict.contact.details.email}
                </a>
              </div>
              <div>
                <a href={`mailto:${dict.contact.details.emailSecondary}`} className="link-line inline-block">
                  {dict.contact.details.emailSecondary}
                </a>
              </div>
            </address>
          </div>

          <div className="md:col-span-2">
            <div className="h-eyebrow text-muted-dark">{dict.footer.followLabel}</div>
            <ul className="mt-5 space-y-3 text-sm">
              {socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    className="link-line"
                    aria-label={s.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Registration check and lookalike-domain notice. CEIDG has no
            deep-link for a single NIP — its search form must be filled in — so
            the number is shown here to copy and the link opens the search page.
            The unaffiliated domains are deliberately NOT hyperlinked: naming
            them is the point, sending them traffic and link equity is not. */}
        <div className="mt-16 grid gap-10 border-t border-line-dark pt-10 md:grid-cols-2">
          <div>
            <div className="h-eyebrow text-muted-dark">{dict.footer.verifyLabel}</div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-dark">{dict.footer.verifyBody}</p>
            <p className="mt-3 font-(family-name:--font-display) text-lg">
              <span className="text-muted-dark">{dict.footer.nipLabel}</span> {dict.footer.nip}
            </p>
            <a
              href="https://aplikacja.ceidg.gov.pl/ceidg/ceidg.public.ui/search.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="link-line mt-3 inline-block text-sm"
            >
              {dict.footer.ceidgCta} &#8599;
            </a>
          </div>

          <div>
            <div className="h-eyebrow text-muted-dark">{dict.footer.unaffiliatedLabel}</div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-dark">{dict.footer.unaffiliatedBody}</p>
            <ul className="mt-3 space-y-1 text-sm">
              {["mavonorm-global.de", "ariehinatesphereexhibit.com"].map((d) => (
                <li key={d} className="break-words text-paper/70">
                  {d}
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
      {/* Oversized brand mark. Two stacked copies: the glow is a blurred
          duplicate underneath, so the mark on top carries no filter and stays
          crisp vector — filtering the mark itself rasterises it and, at this
          size, the browser downsamples the result into visible blocks. */}
      <div
        aria-hidden
        className="footer-mark pointer-events-none absolute bottom-0 left-0 w-full select-none px-[2vw] pb-[1.5vw]"
      >
        <div className="relative">
          <Logo className="footer-mark-glow absolute left-0 top-0 h-auto w-full" />
          <Logo className="footer-mark-face relative h-auto w-full" />
        </div>
      </div>
    </footer>
  );
}
