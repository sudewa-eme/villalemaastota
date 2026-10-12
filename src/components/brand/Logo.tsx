import { LOGO_MARKUP } from "./logoMarkup";

type LogoProps = {
  /** "lockup" = emblem + wordmark; "emblem" = circular waterfall mark only. */
  variant?: "lockup" | "emblem";
  className?: string;
  title?: string;
};

// Crops of the original 400×350 artboard, measured from the artwork bounds.
const VIEWBOX = {
  lockup: "110 58 180 234",
  emblem: "110 58 180 180",
} as const;

export function Logo({ variant = "lockup", className, title = "Villa Lé Maas Tota by Vella" }: LogoProps) {
  return (
    <svg
      viewBox={VIEWBOX[variant]}
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
      dangerouslySetInnerHTML={{ __html: LOGO_MARKUP }}
    />
  );
}
