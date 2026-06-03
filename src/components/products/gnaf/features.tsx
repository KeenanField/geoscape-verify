import * as React from "react"
import { ArrowRight, Check, Crosshair, MapPin, Search } from "lucide-react"

import { cn } from "@/lib/utils"

type Feature = {
  category: string
  title: string
  body: string
  visual: React.ReactNode
  className: string
}

// A faint UI fragment that sits on the graticule — a polished placeholder for
// real product screenshots, on-theme with the rest of the site.
function VisualPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-graticule-fine relative h-52 shrink-0 overflow-hidden border-b">
      <div className="absolute inset-0 flex items-center justify-center p-6">
        {children}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-card to-transparent" />
    </div>
  )
}

function Chip({
  children,
  tone = "muted",
}: {
  children: React.ReactNode
  tone?: "muted" | "verified"
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-1 font-mono text-[0.7rem]",
        tone === "verified"
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
          : "bg-background/70 text-muted-foreground"
      )}
    >
      {children}
    </span>
  )
}

const ValidationVisual = (
  <div className="flex w-full max-w-xs flex-col gap-2">
    <Chip>
      <span className="line-through opacity-60">12 bourke st melb vic</span>
    </Chip>
    <ArrowRight className="size-4 rotate-90 self-center text-muted-foreground/50" />
    <Chip tone="verified">
      <Check className="size-3" /> 12 Bourke Street, Melbourne VIC 3000
    </Chip>
  </div>
)

const AutocompleteVisual = (
  <div className="w-full max-w-xs rounded-lg border bg-background/80 shadow-sm">
    <div className="flex items-center gap-2 border-b px-3 py-2">
      <Search className="size-3.5 text-muted-foreground" />
      <span className="font-mono text-xs text-muted-foreground">200 Geor▏</span>
    </div>
    <div className="flex flex-col p-1">
      {["200 George St, Sydney NSW", "200 Georges Rd, Liverpool NSW"].map(
        (s, i) => (
          <span
            key={s}
            className={cn(
              "flex items-center gap-2 rounded-md px-2 py-1.5 font-mono text-[0.7rem]",
              i === 0
                ? "bg-primary/10 text-foreground"
                : "text-muted-foreground"
            )}
          >
            <MapPin className="size-3 text-primary" /> {s}
          </span>
        )
      )}
    </div>
  </div>
)

const BatchVisual = (
  <div className="w-full max-w-[14rem] rounded-lg border bg-background/80 p-3 shadow-sm">
    <div className="mb-2 flex items-center justify-between font-mono text-[0.65rem] text-muted-foreground">
      <span>batch.csv</span>
      <span>4 / 5</span>
    </div>
    <div className="flex flex-col gap-1.5">
      {[true, true, true, true, false].map((done, i) => (
        <div key={i} className="flex items-center gap-2">
          <span
            className={cn(
              "inline-flex size-3.5 items-center justify-center rounded-full",
              done
                ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                : "bg-muted"
            )}
          >
            {done ? <Check className="size-2.5" /> : null}
          </span>
          <span className="h-1.5 flex-1 rounded-full bg-muted">
            <span
              className={cn(
                "block h-full rounded-full",
                done ? "w-full bg-primary/40" : "w-1/3 bg-primary/20"
              )}
            />
          </span>
        </div>
      ))}
    </div>
  </div>
)

const GeocodeVisual = (
  <div className="relative size-32 rounded-lg border bg-background/60">
    <div className="bg-graticule-fine absolute inset-0 rounded-lg" />
    <MapPin className="absolute top-1/2 left-1/2 size-7 -translate-x-1/2 -translate-y-full fill-primary/20 text-primary" />
    <span className="absolute top-1/2 left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary ring-4 ring-primary/20" />
    <span className="absolute bottom-2 left-2 rounded bg-background/80 px-1.5 py-0.5 font-mono text-[0.6rem] text-muted-foreground">
      -37.8147, 144.9678
    </span>
  </div>
)

const ReverseVisual = (
  <div className="flex w-full max-w-xs flex-col items-center gap-2">
    <Chip>
      <Crosshair className="size-3 text-primary" /> -33.8642, 151.2084
    </Chip>
    <ArrowRight className="size-4 rotate-90 text-muted-foreground/50" />
    <Chip tone="verified">
      <MapPin className="size-3" /> 200 George Street, Sydney NSW
    </Chip>
  </div>
)

const FEATURES: Feature[] = [
  {
    category: "Validation",
    title: "Standardise and correct, in real time",
    body: "Confirm any Australian or New Zealand address against the authoritative dataset — fixing typos, parsing units and adding missing postcodes as it goes.",
    visual: ValidationVisual,
    className: "lg:col-span-3 lg:rounded-tl-4xl max-lg:rounded-t-4xl",
  },
  {
    category: "Autocomplete",
    title: "Pick a verified address, don't type one",
    body: "Type-ahead suggestions straight from the source, so users select a real address in a few keystrokes instead of mistyping it.",
    visual: AutocompleteVisual,
    className: "lg:col-span-3 lg:rounded-tr-4xl",
  },
  {
    category: "Bulk & batch",
    title: "Clean an entire database in one job",
    body: "Submit millions of records via the batch endpoint and collect results through webhooks or file.",
    visual: BatchVisual,
    className: "lg:col-span-2 lg:rounded-bl-4xl",
  },
  {
    category: "Geocoding",
    title: "Rooftop coordinates, not street centroids",
    body: "Resolve any address to a precise latitude and longitude, with a confidence score on every match.",
    visual: GeocodeVisual,
    className: "lg:col-span-2",
  },
  {
    category: "Reverse geocoding",
    title: "Coordinates back to an address",
    body: "Turn a lat/long into the nearest authoritative address and G-NAF PID — ideal for field services and mobile capture.",
    visual: ReverseVisual,
    className: "lg:col-span-2 lg:rounded-br-4xl max-lg:rounded-b-4xl",
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

      <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
        {FEATURES.map((f) => (
          <div
            key={f.category}
            className={cn(
              "group relative flex flex-col overflow-hidden rounded-xl border bg-card transition hover:shadow-lg hover:shadow-primary/5",
              f.className
            )}
          >
            <VisualPanel>{f.visual}</VisualPanel>
            <div className="flex flex-1 flex-col p-8 pt-6">
              <p className="font-mono text-[0.7rem] tracking-[0.15em] text-primary uppercase">
                {f.category}
              </p>
              <h3 className="mt-2 font-heading text-xl font-medium tracking-tight">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
