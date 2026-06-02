# Phone Verify & Email Verify Product Pages — Design Spec

**Goal:** Flesh out the two remaining product pages — Phone Verify (`/products/phone`)
and Email Verify (`/products/email`), currently `PageStub`s — into full marketing
pages, reusing the section architecture and design language established by the G-NAF
Verify and MailPoint Verify pages. The two pages are near-identical siblings differing
only in content and the demo internals.

**Audience:** Developers and ops/marketing teams integrating contact-data validation;
secondary: enterprise buyers reducing fraud, bounce and wasted outreach.

## Design language (inherited)

- **Fonts:** Fraunces (`font-heading`), Inter (`font-sans`), JetBrains Mono (`font-mono`).
- **Accent:** existing primary blue. Semantic tokens only — light/dark both work.
- **Texture:** `.bg-graticule` / `.bg-graticule-fine`; `.reveal` staggered load.
- **CTAs:** primary **Start free trial** → `/docs`; secondary **Talk to an expert** → `/trust`.
- Small, focused components under `src/components/products/phone/` and
  `src/components/products/email/`, orchestrated by `src/pages/products/phone.tsx` and
  `src/pages/products/email.tsx`.
- All copy and demo data are placeholder, clearly mocked. No real API calls.

## Shared page structure (both pages, top to bottom)

1. **Hero** — mono eyebrow, Fraunces headline, subcopy, dual CTA, coverage chips,
   graticule background + soft primary glow. (Pattern identical to G-NAF/MailPoint hero.)
2. **Trust band** — row of text wordmarks.
3. **Live demo** — a **single** validation demo (no tabs): preset example chips + a
   Verify button → a data-terminal result card. Same card chrome as the existing demos
   (window dots + `POST /v1/...` label, `.bg-graticule-fine` result panel, emerald
   status badge, mono `dl` fields, flag pills).
4. **Bento features (5 cells)** — same bento as G-NAF/MailPoint
   (`lg:grid-cols-6 lg:grid-rows-2`, two wide top cells + three bottom, outer corners
   rounded `4xl`), each cell with an on-theme `VisualPanel` (token-built mini mockups,
   NOT external images).
5. **Coverage / data band** — inverted dark band (`bg-foreground text-background` +
   `.bg-graticule`), 3 stat cells.
6. **FAQ** — vendored `accordion`, ~5 Q&As.
7. **Closing CTA band** — inverted graticule CTA: Start free trial / Talk to an expert.

---

## Phone Verify (`/products/phone`, export `PhoneVerify`)

- **Hero:** headline leads on knowing a number is real before you dial/text. Coverage
  chips: `AU` · `International` · `Mobile + landline`.
- **Trust band markers:** `Real-time carrier data` · `AU + international` ·
  `Mobile & landline` · `ISO 27001` · `IRAP assessed`.
- **Demo (`PhoneDemo`):** preset numbers (an AU mobile, an AU landline, a disconnected
  number) → Verify → result card with: E.164 format, country, **carrier**,
  **line type** (mobile / landline / VoIP), **status** (active / disconnected). The
  disconnected example shows a non-emerald (amber) status and a `disconnected` flag.
  Endpoint label `POST /v1/phone/verify`.
- **Bento 5 cells:**
  1. Number validation — format + existence.
  2. Carrier lookup — current carrier / network.
  3. Line-type detection — mobile, landline, VoIP.
  4. Active & disconnection check — is it live right now.
  5. International coverage — AU plus worldwide numbering plans.
- **Coverage band stats:** e.g. `AU` mobile + landline · `200+` countries ·
  `Real-time` carrier/status. (Placeholder figures.)
- **FAQ (~5):** what does line-type/carrier detection return; how is disconnection
  detected; AU vs international coverage; format/normalisation (E.164); pricing.

## Email Verify (`/products/email`, export `EmailVerify`)

- **Hero:** headline leads on catching bad email before it bounces / protecting sender
  reputation. Coverage chips: `Syntax` · `MX + SMTP` · `Risk score`.
- **Trust band markers:** `Real-time SMTP checks` · `Disposable & role detection` ·
  `Risk scoring` · `ISO 27001` · `IRAP assessed`.
- **Demo (`EmailDemo`):** preset emails (a clean address, a typo'd domain, a disposable)
  → Verify → result card with a checklist of `syntax`, `mx`, `smtp` (each ✓/✗),
  disposable/role flags, and a **risk score** (0–100 with a low/medium/high band —
  clean = low/green, disposable = high/amber). Endpoint label `POST /v1/email/verify`.
- **Bento 5 cells:**
  1. Syntax validation — RFC-correct format.
  2. MX record check — domain can receive mail.
  3. SMTP mailbox check — the mailbox actually exists.
  4. Disposable & role detection — flag throwaway and role accounts.
  5. Risk scoring — a single deliverability/risk score.
- **Coverage band stats:** e.g. `Any domain` worldwide · `MX + SMTP` live checks ·
  `0–100` risk score. (Placeholder figures.)
- **FAQ (~5):** what the risk score means; how SMTP/mailbox check works (and catch-all
  domains); disposable/role detection; will it hurt deliverability / is it safe to run;
  pricing.

## Components & files

Per page (`<p>` = `phone` or `email`):
- Create: `src/components/products/<p>/{hero,demo,features,coverage,trust-band,faq,cta-band}.tsx`
- Modify: `src/pages/products/<p>.tsx` (replace stub, assemble sections).
- Reuse: `@/components/ui/{accordion,button}`, `cn()` from `@/lib/utils`.
- No vendored `tabs` needed (single demo, no tabs).
- No new dependencies. Icons from `lucide-react` (verify exports before use).

Note: each page's demo is bespoke (`PhoneDemo` / `EmailDemo`) and does NOT reuse the
home `AddressDemo` — the inputs and result shapes differ.

## Verification

- `bun run build` (typecheck + Vite) passes.
- `bunx eslint` clean on new/changed files.
- Browser smoke (headless Chrome via CDP) for each page: renders light + dark, the
  validation demo responds (Verify shows the result card), bento renders 5 cells, FAQ
  accordion expands, `0` console errors.

## Out of scope (YAGNI)

- No tabs on these demos (single validation demo each).
- No real API calls — all demo data placeholder, clearly mocked.
- No new routes; CTAs use existing `/docs` and `/trust`.
- No test runner (repo has none).
- Shared-component extraction (`VisualPanel`, inverted band, data-terminal card) across
  all four product pages remains a future refactor, not part of this work.
