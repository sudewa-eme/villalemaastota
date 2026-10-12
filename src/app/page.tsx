import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { BookDirect } from "@/components/sections/BookDirect";
import { Stay } from "@/components/sections/Stay";
import { Offers } from "@/components/sections/Offers";
import { Dining } from "@/components/sections/Dining";
import { Experiences } from "@/components/sections/Experiences";
import { Faq } from "@/components/sections/Faq";
import { Gallery } from "@/components/sections/Gallery";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { dining, experiences, gallery, hero, intro, offers, stay } from "@/content/home";
import { site } from "@/content/site";
import { resolveMedia } from "@/lib/media.server";

const heroImage = resolveMedia(hero.image);

export const metadata: Metadata = {
  openGraph: { images: [{ url: heroImage.src, alt: heroImage.alt }] },
  twitter: { images: [heroImage.src] },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: site.contact.phoneDisplay,
  email: site.contact.email,
  image: new URL(heroImage.src, site.url).toString(),
  checkinTime: site.policies.checkIn,
  checkoutTime: site.policies.checkOut,
  petsAllowed: false,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Lé Maas Tota Estate, Ranasinghagama, Nikapotha",
    addressLocality: "Koslanda",
    addressRegion: "Uva Province",
    postalCode: "90165",
    addressCountry: "LK",
  },
  amenityFeature: ["Infinity pool", "Outdoor fire pit", "Living room", "Car park"].map((name) => ({
    "@type": "LocationFeatureSpecification",
    name,
    value: true,
  })),
};

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        {/* 01 */}
        <Hero image={heroImage} />
        {/* 02 */}
        <Intro primary={resolveMedia(intro.imagePrimary)} secondary={resolveMedia(intro.imageSecondary)} />
        {/* 03 */}
        <BookDirect />
        {/* 04 */}
        <Stay slides={stay.slides.map((s) => ({ ...s, image: resolveMedia(s.image) }))} />
        {/* 05 */}
        <Offers image={resolveMedia(offers.image)} />
        {/* 06 */}
        <Dining image={resolveMedia(dining.image)} />
        {/* 07 */}
        <Experiences
          background={resolveMedia(experiences.background)}
          slides={experiences.items.map((e) => ({ ...e, image: resolveMedia(e.image) }))}
        />
        {/* 08 */}
        <Faq />
        {/* 09 */}
        <Gallery images={gallery.items.map(resolveMedia)} />
      </main>
      {/* 10 */}
      <SiteFooter />
      <RevealObserver />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
