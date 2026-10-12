"use client";

import { useId, useState } from "react";
import { faq } from "@/content/home";
import { site } from "@/content/site";
import { SectionLabel } from "@/components/ui/SectionLabel";
import styles from "./Faq.module.css";

export function Faq() {
  const id = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className={styles.section} aria-labelledby={`${id}-title`}>
      <div className={`container ${styles.grid}`}>
        <header className={styles.head}>
          <SectionLabel>{faq.label}</SectionLabel>
          <h2 id={`${id}-title`} className={`h2 ${styles.title}`} data-reveal>
            Before you <em>arrive</em>
          </h2>
          <p className={styles.contact} data-reveal>
            Can&apos;t find your answer? Call{" "}
            <a href={site.contact.phoneHref}>{site.contact.phoneDisplay}</a> or email{" "}
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
          </p>
        </header>

        <ul className={styles.list}>
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className={`${styles.item} ${isOpen ? styles.isOpen : ""}`} data-reveal>
                <h3 className={styles.q}>
                  <button
                    type="button"
                    id={`${id}-q${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`${id}-a${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{item.q}</span>
                    <span className={styles.icon} aria-hidden="true" />
                  </button>
                </h3>
                <div
                  id={`${id}-a${i}`}
                  role="region"
                  aria-labelledby={`${id}-q${i}`}
                  className={styles.a}
                  inert={!isOpen}
                >
                  <div className={styles.aInner}>
                    <p>{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
