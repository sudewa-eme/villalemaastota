import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { navigation, site } from "@/content/site";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className={`${styles.footer} on-dark`} aria-labelledby="footer-title">
      <div className={`container ${styles.top}`}>
        <h2 id="footer-title" className={styles.statement}>
          Come for the quiet. <em>Stay for the mist.</em>
        </h2>
        <a href="#book" className="btn btn--ivory">
          Book your stay
        </a>
      </div>

      <div className={`container ${styles.main}`}>
        <nav className={styles.col} aria-label="Footer">
          <p className="eyebrow">
            <span className="eyebrow__mark" aria-hidden="true" />
            Explore
            <span className="eyebrow__mark" aria-hidden="true" />
          </p>
          <ul className={styles.links}>
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
            <li>
              <a href={site.links.offers} target="_blank" rel="noopener noreferrer">
                Offers<span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.brand}>
          <Logo className={styles.logo} />
          <p className={styles.tagline}>
            A private highland villa on a thirty-acre estate in Koslanda, Sri Lanka.
          </p>
        </div>

        <div className={`${styles.col} ${styles.colEnd}`}>
          <p className="eyebrow">
            <span className="eyebrow__mark" aria-hidden="true" />
            Contact
            <span className="eyebrow__mark" aria-hidden="true" />
          </p>
          <address className={styles.address}>
            <a href={site.contact.phoneHref}>{site.contact.phoneDisplay}</a>
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            <span className={styles.postal}>
              {site.location.address.map((line) => (
                <span key={line} className="line">
                  {line}
                </span>
              ))}
            </span>
            <a href={site.location.mapUrl} target="_blank" rel="noopener noreferrer" className={styles.map}>
              Open in Maps<span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </address>
        </div>
      </div>

      {site.social.length > 0 && (
        <ul className={`container ${styles.social}`} aria-label="Social media">
          {site.social.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      )}

      <div className={`container ${styles.bottom}`}>
        <p>
          © {year} {site.name} {site.operator}. All rights reserved.
        </p>
        <ul className={styles.legal}>
          <li>
            <Link href="/privacy">Privacy</Link>
          </li>
          <li>
            <a href="#top">Back to top ↑</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
