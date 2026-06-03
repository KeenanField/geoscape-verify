import type { LucideIcon } from "lucide-react"

export type IndustryProduct = "gnaf" | "mailpoint" | "phone" | "email"

export type IndustryCapability = {
  icon: LucideIcon
  category: string
  title: string
  body: string
}

export type IndustryStat = {
  value: string
  label: string
}

export type IndustryFaq = {
  q: string
  a: string
}

export type IndustryData = {
  /** mono eyebrow, e.g. "ONBOARDING & KYC" */
  eyebrow: string
  /** outcome-led headline; wrap the emphasised phrase in {@link IndustryData.headlineAccent} */
  headline: string
  headlineAccent: string
  subcopy: string
  /** short audience chips, e.g. ["KYC", "Fintech", "Banking"] */
  audience: string[]
  /** three pains this industry feels, each paired with the Verify payoff */
  pains: { pain: string; outcome: string }[]
  /** "How Verify helps" bento cells (4 or 5) */
  capabilities: IndustryCapability[]
  /** products to recommend, in display order */
  products: IndustryProduct[]
  /** outcome proof stats (placeholder figures) */
  stats: IndustryStat[]
  faqs: IndustryFaq[]
  /** closing CTA band heading */
  ctaHeading: string
}
