import { clsx } from "@/lib/clsx";

type Size = "sm" | "md" | "lg" | "xl";

const SIZE_MAP: Record<Size, string> = {
  sm: "text-2xl",
  md: "text-3xl",
  lg: "text-4xl",
  xl: "text-5xl",
};

export function BrandLogo({
  size = "md",
  tagline = false,
  className,
}: {
  size?: Size;
  tagline?: boolean;
  className?: string;
}) {
  return (
    <div className={clsx("flex flex-col items-start", className)}>
      {tagline && (
        <p className="text-[10px] tracking-wide text-[var(--color-muted-foreground)]">
          経費をサクッと記録
        </p>
      )}
      <div className="flex items-baseline gap-0.5">
        <span className={clsx("brand-logo text-[var(--color-foreground)]", SIZE_MAP[size])}>
          Spark tax
        </span>
        <span className="text-base text-[var(--color-primary)]">✦</span>
      </div>
    </div>
  );
}
