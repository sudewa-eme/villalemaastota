import type { ResolvedMedia } from "@/lib/media.server";

type CreditTagProps = { image: ResolvedMedia; className?: string; tone?: "light" | "dark" };

/** Small "Illustrative · Pexels" tag for stock stand-ins; renders nothing for the villa's own photos. */
export function CreditTag({ image, className, tone = "light" }: CreditTagProps) {
  if (!image.credit) return null;
  const { source, page, photographer } = image.credit;
  return (
    <a
      href={page}
      target="_blank"
      rel="noopener noreferrer"
      className={["credit-tag", tone === "dark" && "credit-tag--dark", className].filter(Boolean).join(" ")}
      title={`Illustrative stock photo${photographer ? ` by ${photographer}` : ""} on ${source}`}
    >
      Illustrative · {source}
      <span className="visually-hidden">
        {photographer ? `, photo by ${photographer}` : ""} (opens in a new tab)
      </span>
    </a>
  );
}
