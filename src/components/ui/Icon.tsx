export type IconName = "leaf" | "waves" | "sofa" | "flame";

const PATHS: Record<IconName, React.ReactNode> = {
  leaf: (
    <>
      <path d="M8 32C8 18 18 8 34 8c0 16-10 26-24 26" />
      <path d="M8 34 24 18" />
    </>
  ),
  waves: (
    <>
      <path d="M5 16c4 0 4-3 8-3s4 3 8 3 4-3 8-3 4 3 8 3" />
      <path d="M5 24c4 0 4-3 8-3s4 3 8 3 4-3 8-3 4 3 8 3" />
      <path d="M5 32c4 0 4-3 8-3s4 3 8 3 4-3 8-3 4 3 8 3" />
    </>
  ),
  sofa: (
    <>
      <path d="M9 20v-5a3 3 0 0 1 3-3h16a3 3 0 0 1 3 3v5" />
      <path d="M6 20a3 3 0 0 1 3 3v3h22v-3a3 3 0 1 1 3 3v6H6v-6a3 3 0 0 1 0-6Z" />
      <path d="M9 32v3M31 32v3" />
    </>
  ),
  flame: (
    <>
      <path d="M20 6c1 6 9 9 9 18a9 9 0 0 1-18 0c0-5 3-7 4-11 2 2 2 5 5 6 1-4 0-8 0-13Z" />
      <path d="M8 36h24" />
    </>
  ),
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
