/**
 * Stock photography (Pexels / Unsplash) used as illustrative stand-ins until
 * the villa's own photographs are added to /public/images/property.
 *
 * These images do NOT show Villa Lé Maas Tota. Their alt text describes what
 * is actually in each photo, and the UI labels them as illustrative with a
 * credit. Each was chosen from its public photo page (linked in `page`).
 *
 * Both licences allow free commercial use; credit is given as a courtesy.
 * Pexels files follow https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg.
 * Unsplash photos are referenced through their page's download link, which
 * redirects to the image CDN.
 */
import type { MediaId } from "./media";

export type StockPhoto = {
  src: string;
  alt: string;
  caption: string;
  source: "Pexels" | "Unsplash";
  /** Public photo page (credit link). */
  page: string;
  photographer?: string;
  focus?: string;
};

const pexels = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=2400`;

const unsplash = (id: string) => `https://unsplash.com/photos/${id}/download?w=2400`;

export const stock: Partial<Record<MediaId, StockPhoto>> = {
  infinityPoolSunset: {
    src: pexels(30945061),
    alt: "Sunrays breaking over a lush green mountain valley near Ella in Sri Lanka's hill country",
    caption: "Morning light over the hill country near Ella",
    source: "Pexels",
    page: "https://www.pexels.com/photo/scenic-sunrays-over-lush-green-mountain-valley-30945061/",
    focus: "50% 55%",
  },
  villaAerial: {
    src: pexels(28426098),
    alt: "Aerial view of a river winding through dense green forest at Kitulgala, Sri Lanka",
    caption: "Forest and river from above, Kitulgala",
    source: "Pexels",
    photographer: "Charith Kodagoda",
    page: "https://www.pexels.com/photo/aerial-view-of-lush-river-in-kitulgala-sri-lanka-28426098/",
  },
  estateOverhead: {
    src: pexels(3923723),
    alt: "Overhead aerial view of a dense, deep-green rainforest canopy",
    caption: "Rainforest canopy from above",
    source: "Pexels",
    page: "https://www.pexels.com/photo/aerial-shot-of-green-trees-3923723/",
  },
  dinnerDeckDusk: {
    src: pexels(22661809),
    alt: "A candlelit dinner table set outdoors in a garden in the evening",
    caption: "A candlelit table in the garden",
    source: "Pexels",
    photographer: "Sinem Karapınar",
    page: "https://www.pexels.com/photo/dinner-with-candles-on-an-outdoor-table-in-a-garden-22661809/",
  },
  firepitLounge: {
    src: pexels(13871253),
    alt: "An outdoor lounge with wooden benches arranged around a central fire pit",
    caption: "Gathering around the fire pit",
    source: "Pexels",
    photographer: "Matheus Bertelli",
    page: "https://www.pexels.com/photo/an-empty-fire-pit-surrounded-with-brown-wooden-bench-13871253/",
  },
  poolDeckReading: {
    src: pexels(27379639),
    alt: "A swimming pool surrounded by tropical trees and lounge chairs",
    caption: "A pool among the trees",
    source: "Pexels",
    page: "https://www.pexels.com/photo/a-pool-surrounded-by-trees-and-lounge-chairs-27379639/",
  },
  mistyLawn: {
    src: pexels(13321623),
    alt: "A green grass field beneath a fog-covered hill",
    caption: "Green lawns beneath a foggy hill",
    source: "Pexels",
    photographer: "Adrien Olichon",
    page: "https://www.pexels.com/photo/green-grass-field-near-foggy-hill-13321623/",
  },
  livingRoom: {
    src: pexels(25484449),
    alt: "An old-fashioned living room with an antique sofa and armchair",
    caption: "Antique sofa and armchair",
    source: "Pexels",
    page: "https://www.pexels.com/photo/antique-sofa-and-an-armchair-25484449/",
  },
  mistForest: {
    src: pexels(31196710),
    alt: "Mist drifting over a lush, green forested mountain range",
    caption: "Mist over the forested ranges",
    source: "Pexels",
    page: "https://www.pexels.com/photo/mist-over-lush-green-forested-mountain-range-31196710/",
  },
  attractionDiyaluma: {
    src: pexels(3133929),
    alt: "A tall waterfall cascading down a green hillside at Ginigathhena, Sri Lanka",
    caption: "A hill-country waterfall, Ginigathhena",
    source: "Pexels",
    photographer: "Kavindu Kaushalya",
    page: "https://www.pexels.com/photo/waterfalls-during-day-3133929/",
  },
  attractionBambarakanda: {
    src: pexels(17435022),
    alt: "A waterfall falling through green forest",
    caption: "A forest waterfall",
    source: "Pexels",
    page: "https://www.pexels.com/photo/photo-of-a-waterfall-17435022/",
  },
  attractionLiptonsSeat: {
    src: unsplash("ZWdrM9IBBIE"),
    alt: "A lush green tea plantation on a misty hillside near Nuwara Eliya, Sri Lanka",
    caption: "Tea on a misty hillside, Nuwara Eliya",
    source: "Unsplash",
    photographer: "Erik Esly",
    page: "https://unsplash.com/photos/lush-green-tea-plantation-on-a-misty-hillside-ZWdrM9IBBIE",
  },
  attractionAdisham: {
    src: pexels(2582546),
    alt: "A small house among misty mountains at dawn in Nuwara Eliya, Sri Lanka",
    caption: "Misty hills at dawn, Nuwara Eliya",
    source: "Pexels",
    photographer: "Quang Nguyen Vinh",
    page: "https://www.pexels.com/photo/photo-of-mountains-during-dawn-2582546/",
  },
};
