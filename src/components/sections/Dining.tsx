"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { dining } from "@/content/home";
import { site } from "@/content/site";
import type { ResolvedMedia } from "@/lib/media.server";
import { SmartImage } from "@/components/ui/SmartImage";
import { CreditTag } from "@/components/ui/CreditTag";
import { Arrow } from "@/components/ui/Arrow";
import styles from "./Dining.module.css";

type Card = { image: ResolvedMedia; name: string; text: string; tone: string };
type Props = { stage: ResolvedMedia; cards: Card[] };

const PIN_QUERY = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

/**
 * Showcase: a held photograph while the dining cards cross it, tied to scroll.
 * On phones and with reduced motion it is a plain stack (no pin, no travel).
 */
export function Dining({ stage, cards }: Props) {
  const wrapRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [active, setActive] = useState(0);
  const geo = useRef({ x0: 0, x1: 0, step: 0, first: 0 });

  // Track travel from fully off-screen right to the last card right-aligned.
  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const vw = window.innerWidth;
    const items = Array.from(track.children) as HTMLElement[];
    const w = items[0]?.offsetWidth ?? 0;
    const gap = items[1] ? items[1].offsetLeft - items[0].offsetLeft - w : 40;
    const total = track.scrollWidth;
    const margin = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--gutter")) || 64;
    geo.current = { x0: vw, x1: vw - margin - total, step: w + gap, first: w };
  }, []);

  const progress = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return 0;
    const r = el.getBoundingClientRect();
    const span = el.offsetHeight - window.innerHeight;
    return span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(PIN_QUERY);
    const sync = () => setPinned(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const head = headRef.current;
    const photo = photoRef.current;
    if (!pinned || !track || !head || !photo) {
      if (track) track.style.transform = "";
      if (head) head.style.cssText = "";
      if (photo) photo.style.transform = "";
      return;
    }
    measure();
    let raf = 0;
    const frame = () => {
      raf = 0;
      const p = progress();
      const { x0, x1, step, first } = geo.current;
      const x = x0 + (x1 - x0) * p;
      track.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
      // The heading leaves before the first card can reach it.
      const h = Math.min(1, p / 0.1);
      head.style.opacity = String(1 - h);
      head.style.transform = `translate3d(${(-h * 12).toFixed(2)}vw,0,0)`;
      head.style.visibility = h >= 1 ? "hidden" : "visible";
      photo.style.transform = `scale(${(1.08 - 0.08 * p).toFixed(4)})`;
      const centre = window.innerWidth / 2 - x - first / 2;
      setActive(Math.max(0, Math.min(cards.length - 1, Math.round(centre / step))));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onResize = () => {
      measure();
      onScroll();
    };
    frame();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [pinned, measure, progress, cards.length]);

  // Buttons scroll the page to the point where card i sits in the centre.
  const goTo = (i: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const idx = Math.max(0, Math.min(cards.length - 1, i));
    if (!pinned) {
      (trackRef.current?.children[idx] as HTMLElement | undefined)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const { x0, x1, step, first } = geo.current;
    const target = window.innerWidth / 2 - first / 2 - idx * step;
    const p = Math.min(1, Math.max(0, (target - x0) / (x1 - x0)));
    const top = el.getBoundingClientRect().top + window.scrollY + p * (el.offsetHeight - window.innerHeight);
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section
      id="dining"
      ref={wrapRef}
      className={`${styles.wrap} ${pinned ? styles.isPinned : ""}`}
      data-field="charcoal"
      aria-labelledby="dining-title"
    >
      <div className={styles.stage}>
        <div className={styles.photo} ref={photoRef} aria-hidden="true">
          <SmartImage image={stage} alt="" fill sizes="100vw" quality={75} />
        </div>
        <CreditTag image={stage} className={styles.stageCredit} />

        <div className={`container ${styles.head}`} ref={headRef}>
          <h2 id="dining-title" className={styles.title} data-reveal>
            {dining.title}
          </h2>
          <p className={styles.body} data-reveal style={{ "--reveal-delay": "90ms" } as React.CSSProperties}>
            {dining.body}
          </p>
        </div>

        <ol className={styles.track} ref={trackRef} aria-label="Dining at the villa">
          {cards.map((c, i) => (
            <li
              key={c.name}
              className={`${styles.card} ${pinned && i === active ? styles.cardActive : ""}`}
              style={{ "--tone": c.tone } as React.CSSProperties}
              data-reveal={pinned ? undefined : ""}
            >
              <div className={styles.cardPhoto}>
                <SmartImage image={c.image} fill sizes="(min-width: 1024px) 50vw, 100vw" quality={75} />
                <CreditTag image={c.image} />
              </div>
              <div className={styles.panel}>
                <h3 className={styles.cardName}>{c.name}</h3>
                <p className={styles.cardText}>{c.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className={`container ${styles.controls}`}>
          <a className="plain-link" href={site.links.dining} target="_blank" rel="noopener noreferrer">
            Dining at the villa<span className="visually-hidden"> (opens in a new tab)</span>
          </a>
          <div className={styles.buttons}>
            <span className={styles.count} aria-live="polite">
              {cards[active].name}
            </span>
            <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous">
              <Arrow direction="left" />
            </button>
            <button type="button" onClick={() => goTo(active + 1)} disabled={active === cards.length - 1} aria-label="Next">
              <Arrow direction="right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
