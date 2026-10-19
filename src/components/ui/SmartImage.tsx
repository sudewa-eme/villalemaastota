"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import type { ResolvedMedia } from "@/lib/media.server";

type SmartImageProps = Omit<ImageProps, "src" | "alt"> & {
  image: ResolvedMedia;
  alt?: string;
};

/**
 * next/image that falls back to the slot's local placeholder if the primary
 * (remote stock) image fails to load, so the layout never shows a broken image.
 */
export function SmartImage({ image, alt, style, ...rest }: SmartImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const failed = failedSrc === image.src;
  return (
    <Image
      {...rest}
      src={failed ? image.fallback : image.src}
      alt={alt ?? (failed ? "" : image.alt)}
      style={{ objectFit: "cover", objectPosition: image.focus, ...style }}
      onError={() => {
        if (!failed && image.src !== image.fallback) setFailedSrc(image.src);
      }}
    />
  );
}
