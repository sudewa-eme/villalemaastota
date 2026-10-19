import { offers } from "@/content/home";
import { site } from "@/content/site";
import type { ResolvedMedia } from "@/lib/media.server";
import { SmartImage } from "@/components/ui/SmartImage";
import { CreditTag } from "@/components/ui/CreditTag";
import styles from "./Offers.module.css";

export function Offers({ image }: { image: ResolvedMedia }) {
  const subject = encodeURIComponent("A private dinner for two");
  const body = encodeURIComponent(
    "Hello,\n\nWe'd like to plan a private dinner during our stay at Villa Lé Maas Tota.\n\nDates:\nOccasion:\nNumber of guests:\n",
  );
  return (
    <section id="offers" className={styles.section} data-field="charcoal" aria-labelledby="offers-title">
      <div className={styles.media}>
        <SmartImage image={image} fill sizes="100vw" quality={80} className={styles.image} />
        <CreditTag image={image} className={styles.credit} />
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.text}>
          <h2 id="offers-title" className={styles.title} data-reveal>
            {offers.title}
          </h2>
          <p className={styles.body} data-reveal style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>
            {offers.body}
          </p>
          <div className={styles.actions} data-reveal style={{ "--reveal-delay": "160ms" } as React.CSSProperties}>
            <a className="action action--paper" href={`mailto:${site.contact.email}?subject=${subject}&body=${body}`}>
              Plan a private dinner
            </a>
            <a className="plain-link" href={site.links.offers} target="_blank" rel="noopener noreferrer">
              Current offers<span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
