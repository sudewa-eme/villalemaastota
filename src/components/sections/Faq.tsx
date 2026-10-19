import { faq } from "@/content/home";
import { site } from "@/content/site";
import type { ResolvedMedia } from "@/lib/media.server";
import { Photo } from "@/components/ui/Photo";
import styles from "./Faq.module.css";

type Props = { tall: ResolvedMedia; square: ResolvedMedia };

/** Native <details> accordion: works without script, one open at a time. */
export function Faq({ tall, square }: Props) {
  return (
    <section id="faq" className={styles.section} data-field="ivory" aria-labelledby="faq-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.text}>
          <h2 id="faq-title" className={styles.title} data-reveal>
            {faq.title}
          </h2>

          <dl className={styles.facts}>
            {faq.facts.map((f, i) => (
              <div key={f.label} data-reveal style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className={styles.list}>
            {faq.items.map((item, i) => (
              <details key={item.q} name="faq" className={styles.item} open={i === 0} data-reveal>
                <summary>
                  <span>{item.q}</span>
                  <span className={styles.chevron} aria-hidden="true" />
                </summary>
                <p className={styles.answer}>{item.a}</p>
              </details>
            ))}
          </div>

          <div className={styles.actions} data-reveal>
            <a className="action" href="#book">
              Request availability
            </a>
            <a className="plain-link" href={`mailto:${site.contact.email}`}>
              Email our team
            </a>
          </div>
        </div>

        <div className={styles.photos}>
          <Photo image={tall} sizes="(min-width: 1024px) 50vw, 100vw" className={styles.tall} />
          <Photo image={square} sizes="(min-width: 1024px) 18vw, 40vw" className={styles.square} />
        </div>
      </div>
    </section>
  );
}
