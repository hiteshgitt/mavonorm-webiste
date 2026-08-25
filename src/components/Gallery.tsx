"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/** Image grid with a fullscreen lightbox. */
export default function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIdx(null);
      if (e.key === "ArrowRight") setOpenIdx((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === "ArrowLeft") setOpenIdx((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIdx, images.length]);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setOpenIdx(i)}
            className={`duotone group relative overflow-hidden bg-grey ${i % 3 === 0 ? "sm:col-span-2 aspect-[21/10]" : "aspect-[4/3]"}`}
            data-cursor="view"
            aria-label={`${alt} ${i + 1}`}
          >
            <Image quality={90}
              src={src}
              alt={`${alt} — ${i + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {openIdx !== null && (
        <div
          className="fixed inset-0 z-150 flex items-center justify-center bg-ink/95 p-6 md:p-16"
          onClick={() => setOpenIdx(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute right-6 top-6 z-10 text-3xl text-paper/70 hover:text-paper"
            aria-label="Close"
          >
            ×
          </button>
          <button
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 p-4 text-2xl text-paper/70 hover:text-paper"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIdx((openIdx - 1 + images.length) % images.length);
            }}
            aria-label="Previous"
          >
            ←
          </button>
          <div className="relative h-full w-full">
            <Image quality={90} src={images[openIdx]} alt={`${alt} — ${openIdx + 1}`} fill className="object-contain" sizes="100vw" />
          </div>
          <button
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 p-4 text-2xl text-paper/70 hover:text-paper"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIdx((openIdx + 1) % images.length);
            }}
            aria-label="Next"
          >
            →
          </button>
          <div className="idx absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] text-paper/60">
            {openIdx + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
