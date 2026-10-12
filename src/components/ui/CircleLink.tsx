import { Arrow } from "./Arrow";

type CircleLinkProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
};

export function CircleLink({ href, children, external, className }: CircleLinkProps) {
  return (
    <a
      href={href}
      className={["circle-link", className].filter(Boolean).join(" ")}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="circle-link__icon">
        <Arrow direction={external ? "up-right" : "right"} />
      </span>
      <span>
        {children}
        {external && <span className="visually-hidden"> (opens in a new tab)</span>}
      </span>
    </a>
  );
}
