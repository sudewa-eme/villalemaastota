# Villa Lé Maas Tota — website

Editorial, image-led website for **Villa Lé Maas Tota by Vella**, a private
highland villa on a 30-acre estate in Koslanda, Sri Lanka.

Built with **Next.js 16 (App Router) · React 19 · TypeScript · CSS Modules**.
No UI or animation libraries: motion is a small IntersectionObserver reveal
system plus CSS transitions, and it respects `prefers-reduced-motion`.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm start            # serve the production build
npm run lint         # ESLint (next/core-web-vitals + TypeScript)
npm run typecheck    # tsc --noEmit
npm run placeholders # regenerate illustrative placeholder images
```

Copy `.env.example` to `.env.local` to configure the site URL and an optional
booking-engine deep link.

## Homepage structure (10 sections)

1. **Hero:** full-bleed photograph, oversized serif title, booking call to action
2. **Introduction:** offset editorial heading, estate facts, layered imagery
3. **Book Direct:** arrival/departure dates and a guest selector, with validation
4. **Accommodation:** amenity row, swipeable image rail, room categories
5. **Offers & Occasions:** full-bleed band linking to current offers and private-occasion enquiries
6. **Dining:** three-panel composition around a featured image
7. **Experiences:** full-bleed backdrop with a floating-card carousel (dots, arrows, swipe, keyboard)
8. **FAQ:** accessible accordion
9. **Gallery:** art-directed asymmetric grid with a full-screen lightbox
10. **Footer:** official logo, contact, navigation and legal links

The header (centred emblem, "Menu" with a full-screen overlay, and "Book now")
supports every section; it isn't a section itself.

## Where things live

```
src/
  app/                 layout (fonts, metadata), homepage, /privacy, global tokens
  content/
    site.ts            property facts, contact, links, policies  ← edit here
    home.ts            all homepage copy                         ← edit here
    media.ts           image manifest (paths, alt text, focal points)
  components/
    brand/             official logo (inline SVG, recolourable)
    layout/            header and footer
    sections/          the homepage sections
    ui/                Photo, Rail (carousel), labels, icons, reveal observer
  lib/media.server.ts  resolves real photos vs placeholders at build time
public/
  brand/lmt-logo.svg   official logo as supplied
  images/property/     drop real photographs here (see README inside)
  images/placeholders/ generated illustrative plates
```

## Photography

The design is built around eight property photographs (pool at sunset, aerial,
estate overhead, dinner deck, fire pit, pool deck, misty lawn, living room).
Add each one to `public/images/property/` with the file name listed in that
folder's README and rebuild. No code changes are needed. Until a file is
present, an illustrative placeholder is shown. Its alt text and lightbox caption
say it's illustrative, so it's never presented as a real photograph of the
property.

The four nearby attractions (Diyaluma, Bambarakanda, Lipton's Seat, Adisham)
use illustrative plates and are labelled as such. Add real or licensed images
in `src/content/media.ts` if you have them.

## Booking

There's no verified booking-engine API, so **Book Direct** works in two modes:

- **Default:** after validation it opens a pre-filled reservation request email
  to the reservations address. It clearly states that nothing is reserved until
  the team confirms.
- **Booking engine:** set `NEXT_PUBLIC_BOOKING_URL_TEMPLATE` (tokens:
  `{checkin}`, `{checkout}`, `{adults}`, `{children}`). The form then deep-links
  into the engine with the guest's selection.

A link to the existing reservations page is always shown.

## Content sources

Facts come from the property's published materials (lemaastota.com pages and
its official listings): the estate size, the planter's-bungalow history, the
five rooms and published room categories, dining (Sri Lankan and international,
à la carte, garden and in-room, 6:30 am–10:30 pm), check-in and check-out
times, FAQ policies, distances and the nearby attractions. Visual descriptions
come from the supplied photography. The site doesn't invent prices, discounts,
awards, reviews or social accounts. `site.social` is empty until verified
profiles are added.

**Please confirm before launch:** the phone number and email in
`src/content/site.ts` were taken from the current lemaastota.com listings and
may need updating for the "by Vella" brand.
