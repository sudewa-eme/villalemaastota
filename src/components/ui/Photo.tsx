import Image from "next/image";
import type { ResolvedMedia } from "@/lib/media.server";

type PhotoProps = {
  image: ResolvedMedia;
  /** Responsive `sizes` hint for the browser. */
  sizes: string;
  className?: string;
  priority?: boolean;
  hover?: boolean;
  reveal?: boolean;
  alt?: string;
};

/** Art-directed cover image filling its (aspect-ratio controlled) frame. */
export function Photo({ image, sizes, className, priority, hover, reveal = true, alt }: PhotoProps) {
  return (
    <div
      className={["media", hover && "media--hover", className].filter(Boolean).join(" ")}
      data-reveal={reveal ? "image" : undefined}
    >
      <Image
        src={image.src}
        alt={alt ?? image.alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={78}
        style={{ objectPosition: image.focus }}
      />
    </div>
  );
}
