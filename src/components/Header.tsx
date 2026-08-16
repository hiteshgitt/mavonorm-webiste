"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary, Locale } from "@/lib/i18n";
import MagneticButton from "./MagneticButton";
import Logo from "./Logo";

export default function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 160 && y > last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const items = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/services`, label: dict.nav.services },
    { href: `/${lang}/process`, label: dict.nav.process },
    { href: `/${lang}/portfolio`, label: dict.nav.portfolio },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  const otherLang: Locale = lang === "pl" ? "en" : "pl";
  const switchHref = pathname.replace(new RegExp(`^/${lang}`), `/${otherLang}`) || `/${otherLang}`;
  const isActive = (href: string) => (href === `/${lang}` ? pathname === href : pathname.startsWith(href));

  const chip =
    "rounded-full px-4 py-2 font-(family-name:--font-display) text-[0.7rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-100 flex justify-center px-4 pt-4 transition-transform duration-500 ${
          hidden && !open ? "-translate-y-[140%]" : "translate-y-0"
        }`}
      >
        <div
          className={`glass-nav flex items-center gap-1 rounded-full py-2 pl-5 pr-2 ${
            open ? "is-ghost" : scrolled ? "is-solid" : ""
          }`}
        >
          <Link
            href={`/${lang}`}
            className={`mr-3 block ${open ? "text-paper" : "text-ink"}`}
            aria-label="mavoNORM"
          >
            <Logo className="h-5 w-auto" />
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
            {items.slice(1, 5).map((it) => (
              <Link
                key={it.href}
                href={it.href}
                className={`${chip} ${
                  isActive(it.href)
                    ? "bg-ink text-paper shadow-sm"
                    : "text-ink/80 hover:bg-ink/6 hover:text-ink"
                }`}
              >
                {it.label}
              </Link>
            ))}
          </nav>

          <span aria-hidden className={`mx-2 hidden h-5 w-px lg:block ${open ? "bg-paper/30" : "bg-ink/15"}`} />

          <Link
            href={switchHref}
            className={`${chip} !px-3 ${open ? "text-paper" : "text-ink/60 hover:bg-ink/6 hover:text-ink"}`}
            aria-label={otherLang === "pl" ? "Polska wersja" : "English version"}
          >
            {/* copper marks the language you are reading; the other stays muted
                and is what the link switches to */}
            <span className={lang === "pl" ? "font-bold text-copper" : ""}>PL</span>
            <span className="mx-1 opacity-40">/</span>
            <span className={lang === "en" ? "font-bold text-copper" : ""}>EN</span>
          </Link>

          <div className="hidden lg:block">
            <MagneticButton strength={0.2}>
              <Link
                href={`/${lang}/contact`}
                className={`${chip} block bg-ink !px-5 !py-2.5 text-paper transition-colors hover:bg-copper`}
              >
                {dict.nav.cta}
              </Link>
            </MagneticButton>
          </div>

          <button
            className={`relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full lg:hidden ${
              open ? "text-paper" : "text-ink"
            }`}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Menu"
          >
            <span className={`h-px w-5 bg-current transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-5 bg-current transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </header>

      {/* mobile menu */}
      <div
        className={`dark-section fixed inset-0 z-90 flex flex-col justify-center px-8 transition-[clip-path] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] lg:hidden ${
          open ? "[clip-path:inset(0_0_0%_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <nav className="flex flex-col gap-2" aria-label="Mobile">
          {items.map((it, i) => (
            <Link
              key={it.href}
              href={it.href}
              onClick={() => setOpen(false)}
              className={`h-display py-1 text-4xl transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              } ${isActive(it.href) ? "text-copper" : ""}`}
              style={{ transitionDelay: open ? `${150 + i * 60}ms` : "0ms" }}
            >
              {it.label}
            </Link>
          ))}
        </nav>
        <div className="mt-12 space-y-1 text-sm text-muted-dark">
          <a href={`mailto:${dict.contact.details.email}`}>{dict.contact.details.email}</a>
          <div>{dict.contact.details.phone}</div>
        </div>
      </div>
    </>
  );
}
