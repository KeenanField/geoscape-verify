import * as React from "react"
import { Check, Globe, PhoneOff, Radio, Signal, Smartphone } from "lucide-react"

import { cn } from "@/lib/utils"

type Feature = {
  category: string
  title: string
  body: string
  visual: React.ReactNode
  className: string
}

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
  tone?: "muted" | "verified" | "warn"
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-1 font-mono text-[0.7rem]",
        tone === "verified" &&
          "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
        tone === "warn" &&
          "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
        tone === "muted" && "bg-background/70 text-muted-foreground"
      )}
    >
      {children}
    </span>
  )
}

const ValidationVisual = (
  <div className="flex w-full max-w-xs flex-col items-center gap-2">
    <Chip>0412 345 678</Chip>
    <Signal className="size-4 rotate-90 text-muted-foreground/50" />
    <Chip tone="verified">
      <Check className="size-3" /> +61 412 345 678
    </Chip>
  </div>
)

const CarrierVisual = (
  <div className="w-full max-w-[13rem] rounded-lg border bg-background/80 p-3 shadow-sm">
    <div className="flex items-center gap-2 border-b pb-2 font-mono text-[0.7rem] text-muted-foreground">
      <Radio className="size-3.5 text-primary" /> carrier lookup
    </div>
    <div className="mt-2 flex items-center justify-between font-mono text-xs">
      <span className="text-muted-foreground">network</span>
      <span className="text-foreground">Telstra</span>
    </div>
    <div className="mt-1 flex items-center justify-between font-mono text-xs">
      <span className="text-muted-foreground">mcc/mnc</span>
      <span className="text-foreground">505 / 01</span>
    </div>
  </div>
)

const LineTypeVisual = (
  <div className="flex w-full max-w-[12rem] flex-col gap-2">
    <Chip tone="verified">
      <Smartphone className="size-3" /> mobile
    </Chip>
    <Chip>landline</Chip>
    <Chip>VoIP</Chip>
  </div>
)

const StatusVisual = (
  <div className="flex w-full max-w-[12rem] flex-col gap-2">
    <Chip tone="verified">
      <Check className="size-3" /> active
    </Chip>
    <Chip tone="warn">
      <PhoneOff className="size-3" /> disconnected
    </Chip>
  </div>
)

const GlobalVisual = (
  <div className="relative flex size-28 items-center justify-center rounded-full border bg-background/60">
    <div className="bg-graticule-fine absolute inset-0 rounded-full" />
    <Globe className="relative size-12 text-primary" />
  </div>
)

const FEATURES: Feature[] = [
  {
    category: "Number validation",
    title: "Format, normalise and confirm",
    body: "Check that a number is well-formed and exists, and return it in clean E.164 format ready to store.",
    visual: ValidationVisual,
    className: "lg:col-span-3 lg:rounded-tl-4xl max-lg:rounded-t-4xl",
  },
  {
    category: "Carrier lookup",
    title: "See the network behind the number",
    body: "Return the current carrier and network codes — even after a number has been ported.",
    visual: CarrierVisual,
    className: "lg:col-span-3 lg:rounded-tr-4xl",
  },
  {
    category: "Line type",
    title: "Mobile, landline or VoIP",
    body: "Detect the line type so you can route SMS, calls and verification the right way.",
    visual: LineTypeVisual,
    className: "lg:col-span-2 lg:rounded-bl-4xl",
  },
  {
    category: "Active & disconnection",
    title: "Is it live right now?",
    body: "Flag disconnected and unreachable numbers before you waste a message or a call.",
    visual: StatusVisual,
    className: "lg:col-span-2",
  },
  {
    category: "International",
    title: "Australia and worldwide",
    body: "One API for Australian numbers and international numbering plans across 200+ countries.",
    visual: GlobalVisual,
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
          Everything you need to trust a phone number.
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
