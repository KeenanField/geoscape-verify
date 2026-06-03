import type { ComponentProps } from "react"

import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"
import { cn } from "@/lib/utils"

type GridBackdropProps = ComponentProps<typeof AnimatedGridPattern> & {
  /** "light" for sections on the page background, "dark" for bands on bg-foreground */
  tone?: "light" | "dark"
}

/**
 * Survey-graticule backdrop — an animated, brand-tinted grid that replaces the
 * static `.bg-graticule` on high-impact backgrounds (heroes, CTA bands). Faint
 * by design: a slow ambient twinkle over a barely-there grid, masked to fade at
 * the edges. Drop it in as the first child of a `relative` container.
 */
export function GridBackdrop({
  tone = "light",
  className,
  ...props
}: GridBackdropProps) {
  return (
    <AnimatedGridPattern
      width={56}
      height={56}
      numSquares={28}
      maxOpacity={tone === "dark" ? 0.1 : 0.06}
      duration={3}
      repeatDelay={1}
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        tone === "dark"
          ? "fill-primary/50 stroke-background/1 text-background"
          : "fill-foreground/4 stroke-foreground/7 text-foreground",
        className
      )}
      {...props}
    />
  )
}
