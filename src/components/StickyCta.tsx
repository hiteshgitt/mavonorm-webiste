"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary, Locale } from "@/lib/i18n";
import MagneticButton from "./MagneticButton";

export default function StickyCta({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.includes("/contact")) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-80 transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <MagneticButton>
        <Link href={`/${lang}/contact`} className="btn btn-dark shadow-2xl shadow-ink/30">
          {dict.nav.cta}
          <span aria-hidden>→</span>
        </Link>
      </MagneticButton>
    </div>
  );
}
