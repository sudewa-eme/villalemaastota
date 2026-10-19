import { stay } from "@/content/home";
import type { ResolvedMedia } from "@/lib/media.server";
import { Photo } from "@/components/ui/Photo";
import { Arrow } from "@/components/ui/Arrow";
import styles from "./Stay.module.css";

export function Stay({ photo }: { photo: ResolvedMedia }) {
  let row = 0;
  return (
    <section id="stay" className={styles.section} data-field="white" aria-labelledby="stay-title">
      <div className={`container ${styles.grid}`}>
        <h2 id="stay-title" className={styles.title} data-reveal>
          {stay.title}
        </h2>

        <div className={styles.aside}>
          <p className={styles.body} data-reveal>
            {stay.body}
          </p>
          <figure className={styles.figure}>
            <Photo image={photo} sizes="(min-width: 1024px) 26vw, 60vw" hover className={styles.photo} />
            <figcaption className={styles.caption}>{photo.caption}</figcaption>
          </figure>
        </div>

        <p className={styles.tableName} data-reveal>
          Rooms and the house
        </p>

        <div className={styles.table} role="table" aria-label="Rooms, house details and distances">
          {stay.groups.map((group, g) => (
            <div key={g} role="rowgroup" className={styles.group}>
              {group.map((r) => {
                const delay = { "--reveal-delay": `${(row++ % 4) * 70}ms` } as React.CSSProperties;
                const cells = (
                  <>
                    <span role="cell" className={styles.kind}>
                      {r.kind}
                    </span>
                    <span role="cell" className={styles.name}>
                      {r.name}
                    </span>
                    <span role="cell" className={styles.value}>
                      {r.value}
                      {r.href && <Arrow direction={r.href.startsWith("#") ? "right" : "up-right"} className={styles.arrow} />}
                    </span>
                  </>
                );
                return r.href ? (
                  <a
                    key={r.name}
                    role="row"
                    href={r.href}
                    className={`${styles.row} ${styles.rowLink}`}
                    data-reveal
                    style={delay}
                    {...(r.href.startsWith("#") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    {cells}
                    {!r.href.startsWith("#") && <span className="visually-hidden"> (opens in a new tab)</span>}
                  </a>
                ) : (
                  <div key={r.name} role="row" className={styles.row} data-reveal style={delay}>
                    {cells}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
