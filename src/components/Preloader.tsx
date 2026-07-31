"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [show, setShow] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("mavo-loaded")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem("mavo-loaded", "1");
      return;
    }
    // must run post-hydration: sessionStorage is unavailable during SSR
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show || !rootRef.current) return;
    const root = rootRef.current;
    const num = root.querySelector<HTMLElement>(".pre-num");
    const mark = root.querySelector<HTMLElement>(".pre-mark");
    const counter = { v: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("mavo-loaded", "1");
        setShow(false);
      },
    });
    tl.fromTo(mark, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" })
      .to(
        counter,
        {
          v: 100,
          duration: 1.4,
          ease: "power2.inOut",
          onUpdate: () => {
            if (num) num.textContent = String(Math.round(counter.v)).padStart(3, "0");
          },
        },
        0.2
      )
      .to(root, { yPercent: -100, duration: 0.8, ease: "power4.inOut", delay: 0.15 });

    return () => {
      tl.kill();
    };
  }, [show]);

  if (!show) return null;

  return (
    <div ref={rootRef} className="preloader" aria-hidden>
      <div className="flex flex-col items-center gap-6">
        <div className="pre-mark h-display text-3xl md:text-4xl">
          mavo<span className="text-copper">NORM</span>
        </div>
        <div className="pre-num idx text-sm text-muted-dark tracking-[0.3em]">000</div>
      </div>
    </div>
  );
}
