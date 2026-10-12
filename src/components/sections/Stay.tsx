import { stay } from "@/content/home";
import type { ResolvedMedia } from "@/lib/media.server";
import { Photo } from "@/components/ui/Photo";
import { Rail } from "@/components/ui/Rail";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CircleLink } from "@/components/ui/CircleLink";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Arrow } from "@/components/ui/Arrow";
import { site } from "@/content/site";
import styles from "./Stay.module.css";

const AMENITY_ICONS: IconName[] = ["leaf", "waves", "sofa", "flame"];

type StayProps = { slides: { image: ResolvedMedia; title: string; text: string }[] };

export function Stay({ slides }: StayProps) {
  return (
    <section id="stay" className={styles.section} aria-labelledby="stay-title">
      <div className={`container ${styles.head}`}>
        <SectionLabel align="center">{stay.label}</SectionLabel>
        <h2 id="stay-title" className={`h2 ${styles.title}`} data-reveal>
          Rooms that open <em>onto the garden</em>
        </h2>
        <ul className={styles.amenities} aria-label="At the villa">
          {stay.amenities.map((a, i) => (
            <li key={a} data-reveal style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}>
              <span className={styles.amenityIcon}>
                <Icon name={AMENITY_ICONS[i % AMENITY_ICONS.length]} />
              </span>
              {a}
            </li>
          ))}
        </ul>
      </div>

      <Rail label="Spaces at the villa" className={styles.rail} slideClassName={styles.slide}>
        {slides.map((s, i) => (
          <figure key={s.title + i} className={styles.figure}>
            <Photo
              image={s.image}
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 60vw, 84vw"
              hover
              reveal={false}
              className={styles.slideMedia}
            />
            <figcaption className={styles.slideCaption}>
              <span className={styles.slideTitle}>{s.title}</span>
              <span className={styles.slideText}>{s.text}</span>
            </figcaption>
          </figure>
        ))}
      </Rail>

      <div className={`container ${styles.feature}`}>
        <div className={styles.featureHead}>
          <SectionLabel>Room categories</SectionLabel>
          <h3 className={`h2 ${styles.featureTitle}`} data-reveal>
            <em className="line">{stay.feature[0]}</em>
            <span className={`line ${styles.indent}`}>{stay.feature[1]}</span>
          </h3>
        </div>
        <div className={styles.featureBody}>
          <p className="prose" data-reveal>
            {stay.body}
          </p>
          <ul className={styles.rooms}>
            {stay.rooms.map((r) => (
              <li key={r.name} data-reveal>
                <a href={r.href} target="_blank" rel="noopener noreferrer" className={styles.room}>
                  <span className={styles.roomName}>{r.name}</span>
                  <span className={styles.roomNote}>{r.note}</span>
                  <Arrow direction="up-right" className={styles.roomArrow} />
                  <span className="visually-hidden"> (room details, opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
          <div data-reveal>
            <CircleLink href="#book">Reserve your stay</CircleLink>
          </div>
          <p className={styles.smallNote} data-reveal>
            Full room details and rates on <a href={site.links.accommodation} target="_blank" rel="noopener noreferrer">our accommodation pages</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
