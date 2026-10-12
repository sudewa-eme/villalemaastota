"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { experiences } from "@/content/home";
import { site } from "@/content/site";
import type { ResolvedMedia } from "@/lib/media.server";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CircleLink } from "@/components/ui/CircleLink";
import { Arrow } from "@/components/ui/Arrow";
import styles from "./Experiences.module.css";

export type ExperienceSlide = {
  image: ResolvedMedia;
  kicker: string;
  title: string;
  text: string;
  distance?: string;
};

type Props = { background: ResolvedMedia; slides: ExperienceSlide[] };

export function Experiences({ background, slides }: Props) {
  const [index, setIndex] = useState(0);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const count = slides.length;
  const go = (i: number) => setIndex((i + count) % count);
  const current = slides[index];

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    }
  };

  return (
    <section id="experiences" className={`${styles.section} on-dark`} aria-labelledby="exp-title">
      <div className={styles.bg}>
        <Image
          src={background.src}
          alt=""
          fill
          sizes="100vw"
          quality={75}
          style={{ objectPosition: background.focus, objectFit: "cover" }}
        />
        <div className={styles.scrim} aria-hidden="true" />
      </div>

      <div className={`container ${styles.inner}`}>
        <SectionLabel align="center">{experiences.label}</SectionLabel>
        <h2 id="exp-title" className={styles.title} data-reveal>
          <em>{experiences.title[0]}</em> {experiences.title[1]}
        </h2>

        <div
          className={styles.stage}
          role="region"
          aria-roledescription="carousel"
          aria-label="Experiences"
          onKeyDown={onKeyDown}
          onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
          onTouchEnd={(e) => {
            if (!touch.current) return;
            const dx = e.changedTouches[0].clientX - touch.current.x;
            const dy = e.changedTouches[0].clientY - touch.current.y;
            if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(index + (dx < 0 ? 1 : -1));
            touch.current = null;
          }}
        >
          <button type="button" className={`${styles.nav} ${styles.prev}`} onClick={() => go(index - 1)} aria-label="Previous experience">
            <Arrow direction="left" />
          </button>

          <div className={styles.cards}>
            {slides.map((s, i) => (
              <article
                key={s.title}
                className={`${styles.card} ${i === index ? styles.active : ""}`}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}: ${s.title}`}
                aria-hidden={i !== index}
                inert={i !== index}
              >
                <div className={styles.cardMedia}>
                  <Image
                    src={s.image.src}
                    alt={s.image.alt}
                    fill
                    sizes="(min-width: 768px) 400px, 80vw"
                    quality={75}
                    loading="lazy"
                    style={{ objectPosition: s.image.focus, objectFit: "cover" }}
                  />
                  {s.image.illustrative && <span className={styles.badge}>Illustrative</span>}
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.kicker}>
                    {s.kicker}
                    {s.distance && <span> · {s.distance}</span>}
                  </p>
                  <h3 className={styles.cardTitle}>{s.title}</h3>
                  <p className={styles.cardText}>{s.text}</p>
                </div>
              </article>
            ))}
          </div>

          <button type="button" className={`${styles.nav} ${styles.next}`} onClick={() => go(index + 1)} aria-label="Next experience">
            <Arrow direction="right" />
          </button>
        </div>

        <ol className={styles.dots} aria-label="Choose an experience">
          {slides.map((s, i) => (
            <li key={s.title}>
              <button
                type="button"
                className={i === index ? styles.dotActive : undefined}
                aria-label={s.title}
                aria-current={i === index ? "true" : undefined}
                onClick={() => go(i)}
              >
                <span aria-hidden="true" />
              </button>
            </li>
          ))}
        </ol>

        <div className={styles.foot}>
          <p className={styles.body}>{experiences.body}</p>
          <CircleLink href={site.links.thingsToDo} external>
            Things to do
          </CircleLink>
        </div>
        <p className="visually-hidden" aria-live="polite">
          Showing {current.title}
        </p>
      </div>
    </section>
  );
}
