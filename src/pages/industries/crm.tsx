import {
  AtSign,
  Database,
  Megaphone,
  Phone,
  Sparkles,
  Target,
} from "lucide-react"

import { IndustryPage } from "@/components/industries/industry-page"
import type { IndustryData } from "@/components/industries/types"

const DATA: IndustryData = {
  eyebrow: "Marketing & CRM",
  headline: "Keep your database clean,",
  headlineAccent: "deliverable and compliant.",
  subcopy:
    "Validate contact data on the way in and cleanse what's already there — so campaigns reach real inboxes and phones, and your sender reputation stays intact.",
  audience: ["Marketing ops", "CRM", "Growth", "RevOps"],
  pains: [
    {
      pain: "Decayed and mistyped records mean emails bounce and SMS goes nowhere.",
      outcome: "Verified contacts keep deliverability high.",
    },
    {
      pain: "Disposable and role addresses inflate list size but never convert.",
      outcome: "Flag and suppress them before they cost you sends.",
    },
    {
      pain: "Duplicate, non-standard addresses fragment your single customer view.",
      outcome: "Standardised data merges cleanly across systems.",
    },
  ],
  capabilities: [
    {
      icon: AtSign,
      category: "Email",
      title: "Protect deliverability",
      body: "Syntax, MX and SMTP checks plus risk scoring keep hard bounces and spam traps out of your sends.",
    },
    {
      icon: Phone,
      category: "Phone",
      title: "Reachable SMS and call lists",
      body: "Validate numbers and detect disconnections so campaigns don't burn spend on dead lines.",
    },
    {
      icon: Database,
      category: "Hygiene",
      title: "Cleanse at scale",
      body: "Batch-validate your whole CRM to standardise, correct and de-duplicate existing records.",
    },
    {
      icon: Sparkles,
      category: "Capture",
      title: "Clean on the way in",
      body: "Address autocomplete and inline validation stop bad data entering the CRM in the first place.",
    },
    {
      icon: Target,
      category: "Segmentation",
      title: "Geocode for targeting",
      body: "Rooftop lat/long on every address powers location-based segments and territories.",
    },
    {
      icon: Megaphone,
      category: "Reputation",
      title: "Guard your sender score",
      body: "Removing risky addresses before send protects domain reputation and inbox placement.",
    },
  ],
  products: ["email", "phone", "gnaf"],
  stats: [
    { value: "−60%", label: "Hard bounces after cleansing" },
    { value: "+12%", label: "Inbox placement rate" },
    { value: "1", label: "Single, standardised customer view" },
  ],
  faqs: [
    {
      q: "Will verifying my list hurt deliverability?",
      a: "No. Checks are read-only — no email is ever sent during verification, so your sender reputation is untouched. Removing undeliverable and risky addresses actively protects it.",
    },
    {
      q: "Can I clean the data already in my CRM?",
      a: "Yes. Batch validation runs your existing database through the same checks, returning standardised, corrected and de-duplicated records you can sync back.",
    },
    {
      q: "Do you integrate with my CRM or CDP?",
      a: "Verify is a clean REST API with SDKs for Node, Python, .NET and Java, so it drops into form capture, ETL jobs and reverse-ETL syncs into most CRMs and CDPs.",
    },
    {
      q: "How do you handle disposable and role addresses?",
      a: "Email Verify flags disposable domains and role accounts like info@ or sales@, so you can suppress low-intent contacts from campaigns.",
    },
  ],
  ctaHeading: "Market to real people, not bad records.",
}

export function Crm() {
  return <IndustryPage data={DATA} />
}
