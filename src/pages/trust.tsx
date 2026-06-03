import { Link } from "react-router"
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Code2,
  Database,
  Globe,
  Landmark,
  Lock,
  Server,
  ShieldCheck,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

type Pillar = { icon: LucideIcon; title: string; body: string }
type Provenance = { source: string; covers: string }

const PILLARS: Pillar[] = [
  {
    icon: Landmark,
    title: "Authoritative by design",
    body: "We're Geoscape — the team that produces G-NAF. Your data is verified against the source, not a scraped or stitched copy.",
  },
  {
    icon: Globe,
    title: "Australian-first",
    body: "Australian addressing is its own discipline. Unit and level nuance, rural localities, and daily-updated data the overseas tools miss.",
  },
  {
    icon: Building2,
    title: "Enterprise-grade",
    body: "A 99.95% SLA, SSO, SCIM, batch processing and on-prem options — trusted by government, banks, insurers and utilities.",
  },
  {
    icon: Code2,
    title: "Developer-first",
    body: "A free sandbox, a clean REST API and SDKs for Node, Python, .NET and Java. Make your first verified call in minutes.",
  },
]

const SECURITY: Pillar[] = [
  {
    icon: ShieldCheck,
    title: "ISO 27001 certified",
    body: "An audited information-security management system underpins the whole platform.",
  },
  {
    icon: BadgeCheck,
    title: "IRAP assessed",
    body: "Independently assessed against Australian government security requirements.",
  },
  {
    icon: Lock,
    title: "SSO & SCIM",
    body: "Enterprise identity with single sign-on and automated user provisioning.",
  },
  {
    icon: Server,
    title: "On-prem & sovereign",
    body: "Hosted, private or on-premise deployment for data-residency requirements.",
  },
]

const PROVENANCE: Provenance[] = [
  {
    source: "G-NAF®",
    covers: "Australia's authoritative address dataset — produced by Geoscape.",
  },
  {
    source: "AusPost PAF",
    covers: "Australia Post's Postal Address File, AMAS certified.",
  },
  { source: "NZ Post", covers: "Authoritative New Zealand postal addresses." },
  {
    source: "Live carrier & SMTP",
    covers: "Real-time phone carrier and email mailbox checks.",
  },
]

const CERTS = [
  "G-NAF®",
  "AMAS Certified by Australia Post",
  "NZ Post",
  "ISO 27001",
  "IRAP assessed",
]

function Hero() {
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
          Why Geoscape
        </span>
        <h1
          className="reveal mt-6 max-w-3xl font-heading text-5xl leading-[1.05] font-medium tracking-tight text-balance sm:text-6xl"
          style={{ animationDelay: "80ms" }}
        >
          We make the data the rest of the industry{" "}
          <span className="text-primary">depends on.</span>
        </h1>
        <p
          className="reveal mt-6 max-w-xl text-lg text-muted-foreground"
          style={{ animationDelay: "160ms" }}
        >
          Geoscape Verify is built by the team behind G-NAF — Australia's
          authoritative address dataset. Authoritative, Australian-first, and
          enterprise-grade by design.
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
            <Link to="/trust">Talk to an expert</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function Story() {
  return (
    <section className="border-b bg-muted/20">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="font-mono text-[0.7rem] tracking-[0.2em] text-primary uppercase">
              The Geoscape story
            </p>
            <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
              Not another data reseller.
            </h2>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Most verification tools stitch together overseas data sources and
              hope for the best in Australia. Geoscape is the organisation that
              produces G-NAF — the Geocoded National Address File — which the
              rest of the industry licences and depends on.
            </p>
            <p>
              That means when you verify with us, you're matching against the
              source itself: 15.4 million addresses, updated daily, with the
              unit, level and locality detail that Australian addressing
              demands. The same authoritative foundation runs through every
              module — address, mail, phone and email.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Pillars() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <div className="max-w-2xl">
        <p className="font-mono text-[0.7rem] tracking-[0.2em] text-primary uppercase">
          What sets us apart
        </p>
        <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
          Four reasons teams trust Verify.
        </h2>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {PILLARS.map((p) => (
          <div
            key={p.title}
            className="flex gap-4 rounded-xl border bg-card p-6"
          >
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <p.icon className="size-5" />
            </span>
            <div>
              <h3 className="font-heading text-lg font-medium tracking-tight">
                {p.title}
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{p.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Security() {
  return (
    <section className="border-y bg-muted/20">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="max-w-2xl">
          <p className="font-mono text-[0.7rem] tracking-[0.2em] text-primary uppercase">
            Security &amp; compliance
          </p>
          <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            Built for regulated environments.
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SECURITY.map((s) => (
            <div
              key={s.title}
              className="flex flex-col rounded-xl border bg-card p-6"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <s.icon className="size-5" />
              </span>
              <h3 className="mt-4 font-medium">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Provenance() {
  return (
    <section className="border-b bg-foreground text-background">
      <div className="bg-graticule">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="max-w-2xl">
            <p className="font-mono text-[0.7rem] tracking-[0.2em] text-background/60 uppercase">
              Data provenance
            </p>
            <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
              Every result traces back to a source.
            </h2>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-background/15 bg-background/15 sm:grid-cols-2">
            {PROVENANCE.map((p) => (
              <div
                key={p.source}
                className="flex flex-col gap-2 bg-foreground p-6"
              >
                <div className="inline-flex items-center gap-2 font-mono text-sm">
                  <Database className="size-4 text-background/70" />
                  {p.source}
                </div>
                <p className="text-sm text-background/65">{p.covers}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Certifications() {
  return (
    <section className="border-b bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-center font-mono text-[0.7rem] tracking-[0.2em] text-muted-foreground uppercase">
          Certifications &amp; foundations
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {CERTS.map((c) => (
            <span
              key={c}
              className="text-sm font-semibold text-muted-foreground/80"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function CtaBand() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <div className="overflow-hidden rounded-2xl border bg-foreground text-background">
        <div className="bg-graticule flex flex-col items-center gap-6 px-6 py-14 text-center">
          <h2 className="font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            Verification you can stand behind.
          </h2>
          <p className="max-w-xl text-background/70">
            Spin up a free sandbox, or talk to an expert about security, on-prem
            and enterprise requirements.
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
              <Link to="/trust">Talk to an expert</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Trust() {
  return (
    <>
      <Hero />
      <Story />
      <Pillars />
      <Security />
      <Provenance />
      <Certifications />
      <CtaBand />
    </>
  )
}
