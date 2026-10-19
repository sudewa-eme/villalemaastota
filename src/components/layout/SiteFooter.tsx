import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { navigation, site } from "@/content/site";
import { stockCredits } from "@/lib/media.server";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const credits = stockCredits();
  return (
    <footer id="contact" className={styles.footer} aria-labelledby="footer-title">
      <h2 id="footer-title" className="visually-hidden">
        Contact and information
      </h2>

      <div className={`container ${styles.columns}`}>
        <div className={styles.col}>
          <Logo variant="emblem" className={styles.emblem} />
          <address className={styles.list}>
            {site.location.address.map((line, i) => (
              <span key={line} className={i === 0 ? styles.first : undefined}>
                {line}
              </span>
            ))}
            <a href={site.location.mapUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
              Open in Maps<span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </address>
        </div>

        <nav className={styles.col} aria-label="Footer">
          <ul className={styles.list}>
            <li className={styles.first}>The villa</li>
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={styles.link}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.col}>
          <ul className={styles.list}>
            <li className={styles.first}>Reservations</li>
            <li>
              <a href={site.contact.phoneHref} className={styles.link}>
                {site.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.contact.email}`} className={styles.link}>
                {site.contact.email}
              </a>
            </li>
            <li>
              <a href={site.links.offers} target="_blank" rel="noopener noreferrer" className={styles.link}>
                Current offers<span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.col}>
          <ul className={styles.list}>
            <li className={styles.first}>Your stay</li>
            <li>Check-in from {site.policies.checkIn}</li>
            <li>Check-out by {site.policies.checkOut}</li>
            <li>Dining 6:30 am to 10:30 pm</li>
            <li>
              <a href="#book" className={`action action--paper ${styles.book}`}>
                Book your stay
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <svg className={styles.wordmark} viewBox="0 0 1000 178" role="img" aria-label={site.name}>
          <text x="0" y="146" textLength="1000" lengthAdjust="spacing">
            Lé Maas Tota
          </text>
        </svg>

        {credits.length > 0 && (
          <p className={styles.credits}>
            Illustrative photography until the villa&apos;s own is published:{" "}
            {credits.map((c, i) => (
              <span key={c.page}>
                <a href={c.page} target="_blank" rel="noopener noreferrer">
                  {c.photographer ?? c.caption}
                </a>{" "}
                / {c.source}
                {i < credits.length - 1 ? ", " : "."}
              </span>
            ))}
          </p>
        )}

        <div className={styles.legal}>
          <p>
            © {year} {site.name} {site.operator}
          </p>
          <p className={styles.legalLinks}>
            <Link href="/privacy">Privacy</Link>
            <a href="#top">Back to top</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
