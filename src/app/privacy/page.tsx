import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { site } from "@/content/site";
import styles from "./privacy.module.css";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How the ${site.name} website handles your information.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main id="main" className={styles.page}>
      <div className={styles.inner}>
        <Link href="/" className={styles.home} aria-label={`${site.name} home`}>
          <Logo variant="emblem" className={styles.logo} title="" />
        </Link>
        <p className="eyebrow">
          <span className="eyebrow__mark" aria-hidden="true" />
          Privacy
          <span className="eyebrow__mark" aria-hidden="true" />
        </p>
        <h1 className="h2">This website &amp; your information</h1>
        <div className="prose">
          <p>
            This website does not use cookies for tracking or advertising, and it does not store the details you enter
            in the availability form. When you request availability, your dates and party size are placed into an email
            that opens in your own email application — nothing is sent until you choose to send it.
          </p>
          <p>
            Messages you send to our reservations team are used only to respond to your enquiry and to manage your stay.
            To ask about, correct or delete information you have shared with us, contact{" "}
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> or call{" "}
            <a href={site.contact.phoneHref}>{site.contact.phoneDisplay}</a>.
          </p>
          <p>
            Links to our reservations, offers and attraction pages, and to map services, open third-party sites with their
            own privacy policies.
          </p>
        </div>
        <Link href="/" className="text-link">
          Return to the villa
        </Link>
      </div>
    </main>
  );
}
