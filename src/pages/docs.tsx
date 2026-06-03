import { Link } from "react-router"
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Database,
  Gauge,
  Key,
  Layers,
  Terminal,
  Webhook,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { GridBackdrop } from "@/components/ui/grid-backdrop"

type Step = { n: string; title: string; body: string }
type Integration = { name: string; category: string }
type Resource = { icon: LucideIcon; name: string; body: string; href: string }
type Capability = { icon: LucideIcon; title: string; body: string }

const STEPS: Step[] = [
  {
    n: "01",
    title: "Get a sandbox key",
    body: "Sign up free and grab an API key from the dashboard. No card required.",
  },
  {
    n: "02",
    title: "Install an SDK",
    body: "Add the SDK for your stack, or call the REST API directly with any HTTP client.",
  },
  {
    n: "03",
    title: "Make your first call",
    body: "Verify an address, phone or email and get a structured, geocoded result back.",
  },
]

const INTEGRATIONS: Integration[] = [
  { name: "Salesforce", category: "CRM" },
  { name: "HubSpot", category: "CRM" },
  { name: "Microsoft Dynamics 365", category: "CRM" },
  { name: "WordPress", category: "CMS" },
  { name: "Shopify", category: "E-commerce" },
  { name: "WooCommerce", category: "E-commerce" },
  { name: "Zapier", category: "Automation" },
  { name: "Snowflake", category: "Data" },
]

const RESOURCES: Resource[] = [
  {
    icon: Database,
    name: "API reference",
    body: "Every endpoint, parameter and response field for all four modules.",
    href: "/docs",
  },
  {
    icon: Key,
    name: "Authentication",
    body: "API keys, scopes and rotating credentials for production.",
    href: "/docs",
  },
  {
    icon: Webhook,
    name: "Batch & webhooks",
    body: "Submit files of millions of records and collect results asynchronously.",
    href: "/docs",
  },
  {
    icon: Terminal,
    name: "Sandbox",
    body: "A free, full-featured environment to build against before you go live.",
    href: "/docs",
  },
]

const CAPABILITIES: Capability[] = [
  {
    icon: Gauge,
    title: "Real-time & fast",
    body: "Sub-300ms verification per call, built for synchronous capture flows.",
  },
  {
    icon: Layers,
    title: "One API, four modules",
    body: "Address, mail, phone and email behind a single consistent interface.",
  },
  {
    icon: Boxes,
    title: "Batch at scale",
    body: "Cleanse entire databases with the batch endpoint and webhook delivery.",
  },
  {
    icon: Webhook,
    title: "Webhooks",
    body: "Get notified the moment a batch job or async verification completes.",
  },
]

function CodeSample() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-2xl shadow-primary/5">
      <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-3">
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="ml-2 font-mono text-xs text-muted-foreground">
          quickstart.sh
        </span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed">
        <code>
          <span className="text-muted-foreground"># Verify an address</span>
          {"\n"}
          <span className="text-primary">curl</span>{" "}
          https://api.geoscape.com.au/v1/address/verify {"\\"}
          {"\n"}
          {"  "}-H{" "}
          <span className="text-emerald-600 dark:text-emerald-400">
            "Authorization: Bearer $KEY"
          </span>{" "}
          {"\\"}
          {"\n"}
          {"  "}-d{" "}
          <span className="text-emerald-600 dark:text-emerald-400">
            '{`{ "address": "200 George St, Sydney" }`}'
          </span>
          {"\n\n"}
          <span className="text-muted-foreground">{`{`}</span>
          {"\n"}
          {"  "}
          <span className="text-muted-foreground">"verified": true,</span>
          {"\n"}
          {"  "}
          <span className="text-muted-foreground">
            "gnaf_pid": "GANSW_705124883",
          </span>
          {"\n"}
          {"  "}
          <span className="text-muted-foreground">
            "lat": -33.86419, "lng": 151.20835
          </span>
          {"\n"}
          <span className="text-muted-foreground">{`}`}</span>
        </code>
      </pre>
    </div>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b">
      <GridBackdrop />
      <div className="pointer-events-none absolute -top-24 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 pt-20 pb-16 sm:pt-28 sm:pb-20 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <span
            className="reveal inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 font-mono text-[0.7rem] tracking-wide text-muted-foreground backdrop-blur"
            style={{ animationDelay: "0ms" }}
          >
            <span className="size-1.5 rounded-full bg-primary" />
            Developers
          </span>
          <h1
            className="reveal mt-6 font-heading text-5xl leading-[1.05] font-medium tracking-tight text-balance sm:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            Build with Verify in <span className="text-primary">minutes.</span>
          </h1>
          <p
            className="reveal mt-6 max-w-xl text-lg text-muted-foreground"
            style={{ animationDelay: "160ms" }}
          >
            A clean REST API, SDKs for every major stack, and a free sandbox.
            From address to inbox — verified in a single call.
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
              <Link to="/docs">View API reference</Link>
            </Button>
          </div>
        </div>
        <div className="reveal" style={{ animationDelay: "340ms" }}>
          <CodeSample />
        </div>
      </div>
    </section>
  )
}

function Quickstart() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <div className="max-w-2xl">
        <p className="font-mono text-[0.7rem] tracking-[0.2em] text-primary uppercase">
          Quickstart
        </p>
        <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
          Three steps to your first verified call.
        </h2>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {STEPS.map((s) => (
          <div
            key={s.n}
            className="flex flex-col rounded-xl border bg-card p-6"
          >
            <span className="font-mono text-2xl font-medium text-primary/40">
              {s.n}
            </span>
            <h3 className="mt-3 font-heading text-lg font-medium tracking-tight">
              {s.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Integrations() {
  return (
    <section className="border-y bg-muted/20">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="max-w-2xl">
          <p className="font-mono text-[0.7rem] tracking-[0.2em] text-primary uppercase">
            Integrations
          </p>
          <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            Plugs into the tools you already run.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Pre-built connectors for the major CRMs, content and commerce
            platforms — verify contact data without writing a line of code.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INTEGRATIONS.map((i) => (
            <div
              key={i.name}
              className="flex flex-col gap-3 rounded-xl border bg-card p-6"
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-muted font-heading text-sm font-medium text-muted-foreground">
                {i.name.slice(0, 2)}
              </span>
              <div>
                <h3 className="font-medium tracking-tight">{i.name}</h3>
                <p className="mt-0.5 font-mono text-[0.7rem] tracking-wide text-muted-foreground uppercase">
                  {i.category}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Don&rsquo;t see your platform?{" "}
          <Link to="/contact" className="text-primary hover:underline">
            Talk to an expert
          </Link>{" "}
          — the REST API and SDKs connect to anything.
        </p>
      </div>
    </section>
  )
}

function Resources() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <div className="max-w-2xl">
        <p className="font-mono text-[0.7rem] tracking-[0.2em] text-primary uppercase">
          API resources
        </p>
        <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
          Everything you need to ship.
        </h2>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {RESOURCES.map((r) => (
          <Link
            key={r.name}
            to={r.href}
            className="group flex items-start gap-4 rounded-xl border bg-card p-6 transition hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
          >
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <r.icon className="size-5" />
            </span>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium tracking-tight">{r.name}</h3>
                <ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{r.body}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

function Capabilities() {
  return (
    <section className="border-y bg-foreground text-background">
      <div className="bg-graticule">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="max-w-2xl">
            <p className="font-mono text-[0.7rem] tracking-[0.2em] text-background/60 uppercase">
              Built for developers
            </p>
            <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
              A platform that gets out of your way.
            </h2>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-background/15 bg-background/15 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((c) => (
              <div
                key={c.title}
                className="flex flex-col gap-3 bg-foreground p-6"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-lg bg-background/10 text-background">
                  <c.icon className="size-5" />
                </span>
                <h3 className="font-medium">{c.title}</h3>
                <p className="text-sm text-background/65">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CtaBand() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <div className="relative overflow-hidden rounded-2xl border bg-foreground text-background">
        <GridBackdrop tone="dark" />
        <div className="relative flex flex-col items-center gap-6 px-6 py-14 text-center">
          <h2 className="font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            Get your sandbox key and start building.
          </h2>
          <p className="max-w-xl text-background/70">
            Free to start, no card required. Talk to an expert when you're ready
            for production volume.
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

export function Developers() {
  return (
    <>
      <Hero />
      <Quickstart />
      <Integrations />
      <Resources />
      <Capabilities />
      <CtaBand />
    </>
  )
}
