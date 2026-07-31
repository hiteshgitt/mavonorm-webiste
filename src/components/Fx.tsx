"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Global scroll animation engine. Scans the rendered page for declarative
 * animation hooks and wires GSAP ScrollTriggers to them:
 *
 *  .reveal-line > span   — masked line-by-line text reveal
 *  [data-reveal]         — fade/rise on enter (data-delay="0.15" optional)
 *  .mask-reveal          — clip-path image unmasking
 *  [data-parallax]       — subtle parallax (data-speed="-8" = yPercent)
 *  [data-counter]        — animated number counting to data-value
 */
export default function Fx() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.classList.add("reveal-done");
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // group line reveals by their nearest section so lines stagger together
      const lineParents = new Set<Element>();
      document.querySelectorAll<HTMLElement>(".reveal-line").forEach((el) => {
        lineParents.add(el.closest("[data-reveal-group]") ?? el);
      });
      lineParents.forEach((group) => {
        const spans = group.querySelectorAll<HTMLElement>(".reveal-line > span");
        if (!spans.length) return;
        gsap.to(spans, {
          y: 0,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.09,
          scrollTrigger: { trigger: group as Element, start: "top 88%" },
        });
      });

      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: parseFloat(el.dataset.delay ?? "0"),
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });

      document.querySelectorAll<HTMLElement>(".mask-reveal").forEach((el) => {
        gsap.to(el, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.3,
          ease: "power4.inOut",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.speed ?? "-8");
        gsap.fromTo(
          el,
          { yPercent: -speed },
          {
            yPercent: speed,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, scrub: true, start: "top bottom", end: "bottom top" },
          }
        );
      });

      document.querySelectorAll<HTMLElement>("[data-counter]").forEach((el) => {
        const target = parseFloat(el.dataset.value ?? "0");
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toLocaleString();
          },
        });
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = setTimeout(refresh, 400);

    return () => {
      window.removeEventListener("load", refresh);
      clearTimeout(t);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
