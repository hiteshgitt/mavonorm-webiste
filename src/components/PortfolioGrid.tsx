"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/lib/projects";
import type { Dictionary, Locale } from "@/lib/i18n";
import ProjectCard from "./ProjectCard";

const CATEGORIES: (ProjectCategory | "all")[] = ["all", "exhibition", "interior", "cnc", "custom"];

export default function PortfolioGrid({
  projects,
  lang,
  dict,
}: {
  projects: Project[];
  lang: Locale;
  dict: Dictionary;
}) {
  const [category, setCategory] = useState<ProjectCategory | "all">("all");
  const [industry, setIndustry] = useState<string>("all");
  const [query, setQuery] = useState("");

  const industries = useMemo(
    () => Array.from(new Set(projects.map((p) => p.industry[lang]))).sort(),
    [projects, lang]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (industry !== "all" && p.industry[lang] !== industry) return false;
      if (!q) return true;
      const hay = `${p.title} ${p.location} ${p.industry[lang]} ${p.excerpt[lang]}`.toLowerCase();
      return hay.includes(q);
    });
  }, [projects, category, industry, query, lang]);

  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label={dict.portfolio.filterLabel}>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`h-eyebrow !tracking-[0.14em] border px-4 py-2.5 transition-colors ${
                category === c
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-muted hover:border-ink hover:text-ink"
              }`}
              aria-pressed={category === c}
            >
              {dict.portfolio.categories[c]}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="h-eyebrow !tracking-[0.14em] cursor-pointer border border-line bg-transparent px-4 py-2.5 outline-none focus:border-copper"
            aria-label={dict.portfolio.industryLabel}
          >
            <option value="all">{dict.portfolio.industryLabel}: {dict.common.all}</option>
            {industries.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={dict.common.search}
            className="w-full border border-line bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted focus:border-copper sm:w-64"
            aria-label={dict.common.search}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-24 text-center text-muted">{dict.common.noResults}</p>
      ) : (
        <div className="mt-12 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <div
              key={p.slug}
              className={i % 5 === 0 ? "sm:col-span-2 lg:col-span-2" : ""}
            >
              <ProjectCard project={p} lang={lang} dict={dict} priority={i < 2} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
