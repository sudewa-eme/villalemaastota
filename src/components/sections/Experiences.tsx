"use client";

import { useEffect, useRef, useState } from "react";
import { experiences } from "@/content/home";
import { site } from "@/content/site";
import type { ResolvedMedia } from "@/lib/media.server";
import { Photo } from "@/components/ui/Photo";
import styles from "./Experiences.module.css";

export type StopView = {
  id: string;
  km: number;
  title: string;
  text: string;
  where: string;
  image: ResolvedMedia;
};

const { roadEnd } = experiences;
const pos = (km: number) => km / roadEnd.km;
const kmLabel = (s: { km: number; where: string }) =>
  s.km === 0 ? "On the villa's own grounds" : `${s.km} km from the villa, at ${s.where}`;

/**
 * The road out of Koslanda: every excursion set at its real distance from the
 * villa. The marker follows the stop being read; tapping a stop travels to it.
 * Stops are plain anchor links, so it all works without script.
 */
export function Experiences({ stops }: { stops: StopView[] }) {
  const [active, setActive] = useState(0);
  const rowsRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const rows = Array.from(rowsRef.current?.children ?? []) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(rows.indexOf(e.target as HTMLElement));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  const travel = (e: React.MouseEvent<HTMLAnchorElement>, i: number) => {
    const row = rowsRef.current?.children[i] as HTMLElement | undefined;
    if (!row) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    row.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    setActive(i);
    history.replaceState(null, "", `#${stops[i].id}`);
  };

  const current = stops[active];

  return (
    <section id="experiences" className={styles.section} data-field="sage" aria-labelledby="exp-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.head}>
          <h2 id="exp-title" className={styles.title} data-reveal>
            {experiences.title}
          </h2>
          <p className={styles.body} data-reveal style={{ "--reveal-delay": "90ms" } as React.CSSProperties}>
            {experiences.body}
          </p>
        </div>

        <nav className={styles.roadCol} aria-label="The road from the villa">
          <div className={styles.road} style={{ "--at": pos(current.km) } as React.CSSProperties}>
            <p className={styles.roadNow} aria-live="polite">
              <span className={styles.roadNowKm}>{current.km === 0 ? "0" : current.km}</span>
              <span className={styles.roadNowUnit}> km</span>
              <span className={styles.roadNowName}>{current.title}</span>
            </p>
            <div className={styles.line}>
              <span className={styles.lineFill} aria-hidden="true" />
              <span className={styles.marker} aria-hidden="true" />
              <ol className={styles.stops}>
                {stops.map((s, i) => (
                  <li key={s.id} style={{ "--p": pos(s.km) } as React.CSSProperties}>
                    <a
                      href={`#${s.id}`}
                      onClick={(e) => travel(e, i)}
                      className={i === active ? styles.stopActive : undefined}
                      aria-current={i === active ? "location" : undefined}
                    >
                      <span className={styles.dot} aria-hidden="true" />
                      <span className={styles.stopName}>{s.title}</span>
                      <span className={styles.stopKm}>{s.km === 0 ? "Villa" : `${s.km} km`}</span>
                    </a>
                  </li>
                ))}
                <li style={{ "--p": 1 } as React.CSSProperties} className={styles.end}>
                  <span>
                    <span className={styles.dot} aria-hidden="true" />
                    <span className={styles.stopName}>{roadEnd.label}</span>
                    <span className={styles.stopKm}>{roadEnd.km} km</span>
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </nav>

        <ol className={styles.rows} ref={rowsRef}>
          {stops.map((s, i) => (
            <li key={s.id} id={s.id} className={`${styles.row} ${styles[`shape${i % 3}`]}`}>
              <div className={styles.rowText}>
                <h3 className={styles.rowTitle} data-reveal>
                  {s.title}
                </h3>
                <p className={styles.rowKm} data-reveal>
                  {kmLabel(s)}
                </p>
                <p className={styles.rowBody} data-reveal style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>
                  {s.text}
                </p>
              </div>
              <figure className={styles.rowFigure}>
                <Photo image={s.image} sizes="(min-width: 1024px) 320px, 70vw" hover className={styles.rowPhoto} />
              </figure>
            </li>
          ))}
        </ol>

        <div className={styles.foot}>
          <a className="action" href={site.links.thingsToDo} target="_blank" rel="noopener noreferrer">
            More things to do<span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
