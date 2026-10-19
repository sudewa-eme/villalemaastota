"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gallery } from "@/content/home";
import type { ResolvedMedia } from "@/lib/media.server";
import { Arrow } from "@/components/ui/Arrow";
import { useBodyLock } from "@/components/ui/useBodyLock";
import { SmartImage } from "@/components/ui/SmartImage";
import { CreditTag } from "@/components/ui/CreditTag";
import styles from "./Gallery.module.css";

type Props = { images: ResolvedMedia[]; curtain: ResolvedMedia[] };

/**
 * Three full-screen photographs that slide over one another as the page
 * scrolls (plain sticky positioning, no scroll hijacking), then a lightbox
 * with every photograph.
 */
export function Gallery({ images, curtain }: Props) {
  const [active, setActive] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touch = useRef<number | null>(null);
  const isOpen = active !== null;
  const count = images.length;

  useBodyLock(isOpen);

  const open = (index: number, e: React.MouseEvent<HTMLElement>) => {
    opener.current = e.currentTarget;
    setActive(index);
  };
  const close = useCallback(() => setActive(null), []);
  const step = useCallback((d: number) => setActive((i) => (i === null ? i : (i + d + count) % count)), [count]);

  // Keyboard controls + focus trap; focus returns to whatever opened it.
  useEffect(() => {
    if (!isOpen) {
      opener.current?.focus();
      return;
    }
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab") {
        const nodes = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>("button, a[href]") ?? []);
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

  const current = active !== null ? images[active] : null;
  const indexOf = (img: ResolvedMedia) => Math.max(0, images.findIndex((x) => x.id === img.id));

  return (
    <section id="gallery" className={styles.section} data-field="charcoal" aria-labelledby="gallery-title">
      <div className={`container ${styles.head}`}>
        <h2 id="gallery-title" className={styles.title} data-reveal>
          {gallery.title}
        </h2>
        <div className={styles.headAside}>
          <p className={styles.body} data-reveal>
            {gallery.body}
          </p>
          <button
            type="button"
            className="action action--paper"
            onClick={(e) => open(0, e)}
            aria-haspopup="dialog"
            data-reveal
          >
            Open the gallery · {count} photographs
          </button>
        </div>
      </div>

      <div className={styles.curtain}>
        {curtain.map((img, i) => (
          <figure key={img.id} className={styles.frame} style={{ zIndex: i + 1 }}>
            <button
              type="button"
              className={styles.frameButton}
              onClick={(e) => open(indexOf(img), e)}
              aria-haspopup="dialog"
              aria-label={`Open in the gallery: ${img.caption}`}
            >
              <SmartImage image={img} fill sizes="100vw" quality={78} className={styles.frameImage} />
            </button>
            <figcaption className={`container ${styles.caption}`}>
              <span>{img.caption}</span>
              <CreditTag image={img} className={styles.frameCredit} />
            </figcaption>
          </figure>
        ))}
      </div>

      {current && active !== null && (
        <div
          ref={dialogRef}
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Gallery"
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
              {active + 1} of {count}
            </p>
            <button ref={closeRef} type="button" className={styles.lbClose} onClick={close}>
              Close <span aria-hidden="true">×</span>
            </button>
          </div>

          <div className={styles.lbStage} onClick={(e) => e.target === e.currentTarget && close()}>
            <figure key={current.id} className={styles.lbFigure}>
              <div className={styles.lbImage}>
                <SmartImage image={current} fill sizes="100vw" quality={85} style={{ objectFit: "contain" }} />
              </div>
              <figcaption className={styles.lbCaption}>
                {current.caption}
                {current.credit ? (
                  <span className={styles.lbNote}>
                    {" "}
                    · illustrative photo{current.credit.photographer ? ` by ${current.credit.photographer}` : ""} on{" "}
                    <a href={current.credit.page} target="_blank" rel="noopener noreferrer">
                      {current.credit.source}
                    </a>
                  </span>
                ) : (
                  current.illustrative && <span className={styles.lbNote}> · illustrative, photograph to follow</span>
                )}
              </figcaption>
            </figure>
          </div>

          <button type="button" className={`${styles.lbNav} ${styles.lbPrev}`} onClick={() => step(-1)} aria-label="Previous photograph">
            <Arrow direction="left" />
          </button>
          <button type="button" className={`${styles.lbNav} ${styles.lbNext}`} onClick={() => step(1)} aria-label="Next photograph">
            <Arrow direction="right" />
          </button>
        </div>
      )}
    </section>
  );
}
