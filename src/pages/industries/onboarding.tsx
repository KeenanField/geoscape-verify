import {
  AtSign,
  MapPin,
  Phone,
  ShieldCheck,
  UserCheck,
  Zap,
} from "lucide-react"

import { IndustryPage } from "@/components/industries/industry-page"
import type { IndustryData } from "@/components/industries/types"

const DATA: IndustryData = {
  eyebrow: "Onboarding & KYC",
  headline: "Stop bad data slipping through",
  headlineAccent: "at signup.",
  subcopy:
    "Verify addresses, phones and emails the moment a customer signs up — so identity checks pass, fraud is caught early, and good customers aren't made to wait.",
  audience: ["KYC", "Fintech", "Banking", "Insurance"],
  pains: [
    {
      pain: "Customers fat-finger addresses and emails at signup, breaking downstream identity and delivery checks.",
      outcome: "Validated, standardised data captured at the source.",
    },
    {
      pain: "Disposable emails and disconnected numbers let fraudulent signups through.",
      outcome: "Risk scoring and live line checks flag them instantly.",
    },
    {
      pain: "Manual review queues slow good customers down and inflate cost-per-onboard.",
      outcome: "Auto-pass clean records; review only the genuinely risky.",
    },
  ],
  capabilities: [
    {
      icon: MapPin,
      category: "Address",
      title: "Verify identity-adjacent data",
      body: "Confirm residential addresses against G-NAF in real time, ready for KYC and AML matching.",
    },
    {
      icon: AtSign,
      category: "Email",
      title: "Catch disposables and typos",
      body: "Syntax, MX and SMTP checks plus a risk score stop throwaway and mistyped emails at the door.",
    },
    {
      icon: Phone,
      category: "Phone",
      title: "Confirm a reachable number",
      body: "Validate the number and check it's live, so OTP and contact flows actually reach the customer.",
    },
    {
      icon: UserCheck,
      category: "Autocomplete",
      title: "Frictionless capture",
      body: "Address autocomplete means fewer keystrokes, fewer errors and higher form completion.",
    },
    {
      icon: ShieldCheck,
      category: "Risk",
      title: "Score before you accept",
      body: "Combine address, phone and email signals into a clear accept / review / block decision.",
    },
    {
      icon: Zap,
      category: "Speed",
      title: "Real-time, single API",
      body: "Every check returns in one call, so onboarding stays instant even at peak volume.",
    },
  ],
  products: ["gnaf", "email", "phone"],
  stats: [
    { value: "−35%", label: "Fraudulent signups blocked at the door" },
    { value: "+18%", label: "Form completion with autocomplete" },
    { value: "<300ms", label: "Verification per contact point" },
  ],
  faqs: [
    {
      q: "Can I run all three checks in one onboarding step?",
      a: "Yes. Address, phone and email verification are one API, so you can validate every contact point in a single onboarding call and get a combined result back.",
    },
    {
      q: "Does this replace my KYC/AML provider?",
      a: "No — it complements it. Verify cleans and confirms the contact data your identity provider matches against, which lifts match rates and cuts false reviews.",
    },
    {
      q: "How do you help reduce manual review?",
      a: "Clean, verified records can be auto-passed, while disposable emails, disconnected numbers and unverifiable addresses are flagged for review — so your team only sees the genuinely risky cases.",
    },
    {
      q: "Is customer data handled securely?",
      a: "Verify is ISO 27001 certified and IRAP assessed, with SSO, SCIM and on-prem options for regulated environments.",
    },
  ],
  ctaHeading: "Onboard good customers faster.",
}

export function Onboarding() {
  return <IndustryPage data={DATA} />
}
