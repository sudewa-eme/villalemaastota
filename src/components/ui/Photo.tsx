import type { ResolvedMedia } from "@/lib/media.server";
import { SmartImage } from "./SmartImage";
import { CreditTag } from "./CreditTag";

type PhotoProps = {
  image: ResolvedMedia;
  /** Responsive `sizes` hint for the browser. */
  sizes: string;
  className?: string;
  priority?: boolean;
  hover?: boolean;
  reveal?: boolean;
  alt?: string;
  /** Show the "Illustrative · source" tag for stock stand-ins. */
  credit?: boolean;
};

/** Art-directed cover image filling its (aspect-ratio controlled) frame. */
export function Photo({ image, sizes, className, priority, hover, reveal = true, alt, credit = true }: PhotoProps) {
  return (
    <div
      className={["media", hover && "media--hover", className].filter(Boolean).join(" ")}
      data-reveal={reveal ? "image" : undefined}
    >
      <SmartImage image={image} alt={alt} fill sizes={sizes} priority={priority} quality={78} />
      {credit && <CreditTag image={image} />}
    </div>
  );
}
