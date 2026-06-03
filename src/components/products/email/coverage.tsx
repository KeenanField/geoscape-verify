import { Gauge, Globe, Server } from "lucide-react"
import type { LucideIcon } from "lucide-react"

type Stat = {
  icon: LucideIcon
  value: string
  label: string
}

const STATS: Stat[] = [
  { icon: Globe, value: "Any domain", label: "Works on email worldwide" },
  { icon: Server, value: "MX + SMTP", label: "Live, real-time checks" },
  { icon: Gauge, value: "0–100", label: "Single deliverability risk score" },
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
              Real-time checks on any email, anywhere.
            </h2>
            <p className="mt-5 text-background/70">
              Email Verify works on any domain worldwide, running live MX and
              SMTP checks at the moment you ask — then rolls the result into a
              single risk score you can act on.
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
