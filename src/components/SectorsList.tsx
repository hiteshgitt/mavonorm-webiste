"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

export interface SectorItem {
  label: string;
  img: string;
}

/**
 * Sector list whose rows reveal a floating, cursor-following thumbnail on
 * hover (fine pointers only — touch devices just get the list).
 */
export default function SectorsList({ sectors }: { sectors: SectorItem[] }) {
  const floatRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    // must run post-hydration: matchMedia is unavailable during SSR
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFinePointer(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!finePointer || !floatRef.current) return;
    const el = floatRef.current;
    const x = gsap.quickTo(el, "x", { duration: 0.55, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.55, ease: "power3.out" });
    const move = (e: MouseEvent) => {
      x(e.clientX + 28);
      y(e.clientY - 96);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [finePointer]);

  return (
    <>
      <ul className="grid grid-cols-2 gap-x-8" onMouseLeave={() => setActive(null)}>
        {sectors.map((s, i) => (
          <li
            key={s.label}
            className="group flex items-baseline gap-4 border-b border-line py-4"
            data-reveal
            data-delay={`${(i % 4) * 0.06}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
          >
            {/* copper marks the active row; the rest recede to muted, since the
                palette no longer has a second accent to switch between */}
            <span className={`idx text-xs transition-colors ${active === i ? "text-copper" : "text-muted"}`}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-(family-name:--font-display) text-lg transition-transform duration-300 group-hover:translate-x-2">
              {s.label}
            </span>
          </li>
        ))}
      </ul>

      {finePointer && (
        <div
          ref={floatRef}
          aria-hidden
          className={`pointer-events-none fixed left-0 top-0 z-40 h-44 w-64 overflow-hidden shadow-2xl shadow-ink/30 transition-[opacity,scale] duration-300 ${
            active !== null ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
        >
          {sectors.map((s, i) => (
            <Image
              key={s.label}
              src={s.img}
              alt=""
              fill
              sizes="16rem"
              className={`duotone object-cover transition-opacity duration-300 ${
                active === i ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute bottom-0 left-0 bg-ink/80 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-paper">
            {active !== null ? sectors[active].label : ""}
          </div>
        </div>
      )}
    </>
  );
}
