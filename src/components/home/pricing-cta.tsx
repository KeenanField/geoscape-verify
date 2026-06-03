import { Link } from "react-router"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type Tier = {
  name: string
  price: string
  cadence?: string
  blurb: string
  features: string[]
  cta: string
  href: string
  featured?: boolean
}

const TIERS: Tier[] = [
  {
    name: "Sandbox",
    price: "Free",
    blurb: "For evaluation and side projects.",
    features: ["1,000 lookups / mo", "All four modules", "Community support"],
    cta: "Start free",
    href: "/docs",
  },
  {
    name: "Growth",
    price: "$199",
    cadence: "/mo",
    blurb: "For scaling teams in production.",
    features: ["50,000 lookups / mo", "REST API + SDKs", "Email support"],
    cta: "Start free trial",
    href: "/docs",
  },
  {
    name: "Scale",
    price: "$749",
    cadence: "/mo",
    blurb: "High-volume with batch processing.",
    features: ["500,000 lookups / mo", "Batch + webhooks", "Priority support"],
    cta: "Start free trial",
    href: "/docs",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Let's talk",
    blurb: "Mission-critical, government-grade.",
    features: [
      "Custom volume + SLA",
      "SSO / SCIM, on-prem",
      "Dedicated manager",
    ],
    cta: "Contact sales",
    href: "/trust",
  },
]

export function PricingCta() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <div className="max-w-2xl">
        <p className="font-mono text-[0.7rem] tracking-[0.2em] text-primary uppercase">
          Pricing
        </p>
        <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
          Start free. Scale when you're ready.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Every plan includes all four modules and a free sandbox. No card
          required to start.
        </p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {TIERS.map((t) => (
          <div
            key={t.name}
            className={cn(
              "flex flex-col rounded-xl border bg-card p-6",
              t.featured &&
                "relative border-primary shadow-lg shadow-primary/10"
            )}
          >
            {t.featured && (
              <span className="absolute -top-3 left-6 rounded-full bg-primary px-2.5 py-0.5 font-mono text-[0.65rem] tracking-wide text-primary-foreground uppercase">
                Most popular
              </span>
            )}
            <h3 className="font-medium">{t.name}</h3>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="font-heading text-3xl font-medium tracking-tight">
                {t.price}
              </span>
              {t.cadence && (
                <span className="text-sm text-muted-foreground">
                  {t.cadence}
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{t.blurb}</p>
            <ul className="mt-5 mb-6 flex flex-col gap-2.5">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>
            <Button
              asChild
              variant={t.featured ? "default" : "outline"}
              className="mt-auto"
            >
              <Link to={t.href}>{t.cta}</Link>
            </Button>
          </div>
        ))}
      </div>

      {/* closing CTA band */}
      <div className="mt-16 overflow-hidden rounded-2xl border bg-foreground text-background">
        <div className="bg-graticule flex flex-col items-center gap-6 px-6 py-14 text-center">
          <h3 className="font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            From address to inbox — verified at the source.
          </h3>
          <p className="max-w-xl text-background/70">
            Spin up a free sandbox and make your first verified call in minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link to="/docs">Start free</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background"
            >
              <Link to="/contact">Talk to sales</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
