import { otterStates, type OtterStateId } from "@/lib/content";

const altById = Object.fromEntries(otterStates.map((s) => [s.id, s.alt])) as Record<OtterStateId, string>;

interface OtterSpriteProps {
  state: OtterStateId;
  className?: string;
  decorative?: boolean;
}

export default function OtterSprite({ state, className, decorative }: OtterSpriteProps) {
  return (
    <img
      src={`/assets/otter/${state}.webp`}
      alt={decorative ? "" : altById[state]}
      className={["sprite", state, className].filter(Boolean).join(" ")}
    />
  );
}
