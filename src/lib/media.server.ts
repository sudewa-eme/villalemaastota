import "server-only";
import { existsSync } from "node:fs";
import path from "node:path";
import { media, type MediaId } from "@/content/media";
import { stock } from "@/content/stock";

export type MediaCredit = { source: "Pexels" | "Unsplash"; page: string; photographer?: string };

export type ResolvedMedia = {
  id: MediaId;
  src: string;
  /** Local image to swap in if `src` (a remote stock photo) fails to load. */
  fallback: string;
  alt: string;
  caption: string;
  focus: string;
  /** True when the villa's own photograph has not been added yet. */
  illustrative: boolean;
  credit?: MediaCredit;
};

const publicDir = path.join(process.cwd(), "public");

/** Resolves a slot to the villa's photo, else an illustrative stock photo, else its placeholder. */
export function resolveMedia(id: MediaId): ResolvedMedia {
  const entry = media[id];
  const focus = entry.focus ?? "50% 50%";
  const base = { id, fallback: entry.placeholder };

  if (entry.file && existsSync(path.join(publicDir, entry.file))) {
    return { ...base, src: entry.file, alt: entry.alt, caption: entry.caption, focus, illustrative: false };
  }

  const photo = stock[id];
  if (photo) {
    return {
      ...base,
      src: photo.src,
      alt: photo.alt,
      caption: photo.caption,
      focus: photo.focus ?? "50% 50%",
      illustrative: true,
      credit: { source: photo.source, page: photo.page, photographer: photo.photographer },
    };
  }

  return {
    ...base,
    src: entry.placeholder,
    // A placeholder must not be described as the photograph it stands in for.
    alt: entry.file ? `Illustrative highland landscape (photograph to follow: ${entry.caption.toLowerCase()})` : entry.alt,
    caption: entry.caption,
    focus,
    illustrative: true,
  };
}

/** Distinct credits for every stock photo currently shown. */
export function stockCredits(): (MediaCredit & { caption: string })[] {
  const seen = new Set<string>();
  return (Object.keys(media) as MediaId[])
    .map(resolveMedia)
    .filter((m) => m.credit && !seen.has(m.credit.page) && seen.add(m.credit.page))
    .map((m) => ({ ...m.credit!, caption: m.caption }));
}
