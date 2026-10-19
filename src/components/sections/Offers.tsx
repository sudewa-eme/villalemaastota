import { offers } from "@/content/home";
import { site } from "@/content/site";
import type { ResolvedMedia } from "@/lib/media.server";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CircleLink } from "@/components/ui/CircleLink";
import { SmartImage } from "@/components/ui/SmartImage";
import { CreditTag } from "@/components/ui/CreditTag";
import styles from "./Offers.module.css";

export function Offers({ image }: { image: ResolvedMedia }) {
  const subject = encodeURIComponent("Special occasion enquiry");
  return (
    <section id="offers" className={`${styles.section} on-dark`} aria-labelledby="offers-title">
      <div className={styles.media} data-reveal="image">
        <SmartImage image={image} fill sizes="100vw" quality={78} />
        <div className={styles.scrim} aria-hidden="true" />
        <CreditTag image={image} />
      </div>

      <div className={`container ${styles.inner}`}>
        <SectionLabel>{offers.label}</SectionLabel>
        <h2 id="offers-title" className={styles.title} data-reveal>
          <em className="line">{offers.title[0]}</em>
          <span className={`line ${styles.indent}`}>{offers.title[1]}</span>
        </h2>

        <div className={styles.foot}>
          <p className={styles.body} data-reveal>
            {offers.body}
          </p>
          <div className={styles.actions} data-reveal>
            <CircleLink href={`mailto:${site.contact.email}?subject=${subject}`}>Plan an occasion</CircleLink>
            <CircleLink href={site.links.offers} external>
              Current offers
            </CircleLink>
          </div>
        </div>
      </div>
    </section>
  );
}
