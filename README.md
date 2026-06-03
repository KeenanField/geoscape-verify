# Geoscape Verify

**Australia's authoritative contact data platform.**
From address to inbox — verified at the source.

This repository is the marketing site for Geoscape Verify, built with Vite, React, TypeScript, and shadcn/ui.

## About the product

Geoscape Verify is verification built by the trusted authors of G-NAF — with phone and email
validation in the same API.

Bad contact data costs Australian businesses millions every year: failed
deliveries, returned mail, fraudulent signups, broken customer journeys, and
compliance headaches. Most verification tools stitch together overseas data
sources and hope for the best in Australia. Geoscape is the team behind G-NAF —
we make the data the rest of the industry depends on.

### One platform. Four modules. Every contact point verified.

- **🏠 G-NAF Verify** — Real-time address validation, autocomplete, and
  geocoding, powered by G-NAF®, Australia's authoritative address dataset.
- **📬 MailPoint Verify** — AMAS-certified mail verification. Cut return mail and
  qualify for Australia Post bulk mail discounts.
- **📱 Phone Verify** — Validate Australian and international mobile and landline
  numbers. Detect carrier, line type, and disconnected numbers in real time.
- **✉️ Email Verify** — Catch typos, disposables, and risky addresses. Syntax,
  MX, SMTP, and risk scoring in one call.

### What makes us different

- **🇦🇺 Made in Australia, for Australia** — We're Geoscape, the team behind G-NAF.
- **🛡️ Authoritative by design** — G-NAF® powered, AMAS certified. Not scraped,
  not stitched, not guessed.
- **⚡ One API, every contact point** — Address, mail deliverability, phone, and
  email in a single call.
- **🏢 Built for enterprise** — 99.95% SLA, SSO, SCIM, batch processing, and
  on-prem options. Trusted by government, banks, insurers, and utilities.
- **🧩 Developer-first** — Free sandbox, clean REST API, SDKs for Node, Python,
  .NET, and Java.

### Who it's for

- **Customer onboarding & KYC** — verify identity-adjacent data at signup
- **Billing & mail operations** — cut return mail and qualify for AusPost discounts
- **Marketing & CRM** — keep databases clean, deliverable, and compliant
- **Logistics & field services** — geocode to the rooftop, not the street
- **Government & utilities** — authoritative data for service delivery

### Trusted foundations

Powered by G-NAF® · AMAS Certified by Australia Post · ISO 27001 · IRAP assessed

## Site structure

- Home (`/`) — the above, condensed
- Products (`/products/{gnaf,mailpoint,phone,email}`) — one page per module
- Industries (`/industries/{onboarding,mail,crm,logistics,government}`) — by use case
- Pricing (`/pricing`), Trust (`/trust`), Docs (`/docs`), Contact (`/contact`)
- Customers (`/customers`) and About (`/about`) — routed but still placeholders, and hidden from the nav

Routes are declared in `src/App.tsx`; the header is generated from `src/components/nav-config.ts`.

## Tech stack

React 19 + Vite 8 + TypeScript (strict). Routing via react-router v7, styling via
Tailwind CSS v4 and shadcn/ui (radix-ui / @base-ui primitives), animation via `motion`.
It's a fully client-side SPA — no backend, SSR, or API calls (all product demos use
mocked data).

## Development

This project uses [bun](https://bun.sh) as the package manager.

```bash
bun install        # install dependencies
bun run dev        # start the Vite dev server
bun run build      # typecheck (tsc -b) + production build → dist/
bun run typecheck  # type-check only (faster than a full build)
bun run lint       # lint
bun run format     # format with Prettier
bun run preview    # serve the production build locally
```

There is no test runner configured.

### Adding UI components

shadcn/ui components live in `src/components/ui`. Add new ones with:

```bash
bunx shadcn@latest add button
```

Import them via the `@/` path alias:

```tsx
import { Button } from "@/components/ui/button"
```

## Deployment

`bun run build` emits a static bundle to `dist/` — host it on any static/CDN target
(S3 + CloudFront, AWS Amplify, Netlify, etc.).

Because routing uses `BrowserRouter`, **the host must rewrite unknown paths to
`/index.html` (HTTP 200)** or deep links like `/products/gnaf` will 404 on refresh.
Configure this as a SPA fallback / redirect rule on whichever host you use.
