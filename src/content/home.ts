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

export const stay = {
  label: "Stay",
  title: "Rooms that open onto the garden",
  feature: ["A room", "to return to."],
  amenities: ["Garden views", "Infinity pool", "Living room", "Outdoor fire pit"],
  body: "Five rooms in the bungalow, each with its own outlook to the garden and the hills. Book a single room for two, a set of rooms for family, or take the whole house for yourselves.",
  /** Room categories published by the property. Details only where confirmed. */
  rooms: [
    {
      name: "Standard Deluxe",
      note: "For couples · king bed · air conditioning · minibar · in-room safe",
      href: "https://www.lemaastota.com/accommodation/standard-deluxe/",
    },
    {
      name: "Junior Suite",
      note: "Up to two guests",
      href: "https://www.lemaastota.com/accommodation/junior-suite/",
    },
    {
      name: "Family Suite",
      note: "Mountain and pool views",
      href: site.links.accommodation,
    },
    {
      name: "Studio Apartment",
      note: "Ask our team for details",
      href: site.links.accommodation,
    },
  ],
  slides: [
    { image: "livingRoom" as MediaId, title: "The living room", text: "Panelled white walls, soft linen and books on Sri Lankan art — the bungalow's shared heart." },
    { image: "villaAerial" as MediaId, title: "The bungalow", text: "Verandas and stone terraces step down from the house towards the pool." },
    { image: "mistyLawn" as MediaId, title: "The garden", text: "A broad lawn beneath the mountain, where the morning mist comes and goes." },
    { image: "poolDeckReading" as MediaId, title: "The pool deck", text: "Timber loungers and shade among the flowering trees, a few steps from your room." },
  ],
};

export const offers = {
  label: "Offers & Occasions",
  title: ["Evenings", "Worth Keeping"],
  body: "Anniversaries, proposals or simply a night to yourselves — the valley deck beside the infinity pool can be set for a private dinner under the stars. Seasonal offers for direct bookings are published on our offers page; our team will tailor the details to your stay.",
  image: "dinnerDeckDusk" as MediaId,
};

export const dining = {
  label: "Dining",
  title: ["Island Flavours", "with a View"],
  body: "Meals are cooked to order from an à la carte menu and served wherever the day takes you — in the dining room, out in the garden, or in the privacy of your room.",
  panels: [
    {
      title: "Curries & beyond",
      text: "Sri Lankan curries alongside international dishes, from breakfast through to dinner.",
    },
    {
      title: "Fire pit evenings",
      text: "As the air cools, gather around the sunken stone fire pit, cushioned and lantern-lit.",
    },
    {
      title: "Dine anywhere",
      text: "The dining room, a garden table or your own room — tell us where, and when.",
    },
  ],
  hours: "Dining from 6:30 am to 10:30 pm",
  image: "firepitLounge" as MediaId,
};

export type Experience = {
  image: MediaId;
  kicker: string;
  title: string;
  text: string;
  distance?: string;
};

export const experiences = {
  label: "Experiences",
  title: ["The Highland", "Experience"],
  background: "mistyLawn" as MediaId,
  body: "Walk the estate's own trails, then venture into the Uva highlands — some of Sri Lanka's most spectacular waterfalls and viewpoints are within an easy drive. Excursions beyond the estate are independent attractions; our team can help you plan them.",
  items: [
    {
      image: "estateOverhead",
      kicker: "On the estate",
      title: "Forest trails",
      text: "Nature walks through the villa's own grounds, past streams, terraces and old forest trees.",
    },
    {
      image: "attractionDiyaluma",
      kicker: "Nearby",
      title: "Diyaluma Falls",
      text: "Sri Lanka's second-tallest waterfall, dropping some 220 metres. Trek upriver to the rock pools of Uda Diyaluma.",
      distance: "approx. 10 km",
    },
    {
      image: "attractionBambarakanda",
      kicker: "Nearby",
      title: "Bambarakanda Falls",
      text: "The island's tallest waterfall at 263 metres, reached via the village of Kalupahana.",
      distance: "approx. 29 km",
    },
    {
      image: "attractionLiptonsSeat",
      kicker: "Tea country",
      title: "Lipton's Seat",
      text: "A viewpoint at 1,970 metres above the Dambatenne tea estate, where Thomas Lipton once surveyed his plantations.",
      distance: "approx. 25 km",
    },
    {
      image: "attractionAdisham",
      kicker: "Haputale",
      title: "Adisham Bungalow",
      text: "A stone country house with manicured gardens and fruit trees; its shop sells jams, jellies and syrups.",
      distance: "approx. 31 km",
    },
  ] satisfies Experience[],
};

export const faq = {
  label: "Questions",
  title: "Before you arrive",
  items: [
    {
      q: "What are the check-in and check-out times?",
      a: `Check-in is from ${site.policies.checkIn} and check-out is by ${site.policies.checkOut}. Early check-in and late check-out can be arranged on request, subject to availability — please contact our reservations team.`,
    },
    {
      q: "Can we book the whole villa?",
      a: `Yes. Rooms can be booked individually, or you can reserve the entire villa. Up to ${site.policies.maxRoomsPerBooking} rooms can be booked in a single reservation, subject to availability.`,
    },
    {
      q: "How do we get there?",
      a: "The villa is about 168 km from Colombo's Kottawa expressway exit — roughly four and a half hours by road — and 43.7 km from Ella town. Our team can share directions or help arrange transport.",
    },
    {
      q: "How is payment taken?",
      a: "Payment can be made by card or in cash on arrival. Card details provided when booking are only charged in the event of a no-show.",
    },
    {
      q: "Is there parking at the villa?",
      a: "Yes, there is a car park on the estate for guests.",
    },
    {
      q: "Is the villa accessible for guests with disabilities?",
      a: "There are rooms suitable for guests with disabilities. Please tell us about your requirements when booking so we can prepare.",
    },
    {
      q: "Are pets allowed?",
      a: "We're sorry — pets are not permitted at the villa.",
    },
  ],
};

export const gallery = {
  label: "Gallery",
  title: ["Light, water", "& the green"],
  items: [
    "villaAerial",
    "infinityPoolSunset",
    "livingRoom",
    "poolDeckReading",
    "mistyLawn",
    "dinnerDeckDusk",
    "firepitLounge",
    "estateOverhead",
  ] as MediaId[],
};
