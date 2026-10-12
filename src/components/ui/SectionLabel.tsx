type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "center";
};

/** Small uppercase eyebrow framed by diamonds: ◆ The Villa ◆ */
export function SectionLabel({ children, className, align = "start" }: SectionLabelProps) {
  return (
    <p
      className={["eyebrow", align === "center" && "eyebrow--center", className].filter(Boolean).join(" ")}
      data-reveal
    >
      <span className="eyebrow__mark" aria-hidden="true" />
      <span>{children}</span>
      <span className="eyebrow__mark" aria-hidden="true" />
    </p>
  );
}
