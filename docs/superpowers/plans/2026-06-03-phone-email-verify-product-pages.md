# Phone Verify & Email Verify Product Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `/products/phone` and `/products/email` `PageStub`s with full marketing pages, reusing the section architecture and design language of the G-NAF and MailPoint Verify pages.

**Architecture:** Per page, small focused section components under `src/components/products/{phone,email}/`, orchestrated by the page file. Each page has a bespoke single-validation demo (no tabs, no `AddressDemo` reuse) and a 5-cell bento with on-theme token-built visual panels. Reuses vendored `accordion`/`button` and `cn()`. No new dependencies, no new routes, no API calls (all demo data placeholder, clearly mocked).

**Tech Stack:** React 19, react-router v7, Tailwind v4, shadcn/ui (`accordion`, `button`), lucide-react, TypeScript (strict), bun.

**Testing note:** Repo has **no test runner**. Verify per task with `bun run typecheck`, `bunx eslint <files>`, and a final `bun run build` + headless-browser smoke. Style: no semicolons, double quotes, 2-space indent, `@/` imports, `cn()`, semantic tokens only. **Run `bunx prettier --write <file>` on each created file before committing** (long Tailwind className strings get reflowed — the G-NAF/MailPoint work hit this). All icons below verified present in `lucide-react`. Visual reference: existing `src/components/products/gnaf/` and `src/components/products/mailpoint/`.

---

## PHONE VERIFY

### Task 1: Phone validation demo

**Files:**
- Create: `src/components/products/phone/demo.tsx`

- [ ] **Step 1: Create the component**

```tsx
import * as React from "react"
import { Check, Phone } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type Example = {
  raw: string
  e164: string
  country: string
  carrier: string
  lineType: string
  status: "active" | "disconnected"
}

// Placeholder records — real product hits live carrier data.
const EXAMPLES: Example[] = [
  {
    raw: "0412 345 678",
    e164: "+61412345678",
    country: "Australia",
    carrier: "Telstra",
    lineType: "mobile",
    status: "active",
  },
  {
    raw: "(02) 9374 4000",
    e164: "+61293744000",
    country: "Australia",
    carrier: "Telstra",
    lineType: "landline",
    status: "active",
  },
  {
    raw: "0400 000 000",
    e164: "+61400000000",
    country: "Australia",
    carrier: "—",
    lineType: "mobile",
    status: "disconnected",
  },
]

export function PhoneDemo() {
  const [index, setIndex] = React.useState(0)
  const [result, setResult] = React.useState<Example | null>(null)
  const current = EXAMPLES[index]

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-2xl shadow-primary/5">
      <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-3">
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="ml-2 font-mono text-xs text-muted-foreground">
          POST /v1/phone/verify
        </span>
      </div>

      <div className="grid gap-0 md:grid-cols-[1.1fr_1fr]">
        <div className="border-b p-6 md:border-r md:border-b-0">
          <label className="mb-2 block font-mono text-[0.7rem] tracking-wide text-muted-foreground uppercase">
            Phone number
          </label>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex, i) => (
              <button
                key={ex.e164}
                type="button"
                onClick={() => {
                  setIndex(i)
                  setResult(null)
                }}
                className={cn(
                  "rounded-md border px-2.5 py-1.5 text-left font-mono text-xs",
                  i === index
                    ? "border-primary/50 bg-primary/5 text-foreground"
                    : "bg-background text-muted-foreground"
                )}
              >
                {ex.raw}
              </button>
            ))}
          </div>
          <Button className="mt-4" onClick={() => setResult(current)}>
            <Phone className="size-4" /> Verify
          </Button>
          <p className="mt-3 font-mono text-[0.7rem] text-muted-foreground">
            Validate, normalise and check the line against live carrier data.
          </p>
        </div>

        <div className="bg-graticule-fine p-6">
          {result ? (
            <div className="flex h-full flex-col gap-4">
              <span
                className={cn(
                  "inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[0.7rem] font-medium",
                  result.status === "active"
                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                    : "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                )}
              >
                <Check className="size-3.5" />
                {result.status === "active" ? "ACTIVE" : "DISCONNECTED"}
              </span>
              <p className="font-mono text-sm font-medium">{result.e164}</p>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 font-mono text-xs">
                <div className="flex flex-col gap-0.5">
                  <dt className="text-[0.65rem] tracking-wide text-muted-foreground uppercase">
                    carrier
                  </dt>
                  <dd>{result.carrier}</dd>
                </div>
                <div className="flex flex-col gap-0.5">
                  <dt className="text-[0.65rem] tracking-wide text-muted-foreground uppercase">
                    line type
                  </dt>
                  <dd>{result.lineType}</dd>
                </div>
                <div className="flex flex-col gap-0.5">
                  <dt className="text-[0.65rem] tracking-wide text-muted-foreground uppercase">
                    country
                  </dt>
                  <dd>{result.country}</dd>
                </div>
                <div className="flex flex-col gap-0.5">
                  <dt className="text-[0.65rem] tracking-wide text-muted-foreground uppercase">
                    status
                  </dt>
                  <dd>{result.status}</dd>
                </div>
              </dl>
            </div>
          ) : (
            <div className="flex h-full min-h-44 flex-col items-center justify-center gap-2 text-center">
              <Phone className="size-7 text-muted-foreground/40" />
              <p className="max-w-[20ch] text-sm text-muted-foreground">
                Click Verify to check the carrier, line type and status.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Format, typecheck, lint**

Run: `bunx prettier --write src/components/products/phone/demo.tsx && bun run typecheck && bunx eslint src/components/products/phone/demo.tsx`
Expected: PASS, lint exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/products/phone/demo.tsx
git commit -m "feat(phone): add phone validation demo"
```

---

### Task 2: Phone demo section wrapper

**Files:**
- Create: `src/components/products/phone/demo-section.tsx`

- [ ] **Step 1: Create the component**

```tsx
import { PhoneDemo } from "@/components/products/phone/demo"

export function DemoSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-[0.7rem] tracking-[0.2em] text-primary uppercase">
          Live sandbox
        </p>
        <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
          Check a number before you dial.
        </h2>
      </div>
      <div className="mx-auto mt-10 max-w-3xl">
        <PhoneDemo />
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Format, typecheck, lint**

Run: `bunx prettier --write src/components/products/phone/demo-section.tsx && bun run typecheck && bunx eslint src/components/products/phone/demo-section.tsx`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/products/phone/demo-section.tsx
git commit -m "feat(phone): add demo section wrapper"
```

---

### Task 3: Phone hero

**Files:**
- Create: `src/components/products/phone/hero.tsx`

- [ ] **Step 1: Create the component**

```tsx
import { Link } from "react-router"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

const COVERAGE = ["AU", "International", "Mobile + landline"]

export function Hero() {
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
          Phone Verify
        </span>

        <h1
          className="reveal mt-6 max-w-3xl font-heading text-5xl leading-[1.05] font-medium tracking-tight text-balance sm:text-6xl"
          style={{ animationDelay: "80ms" }}
        >
          Know a number is real{" "}
          <span className="text-primary">before you dial.</span>
        </h1>

        <p
          className="reveal mt-6 max-w-xl text-lg text-muted-foreground"
          style={{ animationDelay: "160ms" }}
        >
          Validate Australian and international mobile and landline numbers —
          with carrier, line type and live disconnection detection in a single
          call.
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

        <div
          className="reveal mt-8 flex flex-wrap gap-2"
          style={{ animationDelay: "320ms" }}
        >
          {COVERAGE.map((c) => (
            <span
              key={c}
              className="rounded-full border bg-background/60 px-2.5 py-1 font-mono text-[0.7rem] text-muted-foreground"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Format, typecheck, lint**

Run: `bunx prettier --write src/components/products/phone/hero.tsx && bun run typecheck && bunx eslint src/components/products/phone/hero.tsx`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/products/phone/hero.tsx
git commit -m "feat(phone): add product hero"
```

---

### Task 4: Phone bento features (5 cells)

**Files:**
- Create: `src/components/products/phone/features.tsx`

Icons verified: `Check`, `Globe`, `PhoneOff`, `Radio`, `Signal`, `Smartphone`.

- [ ] **Step 1: Create the component**

```tsx
import * as React from "react"
import {
  Check,
  Globe,
  PhoneOff,
  Radio,
  Signal,
  Smartphone,
} from "lucide-react"

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
```

- [ ] **Step 2: Format, typecheck, lint**

Run: `bunx prettier --write src/components/products/phone/features.tsx && bun run typecheck && bunx eslint src/components/products/phone/features.tsx`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/products/phone/features.tsx
git commit -m "feat(phone): add bento features with visual panels"
```

---

### Task 5: Phone coverage band

**Files:**
- Create: `src/components/products/phone/coverage.tsx`

Icons verified: `Globe`, `Radio`, `Smartphone`.

- [ ] **Step 1: Create the component**

```tsx
import { Globe, Radio, Smartphone } from "lucide-react"
import type { LucideIcon } from "lucide-react"

type Stat = {
  icon: LucideIcon
  value: string
  label: string
}

const STATS: Stat[] = [
  { icon: Smartphone, value: "AU", label: "Mobile & landline coverage" },
  { icon: Globe, value: "200+", label: "Countries and numbering plans" },
  { icon: Radio, value: "Real-time", label: "Carrier & disconnection data" },
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
              Australian depth, global reach.
            </h2>
            <p className="mt-5 text-background/70">
              Validate every Australian mobile and landline against live carrier
              data, and reach international numbers across more than 200
              countries from the same endpoint.
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
                <div className="font-heading text-3xl font-medium tracking-tight">
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
```

- [ ] **Step 2: Format, typecheck, lint**

Run: `bunx prettier --write src/components/products/phone/coverage.tsx && bun run typecheck && bunx eslint src/components/products/phone/coverage.tsx`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/products/phone/coverage.tsx
git commit -m "feat(phone): add coverage & data band"
```

---

### Task 6: Phone trust band, FAQ, CTA band

**Files:**
- Create: `src/components/products/phone/trust-band.tsx`
- Create: `src/components/products/phone/faq.tsx`
- Create: `src/components/products/phone/cta-band.tsx`

- [ ] **Step 1: Create `trust-band.tsx`**

```tsx
const MARKERS = [
  "Real-time carrier data",
  "AU + international",
  "Mobile & landline",
  "ISO 27001",
  "IRAP assessed",
]

export function TrustBand() {
  return (
    <section className="border-b bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-center font-mono text-[0.7rem] tracking-[0.2em] text-muted-foreground uppercase">
          Built on trusted foundations
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {MARKERS.map((m) => (
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
```

- [ ] **Step 2: Create `faq.tsx`**

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type QA = { q: string; a: string }

const FAQS: QA[] = [
  {
    q: "What does carrier and line-type detection return?",
    a: "For each number we return the current carrier (including after porting) and the line type — mobile, landline or VoIP — so you can route SMS, calls and verification appropriately.",
  },
  {
    q: "How is disconnection detected?",
    a: "We check the number against live carrier data to flag disconnected, unallocated and unreachable numbers, so you can suppress them before sending.",
  },
  {
    q: "What coverage do you have outside Australia?",
    a: "Alongside full Australian mobile and landline coverage, Phone Verify validates international numbers across more than 200 countries and their numbering plans from the same API.",
  },
  {
    q: "What format do you return numbers in?",
    a: "Numbers are normalised to E.164 (for example +61412345678) so they're consistent and ready to store, alongside a national-format representation.",
  },
  {
    q: "How does pricing work?",
    a: "Every plan includes a free sandbox and all of Phone Verify's capabilities. You start free, then scale by lookup volume — see Pricing for tiers, or talk to an expert for enterprise and on-prem.",
  },
]

export function Faq() {
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
```

- [ ] **Step 3: Create `cta-band.tsx`**

```tsx
import { Link } from "react-router"

import { Button } from "@/components/ui/button"

export function CtaBand() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 sm:pb-28">
      <div className="overflow-hidden rounded-2xl border bg-foreground text-background">
        <div className="bg-graticule flex flex-col items-center gap-6 px-6 py-14 text-center">
          <h2 className="font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            Stop dialling dead numbers.
          </h2>
          <p className="max-w-xl text-background/70">
            Spin up a free sandbox, or talk to an expert about high-volume and
            enterprise verification.
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
```

- [ ] **Step 4: Format, typecheck, lint**

Run: `bunx prettier --write src/components/products/phone/trust-band.tsx src/components/products/phone/faq.tsx src/components/products/phone/cta-band.tsx && bun run typecheck && bunx eslint src/components/products/phone/trust-band.tsx src/components/products/phone/faq.tsx src/components/products/phone/cta-band.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/products/phone/trust-band.tsx src/components/products/phone/faq.tsx src/components/products/phone/cta-band.tsx
git commit -m "feat(phone): add trust band, FAQ and CTA band"
```

---

### Task 7: Assemble Phone page

**Files:**
- Modify: `src/pages/products/phone.tsx` (replace entire contents)

- [ ] **Step 1: Replace the stub**

```tsx
import { Hero } from "@/components/products/phone/hero"
import { TrustBand } from "@/components/products/phone/trust-band"
import { DemoSection } from "@/components/products/phone/demo-section"
import { Features } from "@/components/products/phone/features"
import { Coverage } from "@/components/products/phone/coverage"
import { Faq } from "@/components/products/phone/faq"
import { CtaBand } from "@/components/products/phone/cta-band"

export function PhoneVerify() {
  return (
    <>
      <Hero />
      <TrustBand />
      <DemoSection />
      <Features />
      <Coverage />
      <Faq />
      <CtaBand />
    </>
  )
}
```

- [ ] **Step 2: Format, typecheck, lint**

Run: `bunx prettier --write src/pages/products/phone.tsx && bun run typecheck && bunx eslint src/pages/products/phone.tsx`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/pages/products/phone.tsx
git commit -m "feat(phone): assemble Phone Verify product page"
```

---

## EMAIL VERIFY

### Task 8: Email validation demo

**Files:**
- Create: `src/components/products/email/demo.tsx`

Icons verified: `AtSign`, `Check`, `X`.

- [ ] **Step 1: Create the component**

```tsx
import * as React from "react"
import { AtSign, Check, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CheckRow = { label: string; pass: boolean }
type Risk = "low" | "medium" | "high"

type Example = {
  raw: string
  checks: CheckRow[]
  flags: string[]
  score: number
  risk: Risk
}

// Placeholder records — real product runs live MX/SMTP checks.
const EXAMPLES: Example[] = [
  {
    raw: "ada@geoscape.com.au",
    checks: [
      { label: "syntax", pass: true },
      { label: "mx", pass: true },
      { label: "smtp", pass: true },
    ],
    flags: ["deliverable"],
    score: 4,
    risk: "low",
  },
  {
    raw: "sales@gmial.com",
    checks: [
      { label: "syntax", pass: true },
      { label: "mx", pass: false },
      { label: "smtp", pass: false },
    ],
    flags: ["typo: gmail.com?", "undeliverable"],
    score: 82,
    risk: "high",
  },
  {
    raw: "user@mailinator.com",
    checks: [
      { label: "syntax", pass: true },
      { label: "mx", pass: true },
      { label: "smtp", pass: true },
    ],
    flags: ["disposable", "high risk"],
    score: 71,
    risk: "high",
  },
]

const RISK_TONE: Record<Risk, string> = {
  low: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  medium: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  high: "bg-red-500/10 text-red-700 dark:text-red-400",
}

export function EmailDemo() {
  const [index, setIndex] = React.useState(0)
  const [result, setResult] = React.useState<Example | null>(null)
  const current = EXAMPLES[index]

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-2xl shadow-primary/5">
      <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-3">
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="ml-2 font-mono text-xs text-muted-foreground">
          POST /v1/email/verify
        </span>
      </div>

      <div className="grid gap-0 md:grid-cols-[1.1fr_1fr]">
        <div className="border-b p-6 md:border-r md:border-b-0">
          <label className="mb-2 block font-mono text-[0.7rem] tracking-wide text-muted-foreground uppercase">
            Email address
          </label>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex, i) => (
              <button
                key={ex.raw}
                type="button"
                onClick={() => {
                  setIndex(i)
                  setResult(null)
                }}
                className={cn(
                  "rounded-md border px-2.5 py-1.5 text-left font-mono text-xs",
                  i === index
                    ? "border-primary/50 bg-primary/5 text-foreground"
                    : "bg-background text-muted-foreground"
                )}
              >
                {ex.raw}
              </button>
            ))}
          </div>
          <Button className="mt-4" onClick={() => setResult(current)}>
            <AtSign className="size-4" /> Verify
          </Button>
          <p className="mt-3 font-mono text-[0.7rem] text-muted-foreground">
            Syntax, MX, SMTP and risk scoring in one call.
          </p>
        </div>

        <div className="bg-graticule-fine p-6">
          {result ? (
            <div className="flex h-full flex-col gap-4">
              <span
                className={cn(
                  "inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[0.7rem] font-medium",
                  RISK_TONE[result.risk]
                )}
              >
                risk {result.score}/100 · {result.risk}
              </span>
              <ul className="flex flex-col gap-1.5 font-mono text-xs">
                {result.checks.map((c) => (
                  <li key={c.label} className="flex items-center gap-2">
                    {c.pass ? (
                      <Check className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <X className="size-3.5 text-red-600 dark:text-red-400" />
                    )}
                    <span className="text-muted-foreground">{c.label}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap gap-2">
                {result.flags.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border bg-background/60 px-2.5 py-1 font-mono text-[0.7rem] text-muted-foreground"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-44 flex-col items-center justify-center gap-2 text-center">
              <AtSign className="size-7 text-muted-foreground/40" />
              <p className="max-w-[20ch] text-sm text-muted-foreground">
                Click Verify to run syntax, MX, SMTP and risk checks.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Format, typecheck, lint**

Run: `bunx prettier --write src/components/products/email/demo.tsx && bun run typecheck && bunx eslint src/components/products/email/demo.tsx`
Expected: PASS. (The row type is named `CheckRow` to avoid colliding with the `Check` icon import.)

- [ ] **Step 3: Commit**

```bash
git add src/components/products/email/demo.tsx
git commit -m "feat(email): add email validation demo"
```

---

### Task 9: Email demo section wrapper

**Files:**
- Create: `src/components/products/email/demo-section.tsx`

- [ ] **Step 1: Create the component**

```tsx
import { EmailDemo } from "@/components/products/email/demo"

export function DemoSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-[0.7rem] tracking-[0.2em] text-primary uppercase">
          Live sandbox
        </p>
        <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
          Score an email before you send.
        </h2>
      </div>
      <div className="mx-auto mt-10 max-w-3xl">
        <EmailDemo />
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Format, typecheck, lint**

Run: `bunx prettier --write src/components/products/email/demo-section.tsx && bun run typecheck && bunx eslint src/components/products/email/demo-section.tsx`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/products/email/demo-section.tsx
git commit -m "feat(email): add demo section wrapper"
```

---

### Task 10: Email hero

**Files:**
- Create: `src/components/products/email/hero.tsx`

- [ ] **Step 1: Create the component**

```tsx
import { Link } from "react-router"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

const COVERAGE = ["Syntax", "MX + SMTP", "Risk score"]

export function Hero() {
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
          Email Verify
        </span>

        <h1
          className="reveal mt-6 max-w-3xl font-heading text-5xl leading-[1.05] font-medium tracking-tight text-balance sm:text-6xl"
          style={{ animationDelay: "80ms" }}
        >
          Catch bad email{" "}
          <span className="text-primary">before it bounces.</span>
        </h1>

        <p
          className="reveal mt-6 max-w-xl text-lg text-muted-foreground"
          style={{ animationDelay: "160ms" }}
        >
          Syntax, MX, SMTP and risk scoring in one call — so typos, disposables
          and risky addresses never reach your send list or your sender
          reputation.
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

        <div
          className="reveal mt-8 flex flex-wrap gap-2"
          style={{ animationDelay: "320ms" }}
        >
          {COVERAGE.map((c) => (
            <span
              key={c}
              className="rounded-full border bg-background/60 px-2.5 py-1 font-mono text-[0.7rem] text-muted-foreground"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Format, typecheck, lint**

Run: `bunx prettier --write src/components/products/email/hero.tsx && bun run typecheck && bunx eslint src/components/products/email/hero.tsx`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/products/email/hero.tsx
git commit -m "feat(email): add product hero"
```

---

### Task 11: Email bento features (5 cells)

**Files:**
- Create: `src/components/products/email/features.tsx`

Icons verified: `AtSign`, `Check`, `Gauge`, `Server`, `Trash2`, `UserX`, `X`.

- [ ] **Step 1: Create the component**

```tsx
import * as React from "react"
import { AtSign, Check, Gauge, Server, Trash2, UserX } from "lucide-react"

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

const SyntaxVisual = (
  <div className="w-full max-w-xs rounded-lg border bg-background/80 p-3 font-mono text-xs shadow-sm">
    <div className="flex items-center gap-2">
      <AtSign className="size-3.5 text-primary" />
      <span className="text-foreground">ada@geoscape.com.au</span>
    </div>
    <div className="mt-2 flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
      <Check className="size-3.5" /> valid format
    </div>
  </div>
)

const MxVisual = (
  <div className="w-full max-w-[13rem] rounded-lg border bg-background/80 p-3 font-mono text-xs shadow-sm">
    <div className="flex items-center gap-2 border-b pb-2 text-muted-foreground">
      <Server className="size-3.5 text-primary" /> MX records
    </div>
    <div className="mt-2 flex items-center justify-between">
      <span className="text-muted-foreground">aspmx.l.google.com</span>
      <span className="text-foreground">10</span>
    </div>
    <div className="mt-1 flex items-center justify-between">
      <span className="text-muted-foreground">alt1.aspmx…</span>
      <span className="text-foreground">20</span>
    </div>
  </div>
)

const SmtpVisual = (
  <div className="w-full max-w-[13rem] rounded-lg border bg-background/80 p-3 font-mono text-[0.7rem] shadow-sm">
    <div className="text-muted-foreground">RCPT TO:&lt;ada@…&gt;</div>
    <div className="mt-1 text-emerald-600 dark:text-emerald-400">
      250 2.1.5 OK
    </div>
    <div className="mt-1 text-muted-foreground">mailbox exists</div>
  </div>
)

const DisposableVisual = (
  <div className="flex w-full max-w-[12rem] flex-col gap-2 font-mono text-[0.7rem]">
    <span className="inline-flex items-center gap-1 rounded-full border border-red-500/30 bg-red-500/10 px-2 py-1 text-red-700 dark:text-red-400">
      <Trash2 className="size-3" /> disposable
    </span>
    <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-1 text-amber-700 dark:text-amber-400">
      <UserX className="size-3" /> role: sales@
    </span>
  </div>
)

const ScoreVisual = (
  <div className="flex w-full max-w-[12rem] flex-col items-center gap-3">
    <Gauge className="size-10 text-primary" />
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
      <div className="h-full w-1/5 rounded-full bg-emerald-500" />
    </div>
    <span className="font-mono text-[0.7rem] text-muted-foreground">
      risk 4/100 · low
    </span>
  </div>
)

const FEATURES: Feature[] = [
  {
    category: "Syntax validation",
    title: "Catch typos and malformed addresses",
    body: "Confirm an address is RFC-correct before anything else — the cheapest bounce to prevent.",
    visual: SyntaxVisual,
    className: "lg:col-span-3 lg:rounded-tl-4xl max-lg:rounded-t-4xl",
  },
  {
    category: "MX record check",
    title: "Can the domain receive mail at all?",
    body: "Look up the domain's MX records to confirm there's a mail server ready to accept delivery.",
    visual: MxVisual,
    className: "lg:col-span-3 lg:rounded-tr-4xl",
  },
  {
    category: "SMTP mailbox check",
    title: "Does the mailbox actually exist?",
    body: "A live SMTP probe confirms the specific mailbox accepts mail — without sending anything.",
    visual: SmtpVisual,
    className: "lg:col-span-2 lg:rounded-bl-4xl",
  },
  {
    category: "Disposable & role",
    title: "Flag throwaways and role accounts",
    body: "Detect disposable domains and role addresses like sales@ or info@ that signal low intent.",
    visual: DisposableVisual,
    className: "lg:col-span-2",
  },
  {
    category: "Risk scoring",
    title: "One score for deliverability",
    body: "Roll every signal into a single 0–100 risk score so you can accept, challenge or block in one check.",
    visual: ScoreVisual,
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
          Every check between a typo and a bounce.
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
```

- [ ] **Step 2: Format, typecheck, lint**

Run: `bunx prettier --write src/components/products/email/features.tsx && bun run typecheck && bunx eslint src/components/products/email/features.tsx`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/products/email/features.tsx
git commit -m "feat(email): add bento features with visual panels"
```

---

### Task 12: Email coverage band

**Files:**
- Create: `src/components/products/email/coverage.tsx`

Icons verified: `Gauge`, `Globe`, `Server`.

- [ ] **Step 1: Create the component**

```tsx
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
```

- [ ] **Step 2: Format, typecheck, lint**

Run: `bunx prettier --write src/components/products/email/coverage.tsx && bun run typecheck && bunx eslint src/components/products/email/coverage.tsx`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/products/email/coverage.tsx
git commit -m "feat(email): add coverage & data band"
```

---

### Task 13: Email trust band, FAQ, CTA band

**Files:**
- Create: `src/components/products/email/trust-band.tsx`
- Create: `src/components/products/email/faq.tsx`
- Create: `src/components/products/email/cta-band.tsx`

- [ ] **Step 1: Create `trust-band.tsx`**

```tsx
const MARKERS = [
  "Real-time SMTP checks",
  "Disposable & role detection",
  "Risk scoring",
  "ISO 27001",
  "IRAP assessed",
]

export function TrustBand() {
  return (
    <section className="border-b bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-center font-mono text-[0.7rem] tracking-[0.2em] text-muted-foreground uppercase">
          Built on trusted foundations
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {MARKERS.map((m) => (
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
```

- [ ] **Step 2: Create `faq.tsx`**

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type QA = { q: string; a: string }

const FAQS: QA[] = [
  {
    q: "What does the risk score mean?",
    a: "We roll every signal — syntax, MX, SMTP, disposable and role detection — into a single 0–100 score. Lower is safer; you choose thresholds to accept, challenge or block an address.",
  },
  {
    q: "How does the SMTP mailbox check work?",
    a: "We open an SMTP conversation with the receiving server and confirm the mailbox would accept mail, without ever delivering a message. For catch-all domains that accept everything, we flag the result as inconclusive rather than guessing.",
  },
  {
    q: "Do you detect disposable and role addresses?",
    a: "Yes. We flag disposable domains (throwaway inboxes) and role accounts such as info@ or sales@, both of which correlate with low engagement and higher risk.",
  },
  {
    q: "Is it safe to run against my list — will it hurt deliverability?",
    a: "Yes. Checks are read-only: no email is ever sent during verification, so your sender reputation is untouched. In fact, removing undeliverable and risky addresses protects it.",
  },
  {
    q: "How does pricing work?",
    a: "Every plan includes a free sandbox and all of Email Verify's capabilities. You start free, then scale by lookup volume — see Pricing for tiers, or talk to an expert for enterprise and on-prem.",
  },
]

export function Faq() {
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
```

- [ ] **Step 3: Create `cta-band.tsx`**

```tsx
import { Link } from "react-router"

import { Button } from "@/components/ui/button"

export function CtaBand() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 sm:pb-28">
      <div className="overflow-hidden rounded-2xl border bg-foreground text-background">
        <div className="bg-graticule flex flex-col items-center gap-6 px-6 py-14 text-center">
          <h2 className="font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            Protect your sender reputation.
          </h2>
          <p className="max-w-xl text-background/70">
            Spin up a free sandbox, or talk to an expert about list cleansing and
            high-volume verification.
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
```

- [ ] **Step 4: Format, typecheck, lint**

Run: `bunx prettier --write src/components/products/email/trust-band.tsx src/components/products/email/faq.tsx src/components/products/email/cta-band.tsx && bun run typecheck && bunx eslint src/components/products/email/trust-band.tsx src/components/products/email/faq.tsx src/components/products/email/cta-band.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/products/email/trust-band.tsx src/components/products/email/faq.tsx src/components/products/email/cta-band.tsx
git commit -m "feat(email): add trust band, FAQ and CTA band"
```

---

### Task 14: Assemble Email page

**Files:**
- Modify: `src/pages/products/email.tsx` (replace entire contents)

- [ ] **Step 1: Replace the stub**

```tsx
import { Hero } from "@/components/products/email/hero"
import { TrustBand } from "@/components/products/email/trust-band"
import { DemoSection } from "@/components/products/email/demo-section"
import { Features } from "@/components/products/email/features"
import { Coverage } from "@/components/products/email/coverage"
import { Faq } from "@/components/products/email/faq"
import { CtaBand } from "@/components/products/email/cta-band"

export function EmailVerify() {
  return (
    <>
      <Hero />
      <TrustBand />
      <DemoSection />
      <Features />
      <Coverage />
      <Faq />
      <CtaBand />
    </>
  )
}
```

- [ ] **Step 2: Format, typecheck, lint**

Run: `bunx prettier --write src/pages/products/email.tsx && bun run typecheck && bunx eslint src/pages/products/email.tsx`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/pages/products/email.tsx
git commit -m "feat(email): assemble Email Verify product page"
```

---

### Task 15: Build + browser smoke verification

**Files:** none (verification only)

- [ ] **Step 1: Production build**

Run: `bun run build`
Expected: typecheck + Vite build succeed, `dist/` produced, no errors.

- [ ] **Step 2: Browser smoke (headless Chrome via CDP)**

Start the dev server (`bun run dev`), then drive headless Chrome to `/products/phone` and `/products/email`. For each page verify:
- Renders in both light and dark (toggle via `localStorage.setItem('theme', ...)` + reload).
- The validation demo responds: click a preset chip, click Verify (use a real CDP mouse event or `el.click()` on the plain `<button>` — these demos are NOT Radix tabs, so synthetic clicks work), and the result card appears (Phone: carrier/line type/status; Email: risk score + syntax/mx/smtp checklist).
- Bento renders 5 cells with visual panels.
- FAQ accordion expands/collapses (Radix accordion — use a real CDP mouse event on the trigger).
- `0` console errors.

Stop the dev server and any Chrome processes after.

- [ ] **Step 3: Final commit (if any tweaks were needed)**

```bash
git add -A
git commit -m "chore(phone,email): product pages verified"
```

---

## Self-Review

- **Spec coverage — Phone:** hero w/ chips + dual CTA (Task 3) ✓; trust band (Task 6) ✓; single validation demo w/ carrier/line-type/status incl. disconnected example (Tasks 1–2) ✓; 5-cell bento incl. carrier/line-type/disconnection/international (Task 4) ✓; coverage band (Task 5) ✓; FAQ ~5 (Task 6) ✓; CTA (Task 6) ✓; assembly (Task 7) ✓.
- **Spec coverage — Email:** hero w/ chips + dual CTA (Task 10) ✓; trust band (Task 13) ✓; single validation demo w/ syntax/mx/smtp checklist + risk score + disposable/typo examples (Tasks 8–9) ✓; 5-cell bento incl. syntax/MX/SMTP/disposable-role/risk (Task 11) ✓; coverage band (Task 12) ✓; FAQ ~5 incl. risk-score + deliverability-safety (Task 13) ✓; CTA (Task 13) ✓; assembly (Task 14) ✓.
- **Shared:** design language inherited (Fraunces/mono/graticule/reveal/tokens), single demo (no tabs), bespoke demos (no AddressDemo reuse), CTAs `/docs`+`/trust`, no new deps/routes ✓. Build+smoke (Task 15) ✓.
- **Placeholders:** none — all code complete; figures are final placeholder copy.
- **Type/name consistency:** `PhoneDemo`/`EmailDemo` (Tasks 1, 8) consumed by `DemoSection` (Tasks 2, 9); each page imports `Hero/TrustBand/DemoSection/Features/Coverage/Faq/CtaBand` with matching names (Tasks 7, 14); page exports `PhoneVerify`/`EmailVerify` match existing route imports in `src/App.tsx` (verified). shadcn `Accordion*`/`Button` exports verified against vendored files. All lucide icons verified present.
- **Known risks flagged in-task:** Task 8 — the row type is named `CheckRow` to avoid colliding with the `Check` icon import (resolved in the code). Task 11 — import list excludes the unused `X` icon (resolved in the code). Task 15 — accordion needs a real CDP mouse event; the plain demo buttons accept synthetic clicks. Every task runs `bunx prettier --write` before commit to avoid the className-reflow churn seen on prior pages.
