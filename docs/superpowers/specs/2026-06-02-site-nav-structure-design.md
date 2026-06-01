# Geoscape Verify — Site Navigation & Structure

**Date:** 2026-06-02
**Status:** Approved

## Goal

Build the top-level navigation bar and a clickable site skeleton for the Geoscape
Verify marketing site. Every nav item routes to a real (stub) page. Two nav items
(Products, Solutions) are dropdown lists; the rest are plain links.

## Site structure / routes

Router: **react-router v7** (`BrowserRouter`).

| Path | Page |
|------|------|
| `/` | Home (hero stub) |
| `/products/gnaf` | G-NAF Verify |
| `/products/mailpoint` | MailPoint Verify |
| `/products/phone` | Phone Verify |
| `/products/email` | Email Verify |
| `/solutions/onboarding` | Onboarding & KYC |
| `/solutions/mail` | Mail & Billing |
| `/solutions/crm` | Marketing & CRM |
| `/solutions/logistics` | Logistics & Field Services |
| `/solutions/government` | Government & Utilities |
| `/developers` | Developers |
| `/pricing` | Pricing |
| `/trust` | Trust |
| `/customers` | Customers |
| `/about` | About |

All pages except Home render a shared `PageStub` (title + tagline + "coming
soon" placeholder), so we avoid 14 near-identical files.

## Navigation model

A single `navConfig` array is the source of truth. Each entry is either:

- **link** — `{ label, href }` → renders a `NavigationMenuLink`
- **menu** — `{ label, items: [{ label, href, description }] }` → renders a
  `NavigationMenuTrigger` + `NavigationMenuContent` (grid of links w/ descriptions)

Dropdowns: **Products**, **Solutions**.
Plain links: **Developers**, **Pricing**, **Trust**, **Customers**, **About**.

Adding or reordering pages = editing `navConfig` only.

## Components

- `src/components/site-nav.tsx` — desktop navbar (built on shadcn `navigation-menu`)
  + mobile `Sheet`, both driven by `navConfig`. Logo/wordmark left, menu, CTA
  ("Start free" → `/developers`) right. Active route gets `data-active` styling.
  Uses react-router `Link` via the primitive's `render`/`asChild` prop for
  client-side navigation.
- `src/components/layout.tsx` — `<SiteNav />` + `<Outlet />` + simple footer.
- `src/components/page-stub.tsx` — placeholder page (title + tagline).
- `src/pages/home.tsx` — hero stub featuring the one-liner.
- `App.tsx` — route table wrapping all routes in `<Layout>`.

## Mobile

Below the `md` breakpoint, collapse into a hamburger-triggered `Sheet` listing
the same `navConfig` vertically (menus as grouped sections). Reuse the existing
`use-mobile` hook and `sheet` component.

## Scope guards (YAGNI)

- Stub pages are minimal — title + tagline only. No mega-footer, no search.
- No dark-mode toggle button (the `d` key shortcut already exists).
- Developers/Pricing/Trust/Customers/About are single stub pages, not nested.

## Dependencies

- Add `react-router` (v7).
- Reuse existing: `navigation-menu`, `sheet`, `button`, `use-mobile`, `cn`.
