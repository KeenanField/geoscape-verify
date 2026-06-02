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

Single-page React 19 app bootstrapped by Vite 8, styled with Tailwind CSS v4 and shadcn/ui. Entry: `src/main.tsx` → wraps `<App>` in `<ThemeProvider>` → `src/App.tsx`. The marketing-site build-out has not started yet — `App.tsx` is still the generated scaffold placeholder, and there is no router installed.

- **Path alias:** `@/` maps to `src/` (configured in both `vite.config.ts` and `tsconfig.app.json`). Always import via `@/...`, e.g. `@/components/ui/button`, `@/lib/utils`.
- **shadcn/ui:** Components live in `src/components/ui/`. Add new ones with `bunx shadcn@latest add <name>` (config in `components.json`: style `radix-mira`, base color `neutral`, icon library `lucide`). These are vendored/generated files — prefer regenerating or composing over hand-editing. Primitives come from `radix-ui` and `@base-ui/react`.
- **`cn()` helper** (`src/lib/utils.ts`): merges class names via `clsx` + `tailwind-merge`. Use it for all conditional/merged className logic.
- **Theming:** `src/components/theme-provider.tsx` is a **custom** provider (not `next-themes`, despite the dep). It toggles a `dark` class on `<html>`, persists to `localStorage` under `theme`, syncs across tabs, and binds the `d` key to toggle dark mode. Read theme via the `useTheme()` hook. Tailwind dark mode uses the `@custom-variant dark (&:is(.dark *))` defined in `src/index.css`.
- **Design tokens:** All colors are oklch CSS variables defined in `:root` / `.dark` in `src/index.css` and exposed to Tailwind via `@theme inline`. Use semantic token classes (`bg-background`, `text-muted-foreground`, `border-border`, etc.) rather than raw color values.

## Conventions

- **TypeScript is strict** with `noUnusedLocals`, `noUnusedParameters`, and `erasableSyntaxOnly` — no unused bindings, and no runtime-emitting TS syntax (enums, parameter properties, namespaces).
- **Prettier** (`.prettierrc`): no semicolons, double quotes, 2-space indent, 80 col, `es5` trailing commas. The `prettier-plugin-tailwindcss` auto-sorts Tailwind classes and is configured to sort inside `cn()` and `cva()` calls.
- React Hooks and React Refresh ESLint rules are enforced (see `eslint.config.js`).
