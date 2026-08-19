import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import type { Dictionary, Locale } from "@/lib/i18n";

export default function ProjectCard({
  project,
  lang,
  dict,
  priority = false,
}: {
  project: Project;
  lang: Locale;
  dict: Dictionary;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/${lang}/portfolio/${project.slug}`}
      className="project-card group block"
      data-cursor="view"
    >
      <div className="pc-img duotone relative aspect-[4/3] bg-grey">
        <Image
          src={project.hero}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover"
          priority={priority}
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-(family-name:--font-display) text-lg font-medium leading-snug">{project.title}</h3>
          <p className="mt-1 text-sm text-muted">
            {/* the separator only earns its place when a location follows it */}
            {project.industry[lang]}
            {project.location ? ` · ${project.location}` : ""}
          </p>
        </div>
        <span className="idx mt-1 shrink-0 text-xs text-muted">{project.year}</span>
      </div>
      <span className="sr-only">{dict.common.viewProject}</span>
    </Link>
  );
}
