"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";
import { Arrow } from "./Arrow";
import styles from "./Rail.module.css";

type RailProps = {
  label: string;
  children: React.ReactNode;
  className?: string;
  /** Class applied to each slide wrapper (controls slide width). */
  slideClassName?: string;
  /** Where the controls sit relative to the track. */
  controls?: "below" | "none";
};

/**
 * Horizontal, scroll-snapping carousel. Uses native scrolling so touch swipe,
 * trackpads and keyboard arrows all work; buttons step one slide at a time.
 */
export function Rail({ label, children, className, slideClassName, controls = "below" }: RailProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const slides = Children.toArray(children);
  const [index, setIndex] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const items = Array.from(track.children) as HTMLElement[];
    const left = track.scrollLeft;
    let nearest = 0;
    let best = Infinity;
    items.forEach((el, i) => {
      const d = Math.abs(el.offsetLeft - track.offsetLeft - left - parseFloat(getComputedStyle(track).scrollPaddingLeft || "0"));
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    setIndex(nearest);
    setEdges({ start: left <= 4, end: left + track.clientWidth >= track.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    measure();
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [measure]);

  const go = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.max(0, Math.min(slides.length - 1, index + dir));
    const el = track.children[next] as HTMLElement | undefined;
    if (!el) return;
    const pad = parseFloat(getComputedStyle(track).scrollPaddingLeft || "0");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: el.offsetLeft - track.offsetLeft - pad, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className={[styles.rail, className].filter(Boolean).join(" ")} role="region" aria-roledescription="carousel" aria-label={label}>
      <ul ref={trackRef} className={styles.track} tabIndex={0} aria-label={`${label} — scroll horizontally`}>
        {slides.map((slide, i) => (
          <li
            key={i}
            className={[styles.slide, slideClassName].filter(Boolean).join(" ")}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
          >
            {slide}
          </li>
        ))}
      </ul>

      {controls === "below" && (
        <div className={`container ${styles.controls}`}>
          <p className={styles.count} aria-live="polite">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span className={styles.countRule} aria-hidden="true">
              <span style={{ transform: `scaleX(${(index + 1) / slides.length})` }} />
            </span>
            <span>{String(slides.length).padStart(2, "0")}</span>
          </p>
          <div className={styles.buttons}>
            <button type="button" onClick={() => go(-1)} disabled={edges.start} aria-label="Previous slide">
              <Arrow direction="left" />
            </button>
            <button type="button" onClick={() => go(1)} disabled={edges.end} aria-label="Next slide">
              <Arrow direction="right" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
