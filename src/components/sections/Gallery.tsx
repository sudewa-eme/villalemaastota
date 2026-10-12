"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { gallery } from "@/content/home";
import type { ResolvedMedia } from "@/lib/media.server";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Arrow } from "@/components/ui/Arrow";
import { useBodyLock } from "@/components/ui/useBodyLock";
import styles from "./Gallery.module.css";

export function Gallery({ images }: { images: ResolvedMedia[] }) {
  const [active, setActive] = useState<number | null>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touch = useRef<number | null>(null);
  const lastActive = useRef<number | null>(null);
  const isOpen = active !== null;
  const count = images.length;

  useBodyLock(isOpen);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback((d: number) => setActive((i) => (i === null ? i : (i + d + count) % count)), [count]);

  // Keyboard controls + focus trap; return focus to the opening thumbnail.
  useEffect(() => {
    if (!isOpen) {
      if (lastActive.current !== null) triggers.current[lastActive.current]?.focus();
      return;
    }
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab") {
        const nodes = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>("button") ?? []);
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, close, step]);

  useEffect(() => {
    if (active !== null) lastActive.current = active;
  }, [active]);

  const current = active !== null ? images[active] : null;

  return (
    <section id="gallery" className={styles.section} aria-labelledby="gallery-title">
      <div className={`container ${styles.head}`}>
        <SectionLabel>{gallery.label}</SectionLabel>
        <h2 id="gallery-title" className={`h2 ${styles.title}`} data-reveal>
          <em className="line">{gallery.title[0]}</em>
          <span className={`line ${styles.indent}`}>{gallery.title[1]}</span>
        </h2>
      </div>

      <ul className={`container ${styles.grid}`}>
        {images.map((img, i) => (
          <li key={img.id} className={styles[`g${i + 1}`]} data-reveal="image">
            <button
              type="button"
              ref={(el) => {
                triggers.current[i] = el;
              }}
              className={`media media--hover ${styles.tile}`}
              onClick={() => setActive(i)}
              aria-label={`Open image: ${img.caption}`}
              aria-haspopup="dialog"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                quality={72}
                style={{ objectPosition: img.focus }}
              />
              <span className={styles.tileCaption} aria-hidden="true">
                {img.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {current && active !== null && (
        <div
          ref={dialogRef}
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touch.current === null) return;
            const dx = e.changedTouches[0].clientX - touch.current;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            touch.current = null;
          }}
        >
          <div className={styles.lbTop}>
            <p className={styles.lbCount}>
              {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </p>
            <button ref={closeRef} type="button" className={styles.lbClose} onClick={close}>
              Close <span aria-hidden="true">×</span>
            </button>
          </div>

          <div className={styles.lbStage} onClick={(e) => e.target === e.currentTarget && close()}>
            <figure key={current.id} className={styles.lbFigure}>
              <div className={styles.lbImage}>
                <Image src={current.src} alt={current.alt} fill sizes="100vw" quality={85} style={{ objectFit: "contain" }} />
              </div>
              <figcaption className={styles.lbCaption}>
                {current.caption}
                {current.illustrative && <span className={styles.lbNote}> — illustrative placeholder, photograph to follow</span>}
              </figcaption>
            </figure>
          </div>

          <button type="button" className={`${styles.lbNav} ${styles.lbPrev}`} onClick={() => step(-1)} aria-label="Previous image">
            <Arrow direction="left" />
          </button>
          <button type="button" className={`${styles.lbNav} ${styles.lbNext}`} onClick={() => step(1)} aria-label="Next image">
            <Arrow direction="right" />
          </button>
        </div>
      )}
    </section>
  );
}
