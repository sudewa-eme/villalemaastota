import { intro } from "@/content/home";
import type { ResolvedMedia } from "@/lib/media.server";
import { Photo } from "@/components/ui/Photo";
import { SectionLabel } from "@/components/ui/SectionLabel";
import styles from "./Intro.module.css";

type IntroProps = { primary: ResolvedMedia; secondary: ResolvedMedia };

export function Intro({ primary, secondary }: IntroProps) {
  return (
    <section id="villa" className={styles.section} data-field="ivory" aria-labelledby="intro-title">
      <div className={`container ${styles.grid}`}>
        <SectionLabel className={styles.label}>{intro.label}</SectionLabel>

        <h2 id="intro-title" className={`h2 ${styles.title}`} data-reveal>
          <em className={styles.lineA}>{intro.title[0]}</em>{" "}
          <span className={styles.lineB}>{intro.title[1]}</span>
        </h2>

        <div className={`prose ${styles.body}`} data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
          {intro.body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </div>

      <div className="container">
        <dl className={styles.facts}>
          {intro.facts.map((f, i) => (
            <div key={f.label} className={styles.fact} data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}>
              <dt className="visually-hidden">{f.label}</dt>
              <dd>
                <span className={styles.factValue}>{f.value}</span>
                <span className={styles.factUnit}>{f.unit}</span>
                <span className={styles.factLabel}>{f.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className={`container ${styles.images}`}>
        <figure className={styles.primary}>
          <Photo image={primary} sizes="(min-width: 1520px) 1376px, 92vw" hover className={styles.primaryMedia} />
        </figure>
        <figure className={styles.secondary}>
          <Photo image={secondary} sizes="(min-width: 768px) 30vw, 60vw" hover className={styles.secondaryMedia} />
          <figcaption className={styles.caption}>{secondary.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
