import { Link } from "react-router"
import { Check, Minus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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

// Comparison rows. A cell is either a string (rendered as text) or a boolean
// (rendered as a check / dash). Order matches TIERS.
type Row = { label: string; cells: (string | boolean)[] }

const COMPARISON: Row[] = [
  { label: "Monthly lookups", cells: ["1,000", "50,000", "500,000", "Custom"] },
  { label: "All four modules", cells: [true, true, true, true] },
  { label: "REST API & SDKs", cells: [true, true, true, true] },
  { label: "Address autocomplete", cells: [true, true, true, true] },
  { label: "Batch & webhooks", cells: [false, false, true, true] },
  { label: "SSO / SCIM", cells: [false, false, false, true] },
  { label: "On-prem deployment", cells: [false, false, false, true] },
  { label: "Support", cells: ["Community", "Email", "Priority", "Dedicated"] },
  { label: "SLA", cells: ["—", "99.9%", "99.9%", "99.95%"] },
]

const INCLUDED = [
  "Free sandbox on every plan",
  "All four modules — address, mail, phone, email",
  "Clean REST API + Node, Python, .NET & Java SDKs",
  "No card required to start",
]

const FAQS = [
  {
    q: "What counts as a lookup?",
    a: "One verification of one contact point — a single address, phone, email or mail validation. Autocomplete keystrokes don't count; only the final verified result does.",
  },
  {
    q: "What happens if I exceed my plan's lookups?",
    a: "We'll never hard-stop your production traffic. Overage is billed per lookup at your plan's rate, and we'll flag when you're consistently above tier so you can move up.",
  },
  {
    q: "Is there annual billing?",
    a: "Yes. Annual plans are available at a discount to the monthly prices shown. Talk to an expert for annual and committed-volume pricing.",
  },
  {
    q: "How does Enterprise pricing work?",
    a: "Enterprise is priced to your volume and requirements — custom SLAs, SSO/SCIM, on-prem deployment and a dedicated manager. Contact sales for a quote.",
  },
]

function Hero() {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="bg-graticule pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-24 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-12 text-center sm:pt-28">
        <h1
          className="reveal mx-auto max-w-3xl font-heading text-5xl leading-[1.05] font-medium tracking-tight text-balance sm:text-6xl"
          style={{ animationDelay: "0ms" }}
        >
          Start free. Scale{" "}
          <span className="text-primary">when you're ready.</span>
        </h1>
        <p
          className="reveal mx-auto mt-6 max-w-xl text-lg text-muted-foreground"
          style={{ animationDelay: "80ms" }}
        >
          Every plan includes all four modules and a free sandbox. Pay by lookup
          volume — no card required to start.
        </p>
      </div>
    </section>
  )
}

function Tiers() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-12">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
            <h2 className="font-medium">{t.name}</h2>
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
      <p className="mt-4 text-center font-mono text-[0.7rem] text-muted-foreground">
        Illustrative pricing.
      </p>
    </section>
  )
}

function Cell({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="mx-auto size-4 text-primary" />
    ) : (
      <Minus className="mx-auto size-4 text-muted-foreground/40" />
    )
  }
  return <span className="text-muted-foreground">{value}</span>
}

function Comparison() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <div className="max-w-2xl">
        <p className="font-mono text-[0.7rem] tracking-[0.2em] text-primary uppercase">
          Compare plans
        </p>
        <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
          Everything, side by side.
        </h2>
      </div>

      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[44rem] border-separate border-spacing-0 text-sm">
          <thead>
            <tr>
              <th className="w-1/3 border-b py-3 pr-4 text-left font-medium">
                Feature
              </th>
              {TIERS.map((t) => (
                <th
                  key={t.name}
                  className={cn(
                    "border-b px-4 py-3 text-center font-medium",
                    t.featured && "text-primary"
                  )}
                >
                  {t.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map((row) => (
              <tr key={row.label}>
                <td className="border-b py-3 pr-4 text-left text-muted-foreground">
                  {row.label}
                </td>
                {row.cells.map((c, i) => (
                  <td
                    key={i}
                    className={cn(
                      "border-b px-4 py-3 text-center",
                      TIERS[i].featured && "bg-primary/5"
                    )}
                  >
                    <Cell value={c} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function Included() {
  return (
    <section className="border-y bg-muted/20">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <h2 className="font-heading text-2xl font-medium tracking-tight text-balance sm:text-3xl">
            Every plan includes
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {INCLUDED.map((i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="text-muted-foreground">{i}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      <div className="text-center">
        <p className="font-mono text-[0.7rem] tracking-[0.2em] text-primary uppercase">
          Pricing FAQ
        </p>
        <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
          Questions, answered.
        </h2>
      </div>
      <Accordion type="single" collapsible className="mt-10">
        {FAQS.map((f, i) => (
          <AccordionItem key={f.q} value={`item-${i}`}>
            <AccordionTrigger className="text-left text-base font-medium">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}

function CtaBand() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 sm:pb-28">
      <div className="overflow-hidden rounded-2xl border bg-foreground text-background">
        <div className="bg-graticule flex flex-col items-center gap-6 px-6 py-14 text-center">
          <h2 className="font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            Make your first verified call in minutes.
          </h2>
          <p className="max-w-xl text-background/70">
            Start free — no card required — or talk to an expert about volume
            and enterprise pricing.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link to="/docs">Start free trial</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background"
            >
              <Link to="/contact">Talk to an expert</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Pricing() {
  return (
    <>
      <Hero />
      <Tiers />
      <Comparison />
      <Included />
      <Faq />
      <CtaBand />
    </>
  )
}
