# G-NAF Verify Product Page — Design Spec

**Goal:** Flesh out the G-NAF Verify product page (`/products/gnaf`), currently a
`PageStub`, into a full marketing page covering the product's five core
capabilities plus coverage, trust, and FAQ — in the established site design
language.

**Audience:** Developers and technical buyers evaluating Australian address
verification; secondary: enterprise/government decision-makers.

## Design language (inherited from home)

- **Fonts:** Fraunces (`font-heading`) for headlines, Inter (`font-sans`) for
  body, JetBrains Mono (`font-mono`) for data/coordinate/eyebrow labels.
- **Accent:** existing primary blue. Semantic tokens only (`bg-card`,
  `text-muted-foreground`, etc.) so light/dark both work.
- **Texture:** `.bg-graticule` / `.bg-graticule-fine` survey grid; `.reveal`
  staggered load animation (reduced-motion safe).
- **CTAs everywhere:** primary **Start free trial** → `/docs`; secondary
  **Talk to an expert** → `/trust`.
- Components are small and focused, under `src/components/products/gnaf/`, with
  `src/pages/products/gnaf.tsx` orchestrating them.

## Page structure (top to bottom)

### 1. Hero (`hero.tsx`)
- Eyebrow: `G-NAF VERIFY` (mono).
- Headline (Fraunces), subcopy (one sentence positioning).
- Dual CTA: Start free trial / Talk to an expert.
- Coverage chips: `AU` · `NZ` · `Global (optional)`.
- Graticule background + soft primary glow, matching home hero.

### 2. Live demo, tabbed (`demo.tsx`)
- Two tabs using the vendored `tabs` component:
  - **Autocomplete** — reuses the existing `@/components/home/address-demo`
    (`AddressDemo`) component as-is.
  - **Validation** — new `validation-demo.tsx`: a messy/unstandardised address
    input with a few preset examples; on submit, shows a standardised/corrected
    result with status flags (e.g. `corrected`, `verified`, locality/postcode
    normalised). Placeholder data, same data-terminal card styling as
    `AddressDemo`.
- Reverse geocoding is NOT in the demo (covered as a feature section only).

### 3. Feature sections (`features.tsx`)
Five capabilities as alternating rows (icon + heading + copy + small mono
detail line). Data-driven from a local array:
1. **Address Validation** — standardise, correct, confirm against G-NAF.
2. **Address Autocomplete** — type-ahead from the source dataset.
3. **Bulk / Batch Validation** — clean entire databases via batch + webhooks.
4. **Geocoding** — rooftop lat/long, not street centroid.
5. **Reverse Geocoding** — coordinates → nearest authoritative address.

### 4. Coverage & freshness band (`coverage.tsx`)
- Inverted dark band (like home's Why Geoscape).
- AU + NZ authoritative coverage; optional **Global Services**; 15.4M AU
  addresses; daily updates / authoritative-by-design framing.
- Stats reuse figures already used on home (15.4M, daily).

### 5. Trust markers (`trust-band.tsx`)
- Row of markers: G-NAF® · AMAS Certified by Australia Post · ISO 27001 · IRAP
  assessed. Text wordmarks (no logo assets yet).

### 6. FAQ (`faq.tsx`)
- Uses vendored `accordion` component. ~5 Q&As:
  - How accurate is the data / where does it come from?
  - What's covered in AU vs NZ vs Global Services?
  - Can I run this on-prem / in my own environment?
  - Are there batch size limits?
  - How does pricing work?
- Answers are concise placeholder marketing copy.

### 7. Closing CTA band (`cta-band.tsx`)
- Reuses home's closing-CTA pattern (inverted, graticule): Start free trial /
  Talk to an expert.

## Components & files

- Create: `src/components/products/gnaf/{hero,demo,validation-demo,features,coverage,trust-band,faq,cta-band}.tsx`
- Modify: `src/pages/products/gnaf.tsx` (orchestrate sections, replace stub).
- Reuse: `@/components/home/address-demo`, `@/components/ui/{tabs,accordion,button}`.
- No new dependencies. Icons from `lucide-react` (verify exports before use).

## Verification

- `bun run build` (typecheck + Vite) passes.
- `bunx eslint` clean on new/changed files.
- Browser smoke check (headless Chrome via CDP): page renders in light + dark,
  demo tabs switch, autocomplete + validation demos respond, 0 console errors.

## Out of scope (YAGNI)

- No mapping library / interactive map.
- No real API calls — all demo data is placeholder, clearly mocked.
- No new routes; CTAs use existing `/docs` and `/trust`.
- No test runner (repo has none).
