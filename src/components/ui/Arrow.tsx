type ArrowProps = { direction?: "right" | "left" | "down" | "up-right"; className?: string };

const ROTATE = { right: 0, down: 90, left: 180, "up-right": -45 } as const;

export function Arrow({ direction = "right", className }: ArrowProps) {
  return (
    <svg
      className={["arrow", className].filter(Boolean).join(" ")}
      width="18"
      height="10"
      viewBox="0 0 18 10"
      fill="none"
      aria-hidden="true"
      style={{ transform: `rotate(${ROTATE[direction]}deg)` }}
    >
      <path d="M0 5h16.5M12.5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}
