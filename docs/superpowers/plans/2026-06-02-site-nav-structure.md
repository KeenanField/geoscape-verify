# Site Navigation & Structure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the top-level navigation bar (Products & Solutions dropdowns + plain links) and a clickable site skeleton where every nav item routes to a stub page.

**Architecture:** react-router v7 `BrowserRouter`; a shared `<Layout>` (nav + `<Outlet/>` + footer) wraps all routes. Navigation renders from a single `navConfig` array — entries are either a link or a dropdown menu. A generic `PageStub` backs the 14 non-home pages. Desktop uses the shadcn `navigation-menu`; mobile collapses into a `Sheet`.

**Tech Stack:** React 19, react-router v7, Vite 8, Tailwind v4, shadcn/ui (`navigation-menu`, `sheet`, `button`), TypeScript (strict), bun.

**Testing note:** This repo has **no test runner** and the spec adds none (YAGNI). Verification per task uses the tooling that exists: `bun run typecheck`, `bun run lint`, and a final `bun run build`. Follow the existing code style: no semicolons, double quotes, 2-space indent, `@/` imports, `cn()` for classNames.

---

### Task 1: Install react-router

**Files:**
- Modify: `package.json` (dependency added by bun)

- [ ] **Step 1: Install**

Run: `bun add react-router@^7`
Expected: `react-router` appears under `dependencies` in `package.json`; `bun.lock` updates.

- [ ] **Step 2: Verify it resolves**

Run: `bun run typecheck`
Expected: PASS (no errors; nothing imports it yet).

- [ ] **Step 3: Commit**

```bash
git add package.json bun.lock
git commit -m "build: add react-router v7"
```

---

### Task 2: Nav config (single source of truth)

**Files:**
- Create: `src/components/nav-config.ts`

- [ ] **Step 1: Create the config and types**

```ts
export type NavLink = {
  label: string
  href: string
  description?: string
}

export type NavMenu = {
  label: string
  items: NavLink[]
}

export type NavEntry = NavLink | NavMenu

export function isMenu(entry: NavEntry): entry is NavMenu {
  return "items" in entry
}

export const navConfig: NavEntry[] = [
  {
    label: "Products",
    items: [
      {
        label: "G-NAF Verify",
        href: "/products/gnaf",
        description: "Address validation, autocomplete & geocoding from G-NAF®.",
      },
      {
        label: "MailPoint Verify",
        href: "/products/mailpoint",
        description: "AMAS-certified mail verification and AusPost discounts.",
      },
      {
        label: "Phone Verify",
        href: "/products/phone",
        description: "Validate AU & international mobile and landline numbers.",
      },
      {
        label: "Email Verify",
        href: "/products/email",
        description: "Syntax, MX, SMTP and risk scoring in one call.",
      },
    ],
  },
  {
    label: "Solutions",
    items: [
      {
        label: "Onboarding & KYC",
        href: "/solutions/onboarding",
        description: "Verify identity-adjacent data at signup.",
      },
      {
        label: "Mail & Billing",
        href: "/solutions/mail",
        description: "Cut return mail and qualify for AusPost discounts.",
      },
      {
        label: "Marketing & CRM",
        href: "/solutions/crm",
        description: "Keep databases clean, deliverable and compliant.",
      },
      {
        label: "Logistics & Field Services",
        href: "/solutions/logistics",
        description: "Geocode to the rooftop, not the street.",
      },
      {
        label: "Government & Utilities",
        href: "/solutions/government",
        description: "Authoritative data for service delivery.",
      },
    ],
  },
  { label: "Developers", href: "/developers" },
  { label: "Pricing", href: "/pricing" },
  { label: "Trust", href: "/trust" },
  { label: "Customers", href: "/customers" },
  { label: "About", href: "/about" },
]
```

- [ ] **Step 2: Typecheck**

Run: `bun run typecheck`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/nav-config.ts
git commit -m "feat: add site nav config"
```

---

### Task 3: PageStub component

**Files:**
- Create: `src/components/page-stub.tsx`

- [ ] **Step 1: Create the component**

```tsx
type PageStubProps = {
  title: string
  tagline?: string
}

export function PageStub({ title, tagline }: PageStubProps) {
  return (
    <section className="mx-auto flex min-h-[60svh] max-w-3xl flex-col justify-center gap-4 px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      {tagline ? (
        <p className="text-lg text-muted-foreground">{tagline}</p>
      ) : null}
      <p className="text-sm text-muted-foreground">Coming soon.</p>
    </section>
  )
}
```

- [ ] **Step 2: Typecheck**

Run: `bun run typecheck`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/page-stub.tsx
git commit -m "feat: add PageStub placeholder page"
```

---

### Task 4: Home page

**Files:**
- Create: `src/pages/home.tsx`

- [ ] **Step 1: Create the hero stub**

```tsx
import { Link } from "react-router"

import { Button } from "@/components/ui/button"

export function Home() {
  return (
    <section className="mx-auto flex min-h-[70svh] max-w-4xl flex-col justify-center gap-6 px-6 py-20">
      <p className="text-sm font-medium text-muted-foreground">
        Australia's authoritative contact data platform
      </p>
      <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        From address to inbox — verified at the source.
      </h1>
      <p className="max-w-2xl text-lg text-muted-foreground">
        Geoscape Verify is verification built by the trusted authors of G-NAF —
        with phone and email validation in the same API.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link to="/developers">Start free</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/products/gnaf">Explore products</Link>
        </Button>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Typecheck**

Run: `bun run typecheck`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/pages/home.tsx
git commit -m "feat: add Home hero page"
```

---

### Task 5: SiteNav component (desktop + mobile)

**Files:**
- Create: `src/components/site-nav.tsx`

Uses existing `@/components/ui/navigation-menu`, `@/components/ui/sheet`,
`@/components/ui/button`, `@/hooks/use-mobile`, and `@/lib/utils`.

- [ ] **Step 1: Create the component**

```tsx
import * as React from "react"
import { Link, useLocation } from "react-router"
import { Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { navConfig, isMenu, type NavLink } from "@/components/nav-config"

function DesktopNav({ pathname }: { pathname: string }) {
  return (
    <NavigationMenu viewport={false} className="hidden md:flex">
      <NavigationMenuList>
        {navConfig.map((entry) =>
          isMenu(entry) ? (
            <NavigationMenuItem key={entry.label}>
              <NavigationMenuTrigger>{entry.label}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[22rem] gap-1 p-2">
                  {entry.items.map((item) => (
                    <li key={item.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={item.href}
                          data-active={pathname === item.href}
                          className="flex-col items-start"
                        >
                          <span className="font-medium">{item.label}</span>
                          {item.description ? (
                            <span className="text-muted-foreground">
                              {item.description}
                            </span>
                          ) : null}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={entry.href}>
              <NavigationMenuLink asChild>
                <Link
                  to={entry.href}
                  data-active={pathname === entry.href}
                  className={navigationMenuTriggerStyle()}
                >
                  {entry.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function MobileNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    setOpen(false)
  }, [pathname])

  const flatLink = (item: NavLink) => (
    <Link
      key={item.href}
      to={item.href}
      data-active={pathname === item.href}
      className={cn(
        "rounded-md px-2 py-1.5 text-sm hover:bg-muted data-[active=true]:bg-muted",
      )}
    >
      {item.label}
    </Link>
  )

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 px-4 pb-6">
          {navConfig.map((entry) =>
            isMenu(entry) ? (
              <div key={entry.label} className="flex flex-col gap-1">
                <span className="px-2 text-xs font-medium text-muted-foreground">
                  {entry.label}
                </span>
                {entry.items.map(flatLink)}
              </div>
            ) : (
              flatLink(entry)
            )
          )}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export function SiteNav() {
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-6">
        <Link to="/" className="font-semibold tracking-tight">
          Geoscape Verify
        </Link>
        <DesktopNav pathname={pathname} />
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link to="/developers">Start free</Link>
          </Button>
          <MobileNav pathname={pathname} />
        </div>
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Typecheck**

Run: `bun run typecheck`
Expected: PASS. If `Sheet`/`SheetHeader`/`SheetTitle` exports differ, open
`src/components/ui/sheet.tsx` and match the actual exported names.

- [ ] **Step 3: Lint**

Run: `bun run lint`
Expected: PASS (no unused vars; hooks rules satisfied).

- [ ] **Step 4: Commit**

```bash
git add src/components/site-nav.tsx
git commit -m "feat: add SiteNav (desktop nav + mobile sheet)"
```

---

### Task 6: Layout (nav + outlet + footer)

**Files:**
- Create: `src/components/layout.tsx`

- [ ] **Step 1: Create the layout**

```tsx
import { Outlet } from "react-router"

import { SiteNav } from "@/components/site-nav"

export function Layout() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteNav />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-muted-foreground">
          <p>
            Powered by G-NAF® · AMAS Certified by Australia Post · ISO 27001 ·
            IRAP assessed
          </p>
          <p className="mt-2">© Geoscape. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
```

- [ ] **Step 2: Typecheck**

Run: `bun run typecheck`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout.tsx
git commit -m "feat: add site Layout with nav and footer"
```

---

### Task 7: Wire routes in App.tsx

**Files:**
- Modify: `src/App.tsx` (replace entire contents)
- Modify: `src/main.tsx` (wrap in `BrowserRouter`)

- [ ] **Step 1: Replace `src/App.tsx`**

```tsx
import { Route, Routes } from "react-router"

import { Layout } from "@/components/layout"
import { PageStub } from "@/components/page-stub"
import { Home } from "@/pages/home"

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />

        <Route
          path="products/gnaf"
          element={
            <PageStub
              title="G-NAF Verify"
              tagline="Address validation, autocomplete and geocoding, powered by G-NAF®."
            />
          }
        />
        <Route
          path="products/mailpoint"
          element={
            <PageStub
              title="MailPoint Verify"
              tagline="AMAS-certified mail verification and Australia Post discounts."
            />
          }
        />
        <Route
          path="products/phone"
          element={
            <PageStub
              title="Phone Verify"
              tagline="Validate Australian and international mobile and landline numbers."
            />
          }
        />
        <Route
          path="products/email"
          element={
            <PageStub
              title="Email Verify"
              tagline="Syntax, MX, SMTP and risk scoring in one call."
            />
          }
        />

        <Route
          path="solutions/onboarding"
          element={
            <PageStub
              title="Onboarding & KYC"
              tagline="Verify identity-adjacent data at signup."
            />
          }
        />
        <Route
          path="solutions/mail"
          element={
            <PageStub
              title="Mail & Billing"
              tagline="Cut return mail and qualify for AusPost discounts."
            />
          }
        />
        <Route
          path="solutions/crm"
          element={
            <PageStub
              title="Marketing & CRM"
              tagline="Keep databases clean, deliverable and compliant."
            />
          }
        />
        <Route
          path="solutions/logistics"
          element={
            <PageStub
              title="Logistics & Field Services"
              tagline="Geocode to the rooftop, not the street."
            />
          }
        />
        <Route
          path="solutions/government"
          element={
            <PageStub
              title="Government & Utilities"
              tagline="Authoritative data for service delivery."
            />
          }
        />

        <Route
          path="developers"
          element={
            <PageStub
              title="Developers"
              tagline="Free sandbox, clean REST API, and SDKs for Node, Python, .NET and Java."
            />
          }
        />
        <Route
          path="pricing"
          element={
            <PageStub
              title="Pricing"
              tagline="Tier comparison and bundle calculator."
            />
          }
        />
        <Route
          path="trust"
          element={
            <PageStub
              title="Trust"
              tagline="Security, compliance, data provenance and certifications."
            />
          }
        />
        <Route
          path="customers"
          element={
            <PageStub
              title="Customers"
              tagline="Trusted by government, banks, insurers and utilities."
            />
          }
        />
        <Route
          path="about"
          element={
            <PageStub
              title="About"
              tagline="The Geoscape story — why we make G-NAF, and why that matters."
            />
          }
        />

        <Route
          path="*"
          element={
            <PageStub
              title="Page not found"
              tagline="The page you're looking for doesn't exist."
            />
          }
        />
      </Route>
    </Routes>
  )
}

export default App
```

- [ ] **Step 2: Wrap `src/main.tsx` in BrowserRouter**

Replace the file with:

```tsx
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)
```

- [ ] **Step 3: Typecheck + lint**

Run: `bun run typecheck && bun run lint`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx src/main.tsx
git commit -m "feat: wire site routes with react-router"
```

---

### Task 8: Build + smoke verification

**Files:** none (verification only)

- [ ] **Step 1: Production build**

Run: `bun run build`
Expected: typecheck + Vite build succeed, `dist/` produced, no errors.

- [ ] **Step 2: Dev smoke check**

Run: `bun run dev`, open the printed URL.
Expected:
- Navbar shows: Geoscape Verify wordmark, Products ▾, Solutions ▾, Developers,
  Pricing, Trust, Customers, About, and a "Start free" button.
- Hovering Products/Solutions opens a dropdown of links with descriptions.
- Clicking any item navigates client-side (no full reload) to its stub page;
  the active item shows active styling.
- Narrow the window below `md`: nav collapses to a hamburger that opens a Sheet
  listing all links; selecting one navigates and closes the sheet.
- Press `d`: dark mode still toggles.

- [ ] **Step 3: Final commit (if any tweaks were needed)**

```bash
git add -A
git commit -m "chore: site nav structure verified"
```

---

## Self-Review

- **Spec coverage:** routes table (Task 7) ✓; navConfig + dropdowns for Products/Solutions, links for the rest (Tasks 2, 5) ✓; SiteNav desktop+mobile (Task 5) ✓; Layout w/ footer (Task 6) ✓; PageStub (Task 3) ✓; Home hero (Task 4) ✓; react-router dep (Task 1) ✓; mobile Sheet via use-mobile/sheet (Task 5) ✓; CTA "Start free" → /developers (Tasks 4, 5) ✓; YAGNI guards (no test infra, minimal stubs) honored ✓.
- **Placeholders:** none — every code step is complete.
- **Type consistency:** `navConfig`, `isMenu`, `NavLink`, `NavMenu`, `NavEntry` defined in Task 2 and consumed with matching names in Task 5. `PageStub`/`Home`/`SiteNav`/`Layout` names match across tasks. `viewport={false}` used so dropdowns render inline (matches the navigation-menu component's `data-[viewport=false]` styling).
- **Known risk flagged in-task:** Task 5 Step 2 tells the engineer to reconcile `Sheet` sub-component export names against the actual `sheet.tsx` if typecheck complains.
