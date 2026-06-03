import { Link } from "react-router"
import { ArrowRight, ArrowUpRight, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { PRODUCT_CATALOG } from "@/components/industries/product-catalog"
import type { IndustryData } from "@/components/industries/types"

const TRUST_MARKERS = [
  "G-NAF®",
  "AMAS Certified by Australia Post",
  "ISO 27001",
  "IRAP assessed",
]

function Hero({ data }: { data: IndustryData }) {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="bg-graticule pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-24 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-20">
        <span
          className="reveal inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 font-mono text-[0.7rem] tracking-wide text-muted-foreground backdrop-blur"
          style={{ animationDelay: "0ms" }}
        >
          <span className="size-1.5 rounded-full bg-primary" />
          {data.eyebrow}
        </span>

        <h1
          className="reveal mt-6 max-w-3xl font-heading text-5xl leading-[1.05] font-medium tracking-tight text-balance sm:text-6xl"
          style={{ animationDelay: "80ms" }}
        >
          {data.headline}{" "}
          <span className="text-primary">{data.headlineAccent}</span>
        </h1>

        <p
          className="reveal mt-6 max-w-xl text-lg text-muted-foreground"
          style={{ animationDelay: "160ms" }}
        >
          {data.subcopy}
        </p>

        <div
          className="reveal mt-8 flex flex-wrap gap-3"
          style={{ animationDelay: "240ms" }}
        >
          <Button asChild size="lg">
            <Link to="/docs">
              Start free trial <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/contact">Talk to an expert</Link>
          </Button>
        </div>

        <div
          className="reveal mt-8 flex flex-wrap gap-2"
          style={{ animationDelay: "320ms" }}
        >
          {data.audience.map((a) => (
            <span
              key={a}
              className="rounded-full border bg-background/60 px-2.5 py-1 font-mono text-[0.7rem] text-muted-foreground"
            >
              {a}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function TrustBand() {
  return (
    <section className="border-b bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-center font-mono text-[0.7rem] tracking-[0.2em] text-muted-foreground uppercase">
          Built on authoritative, certified data
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {TRUST_MARKERS.map((m) => (
            <span
              key={m}
              className="text-sm font-semibold text-muted-foreground/80"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pains({ data }: { data: IndustryData }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <div className="max-w-2xl">
        <p className="font-mono text-[0.7rem] tracking-[0.2em] text-primary uppercase">
          The problem
        </p>
        <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
          Bad contact data quietly costs you every day.
        </h2>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {data.pains.map((p) => (
          <div
            key={p.pain}
            className="flex flex-col gap-4 rounded-xl border bg-card p-6"
          >
            <p className="text-sm text-muted-foreground">{p.pain}</p>
            <div className="mt-auto flex items-start gap-2 border-t pt-4">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
              <p className="text-sm font-medium">{p.outcome}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Capabilities({ data }: { data: IndustryData }) {
  return (
    <section className="border-y bg-muted/20">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="max-w-2xl">
          <p className="font-mono text-[0.7rem] tracking-[0.2em] text-primary uppercase">
            How Verify helps
          </p>
          <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            One API, dropped into your workflow.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.capabilities.map((c) => (
            <div
              key={c.title}
              className="flex flex-col rounded-xl border bg-card p-6"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <c.icon className="size-5" />
              </span>
              <p className="mt-4 font-mono text-[0.7rem] tracking-[0.15em] text-primary uppercase">
                {c.category}
              </p>
              <h3 className="mt-2 font-heading text-lg font-medium tracking-tight">
                {c.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function RecommendedProducts({ data }: { data: IndustryData }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <div className="max-w-2xl">
        <p className="font-mono text-[0.7rem] tracking-[0.2em] text-primary uppercase">
          Recommended products
        </p>
        <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
          The modules that fit this workflow.
        </h2>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {data.products.map((key) => {
          const p = PRODUCT_CATALOG[key]
          return (
            <Link
              key={key}
              to={p.href}
              className="group flex items-start gap-4 rounded-xl border bg-card p-6 transition hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <p.icon className="size-5" />
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium tracking-tight">{p.name}</h3>
                  <ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{p.blurb}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

function Stats({ data }: { data: IndustryData }) {
  return (
    <section className="border-y bg-foreground text-background">
      <div className="bg-graticule">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="max-w-2xl">
            <p className="font-mono text-[0.7rem] tracking-[0.2em] text-background/60 uppercase">
              The outcome
            </p>
            <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
              Clean data pays for itself.
            </h2>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-background/15 bg-background/15 sm:grid-cols-3">
            {data.stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col gap-2 bg-foreground p-6"
              >
                <div className="font-heading text-4xl font-medium tracking-tight">
                  {s.value}
                </div>
                <div className="text-sm text-background/65">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 font-mono text-[0.7rem] text-background/40">
            Illustrative figures.
          </p>
        </div>
      </div>
    </section>
  )
}

function Faq({ data }: { data: IndustryData }) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      <div className="text-center">
        <p className="font-mono text-[0.7rem] tracking-[0.2em] text-primary uppercase">
          FAQ
        </p>
        <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
          Questions, answered.
        </h2>
      </div>

      <Accordion type="single" collapsible className="mt-10">
        {data.faqs.map((f, i) => (
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

function CtaBand({ data }: { data: IndustryData }) {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 sm:pb-28">
      <div className="overflow-hidden rounded-2xl border bg-foreground text-background">
        <div className="bg-graticule flex flex-col items-center gap-6 px-6 py-14 text-center">
          <h2 className="font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            {data.ctaHeading}
          </h2>
          <p className="max-w-xl text-background/70">
            Spin up a free sandbox, or talk to an expert about your use case.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link to="/docs">Start free trial</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className={cn(
                "border-background/30 bg-transparent text-background",
                "hover:bg-background/10 hover:text-background"
              )}
            >
              <Link to="/contact">Talk to an expert</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export function IndustryPage({ data }: { data: IndustryData }) {
  return (
    <>
      <Hero data={data} />
      <TrustBand />
      <Pains data={data} />
      <Capabilities data={data} />
      <RecommendedProducts data={data} />
      <Stats data={data} />
      <Faq data={data} />
      <CtaBand data={data} />
    </>
  )
}
