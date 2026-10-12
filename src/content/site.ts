/**
 * Property facts used across the site.
 *
 * Everything here was taken from the property's own published materials
 * (lemaastota.com and its official listings). Update this file — not the
 * components — when details change. Leave a field empty rather than guessing:
 * components hide anything that is not provided.
 */

export const site = {
  name: "Villa Lé Maas Tota",
  shortName: "Lé Maas Tota",
  operator: "by Vella",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.lemaastota.com",
  description:
    "A private highland villa on a 30-acre estate near Koslanda, Sri Lanka — a former planter's bungalow with an infinity pool above terraced paddy fields and forested mountains.",

  location: {
    region: "Koslanda, Uva Province",
    country: "Sri Lanka",
    address: ["Lé Maas Tota Estate", "Ranasinghagama, Nikapotha", "Koslanda 90165", "Sri Lanka"],
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Villa+L%C3%A9+Maas+Tota+Koslanda+Sri+Lanka",
    distances: [
      { from: "Ella town", value: "43.7 km" },
      { from: "Colombo (Kottawa expressway exit)", value: "168 km · approx. 4.5 hours by road" },
    ],
  },

  contact: {
    phoneDisplay: "+94 77 599 5999",
    phoneHref: "tel:+94775995999",
    email: "info@thesecrethotels.com",
  },

  /** Existing pages on the live property site. */
  links: {
    reservations: "https://www.lemaastota.com/booking/",
    offers: "https://www.lemaastota.com/special-offers/",
    accommodation: "https://www.lemaastota.com/accommodation/",
    dining: "https://www.lemaastota.com/dining/",
    thingsToDo: "https://www.lemaastota.com/experiences/things-to-do/",
    location: "https://www.lemaastota.com/location/",
  },

  /** Add verified social profile URLs here; the footer only renders what is set. */
  social: [] as { label: string; href: string }[],

  /** Optional booking-engine deep link (see .env.example). */
  bookingUrlTemplate: process.env.NEXT_PUBLIC_BOOKING_URL_TEMPLATE ?? "",

  policies: {
    checkIn: "14:00",
    checkOut: "11:00",
    maxRoomsPerBooking: 5,
  },
} as const;

export const navigation = [
  { label: "The Villa", href: "#villa" },
  { label: "Stay", href: "#stay" },
  { label: "Dining", href: "#dining" },
  { label: "Experiences", href: "#experiences" },
  { label: "Gallery", href: "#gallery" },
  { label: "Questions", href: "#faq" },
] as const;
