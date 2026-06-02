# MailPoint Verify Product Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `/products/mailpoint` `PageStub` with a full marketing page covering AMAS-certified postal verification, postal autocomplete, PO Box & Parcel Locker support, DPID & barcode output, and geocoding — mirroring the G-NAF Verify page's structure and design language.

**Architecture:** Small, focused section components under `src/components/products/mailpoint/`, orchestrated by `src/pages/products/mailpoint.tsx`. Reuses the existing `AddressDemo` (home) for the autocomplete tab and the vendored `tabs`/`accordion`/`button` shadcn components. A tabbed live demo pairs autocomplete with a new postal validation demo that returns DPID + barcode. A 5-cell bento with on-theme visual panels (token-built mini mockups, NOT external images) mirrors the G-NAF features section. No new dependencies, no new routes, no API calls (all demo data is placeholder, clearly mocked).

**Tech Stack:** React 19, react-router v7, Tailwind v4, shadcn/ui (`tabs`, `accordion`, `button`), lucide-react icons, TypeScript (strict), bun.

**Testing note:** This repo has **no test runner** (YAGNI — the spec adds none). Verification per task uses `bun run typecheck`, `bunx eslint <files>`, and a final `bun run build` + headless-browser smoke. Follow existing style: no semicolons, double quotes, 2-space indent, `@/` imports, `cn()` for classNames, semantic color tokens only. All icons referenced below are verified to exist in `lucide-react`. The visual reference is the existing `src/components/products/gnaf/` directory — keep the two pages visually consistent.

---

### Task 1: Postal validation demo component

**Files:**
- Create: `src/components/products/mailpoint/validation-demo.tsx`

Postal-flavoured validation demo: pick a messy postal example (incl. a PO Box and a Parcel Locker), click Validate, see a standardised result with DPID, a barcode strip, postcode and geocode. Same data-terminal card styling as the G-NAF validation demo.

- [ ] **Step 1: Create the component**

```tsx
import * as React from "react"
import { Check, Wand2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type Example = {
  raw: string
  standardised: string
  postcode: string
  dpid: string
  barcode: string
  lat: string
  lng: string
  flags: string[]
}

// Placeholder records — real product validates against AusPost PAF / NZ Post.
const EXAMPLES: Example[] = [
  {
    raw: "12 bourke st melb vic",
    standardised: "12 Bourke Street, Melbourne VIC 3000",
    postcode: "3000",
    dpid: "61320578",
    barcode: "13011 01100 10011 00101 010",
    lat: "-37.81467",
    lng: "144.96780",
    flags: ["corrected", "postcode added", "deliverable"],
  },
  {
    raw: "po box 1234 sydney nsw",
    standardised: "PO Box 1234, Sydney NSW 2001",
    postcode: "2001",
    dpid: "78451209",
    barcode: "13011 00110 10100 11001 010",
    lat: "-33.86419",
    lng: "151.20835",
    flags: ["PO Box", "deliverable"],
  },
  {
    raw: "parcel locker 100 234 567 brisbane",
    standardised: "Parcel Locker 100234567, Brisbane QLD 4000",
    postcode: "4000",
    dpid: "90233415",
    barcode: "13011 01010 01100 10110 010",
    lat: "-27.47192",
    lng: "153.02410",
    flags: ["Parcel Locker", "deliverable"],
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
          POST /v1/mail/validate
        </span>
      </div>

      <div className="grid gap-0 md:grid-cols-[1.1fr_1fr]">
        <div className="border-b p-6 md:border-r md:border-b-0">
          <label className="mb-2 block font-mono text-[0.7rem] tracking-wide text-muted-foreground uppercase">
            Messy postal input
          </label>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex, i) => (
              <button
                key={ex.dpid}
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
            AMAS-certified against AusPost PAF — returns DPID &amp; barcode.
          </p>
        </div>

        <div className="bg-graticule-fine p-6">
          {result ? (
            <div className="flex h-full flex-col gap-4">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 font-mono text-[0.7rem] font-medium text-emerald-700 dark:text-emerald-400">
                <Check className="size-3.5" /> DELIVERABLE
              </span>
              <p className="text-sm font-medium">{result.standardised}</p>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 font-mono text-xs">
                <div className="flex flex-col gap-0.5">
                  <dt className="text-[0.65rem] tracking-wide text-muted-foreground uppercase">
                    dpid
                  </dt>
                  <dd>{result.dpid}</dd>
                </div>
                <div className="flex flex-col gap-0.5">
                  <dt className="text-[0.65rem] tracking-wide text-muted-foreground uppercase">
                    postcode
                  </dt>
                  <dd>{result.postcode}</dd>
                </div>
                <div className="col-span-2 flex flex-col gap-1">
                  <dt className="text-[0.65rem] tracking-wide text-muted-foreground uppercase">
                    barcode
                  </dt>
                  <dd className="font-mono text-[0.65rem] tracking-[0.2em] text-muted-foreground">
                    {result.barcode}
                  </dd>
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
                Click Validate for the standardised, deliverable result.
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

Run: `bun run typecheck && bunx eslint src/components/products/mailpoint/validation-demo.tsx`
Expected: PASS, lint exit 0. Note: `lat`/`lng` are type fields kept for parity with the data shape; if strict mode flags them as unused that won't happen — they are object properties, not bindings.

- [ ] **Step 3: Commit**

```bash
git add src/components/products/mailpoint/validation-demo.tsx
git commit -m "feat(mailpoint): add postal validation demo"
```

---

### Task 2: Tabbed demo wrapper

**Files:**
- Create: `src/components/products/mailpoint/demo.tsx`

Uses vendored `@/components/ui/tabs` (exports `Tabs, TabsList, TabsTrigger, TabsContent`), reuses `@/components/home/address-demo` and the `ValidationDemo` from Task 1.

- [ ] **Step 1: Create the component**

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddressDemo } from "@/components/home/address-demo"
import { ValidationDemo } from "@/components/products/mailpoint/validation-demo"

export function MailpointDemo() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-[0.7rem] tracking-[0.2em] text-primary uppercase">
          Live sandbox
        </p>
        <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
          Try it on a real postal address.
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

Run: `bun run typecheck && bunx eslint src/components/products/mailpoint/demo.tsx`
Expected: PASS, lint exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/products/mailpoint/demo.tsx
git commit -m "feat(mailpoint): add tabbed live demo (autocomplete + validation)"
```

---

### Task 3: Hero

**Files:**
- Create: `src/components/products/mailpoint/hero.tsx`

- [ ] **Step 1: Create the component**

```tsx
import { Link } from "react-router"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

const COVERAGE = ["AU", "NZ", "Postal only"]

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
          MailPoint Verify
        </span>

        <h1
          className="reveal mt-6 max-w-3xl font-heading text-5xl leading-[1.05] font-medium tracking-tight text-balance sm:text-6xl"
          style={{ animationDelay: "80ms" }}
        >
          AMAS-certified mail that{" "}
          <span className="text-primary">actually arrives.</span>
        </h1>

        <p
          className="reveal mt-6 max-w-xl text-lg text-muted-foreground"
          style={{ animationDelay: "160ms" }}
        >
          Verify postal addresses against Australia Post PAF, cut return mail and
          qualify for AusPost bulk-mail discounts — PO Boxes and Parcel Lockers
          included.
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

Run: `bun run typecheck && bunx eslint src/components/products/mailpoint/hero.tsx`
Expected: PASS, lint exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/products/mailpoint/hero.tsx
git commit -m "feat(mailpoint): add product hero"
```

---

### Task 4: Bento features (5 cells)

**Files:**
- Create: `src/components/products/mailpoint/features.tsx`

Mirrors the G-NAF bento exactly in structure/styling. Icons verified: `Wand2`, `Search`, `Package`, `Barcode`, `MapPin`, `Check`, `ArrowRight`, `Mailbox`.

- [ ] **Step 1: Create the component**

```tsx
import * as React from "react"
import {
  ArrowRight,
  Barcode,
  Check,
  Mailbox,
  MapPin,
  Package,
  Search,
} from "lucide-react"

import { cn } from "@/lib/utils"

type Feature = {
  category: string
  title: string
  body: string
  visual: React.ReactNode
  className: string
}

// A faint UI fragment that sits on the graticule — a polished placeholder for
// real product screenshots, on-theme with the rest of the site.
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
  tone?: "muted" | "verified"
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-1 font-mono text-[0.7rem]",
        tone === "verified"
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
          : "bg-background/70 text-muted-foreground"
      )}
    >
      {children}
    </span>
  )
}

const ValidationVisual = (
  <div className="flex w-full max-w-xs flex-col gap-2">
    <Chip>
      <span className="line-through opacity-60">12 bourke st melb vic</span>
    </Chip>
    <ArrowRight className="size-4 rotate-90 self-center text-muted-foreground/50" />
    <Chip tone="verified">
      <Check className="size-3" /> 12 Bourke Street, Melbourne VIC 3000
    </Chip>
  </div>
)

const AutocompleteVisual = (
  <div className="w-full max-w-xs rounded-lg border bg-background/80 shadow-sm">
    <div className="flex items-center gap-2 border-b px-3 py-2">
      <Search className="size-3.5 text-muted-foreground" />
      <span className="font-mono text-xs text-muted-foreground">PO Box 12▏</span>
    </div>
    <div className="flex flex-col p-1">
      {["PO Box 1234, Sydney NSW", "PO Box 1240, Parramatta NSW"].map((s, i) => (
        <span
          key={s}
          className={cn(
            "flex items-center gap-2 rounded-md px-2 py-1.5 font-mono text-[0.7rem]",
            i === 0 ? "bg-primary/10 text-foreground" : "text-muted-foreground"
          )}
        >
          <Mailbox className="size-3 text-primary" /> {s}
        </span>
      ))}
    </div>
  </div>
)

const LockerVisual = (
  <div className="flex w-full max-w-[13rem] flex-col gap-2">
    <Chip>
      <Mailbox className="size-3 text-primary" /> PO Box 1234, Sydney
    </Chip>
    <Chip>
      <Package className="size-3 text-primary" /> Parcel Locker 100234567
    </Chip>
    <Chip tone="verified">
      <Check className="size-3" /> Deliverable
    </Chip>
  </div>
)

const BarcodeVisual = (
  <div className="w-full max-w-[14rem] rounded-lg border bg-background/80 p-4 shadow-sm">
    <div className="mb-2 flex items-center justify-between font-mono text-[0.65rem] text-muted-foreground">
      <span className="inline-flex items-center gap-1">
        <Barcode className="size-3" /> DPID
      </span>
      <span>61320578</span>
    </div>
    <div className="flex h-10 items-end gap-[2px]">
      {[3, 7, 4, 9, 5, 8, 3, 6, 4, 9, 5, 3, 8, 4, 7, 5, 9, 3, 6, 8, 4, 5].map(
        (h, i) => (
          <span
            key={i}
            className="w-[3px] rounded-sm bg-foreground/70"
            style={{ height: `${h * 10}%` }}
          />
        )
      )}
    </div>
  </div>
)

const GeocodeVisual = (
  <div className="relative size-32 rounded-lg border bg-background/60">
    <div className="bg-graticule-fine absolute inset-0 rounded-lg" />
    <MapPin className="absolute top-1/2 left-1/2 size-7 -translate-x-1/2 -translate-y-full fill-primary/20 text-primary" />
    <span className="absolute top-1/2 left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary ring-4 ring-primary/20" />
    <span className="absolute bottom-2 left-2 rounded bg-background/80 px-1.5 py-0.5 font-mono text-[0.6rem] text-muted-foreground">
      -37.8147, 144.9678
    </span>
  </div>
)

const FEATURES: Feature[] = [
  {
    category: "Postal validation",
    title: "Standardise and confirm deliverability",
    body: "Verify any Australian or New Zealand postal address against AusPost PAF and NZ Post — AMAS certified, so it cuts return mail.",
    visual: ValidationVisual,
    className: "lg:col-span-3 lg:rounded-tl-4xl max-lg:rounded-t-4xl",
  },
  {
    category: "Postal autocomplete",
    title: "Capture deliverable addresses fast",
    body: "Type-ahead suggestions limited to deliverable postal addresses, so the mail stream starts clean.",
    visual: AutocompleteVisual,
    className: "lg:col-span-3 lg:rounded-tr-4xl",
  },
  {
    category: "PO Box & Parcel Lockers",
    title: "Not just street addresses",
    body: "First-class support for PO Boxes and Parcel Lockers — the delivery points other validators miss.",
    visual: LockerVisual,
    className: "lg:col-span-2 lg:rounded-bl-4xl",
  },
  {
    category: "DPID & barcodes",
    title: "Ready for the mail stream",
    body: "Return the Delivery Point Identifier and barcode for every address, ready for lodgement and bulk discounts.",
    visual: BarcodeVisual,
    className: "lg:col-span-2",
  },
  {
    category: "Geocoding",
    title: "Coordinates via G-NAF",
    body: "Every postal address is geocoded with G-NAF, so you get a precise lat/long alongside the mail data.",
    visual: GeocodeVisual,
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
          Built for the mail stream, end to end.
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

- [ ] **Step 2: Typecheck + lint**

Run: `bun run typecheck && bunx eslint src/components/products/mailpoint/features.tsx`
Expected: PASS, lint exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/products/mailpoint/features.tsx
git commit -m "feat(mailpoint): add bento features with visual panels"
```

---

### Task 5: Coverage band

**Files:**
- Create: `src/components/products/mailpoint/coverage.tsx`

Inverted dark band (matches G-NAF Coverage). Icons verified: `Mailbox`, `Globe`, `MapPin`.

- [ ] **Step 1: Create the component**

```tsx
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
              and are AMAS certified; New Zealand addresses from NZ Post. Both are
              geocoded with G-NAF. MailPoint is purpose-built for mail —
              <span className="text-background"> postal addresses only, no
              international coverage.</span>
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-background/15 bg-background/15 sm:grid-cols-3">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col gap-3 bg-foreground p-6">
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

- [ ] **Step 2: Typecheck + lint**

Run: `bun run typecheck && bunx eslint src/components/products/mailpoint/coverage.tsx`
Expected: PASS, lint exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/products/mailpoint/coverage.tsx
git commit -m "feat(mailpoint): add coverage & data band"
```

---

### Task 6: Trust markers band

**Files:**
- Create: `src/components/products/mailpoint/trust-band.tsx`

- [ ] **Step 1: Create the component**

```tsx
const MARKERS = [
  "AMAS Certified by Australia Post",
  "AusPost PAF",
  "NZ Post",
  "Geocoded with G-NAF®",
  "ISO 27001",
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

Run: `bun run typecheck && bunx eslint src/components/products/mailpoint/trust-band.tsx`
Expected: PASS, lint exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/products/mailpoint/trust-band.tsx
git commit -m "feat(mailpoint): add trust markers band"
```

---

### Task 7: FAQ

**Files:**
- Create: `src/components/products/mailpoint/faq.tsx`

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
    q: "What does AMAS certification mean, and how does it cut return mail?",
    a: "AMAS — the Address Matching Approval System — is Australia Post's certification that an address has been matched and corrected against the authoritative Postal Address File. Mailing AMAS-corrected addresses reduces returned and undeliverable mail, and qualifies your lodgement for Australia Post bulk-mail discounts.",
  },
  {
    q: "What's covered in Australia and New Zealand?",
    a: "Australian postal addresses come from Australia Post's PAF and are AMAS certified. New Zealand postal addresses come from NZ Post. Both are geocoded with G-NAF. MailPoint covers postal addresses only — there is no international coverage.",
  },
  {
    q: "What is a DPID and a barcode, and why do they matter?",
    a: "A DPID (Delivery Point Identifier) is Australia Post's unique ID for a single delivery point. The barcode encodes it for automated sorting. Returning both means your mail is ready for lodgement and eligible for bulk-mail pricing.",
  },
  {
    q: "Do you support PO Boxes and Parcel Lockers?",
    a: "Yes. PO Boxes and Parcel Lockers are first-class delivery points in MailPoint, validated and returned with their DPID and barcode just like street addresses — unlike validators built only for physical street addresses.",
  },
  {
    q: "Why no international addresses or reverse geocoding?",
    a: "MailPoint is purpose-built for the Australian and New Zealand mail stream, so it stays focused on authoritative postal data. For worldwide address validation use G-NAF Verify with optional Global Services; for coordinate-to-address lookups use G-NAF Verify's reverse geocoding.",
  },
  {
    q: "How does pricing work?",
    a: "Every plan includes a free sandbox and all of MailPoint's capabilities. You start free, then scale by lookup volume — see Pricing for tiers, or talk to an expert for enterprise and on-prem.",
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

Run: `bun run typecheck && bunx eslint src/components/products/mailpoint/faq.tsx`
Expected: PASS, lint exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/products/mailpoint/faq.tsx
git commit -m "feat(mailpoint): add FAQ accordion"
```

---

### Task 8: Closing CTA band

**Files:**
- Create: `src/components/products/mailpoint/cta-band.tsx`

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
            Stop mailing addresses that bounce.
          </h2>
          <p className="max-w-xl text-background/70">
            Spin up a free sandbox, or talk to an expert about bulk lodgement,
            on-prem and enterprise volumes.
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

Run: `bun run typecheck && bunx eslint src/components/products/mailpoint/cta-band.tsx`
Expected: PASS, lint exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/products/mailpoint/cta-band.tsx
git commit -m "feat(mailpoint): add closing CTA band"
```

---

### Task 9: Assemble the page

**Files:**
- Modify: `src/pages/products/mailpoint.tsx` (replace entire contents)

- [ ] **Step 1: Replace the stub**

```tsx
import { Hero } from "@/components/products/mailpoint/hero"
import { MailpointDemo } from "@/components/products/mailpoint/demo"
import { Features } from "@/components/products/mailpoint/features"
import { Coverage } from "@/components/products/mailpoint/coverage"
import { TrustBand } from "@/components/products/mailpoint/trust-band"
import { Faq } from "@/components/products/mailpoint/faq"
import { CtaBand } from "@/components/products/mailpoint/cta-band"

export function MailpointVerify() {
  return (
    <>
      <Hero />
      <TrustBand />
      <MailpointDemo />
      <Features />
      <Coverage />
      <Faq />
      <CtaBand />
    </>
  )
}
```

- [ ] **Step 2: Typecheck + lint**

Run: `bun run typecheck && bunx eslint src/pages/products/mailpoint.tsx`
Expected: PASS, lint exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/pages/products/mailpoint.tsx
git commit -m "feat(mailpoint): assemble MailPoint Verify product page"
```

---

### Task 10: Build + browser smoke verification

**Files:** none (verification only)

- [ ] **Step 1: Production build**

Run: `bun run build`
Expected: typecheck + Vite build succeed, `dist/` produced, no errors.

- [ ] **Step 2: Browser smoke (headless Chrome via CDP)**

Start the dev server (`bun run dev`), then drive headless Chrome to `/products/mailpoint`. Verify:
- Page renders in both light and dark (toggle via `localStorage.setItem('theme', ...)` + reload).
- Demo tabs switch between Autocomplete and Validation (use real CDP mouse events on the `[role=tab]` triggers, not synthetic `.click()` — Radix tabs need real pointer events).
- Validation: clicking "Validate" shows the DELIVERABLE result with a DPID and barcode strip.
- Bento renders 5 cells with visual panels.
- FAQ accordion expands/collapses.
- `0` console errors.

Stop the dev server and any Chrome processes after.

- [ ] **Step 3: Final commit (if any tweaks were needed)**

```bash
git add -A
git commit -m "chore(mailpoint): product page verified"
```

---

## Self-Review

- **Spec coverage:** Hero w/ AMAS-led headline + dual CTA + coverage chips (Task 3) ✓; trust band incl. AMAS/PAF/NZ Post/G-NAF/ISO (Task 6) ✓; tabbed demo autocomplete+validation with DPID+barcode+PO Box+Parcel Locker examples (Tasks 1–2) ✓; 5-cell bento incl. PO Box/Parcel Locker + DPID/barcode + geocoding (Task 4) ✓; coverage band AusPost PAF/NZ Post/G-NAF + explicit postal-only/no-international (Task 5) ✓; FAQ ~6 Q&As incl. why-no-international/reverse-geo (Task 7) ✓; closing CTA (Task 8) ✓; page assembly (Task 9) ✓; build+browser smoke (Task 10) ✓. Design language inherited from G-NAF page ✓. CTAs use `/docs` + `/trust` ✓. No new deps/routes ✓.
- **Placeholders:** none — every code step is complete; marketing copy is final placeholder text.
- **Type/name consistency:** `ValidationDemo` (Task 1) consumed in Task 2; `MailpointDemo`/`Hero`/`Features`/`Coverage`/`TrustBand`/`Faq`/`CtaBand` defined in Tasks 2–8 and imported with matching names in Task 9; page export `MailpointVerify` matches the existing route import in `src/App.tsx`. shadcn exports (`Tabs/TabsList/TabsTrigger/TabsContent`, `Accordion/AccordionItem/AccordionTrigger/AccordionContent`) verified against vendored files. All lucide icons verified present (`Mailbox, Package, Barcode, MapPin, Search, Check, Wand2, ArrowRight, Globe`).
- **Known risks flagged in-task:** Task 2 Step 2 — reconcile `Tabs` export names if typecheck complains. Task 10 Step 2 — use real CDP mouse events for Radix tab switching (learned from the G-NAF smoke test).
