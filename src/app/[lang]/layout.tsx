import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "../globals.css";
import { getDictionary, locales, type Locale } from "@/lib/i18n";
import SmoothScroll from "@/components/SmoothScroll";
import Fx from "@/components/Fx";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";

const inter = Inter({ variable: "--font-inter", subsets: ["latin", "latin-ext"], display: "swap" });
const grotesk = Space_Grotesk({ variable: "--font-grotesk", subsets: ["latin", "latin-ext"], display: "swap" });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang);
  return {
    title: { default: dict.meta.home.title, template: "%s" },
    description: dict.meta.home.description,
    alternates: {
      languages: { pl: "/pl", en: "/en" },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (locales as readonly string[]).includes(lang) ? (lang as Locale) : "pl";
  const dict = getDictionary(locale);

  return (
    <html lang={locale} className={`${inter.variable} ${grotesk.variable}`}>
      <body>
        <Preloader />
        <SmoothScroll />
        <Fx />
        <CustomCursor viewLabel={dict.common.viewProject.split(" ")[0]} />
        <Header lang={locale} dict={dict} />
        <main id="main">{children}</main>
        <Footer lang={locale} dict={dict} />
        <StickyCta lang={locale} dict={dict} />
      </body>
    </html>
  );
}
