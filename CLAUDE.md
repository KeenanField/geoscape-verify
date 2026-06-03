# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Product

This is the **marketing site for Geoscape Verify** — Australia's authoritative contact data platform ("from address to inbox — verified at the source"). It is a content/marketing site, not the product API itself.

Geoscape Verify is a contact verification platform built on Australia's authoritative data sources (G-NAF and AMAS). The product has **four modules** that the site's content is organized around:

- **G-NAF Verify** — address validation, autocomplete, geocoding (powered by G-NAF®)
- **MailPoint Verify** — AMAS-certified mail verification (return-mail reduction, AusPost bulk discounts)
- **Phone Verify** — AU/international mobile + landline validation, carrier/line-type/disconnection detection
- **Email Verify** — syntax, MX, SMTP, and risk scoring

Positioning to keep consistent in copy: authoritative/source-of-truth (Geoscape is the team behind G-NAF), Australian-first, one API for every contact point, enterprise-grade (99.95% SLA, SSO/SCIM, on-prem), and developer-first (free sandbox, REST API, SDKs for Node/Python/.NET/Java). Trust markers: G-NAF® · AMAS Certified by Australia Post · ISO 27001 · IRAP assessed. Audiences: KYC/onboarding, mail/billing ops, marketing/CRM, logistics/field services, government & utilities. See `README.md` for the full canonical messaging.

## Site structure

- Home — the above, condensed
- Products — one page per module (G-NAF Verify, MailPoint Verify, Phone Verify, Email Verify)
- Solutions — by use case (Onboarding, Mail, CRM, Logistics, Government)
- Developers — docs, API reference, SDKs, sandbox, status
- Pricing — tier comparison + bundle calculator
- Trust — security, compliance, data provenance, certifications
- Customers — case studies (lead with a government or Big 4 bank logo if you have one)
- About — the Geoscape story, why we make G-NAF, why that matters

## Commands

This project uses **bun** (`bun@1.3.6`) as the package manager. Install with `bun install`.

- `bun run dev` — start the Vite dev server
- `bun run build` — typecheck (`tsc -b`) then production build (`vite build`)
- `bun run typecheck` — `tsc --noEmit` only (faster than full build)
- `bun run lint` — ESLint over the repo
- `bun run format` — Prettier write over all `.ts`/`.tsx`
- `bun run preview` — serve the production build

There is **no test runner configured** — do not assume `bun test`/`vitest`/`jest` exist.

## Architecture

Single-page React 19 app bootstrapped by Vite 8, styled with Tailwind CSS v4 and shadcn/ui. Entry: `src/main.tsx` wraps `<App>` in `<ThemeProvider>` then `<BrowserRouter>`; `src/App.tsx` declares all routes. The marketing site is built out — Home, all four product pages, five industry pages, plus Pricing/Trust/Docs/Contact are real; About, Customers, and the 404 are still `PageStub`s (`src/components/page-stub.tsx`).

- **Path alias:** `@/` maps to `src/` (configured in both `vite.config.ts` and `tsconfig.app.json`). Always import via `@/...`, e.g. `@/components/ui/button`, `@/lib/utils`.
- **shadcn/ui:** Components live in `src/components/ui/`. Add new ones with `bunx shadcn@latest add <name>` (config in `components.json`: style `radix-mira`, base color `neutral`, icon library `lucide`). These are vendored/generated files — prefer regenerating or composing over hand-editing. Primitives come from `radix-ui` and `@base-ui/react`. A `@magicui` registry is configured in `components.json` — `animated-grid-pattern.tsx` came from it (`bunx shadcn@latest add @magicui/<name>`); it depends on `motion`, the only animation lib in use.
- **`cn()` helper** (`src/lib/utils.ts`): merges class names via `clsx` + `tailwind-merge`. Use it for all conditional/merged className logic.
- **Theming:** `src/components/theme-provider.tsx` is a **custom** provider (not `next-themes` — that dep is installed but unused; don't import from it). Theme is `"dark" | "light" | "system"` (defaults to `system`), persists to `localStorage` under `theme`, syncs across tabs, and toggles a `dark` class on `<html>`. Read it via `useTheme()`. **Gotcha:** pressing the **`d`** key anywhere toggles dark mode (guarded against modifier keys and editable targets, but not other typing) — surprising in demos/forms; check `isEditableTarget` before adding new keyboard handlers. Tailwind dark mode uses the `@custom-variant dark (&:is(.dark *))` in `src/index.css`.
- **Design tokens:** All colors are oklch CSS variables defined in `:root` / `.dark` in `src/index.css` and exposed to Tailwind via `@theme inline`. Use semantic token classes (`bg-background`, `text-muted-foreground`, `border-border`, etc.) rather than raw color values.

### Routing (react-router v7)

- Uses the **`react-router`** package directly — **not** `react-router-dom`. Import `Link`, `Outlet`, `useLocation`, etc. from `"react-router"`.
- All routes nest under a single `<Layout>` (`src/components/layout.tsx` = `<SiteNav/>` + `<Outlet/>` + `<SiteFooter/>`). `ScrollToTop` resets scroll on every navigation — react-router otherwise preserves the prior page's offset.
- **Nav is config-driven:** `src/components/nav-config.ts` (`navConfig`) is the single source of truth for the header; `SiteNav` renders from it (desktop `navigation-menu`, mobile `Sheet`). `/customers` and `/about` have working routes but are **intentionally commented out** of `navConfig` while they're stubs — adding a nav item ≠ adding a route, and vice versa.

### Page composition

- **Product pages** (`src/pages/products/*.tsx`) are thin orchestrators that compose small section components from `src/components/products/{gnaf,mailpoint,phone,email}/` (`hero`, `features`, `coverage`, `faq`, `cta-band`, a bespoke `demo`, …). To edit a product page, edit its section components, not one monolith. The home `AddressDemo` (`src/components/home/address-demo.tsx`) is reused by the gnaf and mailpoint demos.
- **Industry pages** (`src/pages/industries/*.tsx`) are **data-driven**: each exports one typed `IndustryData` object (`src/components/industries/types.ts`) rendered by the shared `<IndustryPage>`. Add or change an industry by editing the data object — there are no per-industry components.

### Design language (used consistently across pages)

- Fonts via semantic classes: `font-heading` (Fraunces, headlines), `font-sans` (Inter, body), `font-mono` (JetBrains Mono, eyebrows/data labels). Self-hosted through `@fontsource-variable/*`, imported in `src/index.css`.
- Custom utilities in `src/index.css`: `.bg-graticule` / `.bg-graticule-fine` (survey-grid texture) and `.reveal` (staggered load-in — pair with an inline `style={{ animationDelay: "Nms" }}`; it's `prefers-reduced-motion` safe). `<GridBackdrop>` (`src/components/ui/grid-backdrop.tsx`) is the animated graticule for heroes/CTA bands. Note the **custom radius scale** (`--radius-sm`…`--radius-4xl` derived from `--radius`).
- CTA convention: primary **"Start free trial"** → `/docs`, secondary **"Talk to an expert"** → `/trust`.

## Conventions

- **TypeScript is strict** with `noUnusedLocals`, `noUnusedParameters`, and `erasableSyntaxOnly` — no unused bindings, and no runtime-emitting TS syntax (enums, parameter properties, namespaces).
- **Prettier** (`.prettierrc`): no semicolons, double quotes, 2-space indent, 80 col, `es5` trailing commas. The `prettier-plugin-tailwindcss` auto-sorts Tailwind classes and is configured to sort inside `cn()` and `cva()` calls.
- React Hooks and React Refresh ESLint rules are enforced (see `eslint.config.js`).
