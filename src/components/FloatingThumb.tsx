"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

export interface ThumbItem {
  /** Image shown while the matching row is hovered. */
  img: string;
  /** Caption printed on the thumbnail. */
  label: string;
}

/**
 * Cursor-following preview shared by the hover lists (sectors, timeline).
 *
 * All images stay mounted and cross-fade by opacity rather than swapping `src`,
 * so moving between rows never shows a blank frame while a new file loads.
 * Fine pointers only — on touch there is no hover to reveal it with, and the
 * caller renders its list unchanged.
 */
export default function FloatingThumb({
  items,
  active,
}: {
  items: ThumbItem[];
  active: number | null;
}) {
  const floatRef = useRef<HTMLDivElement>(null);
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

  if (!finePointer) return null;

  return (
    <div
      ref={floatRef}
      aria-hidden
      className={`pointer-events-none fixed left-0 top-0 z-40 h-44 w-64 overflow-hidden shadow-2xl shadow-ink/30 transition-[opacity,scale] duration-300 ${
        active !== null ? "scale-100 opacity-100" : "scale-90 opacity-0"
      }`}
    >
      {items.map((it, i) => (
        // keyed by position, not src — callers may legitimately reuse one image
        // across several rows, which would collide on a src-only key
        <Image quality={90}
          key={`${it.img}-${i}`}
          src={it.img}
          alt=""
          fill
          sizes="16rem"
          className={`duotone object-cover transition-opacity duration-300 ${
            active === i ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute bottom-0 left-0 bg-ink/80 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-paper">
        {active !== null ? items[active]?.label : ""}
      </div>
    </div>
  );
}
