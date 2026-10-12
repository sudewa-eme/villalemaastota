import "server-only";
import { existsSync } from "node:fs";
import path from "node:path";
import { media, type MediaId } from "@/content/media";

export type ResolvedMedia = {
  id: MediaId;
  src: string;
  alt: string;
  caption: string;
  focus: string;
  /** True when the real photograph has not been added yet. */
  illustrative: boolean;
};

const publicDir = path.join(process.cwd(), "public");

/** Resolves a manifest entry to the real photograph when present, else its placeholder. */
export function resolveMedia(id: MediaId): ResolvedMedia {
  const entry = media[id];
  const hasPhoto = !!entry.file && existsSync(path.join(publicDir, entry.file));
  return {
    id,
    src: hasPhoto ? entry.file! : entry.placeholder,
    // A placeholder must not be described as the photograph it stands in for.
    alt: hasPhoto || !entry.file ? entry.alt : `Illustrative highland landscape (photograph to follow: ${entry.caption.toLowerCase()})`,
    caption: entry.caption,
    focus: entry.focus ?? "50% 50%",
    illustrative: !hasPhoto,
  };
}
