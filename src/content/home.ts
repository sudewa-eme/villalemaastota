/**
 * Homepage copy. Facts are drawn from the property's published materials and
 * from the property photography; nothing here should be added without a
 * source. See README → "Content sources".
 */
import type { MediaId } from "./media";
import { site } from "./site";

export const hero = {
  eyebrow: "Koslanda · Uva Highlands · Sri Lanka",
  title: ["Forest", "& Cloud"],
  lede: "Somewhere between the forest and the clouds — a private planter's bungalow on thirty acres of Sri Lanka's Uva highlands.",
  image: "infinityPoolSunset" as MediaId,
};

export const intro = {
  label: "The Villa",
  title: ["An old planter's bungalow,", "quietly made new."],
  body: [
    "Lé Maas Tota sits on a thirty-acre estate just west of Koslanda, where the road begins its climb into the highlands. At its heart is a colonial planter's bungalow — white walls, deep verandas and stone-terraced lawns — reimagined with calm, contemporary interiors.",
    "Below the house, an infinity pool hangs over terraced paddy fields. Beyond it, the forest rises in every direction and the mountain wears its mist like weather.",
  ],
  facts: [
    { value: "30", unit: "acres", label: "of private forest estate" },
    { value: "5", unit: "rooms", label: "book one, or the whole villa" },
    { value: "4.5", unit: "hours", label: "by road from Colombo" },
  ],
  imagePrimary: "villaAerial" as MediaId,
  imageSecondary: "mistyLawn" as MediaId,
};

export const booking = {
  label: "Book Direct",
  title: "Plan your stay",
  body: "Choose your dates and party size. Our reservations team confirms every request personally — up to five rooms, or the entire villa.",
};

export type TableRow = { kind: string; name: string; value: string; href?: string };

export const stay = {
  title: "Five rooms, one old bungalow",
  body: "Book a single room for two, a set of rooms for the family, or the whole house for yourselves. Every room opens to the garden and the hills.",
  photo: "livingRoom" as MediaId,
  /** Rows in groups: room categories, then the house, then the road. Facts only where published. */
  groups: [
    [
      { kind: "Room", name: "Standard Deluxe", value: "King bed, for two", href: "https://www.lemaastota.com/accommodation/standard-deluxe/" },
      { kind: "Room", name: "Junior Suite", value: "Up to two guests", href: "https://www.lemaastota.com/accommodation/junior-suite/" },
      { kind: "Room", name: "Family Suite", value: "Mountain and pool views", href: site.links.accommodation },
      { kind: "Room", name: "Studio Apartment", value: "Details on request", href: site.links.accommodation },
    ],
    [
      { kind: "The house", name: "Rooms per booking", value: `Up to ${site.policies.maxRoomsPerBooking}` },
      { kind: "The house", name: "Whole villa", value: "Ask our team", href: "#book" },
      { kind: "Arrive", name: "Check-in", value: `From ${site.policies.checkIn}` },
      { kind: "Leave", name: "Check-out", value: `By ${site.policies.checkOut}` },
    ],
    [
      { kind: "By road", name: "From Colombo (Kottawa exit)", value: "168 km" },
      { kind: "By road", name: "From Ella town", value: "43.7 km" },
    ],
  ] satisfies TableRow[][],
};

export const offers = {
  title: "Evenings worth keeping",
  body: "Anniversaries, proposals or a night to yourselves: a table can be set for two by the pool, under the stars. Seasonal offers for direct bookings are on our offers page.",
  image: "dinnerDeckDusk" as MediaId,
};

export type DiningCard = { image: MediaId; name: string; text: string; tone: string };

export const dining = {
  title: "Rice, curry and a fire after dark",
  body: "Cooked to order from an à la carte menu, from 6:30 in the morning to 10:30 at night.",
  stage: "estateOverhead" as MediaId,
  cards: [
    { image: "curryTable", name: "Rice and curry", text: "Sri Lankan curries alongside international dishes, morning to night.", tone: "var(--c-sage)" },
    { image: "mistyLawn", name: "Garden tables", text: "Meals at a table in the garden, the hills beyond.", tone: "var(--c-mist)" },
    { image: "firepitLounge", name: "The fire pit", text: "When the air cools, the sunken stone fire pit is lit.", tone: "#d7d2c4" },
    { image: "livingRoom", name: "In your room", text: "Any meal can be brought to your room instead.", tone: "var(--c-ivory)" },
  ] satisfies DiningCard[],
};

export type Stop = {
  id: string;
  image: MediaId;
  km: number;
  title: string;
  text: string;
  where: string;
};

export const experiences = {
  title: "Waterfall country, by the kilometre",
  body: "Walk the estate's own trails, then take the road into the Uva hills. These are independent attractions; our team will help you plan the day.",
  /** Road distances from the villa as published by the property. */
  stops: [
    { id: "trails", image: "estateOverhead", km: 0, title: "Forest trails", where: "On the estate", text: "Nature walks through the villa's own thirty acres, past streams, terraces and old forest trees." },
    { id: "diyaluma", image: "attractionDiyaluma", km: 10, title: "Diyaluma Falls", where: "Koslanda", text: "Sri Lanka's second-tallest waterfall, falling some 220 metres. Trek upriver to the rock pools of Uda Diyaluma." },
    { id: "liptons-seat", image: "attractionLiptonsSeat", km: 25, title: "Lipton's Seat", where: "Dambatenne", text: "A lookout at 1,970 metres over the Dambatenne tea estate, where Thomas Lipton surveyed his plantations." },
    { id: "bambarakanda", image: "attractionBambarakanda", km: 29, title: "Bambarakanda Falls", where: "Kalupahana", text: "The island's tallest waterfall at 263 metres, reached through the village of Kalupahana." },
    { id: "adisham", image: "attractionAdisham", km: 31, title: "Adisham Bungalow", where: "Haputale", text: "A stone country house with kept gardens and fruit trees; its shop sells jams, jellies and syrups." },
  ] satisfies Stop[],
  /** End of the drawn road. */
  roadEnd: { km: 43.7, label: "Ella town" },
};

export const faq = {
  title: "Before you arrive",
  facts: [
    { label: "Address", value: "Lé Maas Tota Estate, Ranasinghagama, Nikapotha, Koslanda" },
    { label: "Check-in and out", value: `From ${site.policies.checkIn}, by ${site.policies.checkOut}` },
    { label: "From Colombo", value: "168 km, about four and a half hours" },
  ],
  photoTall: "mistyLawn" as MediaId,
  photoSquare: "poolDeckReading" as MediaId,
  items: [
    {
      q: "Can we arrive early or leave late?",
      a: "Early check-in and late check-out can be arranged on request, subject to availability. Please ask our reservations team.",
    },
    {
      q: "Can we book the whole villa?",
      a: `Yes. Rooms can be booked one by one, or you can reserve the entire villa. Up to ${site.policies.maxRoomsPerBooking} rooms can be booked in one reservation, subject to availability.`,
    },
    {
      q: "How do we get there?",
      a: "The villa is about 168 km from Colombo's Kottawa expressway exit, roughly four and a half hours by road, and 43.7 km from Ella town. Our team can share directions or help arrange transport.",
    },
    {
      q: "How is payment taken?",
      a: "By card or in cash on arrival. Card details given when booking are only charged in the event of a no-show.",
    },
    {
      q: "Is there parking, and is the villa accessible?",
      a: "There is a car park on the estate, and there are rooms suitable for guests with disabilities. Tell us your requirements when booking so we can prepare.",
    },
    {
      q: "Are pets allowed?",
      a: "We're sorry, pets are not permitted at the villa.",
    },
  ],
};

export const gallery = {
  title: "Light, water and the green",
  body: "Mornings in mist, afternoons by the water, the forest all around. Open the gallery to see every photograph.",
  /** The three frames of the curtain sequence. */
  curtain: ["villaAerial", "poolDeckReading", "mistForest"] as MediaId[],
  /** Everything in the lightbox. */
  items: [
    "villaAerial",
    "infinityPoolSunset",
    "poolDeckReading",
    "mistyLawn",
    "livingRoom",
    "dinnerDeckDusk",
    "firepitLounge",
    "curryTable",
    "estateOverhead",
    "mistForest",
  ] as MediaId[],
};
