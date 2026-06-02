# G-NAF Verify Product Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `/products/gnaf` `PageStub` with a full marketing page covering address validation, autocomplete, bulk/batch validation, geocoding, reverse geocoding, plus coverage, trust markers, and FAQ — in the established site design language.

**Architecture:** Small, focused section components under `src/components/products/gnaf/`, orchestrated by `src/pages/products/gnaf.tsx`. Reuses the existing `AddressDemo` (home) and vendored `tabs`/`accordion`/`button` shadcn components. A tabbed live demo pairs the existing autocomplete with a new validation demo. No new dependencies, no new routes, no API calls (all demo data is placeholder, clearly mocked).

**Tech Stack:** React 19, react-router v7, Tailwind v4, shadcn/ui (`tabs`, `accordion`, `button`), lucide-react icons, TypeScript (strict), bun.

**Testing note:** This repo has **no test runner** (YAGNI — the spec adds none). Verification per task uses `bun run typecheck`, `bunx eslint <files>`, and a final `bun run build` + headless-browser smoke. Follow existing style: no semicolons, double quotes, 2-space indent, `@/` imports, `cn()` for classNames, semantic color tokens only. All icons referenced below are verified to exist in `lucide-react`.

---

### Task 1: Validation demo component

**Files:**
- Create: `src/components/products/gnaf/validation-demo.tsx`

- [ ] **Step 1: Create the component**

A self-contained interactive demo: pick (or the default-selected) a messy address example, click "Validate", and see a standardised/corrected result card with status flags. Same data-terminal styling as `AddressDemo`. Placeholder data only.

```tsx
import * as React from "react"
import { Check, Wand2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type Example = {
  raw: string
  standardised: string
  locality: string
  state: string
  postcode: string
  pid: string
  flags: string[]
}

// Placeholder records — real product validates against G-NAF.
const EXAMPLES: Example[] = [
  {
    raw: "12 bourke st melb vic",
    standardised: "12 Bourke Street, Melbourne VIC 3000",
    locality: "Melbourne",
    state: "VIC",
    postcode: "3000",
    pid: "GAVIC_424037215",
    flags: ["corrected", "postcode added", "verified"],
  },
  {
    raw: "Unit 5 200 geroge street sydney",
    standardised: "5/200 George Street, Sydney NSW 2000",
    locality: "Sydney",
    state: "NSW",
    postcode: "2000",
    pid: "GANSW_705124883",
    flags: ["typo fixed", "unit parsed", "verified"],
  },
  {
    raw: "1 william st brisbane qld",
    standardised: "1 William Street, Brisbane QLD 4000",
    locality: "Brisbane",
    state: "QLD",
    postcode: "4000",
    pid: "GAQLD_155902014",
    flags: ["standardised", "postcode added", "verified"],
  },
]

export function ValidationDemo() {
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
          POST /v1/address/validate
        </span>
      </div>

      <div className="grid gap-0 md:grid-cols-[1.1fr_1fr]">
        <div className="border-b p-6 md:border-r md:border-b-0">
          <label className="mb-2 block font-mono text-[0.7rem] tracking-wide text-muted-foreground uppercase">
            Messy input
          </label>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex, i) => (
              <button
                key={ex.pid}
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
            <Wand2 className="size-4" /> Validate
          </Button>
          <p className="mt-3 font-mono text-[0.7rem] text-muted-foreground">
            Standardise, correct and confirm against 15.4M G-NAF records.
          </p>
        </div>

        <div className="bg-graticule-fine p-6">
          {result ? (
            <div className="flex h-full flex-col gap-4">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 font-mono text-[0.7rem] font-medium text-emerald-700 dark:text-emerald-400">
                <Check className="size-3.5" /> VERIFIED
              </span>
              <p className="text-sm font-medium">{result.standardised}</p>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 font-mono text-xs">
                <div className="flex flex-col gap-0.5">
                  <dt className="text-[0.65rem] tracking-wide text-muted-foreground uppercase">
                    g-naf pid
                  </dt>
                  <dd className="truncate">{result.pid}</dd>
                </div>
                <div className="flex flex-col gap-0.5">
                  <dt className="text-[0.65rem] tracking-wide text-muted-foreground uppercase">
                    postcode
                  </dt>
                  <dd>{result.postcode}</dd>
                </div>
              </dl>
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
              <Wand2 className="size-7 text-muted-foreground/40" />
              <p className="max-w-[20ch] text-sm text-muted-foreground">
                Click Validate to standardise and verify the address.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Typecheck + lint**

Run: `bun run typecheck && bunx eslint src/components/products/gnaf/validation-demo.tsx`
Expected: PASS, lint exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/products/gnaf/validation-demo.tsx
git commit -m "feat(gnaf): add address validation demo"
```

---

### Task 2: Tabbed demo wrapper

**Files:**
- Create: `src/components/products/gnaf/demo.tsx`

Uses vendored `@/components/ui/tabs` (exports `Tabs, TabsList, TabsTrigger, TabsContent`), reuses `@/components/home/address-demo` and the `ValidationDemo` from Task 1.

- [ ] **Step 1: Create the component**

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddressDemo } from "@/components/home/address-demo"
import { ValidationDemo } from "@/components/products/gnaf/validation-demo"

export function GnafDemo() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-[0.7rem] tracking-[0.2em] text-primary uppercase">
          Live sandbox
        </p>
        <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
          Try it on a real Australian address.
        </h2>
      </div>

      <Tabs defaultValue="autocomplete" className="mt-10 items-center">
        <TabsList>
          <TabsTrigger value="autocomplete">Autocomplete</TabsTrigger>
          <TabsTrigger value="validation">Validation</TabsTrigger>
        </TabsList>
        <TabsContent value="autocomplete" className="mt-8 w-full">
          <AddressDemo />
        </TabsContent>
        <TabsContent value="validation" className="mt-8 w-full">
          <ValidationDemo />
        </TabsContent>
      </Tabs>
    </section>
  )
}
```

- [ ] **Step 2: Typecheck + lint**

Run: `bun run typecheck && bunx eslint src/components/products/gnaf/demo.tsx`
Expected: PASS, lint exit 0. If `Tabs` sub-component names differ, open `src/components/ui/tabs.tsx` and match the actual exports.

- [ ] **Step 3: Commit**

```bash
git add src/components/products/gnaf/demo.tsx
git commit -m "feat(gnaf): add tabbed live demo (autocomplete + validation)"
```

---

### Task 3: Hero

**Files:**
- Create: `src/components/products/gnaf/hero.tsx`

- [ ] **Step 1: Create the component**

```tsx
import { Link } from "react-router"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

const COVERAGE = ["AU", "NZ", "Global (optional)"]

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
          G-NAF Verify
        </span>

        <h1
          className="reveal mt-6 max-w-3xl font-heading text-5xl leading-[1.05] font-medium tracking-tight text-balance sm:text-6xl"
          style={{ animationDelay: "80ms" }}
        >
          Australian addresses, validated against the{" "}
          <span className="text-primary">source.</span>
        </h1>

        <p
          className="reveal mt-6 max-w-xl text-lg text-muted-foreground"
          style={{ animationDelay: "160ms" }}
        >
          Validation, autocomplete, batch cleansing and rooftop geocoding —
          powered by G-NAF®, the authoritative dataset the rest of the industry
          depends on.
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

- [ ] **Step 2: Typecheck + lint**

Run: `bun run typecheck && bunx eslint src/components/products/gnaf/hero.tsx`
Expected: PASS, lint exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/products/gnaf/hero.tsx
git commit -m "feat(gnaf): add product hero"
```

---

### Task 4: Feature sections

**Files:**
- Create: `src/components/products/gnaf/features.tsx`

Five capabilities as alternating rows, data-driven. Icons verified: `Wand2`, `Search`, `Database`, `Locate`, `Crosshair`.

- [ ] **Step 1: Create the component**

```tsx
import {
  Crosshair,
  Database,
  Locate,
  Search,
  Wand2,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type Feature = {
  icon: LucideIcon
  name: string
  body: string
  detail: string
}

const FEATURES: Feature[] = [
  {
    icon: Wand2,
    name: "Address validation",
    body: "Standardise, correct and confirm any Australian or New Zealand address against the authoritative dataset — in real time.",
    detail: "corrects typos · parses units · adds postcodes",
  },
  {
    icon: Search,
    name: "Address autocomplete",
    body: "Type-ahead suggestions straight from the source, so users pick a verified address instead of typing a wrong one.",
    detail: "< 50ms suggestions · keyboard navigable",
  },
  {
    icon: Database,
    name: "Bulk & batch validation",
    body: "Clean an entire database in one job. Submit millions of records via batch and collect results through webhooks.",
    detail: "batch endpoint · webhooks · CSV in/out",
  },
  {
    icon: Locate,
    name: "Geocoding",
    body: "Resolve any address to a precise rooftop latitude and longitude — not a street-centroid approximation.",
    detail: "rooftop lat/long · confidence score",
  },
  {
    icon: Crosshair,
    name: "Reverse geocoding",
    body: "Turn coordinates into the nearest authoritative address — ideal for field services and mobile capture.",
    detail: "lat/long → G-NAF address + PID",
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
          One endpoint family for every address operation.
        </h2>
      </div>

      <div className="mt-14 flex flex-col gap-px overflow-hidden rounded-xl border bg-border">
        {FEATURES.map((f, i) => (
          <div
            key={f.name}
            className={cn(
              "flex flex-col gap-4 bg-card p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8",
              i % 2 === 1 && "sm:flex-row-reverse"
            )}
          >
            <div className="flex items-center gap-4 sm:w-64 sm:shrink-0">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <f.icon className="size-5" />
              </span>
              <h3 className="font-heading text-xl font-medium tracking-tight">
                {f.name}
              </h3>
            </div>
            <div className="sm:flex-1">
              <p className="text-muted-foreground">{f.body}</p>
              <p className="mt-2 font-mono text-[0.7rem] text-muted-foreground/80">
                {f.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Typecheck + lint**

Run: `bun run typecheck && bunx eslint src/components/products/gnaf/features.tsx`
Expected: PASS, lint exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/products/gnaf/features.tsx
git commit -m "feat(gnaf): add capability feature sections"
```

---

### Task 5: Coverage & freshness band

**Files:**
- Create: `src/components/products/gnaf/coverage.tsx`

Inverted dark band (matches home's Why Geoscape). Icons verified: `Globe`, `RefreshCw`, `Database`.

- [ ] **Step 1: Create the component**

```tsx
import { Database, Globe, RefreshCw } from "lucide-react"
import type { LucideIcon } from "lucide-react"

type Stat = {
  icon: LucideIcon
  value: string
  label: string
}

const STATS: Stat[] = [
  { icon: Database, value: "15.4M", label: "Australian addresses in G-NAF" },
  { icon: Globe, value: "AU + NZ", label: "Authoritative native coverage" },
  { icon: RefreshCw, value: "Daily", label: "Updated at the source" },
]

export function Coverage() {
  return (
    <section className="border-y bg-foreground text-background">
      <div className="bg-graticule">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="max-w-2xl">
            <p className="font-mono text-[0.7rem] tracking-[0.2em] text-background/60 uppercase">
              Coverage &amp; freshness
            </p>
            <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
              Native to Australia and New Zealand. Global when you need it.
            </h2>
            <p className="mt-5 text-background/70">
              We don&rsquo;t licence someone else&rsquo;s map — we publish it.
              G-NAF for Australia, authoritative data for New Zealand, and
              optional Global Services to validate addresses worldwide from the
              same API.
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-background/15 bg-background/15 sm:grid-cols-3">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col gap-3 bg-foreground p-6">
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

- [ ] **Step 2: Typecheck + lint**

Run: `bun run typecheck && bunx eslint src/components/products/gnaf/coverage.tsx`
Expected: PASS, lint exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/products/gnaf/coverage.tsx
git commit -m "feat(gnaf): add coverage & freshness band"
```

---

### Task 6: Trust markers band

**Files:**
- Create: `src/components/products/gnaf/trust-band.tsx`

- [ ] **Step 1: Create the component**

```tsx
const MARKERS = [
  "G-NAF®",
  "AMAS Certified by Australia Post",
  "ISO 27001",
  "IRAP assessed",
]

export function TrustBand() {
  return (
    <section className="border-b bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-center font-mono text-[0.7rem] tracking-[0.2em] text-muted-foreground uppercase">
          Authoritative foundations
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

- [ ] **Step 2: Typecheck + lint**

Run: `bun run typecheck && bunx eslint src/components/products/gnaf/trust-band.tsx`
Expected: PASS, lint exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/products/gnaf/trust-band.tsx
git commit -m "feat(gnaf): add trust markers band"
```

---

### Task 7: FAQ

**Files:**
- Create: `src/components/products/gnaf/faq.tsx`

Uses vendored `@/components/ui/accordion` (exports `Accordion, AccordionItem, AccordionTrigger, AccordionContent`).

- [ ] **Step 1: Create the component**

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
    q: "How accurate is the data, and where does it come from?",
    a: "G-NAF Verify is built on G-NAF® — the Geocoded National Address File — which Geoscape produces as Australia's authoritative address dataset. It covers 15.4M addresses and is updated daily, so you validate against the source rather than a scraped or stitched copy.",
  },
  {
    q: "What's covered in Australia, New Zealand, and globally?",
    a: "Australia and New Zealand are covered natively with authoritative data. For addresses in other countries, optional Global Services validate and standardise worldwide addresses through the same API, so you don't need a second vendor.",
  },
  {
    q: "Can I run this on-premise or in my own environment?",
    a: "Yes. Alongside the hosted API we offer on-prem and private deployment options for organisations with data-residency or sovereignty requirements, including government and critical infrastructure.",
  },
  {
    q: "Are there batch size limits?",
    a: "Batch validation is designed for whole-database cleansing — submit millions of records per job and receive results via webhook or file. Practical limits depend on your plan; enterprise plans are sized to your volume.",
  },
  {
    q: "How does pricing work?",
    a: "Every plan includes a free sandbox and all of G-NAF Verify's capabilities. You start free, then scale by lookup volume — see Pricing for tiers, or talk to an expert for enterprise and on-prem.",
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

- [ ] **Step 2: Typecheck + lint**

Run: `bun run typecheck && bunx eslint src/components/products/gnaf/faq.tsx`
Expected: PASS, lint exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/products/gnaf/faq.tsx
git commit -m "feat(gnaf): add FAQ accordion"
```

---

### Task 8: Closing CTA band

**Files:**
- Create: `src/components/products/gnaf/cta-band.tsx`

Mirrors home's closing CTA pattern, with this page's CTAs (Start free trial / Talk to an expert).

- [ ] **Step 1: Create the component**

```tsx
import { Link } from "react-router"

import { Button } from "@/components/ui/button"

export function CtaBand() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 sm:pb-28">
      <div className="overflow-hidden rounded-2xl border bg-foreground text-background">
        <div className="bg-graticule flex flex-col items-center gap-6 px-6 py-14 text-center">
          <h2 className="font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            Verify your first Australian address in minutes.
          </h2>
          <p className="max-w-xl text-background/70">
            Spin up a free sandbox, or talk to an expert about batch, on-prem and
            enterprise coverage.
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

- [ ] **Step 2: Typecheck + lint**

Run: `bun run typecheck && bunx eslint src/components/products/gnaf/cta-band.tsx`
Expected: PASS, lint exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/products/gnaf/cta-band.tsx
git commit -m "feat(gnaf): add closing CTA band"
```

---

### Task 9: Assemble the page

**Files:**
- Modify: `src/pages/products/gnaf.tsx` (replace entire contents)

- [ ] **Step 1: Replace the stub**

```tsx
import { Hero } from "@/components/products/gnaf/hero"
import { GnafDemo } from "@/components/products/gnaf/demo"
import { Features } from "@/components/products/gnaf/features"
import { Coverage } from "@/components/products/gnaf/coverage"
import { TrustBand } from "@/components/products/gnaf/trust-band"
import { Faq } from "@/components/products/gnaf/faq"
import { CtaBand } from "@/components/products/gnaf/cta-band"

export function GnafVerify() {
  return (
    <>
      <Hero />
      <TrustBand />
      <GnafDemo />
      <Features />
      <Coverage />
      <Faq />
      <CtaBand />
    </>
  )
}
```

- [ ] **Step 2: Typecheck + lint**

Run: `bun run typecheck && bunx eslint src/pages/products/gnaf.tsx`
Expected: PASS, lint exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/pages/products/gnaf.tsx
git commit -m "feat(gnaf): assemble G-NAF Verify product page"
```

---

### Task 10: Build + browser smoke verification

**Files:** none (verification only)

- [ ] **Step 1: Production build**

Run: `bun run build`
Expected: typecheck + Vite build succeed, `dist/` produced, no errors.

- [ ] **Step 2: Browser smoke (headless Chrome via CDP)**

Start the dev server (`bun run dev`), then drive headless Chrome to `/products/gnaf`. Verify:
- Page renders in both light and dark (toggle via `localStorage.setItem('theme', ...)` + reload).
- Demo tabs switch between Autocomplete and Validation.
- Autocomplete: typing filters suggestions; selecting one shows the VERIFIED card.
- Validation: clicking "Validate" shows the standardised result + flags.
- FAQ accordion expands/collapses.
- `0` console errors.

Stop the dev server and any Chrome processes after.

- [ ] **Step 3: Final commit (if any tweaks were needed)**

```bash
git add -A
git commit -m "chore(gnaf): product page verified"
```

---

## Self-Review

- **Spec coverage:** Hero w/ dual CTA + coverage chips (Task 3) ✓; tabbed demo autocomplete+validation, reverse-geo excluded from demo (Tasks 1–2) ✓; five feature sections incl. reverse geocoding (Task 4) ✓; coverage & freshness AU/NZ/Global band (Task 5) ✓; trust markers (Task 6) ✓; FAQ accordion ~5 Q&As (Task 7) ✓; closing CTA band (Task 8) ✓; page assembly (Task 9) ✓; build+browser smoke (Task 10) ✓. Design language (Fraunces/mono/graticule/reveal/tokens) applied throughout ✓. CTAs use `/docs` + `/trust` ✓. No new deps/routes ✓.
- **Placeholders:** none — every code step is complete; marketing copy is final placeholder text.
- **Type/name consistency:** `ValidationDemo` (Task 1) consumed in Task 2; `GnafDemo`/`Hero`/`Features`/`Coverage`/`TrustBand`/`Faq`/`CtaBand` defined in Tasks 2–8 and imported with matching names in Task 9. shadcn exports (`Tabs/TabsList/TabsTrigger/TabsContent`, `Accordion/AccordionItem/AccordionTrigger/AccordionContent`) verified against the vendored files. All lucide icons verified present.
- **Known risk flagged in-task:** Task 2 Step 2 tells the engineer to reconcile `Tabs` export names if typecheck complains.
