import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { projects } from "@/lib/projects";

const BASE = "https://mavonorm.eu";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/services", "/process", "/portfolio", "/feedback", "/contact", "/legal"];
  const entries: MetadataRoute.Sitemap = [];

  for (const lang of locales) {
    for (const page of pages) {
      entries.push({
        url: `${BASE}/${lang}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "/portfolio" ? "weekly" : "monthly",
        priority: page === "" ? 1 : 0.7,
      });
    }
    for (const p of projects) {
      entries.push({
        url: `${BASE}/${lang}/portfolio/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }
  return entries;
}
