"use client";

import { useRef } from "react";
import type { Project } from "@/lib/projects";
import type { Dictionary, Locale } from "@/lib/i18n";
import ProjectCard from "./ProjectCard";

/** Horizontal-scrolling featured projects strip with edge navigation. */
export default function FeaturedProjects({
  projects,
  lang,
  dict,
}: {
  projects: Project[];
  lang: Locale;
  dict: Dictionary;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.7, 560), behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-8 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((p, i) => (
          <div key={p.slug} className="w-[85vw] max-w-130 shrink-0 snap-start sm:w-[55vw] lg:w-[36vw]">
            <ProjectCard project={p} lang={lang} dict={dict} priority={i === 0} />
          </div>
        ))}
      </div>
      <div className="mt-8 flex gap-3">
        <button onClick={() => scrollBy(-1)} className="btn btn-outline !px-5 !py-3" aria-label="Previous">
          ←
        </button>
        <button onClick={() => scrollBy(1)} className="btn btn-outline !px-5 !py-3" aria-label="Next">
          →
        </button>
      </div>
    </div>
  );
}
