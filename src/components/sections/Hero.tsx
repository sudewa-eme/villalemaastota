import { hero } from "@/content/home";
import type { ResolvedMedia } from "@/lib/media.server";
import { SmartImage } from "@/components/ui/SmartImage";
import { CreditTag } from "@/components/ui/CreditTag";
import styles from "./Hero.module.css";

export function Hero({ image }: { image: ResolvedMedia }) {
  return (
    <section id="top" className={`${styles.hero} on-dark`} data-field="charcoal" aria-labelledby="hero-title">
      <div className={styles.media}>
        <SmartImage image={image} fill priority sizes="100vw" quality={80} className={styles.image} />
        <div className={styles.scrim} aria-hidden="true" />
      </div>

      <div className={styles.inner}>
        <p className={styles.eyebrow}>{hero.eyebrow}</p>
        <h1 id="hero-title" className={styles.title}>
          <span className={styles.lineA}>{hero.title[0]}</span>{" "}
          <em className={styles.lineB}>{hero.title[1]}</em>
        </h1>

        <div className={styles.foot}>
          <p className={styles.lede}>{hero.lede}</p>
          <div className={styles.ctas}>
            <a href="#book" className="btn btn--ivory">
              Check availability
            </a>
            <a href="#villa" className={`btn btn--light ${styles.secondary}`}>
              Discover the villa
            </a>
          </div>
        </div>

        <CreditTag image={image} className={styles.credit} />

        <a href="#villa" className={styles.scroll}>
          <span className="visually-hidden">Scroll to the introduction</span>
          <span className={styles.scrollLine} aria-hidden="true" />
          <span aria-hidden="true">Scroll</span>
        </a>
      </div>
    </section>
  );
}
