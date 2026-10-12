import { dining } from "@/content/home";
import { site } from "@/content/site";
import type { ResolvedMedia } from "@/lib/media.server";
import { Photo } from "@/components/ui/Photo";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CircleLink } from "@/components/ui/CircleLink";
import styles from "./Dining.module.css";

export function Dining({ image }: { image: ResolvedMedia }) {
  const [left, center, right] = dining.panels;
  return (
    <section id="dining" className={styles.section} aria-labelledby="dining-title">
      <div className={`container ${styles.head}`}>
        <SectionLabel align="center">{dining.label}</SectionLabel>
        <h2 id="dining-title" className={`h2 ${styles.title}`} data-reveal>
          <em className="line">{dining.title[0]}</em>
          <span className="line">{dining.title[1]}</span>
        </h2>
        <p className={styles.body} data-reveal>
          {dining.body}
        </p>
      </div>

      <div className={`container ${styles.panels}`}>
        <article className={`${styles.panel} ${styles.textPanel}`} data-reveal>
          <span className={styles.panelIndex} aria-hidden="true">01</span>
          <h3 className={styles.panelTitle}>{left.title}</h3>
          <p className={styles.panelText}>{left.text}</p>
        </article>

        <article className={styles.imagePanel} data-reveal style={{ "--reveal-delay": "100ms" } as React.CSSProperties}>
          <Photo image={image} sizes="(min-width: 1024px) 46vw, 92vw" hover reveal={false} className={styles.imageMedia} />
          <div className={styles.overlay}>
            <span className={styles.overlayMark} aria-hidden="true" />
            <h3 className={styles.panelTitle}>{center.title}</h3>
            <p className={styles.panelText}>{center.text}</p>
          </div>
        </article>

        <article className={`${styles.panel} ${styles.textPanel}`} data-reveal style={{ "--reveal-delay": "200ms" } as React.CSSProperties}>
          <span className={styles.panelIndex} aria-hidden="true">03</span>
          <h3 className={styles.panelTitle}>{right.title}</h3>
          <p className={styles.panelText}>{right.text}</p>
        </article>
      </div>

      <div className={`container ${styles.foot}`} data-reveal>
        <p className={styles.hours}>{dining.hours}</p>
        <CircleLink href={site.links.dining} external>
          Dining at the villa
        </CircleLink>
      </div>
    </section>
  );
}
