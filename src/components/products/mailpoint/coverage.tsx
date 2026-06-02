import { Globe, Mailbox, MapPin } from "lucide-react"
import type { LucideIcon } from "lucide-react"

type Stat = {
  icon: LucideIcon
  value: string
  label: string
}

const STATS: Stat[] = [
  { icon: Mailbox, value: "AusPost PAF", label: "Australian postal addresses" },
  { icon: Globe, value: "NZ Post", label: "New Zealand postal addresses" },
  { icon: MapPin, value: "G-NAF", label: "Geocoded lat/long on every match" },
]

export function Coverage() {
  return (
    <section className="border-y bg-foreground text-background">
      <div className="bg-graticule">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="max-w-2xl">
            <p className="font-mono text-[0.7rem] tracking-[0.2em] text-background/60 uppercase">
              Coverage &amp; data
            </p>
            <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
              The authoritative postal file — for Australia and New Zealand.
            </h2>
            <p className="mt-5 text-background/70">
              Australian addresses come straight from Australia Post&rsquo;s PAF
              and are AMAS certified; New Zealand addresses from NZ Post. Both
              are geocoded with G-NAF. MailPoint is purpose-built for mail —
              <span className="text-background">
                {" "}
                postal addresses only, no international coverage.
              </span>
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-background/15 bg-background/15 sm:grid-cols-3">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="flex flex-col gap-3 bg-foreground p-6"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-lg bg-background/10 text-background">
                  <s.icon className="size-5" />
                </span>
                <div className="font-heading text-2xl font-medium tracking-tight">
                  {s.value}
                </div>
                <div className="text-sm text-background/65">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
