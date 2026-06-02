# MailPoint Verify Product Page — Design Spec

**Goal:** Flesh out the MailPoint Verify product page (`/products/mailpoint`), currently a
`PageStub`, into a full marketing page covering AMAS-certified postal verification,
postal autocomplete, PO Box & Parcel Locker support, DPID & barcode output, and
geocoding — in the established site design language, mirroring the G-NAF Verify page.

**Audience:** Mail/billing operations and developers integrating address capture
where the goal is deliverable mail; secondary: enterprise buyers chasing return-mail
reduction and AusPost bulk-mail discounts.

## Positioning

Lead on **AMAS-certified mail accuracy**: cut return mail and qualify for Australia
Post bulk-mail discounts. MailPoint is the mail-stream counterpart to G-NAF Verify —
**postal addresses only** (no international, no reverse geocoding).

Key product facts to keep accurate in copy:
- Australian data is **Australia Post PAF** (Postal Address File); AMAS certified.
- New Zealand postal addresses via **NZ Post**.
- Addresses are **geocoded using G-NAF**.
- Includes **PO Boxes** and **Parcel Lockers** (not just street addresses).
- Returns **DPID** (Delivery Point Identifier) and **barcode**.
- Verify + autocomplete + geocoding. **No reverse geocoding. No international.**

## Design language (inherited from G-NAF Verify page)

- **Fonts:** Fraunces (`font-heading`), Inter (`font-sans`), JetBrains Mono (`font-mono`).
- **Accent:** existing primary blue. Semantic tokens only — light/dark both work.
- **Texture:** `.bg-graticule` / `.bg-graticule-fine`; `.reveal` staggered load.
- **CTAs:** primary **Start free trial** → `/docs`; secondary **Talk to an expert** → `/trust`.
- Small, focused components under `src/components/products/mailpoint/`, orchestrated by
  `src/pages/products/mailpoint.tsx`.

## Page structure (top to bottom)

### 1. Hero (`hero.tsx`)
- Eyebrow `MAILPOINT VERIFY` (mono).
- Headline (Fraunces) leading on AMAS-certified mail accuracy; subcopy on return-mail
  reduction + AusPost bulk discounts.
- Dual CTA: Start free trial / Talk to an expert.
- Coverage chips: `AU` · `NZ` · `Postal only`.
- Graticule background + soft primary glow (matches G-NAF hero).

### 2. Trust band (`trust-band.tsx`)
- Markers: `AMAS Certified by Australia Post` · `AusPost PAF` · `NZ Post` ·
  `Geocoded with G-NAF®` · `ISO 27001`. Text wordmarks.

### 3. Tabbed demo (`demo.tsx` + `validation-demo.tsx`)
- Two tabs via vendored `tabs`: **Autocomplete** and **Validation**.
- **Autocomplete tab:** reuses the existing `@/components/home/address-demo`
  (`AddressDemo`) as-is. (Acceptable: it's the shared autocomplete pattern; postal
  nuance is shown in the Validation tab.)
- **Validation tab:** new `src/components/products/mailpoint/validation-demo.tsx` —
  postal-flavoured. Preset examples include a street address, a **PO Box**, and a
  **Parcel Locker**. Result card shows: standardised address, **DPID**, **barcode**
  (rendered as a monospace barcode-style strip), postcode, and geocode lat/long.
  Placeholder data only, same data-terminal card styling as the G-NAF demo.

### 4. Bento features — 5 cells (`features.tsx`)
Same bento layout as G-NAF (`lg:grid-cols-6 lg:grid-rows-2`, two wide top cells, three
bottom; outer corners rounded `4xl`), each cell with an on-theme visual panel
(`VisualPanel` + token-built mini mockups, NOT external images):
1. **Postal validation** — standardise & confirm against AusPost PAF / NZ Post.
2. **Postal autocomplete** — type-ahead deliverable postal addresses.
3. **PO Boxes & Parcel Lockers** — first-class support, not just street addresses.
4. **DPID & barcodes** — returns the Delivery Point Identifier and barcode for the mail stream.
5. **Geocoding** — lat/long via G-NAF on every postal address.

### 5. Coverage band (`coverage.tsx`)
- Inverted dark band (matches G-NAF Coverage).
- Stats/points: AusPost PAF (Australia), NZ Post (New Zealand), geocoded with G-NAF.
- Explicit line: **postal addresses only — no international coverage**.

### 6. FAQ (`faq.tsx`)
- Vendored `accordion`. ~6 Q&As:
  - What does AMAS certification mean / how does it cut return mail?
  - What's covered in Australia vs New Zealand?
  - What is a DPID and a barcode, and why do they matter?
  - Do you support PO Boxes and Parcel Lockers?
  - Why no international addresses or reverse geocoding? (postal-stream scope)
  - How does pricing work?

### 7. Closing CTA band (`cta-band.tsx`)
- Reuses the inverted graticule CTA: Start free trial / Talk to an expert.

## Components & files

- Create: `src/components/products/mailpoint/{hero,demo,validation-demo,features,coverage,trust-band,faq,cta-band}.tsx`
- Modify: `src/pages/products/mailpoint.tsx` (orchestrate sections, replace stub).
- Reuse: `@/components/home/address-demo`, `@/components/ui/{tabs,accordion,button}`.
- No new dependencies. Icons from `lucide-react` (verify exports before use).

## Verification

- `bun run build` (typecheck + Vite) passes.
- `bunx eslint` clean on new/changed files.
- Browser smoke (headless Chrome via CDP): renders light + dark, demo tabs switch,
  autocomplete + validation demos respond (validation shows DPID + barcode), FAQ
  accordion expands, `0` console errors.

## Out of scope (YAGNI)

- No mapping library / interactive map; no reverse geocoding (not a product feature).
- No international addresses (not a product feature).
- No real API calls — all demo data is placeholder, clearly mocked.
- No new routes; CTAs use existing `/docs` and `/trust`.
- No test runner (repo has none).
- Shared-component extraction (`VisualPanel`, inverted band) across product pages is a
  future refactor, not part of this page.
