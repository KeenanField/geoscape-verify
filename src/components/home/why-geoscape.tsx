import { Globe, ShieldCheck, Zap } from "lucide-react"
import type { LucideIcon } from "lucide-react"

type Reason = {
  icon: LucideIcon
  title: string
  body: string
}

const REASONS: Reason[] = [
  {
    icon: ShieldCheck,
    title: "Authoritative by design",
    body: "We're Geoscape — the team that builds G-NAF. Your data is verified against the source, not scraped, stitched or guessed.",
  },
  {
    icon: Globe,
    title: "Made in Australia, for Australia",
    body: "Australian addressing is its own discipline. Unit/level nuance, rural localities, and daily-updated data the overseas tools miss.",
  },
  {
    icon: Zap,
    title: "Built for enterprise",
    body: "99.95% SLA, SSO, SCIM, batch processing and on-prem options. Trusted by government, banks, insurers and utilities.",
  },
]

export function WhyGeoscape() {
  return (
    <section className="border-y bg-foreground text-background">
      <div className="bg-graticule">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="font-mono text-[0.7rem] tracking-[0.2em] text-background/60 uppercase">
                Why Geoscape
              </p>
              <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
                We make the data the rest of the industry depends on.
              </h2>
              <p className="mt-5 max-w-md text-background/70">
                Bad contact data costs Australian businesses millions every
                year. Most verification tools hope for the best in Australia. We
                don't hope — we publish the map.
              </p>
              <p className="mt-8 font-mono text-[0.7rem] tracking-wide text-background/50">
                G-NAF® · AMAS Certified by Australia Post · ISO 27001 · IRAP
                assessed
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-xl border border-background/15 bg-background/15">
              {REASONS.map((r) => (
                <div
                  key={r.title}
                  className="flex gap-4 bg-foreground p-6 sm:p-7"
                >
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-background/10 text-background">
                    <r.icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-medium">{r.title}</h3>
                    <p className="mt-1.5 text-sm text-background/65">
                      {r.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
