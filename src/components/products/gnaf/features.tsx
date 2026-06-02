import { Crosshair, Database, Locate, Search, Wand2 } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type Feature = {
  icon: LucideIcon
  name: string
  body: string
  detail: string
}

const FEATURES: Feature[] = [
  {
    icon: Wand2,
    name: "Address validation",
    body: "Standardise, correct and confirm any Australian or New Zealand address against the authoritative dataset — in real time.",
    detail: "corrects typos · parses units · adds postcodes",
  },
  {
    icon: Search,
    name: "Address autocomplete",
    body: "Type-ahead suggestions straight from the source, so users pick a verified address instead of typing a wrong one.",
    detail: "< 50ms suggestions · keyboard navigable",
  },
  {
    icon: Database,
    name: "Bulk & batch validation",
    body: "Clean an entire database in one job. Submit millions of records via batch and collect results through webhooks.",
    detail: "batch endpoint · webhooks · CSV in/out",
  },
  {
    icon: Locate,
    name: "Geocoding",
    body: "Resolve any address to a precise rooftop latitude and longitude — not a street-centroid approximation.",
    detail: "rooftop lat/long · confidence score",
  },
  {
    icon: Crosshair,
    name: "Reverse geocoding",
    body: "Turn coordinates into the nearest authoritative address — ideal for field services and mobile capture.",
    detail: "lat/long → G-NAF address + PID",
  },
]

export function Features() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <div className="max-w-2xl">
        <p className="font-mono text-[0.7rem] tracking-[0.2em] text-primary uppercase">
          Capabilities
        </p>
        <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
          One endpoint family for every address operation.
        </h2>
      </div>

      <div className="mt-14 flex flex-col gap-px overflow-hidden rounded-xl border bg-border">
        {FEATURES.map((f, i) => (
          <div
            key={f.name}
            className={cn(
              "flex flex-col gap-4 bg-card p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8",
              i % 2 === 1 && "sm:flex-row-reverse"
            )}
          >
            <div className="flex items-center gap-4 sm:w-64 sm:shrink-0">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <f.icon className="size-5" />
              </span>
              <h3 className="font-heading text-xl font-medium tracking-tight">
                {f.name}
              </h3>
            </div>
            <div className="sm:flex-1">
              <p className="text-muted-foreground">{f.body}</p>
              <p className="mt-2 font-mono text-[0.7rem] text-muted-foreground/80">
                {f.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
