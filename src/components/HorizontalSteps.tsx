"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Step {
  title: string;
  body: string;
  img: string;
}

/**
 * Pinned horizontal-scroll storytelling section for the delivery process.
 * Each panel carries a duotone background image that parallaxes against the
 * track (via containerAnimation) while a progress bar fills along the bottom.
 */
export default function HorizontalSteps({ steps }: { steps: Step[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const scrollLen = () => track.scrollWidth - wrap.clientWidth;
      const tween = gsap.to(track, {
        x: () => -scrollLen(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${scrollLen()}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      // per-panel background parallax riding on the horizontal tween
      const parallaxTriggers = Array.from(
        track.querySelectorAll<HTMLElement>(".step-bg")
      ).map((bg) =>
        gsap.fromTo(
          bg,
          { xPercent: -8 },
          {
            xPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: bg.parentElement ?? bg,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        )
      );

      return () => {
        parallaxTriggers.forEach((t) => t.scrollTrigger?.kill());
        tween.scrollTrigger?.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={wrapRef} className="dark-section relative overflow-hidden">
      <div
        ref={trackRef}
        className="flex flex-col gap-0 lg:h-screen lg:flex-row lg:items-stretch lg:pl-[8vw]"
      >
        {steps.map((s, i) => (
          <article
            key={s.title}
            className="relative flex shrink-0 flex-col justify-between overflow-hidden border-b border-line-dark px-6 py-14 md:px-10 lg:h-full lg:w-[38rem] lg:border-b-0 lg:border-r lg:px-14 lg:py-24"
          >
            <div className="step-bg duotone absolute inset-y-0 -left-[12%] -right-[12%]">
              <Image
                src={s.img}
                alt=""
                fill
                sizes="(max-width:1024px) 100vw, 40rem"
                className="object-cover opacity-35"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />

            <div className="relative">
              <span className="idx text-sm text-copper">
                {String(i + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
              </span>
              <span aria-hidden className="mt-4 block h-px w-14 bg-copper/60" />
            </div>
            <div className="relative mt-10 lg:mt-0">
              <h3 className="h-display text-3xl md:text-4xl">{s.title}</h3>
              <p className="mt-6 max-w-sm leading-relaxed text-muted-dark">{s.body}</p>
            </div>
          </article>
        ))}
        <div className="hidden shrink-0 items-center px-24 lg:flex">
          <div className="h-display whitespace-nowrap text-6xl text-white/10">mavoNORM</div>
        </div>
      </div>

      {/* scroll progress along the pinned section */}
      <div className="pointer-events-none absolute inset-x-[8vw] bottom-8 hidden h-px bg-line-dark lg:block">
        <div
          ref={progressRef}
          className="h-full w-full origin-left bg-copper"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}
