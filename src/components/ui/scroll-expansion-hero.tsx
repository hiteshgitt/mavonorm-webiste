"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  /** Explicit halves for the sliding title; fall back to splitting `title` by words. */
  titleLeft?: string;
  titleRight?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

/**
 * Scroll-expansion hero: the page stays pinned while the first scroll input
 * drives the media from a small card to (near) fullscreen; the title halves
 * slide apart as it grows. Once fully expanded, normal scrolling resumes.
 *
 * Coordinates with Lenis via window.__lenis (paused while pinned) and is
 * skipped entirely for prefers-reduced-motion users, who get the expanded
 * state immediately.
 */
const ScrollExpandMedia = ({
  mediaType = "image",
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  titleLeft: titleLeftProp,
  titleRight: titleRightProp,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  // reduced motion: skip the hijack, land on the expanded state
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setScrollProgress(1);
      setMediaFullyExpanded(true);
      setShowContent(true);
    }
  }, []);

  // pause/resume Lenis so the smooth-scroller doesn't fight the pinned phase
  useEffect(() => {
    const lenis = window.__lenis;
    if (!lenis) return;
    if (mediaFullyExpanded) lenis.start();
    else lenis.stop();
    return () => lenis.start();
  }, [mediaFullyExpanded]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const applyProgress = (delta: number) => {
      const newProgress = Math.min(Math.max(scrollProgress + delta, 0), 1);
      setScrollProgress(newProgress);
      if (newProgress >= 1) {
        setMediaFullyExpanded(true);
        setShowContent(true);
      } else if (newProgress < 0.75) {
        setShowContent(false);
      }
    };

    const handleWheel = (e: globalThis.WheelEvent) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        applyProgress(e.deltaY * 0.0009);
      }
    };

    const handleTouchStart = (e: globalThis.TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: globalThis.TouchEvent) => {
      if (!touchStartY) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        // higher sensitivity for touch, more when scrolling back
        applyProgress(deltaY * (deltaY < 0 ? 0.008 : 0.005));
        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = () => setTouchStartY(0);

    // keyboard support so the pinned phase is not a trap
    const handleKey = (e: globalThis.KeyboardEvent) => {
      if (mediaFullyExpanded) return;
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        applyProgress(0.2);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        applyProgress(-0.2);
      }
    };

    const handleScroll = () => {
      if (!mediaFullyExpanded) window.scrollTo(0, 0);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKey);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  useEffect(() => {
    const checkIfMobile = () => setIsMobileState(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);

  const words = title ? title.split(" ") : [];
  const mid = Math.ceil(words.length / 2);
  const titleLeft = titleLeftProp ?? words.slice(0, mid).join(" ");
  const titleRight = titleRightProp ?? words.slice(mid).join(" ");

  return (
    <div ref={sectionRef} className="dark-section overflow-x-hidden transition-colors duration-700 ease-in-out">
      <section className="relative flex min-h-[100dvh] flex-col items-center justify-start">
        <div className="relative flex min-h-[100dvh] w-full flex-col items-center">
          <motion.div
            className="absolute inset-0 z-0 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <Image
              src={bgImageSrc}
              alt=""
              width={1920}
              height={1080}
              className="duotone h-screen w-screen"
              style={{ objectFit: "cover", objectPosition: "center" }}
              priority
            />
            <div className="blueprint-grid absolute inset-0" />
            <div className="absolute inset-0 bg-ink/60" />
          </motion.div>

          <div className="relative z-10 mx-auto flex w-full max-w-350 flex-col items-center justify-start">
            <div className="relative flex h-[100dvh] w-full flex-col items-center justify-center">
              <div
                className="absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 transition-none"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: "95vw",
                  maxHeight: "85vh",
                  boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.5)",
                }}
              >
                {mediaType === "video" ? (
                  <div className="pointer-events-none relative h-full w-full">
                    <video
                      src={mediaSrc}
                      poster={posterSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="h-full w-full object-cover"
                      controls={false}
                      disablePictureInPicture
                      disableRemotePlayback
                    />
                    <motion.div
                      className="absolute inset-0 bg-ink/40"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                ) : (
                  <div className="relative h-full w-full">
                    <Image
                      src={mediaSrc}
                      alt={title || "Media content"}
                      width={1280}
                      height={720}
                      priority
                      className="h-full w-full object-cover"
                    />
                    <motion.div
                      className="absolute inset-0 bg-ink/50"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}

                <div className="relative z-10 mt-5 flex flex-col items-center gap-2 text-center transition-none">
                  {date && (
                    <p
                      className="h-eyebrow text-copper"
                      style={{ transform: `translateX(-${textTranslateX}vw)` }}
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p
                      className="h-eyebrow flex items-center gap-3 !tracking-[0.3em] text-muted-dark"
                      style={{ transform: `translateX(${textTranslateX}vw)` }}
                    >
                      <span className="inline-block h-6 w-px animate-pulse bg-copper" aria-hidden />
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              <h1
                className={`relative z-10 flex w-full flex-col items-center justify-center gap-2 text-center transition-none md:gap-4 ${
                  textBlend ? "mix-blend-difference" : "mix-blend-normal"
                }`}
              >
                <motion.span
                  className="h-display block text-5xl text-paper transition-none md:text-7xl xl:text-8xl"
                  style={{ transform: `translateX(-${textTranslateX}vw)` }}
                >
                  {titleLeft}
                </motion.span>
                <motion.span
                  className="h-display block text-5xl text-copper transition-none md:text-7xl xl:text-8xl"
                  style={{ transform: `translateX(${textTranslateX}vw)` }}
                >
                  {titleRight}
                </motion.span>
              </h1>
            </div>

            <motion.section
              className="flex w-full flex-col px-6 py-10 md:px-10 lg:py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
