import * as React from "react"
import {
  ArrowRight,
  Barcode,
  Check,
  Mailbox,
  MapPin,
  Package,
  Search,
} from "lucide-react"

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
      <span className="font-mono text-xs text-muted-foreground">
        PO Box 12▏
      </span>
    </div>
    <div className="flex flex-col p-1">
      {["PO Box 1234, Sydney NSW", "PO Box 1240, Parramatta NSW"].map(
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
            <Mailbox className="size-3 text-primary" /> {s}
          </span>
        )
      )}
    </div>
  </div>
)

const LockerVisual = (
  <div className="flex w-full max-w-[13rem] flex-col gap-2">
    <Chip>
      <Mailbox className="size-3 text-primary" /> PO Box 1234, Sydney
    </Chip>
    <Chip>
      <Package className="size-3 text-primary" /> Parcel Locker 100234567
    </Chip>
    <Chip tone="verified">
      <Check className="size-3" /> Deliverable
    </Chip>
  </div>
)

const BarcodeVisual = (
  <div className="w-full max-w-[14rem] rounded-lg border bg-background/80 p-4 shadow-sm">
    <div className="mb-2 flex items-center justify-between font-mono text-[0.65rem] text-muted-foreground">
      <span className="inline-flex items-center gap-1">
        <Barcode className="size-3" /> DPID
      </span>
      <span>61320578</span>
    </div>
    <div className="flex h-10 items-end gap-[2px]">
      {[3, 7, 4, 9, 5, 8, 3, 6, 4, 9, 5, 3, 8, 4, 7, 5, 9, 3, 6, 8, 4, 5].map(
        (h, i) => (
          <span
            key={i}
            className="w-[3px] rounded-sm bg-foreground/70"
            style={{ height: `${h * 10}%` }}
          />
        )
      )}
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

const FEATURES: Feature[] = [
  {
    category: "Postal validation",
    title: "Standardise and confirm deliverability",
    body: "Verify any Australian or New Zealand postal address against AusPost PAF and NZ Post — AMAS certified, so it cuts return mail.",
    visual: ValidationVisual,
    className: "lg:col-span-3 lg:rounded-tl-4xl max-lg:rounded-t-4xl",
  },
  {
    category: "Postal autocomplete",
    title: "Capture deliverable addresses fast",
    body: "Type-ahead suggestions limited to deliverable postal addresses, so the mail stream starts clean.",
    visual: AutocompleteVisual,
    className: "lg:col-span-3 lg:rounded-tr-4xl",
  },
  {
    category: "PO Box & Parcel Lockers",
    title: "Not just street addresses",
    body: "First-class support for PO Boxes and Parcel Lockers — the delivery points other validators miss.",
    visual: LockerVisual,
    className: "lg:col-span-2 lg:rounded-bl-4xl",
  },
  {
    category: "DPID & barcodes",
    title: "Ready for the mail stream",
    body: "Return the Delivery Point Identifier and barcode for every address, ready for lodgement and bulk discounts.",
    visual: BarcodeVisual,
    className: "lg:col-span-2",
  },
  {
    category: "Geocoding",
    title: "Coordinates via G-NAF",
    body: "Every postal address is geocoded with G-NAF, so you get a precise lat/long alongside the mail data.",
    visual: GeocodeVisual,
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
          Built for the mail stream, end to end.
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
