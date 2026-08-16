"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  /**
   * Optional video for the section backdrop, sitting behind the title and the
   * expanding card. Takes over from `bgImageSrc`, which stays as its poster.
   */
  bgVideoSrc?: string;
  /**
   * Whether the backdrop video is scrubbed by scroll (scroll position is the
   * playhead) or just loops ambiently at its own pace. Scrubbing also keeps the
   * backdrop partly visible at full expansion so the footage is actually seen.
   */
  bgVideoScrub?: boolean;
  title?: string;
  /** Explicit halves for the sliding title; fall back to splitting `title` by words. */
  titleLeft?: string;
  titleRight?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  /**
   * Frame rate of the source clip. Scrub seeks snap to these boundaries, so
   * scrolling never asks the decoder for a frame that does not exist.
   */
  sourceFps?: number;
  children?: ReactNode;
}

/**
 * Fraction of the clip consumed by the pinned scrub. Leaving headroom means
 * playback has somewhere to go when it takes over after full expansion.
 */
const SCRUB_SPAN = 0.6;

/** Per-frame easing toward the input target. Lower = heavier, more inertia. */
const EASE = 0.15;

/** Below this the eased value is close enough to snap to the target. */
const EPSILON = 0.0004;

/**
 * Progress at which the hero commits to expanded. The ease approaches 1
 * asymptotically, so waiting for a true 1 leaves the page pinned for most of a
 * second after the user has already scrolled to the end.
 */
const EXPAND_AT = 0.99;

/**
 * How far the backdrop dims at full expansion. The backdrop used to fade to
 * nothing, which would hide the end of a scrubbed clip exactly when the booth
 * is finished — so a video backdrop keeps this floor instead.
 */
const BG_FLOOR = 0.35;

/**
 * Progress over which the card fades up from nothing. At rest the hero is just
 * the backdrop and the headline; the card is a reveal the first scroll earns.
 */
const MEDIA_FADE_IN = 0.25;

/**
 * Scroll-expansion hero: the page stays pinned while the first scroll input
 * drives the media from a small card to (near) fullscreen; the title halves
 * slide apart as it grows. Once fully expanded, normal scrolling resumes.
 *
 * With `mediaType="video"` the pinned phase also scrubs the clip — scroll
 * position is the playhead — and hands off to normal looping playback once
 * expanded. The video sits under the same grade as the rest of the banner:
 * desaturated and ink-tinted while small, resolving to full colour as it grows.
 *
 * Motion runs on a rAF loop that eases a rendered value toward the raw input
 * target and writes styles straight to the DOM. Input events only move the
 * target, so a mouse wheel's coarse notches become continuous motion and React
 * re-renders only on the discrete state flips.
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
  bgVideoSrc,
  bgVideoScrub = true,
  title,
  titleLeft: titleLeftProp,
  titleRight: titleRightProp,
  date,
  scrollToExpand,
  textBlend,
  sourceFps = 24,
  children,
}: ScrollExpandMediaProps) => {
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);

  // motion state lives in refs — the rAF loop owns it, React never re-renders on it
  const progressRef = useRef<number>(0);
  const targetRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const isMobileRef = useRef<boolean>(false);
  const expandedRef = useRef<boolean>(false);
  const showContentRef = useRef<boolean>(false);
  const touchStartYRef = useRef<number>(0);

  const durationRef = useRef<number>(0);
  const lastFrameRef = useRef<number>(-1);

  const boxRef = useRef<HTMLDivElement | null>(null);
  const mediaWrapRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const bgVideoRef = useRef<HTMLVideoElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const scrimRef = useRef<HTMLDivElement | null>(null);
  const washRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const imgScrimRef = useRef<HTMLDivElement | null>(null);
  const leftRef = useRef<HTMLSpanElement | null>(null);
  const rightRef = useRef<HTMLSpanElement | null>(null);
  const dateRef = useRef<HTMLParagraphElement | null>(null);
  const hintRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    expandedRef.current = mediaFullyExpanded;
  }, [mediaFullyExpanded]);

  /** The clip scroll drives: the backdrop when there is one, else the card. */
  const scrubbing = bgVideoSrc ? bgVideoScrub : mediaType === "video";
  const scrubTarget = useCallback(
    () => (bgVideoSrc ? bgVideoRef.current : videoRef.current),
    [bgVideoSrc],
  );

  /** Write one frame of the expansion to the DOM. */
  const applyFrame = useCallback(
    (p: number) => {
      const mobile = isMobileRef.current;

      // the card is absent until the first scroll, then fades up as it grows
      const reveal = Math.min(p / MEDIA_FADE_IN, 1);
      if (mediaWrapRef.current) mediaWrapRef.current.style.opacity = `${reveal}`;

      if (boxRef.current) {
        boxRef.current.style.width = `${300 + p * (mobile ? 650 : 1250)}px`;
        boxRef.current.style.height = `${400 + p * (mobile ? 200 : 400)}px`;
        // the drop shadow has to fade with it, or an empty box floats at rest
        boxRef.current.style.boxShadow = `0px 0px 50px rgba(0, 0, 0, ${0.5 * reveal})`;
      }
      // a scrubbed backdrop only dims partway, so the end of the clip is still seen
      if (bgRef.current) {
        bgRef.current.style.opacity = `${1 - p * (scrubbing && bgVideoSrc ? 1 - BG_FLOOR : 1)}`;
      }

      const shift = p * (mobile ? 180 : 150);
      if (leftRef.current) leftRef.current.style.transform = `translateX(-${shift}vw)`;
      if (rightRef.current) rightRef.current.style.transform = `translateX(${shift}vw)`;
      if (dateRef.current) dateRef.current.style.transform = `translateX(-${shift}vw)`;
      if (hintRef.current) hintRef.current.style.transform = `translateX(${shift}vw)`;

      // banner grade: desaturated + ink-tinted while small, resolving as it grows
      if (videoRef.current) {
        videoRef.current.style.filter = `grayscale(${1 - p * 0.85}) contrast(${1.08 + p * 0.04}) brightness(${0.9 + p * 0.14})`;
      }
      if (scrimRef.current) scrimRef.current.style.opacity = `${0.6 - p * 0.32}`;
      if (washRef.current) washRef.current.style.opacity = `${0.55 - p * 0.25}`;
      if (gridRef.current) gridRef.current.style.opacity = `${0.6 - p * 0.3}`;
      // a light tint so the card sits in the banner rather than on top of it,
      // easing off as it expands and becomes the subject
      if (imgScrimRef.current) imgScrimRef.current.style.opacity = `${0.4 - p * 0.22}`;

      // scroll position is the playhead, until playback takes over
      const video = scrubTarget();
      const duration = durationRef.current;
      if (scrubbing && video && duration && !expandedRef.current) {
        const t = Math.min(duration * SCRUB_SPAN * p, duration - 0.05);
        // quantise to source frames — seeking between them is a wasted decode
        const frame = Math.round(t * sourceFps);
        if (frame !== lastFrameRef.current) {
          lastFrameRef.current = frame;
          video.currentTime = frame / sourceFps;
        }
      }
    },
    [sourceFps, scrubbing, bgVideoSrc, scrubTarget],
  );

  // reduced motion: skip the hijack, land on the expanded state
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    targetRef.current = 1;
    progressRef.current = 1;
    expandedRef.current = true;
    showContentRef.current = true;
    applyFrame(1);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMediaFullyExpanded(true);
    setShowContent(true);
  }, [applyFrame]);

  // pause/resume Lenis so the smooth-scroller doesn't fight the pinned phase
  useEffect(() => {
    const lenis = window.__lenis;
    if (!lenis) return;
    if (mediaFullyExpanded) lenis.start();
    else lenis.stop();
    return () => lenis.start();
  }, [mediaFullyExpanded]);

  useEffect(() => {
    const setMobile = () => {
      isMobileRef.current = window.innerWidth < 768;
      applyFrame(progressRef.current);
    };
    setMobile();
    window.addEventListener("resize", setMobile);
    return () => window.removeEventListener("resize", setMobile);
  }, [applyFrame]);

  // input only moves the target; the rAF loop does the animating
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /** Ease the rendered value toward the input target, one frame at a time. */
    const tick = () => {
      const diff = targetRef.current - progressRef.current;
      const next = Math.abs(diff) < EPSILON ? targetRef.current : progressRef.current + diff * EASE;

      progressRef.current = next;
      applyFrame(next);

      // only touch React on the actual transitions — this loop runs every frame
      if (next >= EXPAND_AT && !expandedRef.current) {
        expandedRef.current = true;
        showContentRef.current = true;
        setMediaFullyExpanded(true);
        setShowContent(true);
      } else if (next < 0.75 && showContentRef.current) {
        showContentRef.current = false;
        setShowContent(false);
      }

      rafRef.current =
        Math.abs(targetRef.current - next) >= EPSILON ? requestAnimationFrame(tick) : null;
    };

    const nudge = (delta: number) => {
      targetRef.current = Math.min(Math.max(targetRef.current + delta, 0), 1);
      if (rafRef.current === null) rafRef.current = requestAnimationFrame(tick);
    };

    const handleWheel = (e: globalThis.WheelEvent) => {
      if (expandedRef.current && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!expandedRef.current) {
        e.preventDefault();
        nudge(e.deltaY * 0.0009);
      }
    };

    const handleTouchStart = (e: globalThis.TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: globalThis.TouchEvent) => {
      if (!touchStartYRef.current) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartYRef.current - touchY;

      if (expandedRef.current && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!expandedRef.current) {
        e.preventDefault();
        // higher sensitivity for touch, more when scrolling back
        nudge(deltaY * (deltaY < 0 ? 0.008 : 0.005));
        touchStartYRef.current = touchY;
      }
    };

    const handleTouchEnd = () => {
      touchStartYRef.current = 0;
    };

    // keyboard support so the pinned phase is not a trap
    const handleKey = (e: globalThis.KeyboardEvent) => {
      if (expandedRef.current) return;
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        nudge(0.2);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        nudge(-0.2);
      }
    };

    const handleScroll = () => {
      // only write when it actually drifted — an unconditional scrollTo in a
      // scroll handler forces a reflow on every event
      if (!expandedRef.current && window.scrollY !== 0) window.scrollTo(0, 0);
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
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [applyFrame]);

  // metadata often lands before hydration, so check readyState as well as listening
  useEffect(() => {
    const video = scrubTarget();
    if (!scrubbing || !video) return;

    const onReady = () => {
      durationRef.current = Number.isFinite(video.duration) ? video.duration : 0;
      // prime the decoder so the first scrub seek actually paints (Safari/iOS)
      void video
        .play()
        .then(() => {
          if (!expandedRef.current) video.pause();
        })
        .catch(() => {});
      applyFrame(progressRef.current);
    };

    if (video.readyState >= 1) onReady();
    else video.addEventListener("loadedmetadata", onReady);
    return () => video.removeEventListener("loadedmetadata", onReady);
  }, [scrubbing, scrubTarget, applyFrame]);

  // an ambient backdrop loop would otherwise keep decoding once the hero is
  // scrolled past — pause it whenever the section leaves the viewport
  useEffect(() => {
    const video = bgVideoRef.current;
    if (!bgVideoSrc || bgVideoScrub || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [bgVideoSrc, bgVideoScrub]);

  // once expanded, playback takes over from where the scrub left off
  useEffect(() => {
    const video = scrubTarget();
    if (!scrubbing || !video) return;
    if (mediaFullyExpanded) {
      void video.play().catch(() => {});
    } else {
      video.pause();
      // playback moved the playhead; forget the last scrubbed frame so the
      // next seek is not skipped as a no-op
      lastFrameRef.current = -1;
    }
  }, [mediaFullyExpanded, scrubbing, scrubTarget]);

  const words = title ? title.split(" ") : [];
  const mid = Math.ceil(words.length / 2);
  const titleLeft = titleLeftProp ?? words.slice(0, mid).join(" ");
  const titleRight = titleRightProp ?? words.slice(mid).join(" ");

  return (
    <div className="dark-section overflow-x-hidden transition-colors duration-700 ease-in-out">
      <section className="relative flex min-h-[100dvh] flex-col items-center justify-start">
        <div className="relative flex min-h-[100dvh] w-full flex-col items-center">
          <div ref={bgRef} className="absolute inset-0 z-0 h-full" style={{ opacity: 1 }}>
            {bgVideoSrc ? (
              <video
                ref={bgVideoRef}
                src={bgVideoSrc}
                poster={bgImageSrc}
                muted
                loop={!bgVideoScrub}
                autoPlay={!bgVideoScrub}
                playsInline
                preload="auto"
                controls={false}
                disablePictureInPicture
                disableRemotePlayback
                // darker than the backdrop image was: moving footage competes with
                // the card for attention, so it has to sit further back
                className="h-screen w-screen object-cover"
                style={{ filter: "grayscale(1) contrast(1.06) brightness(0.62)" }}
              />
            ) : (
              <Image
                src={bgImageSrc}
                alt=""
                width={1920}
                height={1080}
                className="duotone h-screen w-screen"
                style={{ objectFit: "cover", objectPosition: "center" }}
                priority
              />
            )}
            <div className="blueprint-grid absolute inset-0" />
            <div className="absolute inset-0 bg-ink/60" />
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-350 flex-col items-center justify-start">
            <div className="relative flex h-[100dvh] w-full flex-col items-center justify-center">
              <div
                ref={boxRef}
                className="absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 transition-none will-change-[width,height]"
                style={{
                  width: "300px",
                  height: "400px",
                  maxWidth: "95vw",
                  maxHeight: "85vh",
                  boxShadow: "0px 0px 50px rgba(0, 0, 0, 0)",
                }}
              >
                {mediaType === "video" ? (
                  <div
                    ref={mediaWrapRef}
                    className="pointer-events-none relative h-full w-full overflow-hidden bg-ink"
                    style={{ opacity: 0 }}
                  >
                    <video
                      ref={videoRef}
                      src={mediaSrc}
                      poster={posterSrc}
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="h-full w-full object-cover transition-none"
                      style={{ filter: "grayscale(1) contrast(1.08) brightness(0.9)" }}
                      controls={false}
                      disablePictureInPicture
                      disableRemotePlayback
                    />
                    {/* ink scrim — heavy while the card is small, lifts as it fills the screen */}
                    <div ref={scrimRef} className="absolute inset-0 bg-ink" style={{ opacity: 0.6 }} />
                    {/* copper wash to tie the footage to the palette */}
                    <div
                      ref={washRef}
                      className="absolute inset-0 mix-blend-soft-light"
                      style={{
                        background:
                          "linear-gradient(130deg, var(--color-copper) 0%, transparent 45%, var(--color-copper) 100%)",
                        opacity: 0.55,
                      }}
                    />
                    <div ref={gridRef} className="blueprint-grid absolute inset-0" style={{ opacity: 0.6 }} />
                    {/* vignette keeps the title legible over the moving frame */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "radial-gradient(ellipse at center, transparent 35%, rgba(20,21,23,0.72) 100%)",
                      }}
                    />
                    <div className="grain absolute inset-0" />
                  </div>
                ) : (
                  <div ref={mediaWrapRef} className="relative h-full w-full overflow-hidden" style={{ opacity: 0 }}>
                    <Image
                      src={mediaSrc}
                      alt={title || "Media content"}
                      width={1672}
                      height={941}
                      priority
                      sizes="(max-width: 768px) 95vw, 1600px"
                      className="h-full w-full object-cover"
                    />
                    {/* flat ink tint, easing off as the card becomes the subject */}
                    <div ref={imgScrimRef} className="absolute inset-0 bg-ink/50" style={{ opacity: 0.4 }} />
                    {/* grounded bottom edge so the card sits in the banner rather than on it */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(to top, rgba(20,21,23,0.65) 0%, transparent 45%)",
                      }}
                    />
                    {/* vignette keeps the title legible across the frame */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "radial-gradient(ellipse at center, transparent 40%, rgba(20,21,23,0.55) 100%)",
                      }}
                    />
                    <div className="grain absolute inset-0" />
                  </div>
                )}

                <div className="relative z-10 mt-5 flex flex-col items-center gap-2 text-center transition-none">
                  {date && (
                    <p ref={dateRef} className="h-eyebrow text-copper">
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p
                      ref={hintRef}
                      className="h-eyebrow flex items-center gap-3 !tracking-[0.3em] text-muted-dark"
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
                <span
                  ref={leftRef}
                  className="h-display block text-5xl text-paper transition-none will-change-transform md:text-7xl xl:text-8xl"
                >
                  {titleLeft}
                </span>
                <span
                  ref={rightRef}
                  className="h-display block text-5xl text-copper transition-none will-change-transform md:text-7xl xl:text-8xl"
                >
                  {titleRight}
                </span>
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
