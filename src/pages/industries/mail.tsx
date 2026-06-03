import {
  Barcode,
  Mailbox,
  PackageCheck,
  Send,
  TrendingDown,
  Zap,
} from "lucide-react"

import { IndustryPage } from "@/components/industries/industry-page"
import type { IndustryData } from "@/components/industries/types"

const DATA: IndustryData = {
  eyebrow: "Mail & Billing",
  headline: "Cut return mail and unlock",
  headlineAccent: "AusPost discounts.",
  subcopy:
    "Validate every postal address against AusPost PAF before you lodge — so statements and parcels arrive, returns drop, and your mail qualifies for bulk discounts.",
  audience: ["Billing ops", "Utilities", "Mailhouses", "Insurance"],
  pains: [
    {
      pain: "Return-to-sender mail wastes print, postage and staff time chasing customers.",
      outcome: "AMAS-corrected addresses arrive the first time.",
    },
    {
      pain: "Un-barcoded mail misses Australia Post bulk-mail discounts.",
      outcome: "Every record returns a DPID and barcode, ready to lodge.",
    },
    {
      pain: "PO Boxes and Parcel Lockers trip up street-only validators.",
      outcome: "First-class support for every delivery point type.",
    },
  ],
  capabilities: [
    {
      icon: Mailbox,
      category: "Validation",
      title: "AMAS-certified addresses",
      body: "Standardise and confirm postal addresses against AusPost PAF and NZ Post before lodgement.",
    },
    {
      icon: Barcode,
      category: "DPID & barcode",
      title: "Ready for the mail stream",
      body: "Return the Delivery Point Identifier and barcode on every address for sorting and discounts.",
    },
    {
      icon: PackageCheck,
      category: "Coverage",
      title: "PO Boxes & Parcel Lockers",
      body: "Validate every delivery point type, not just physical street addresses.",
    },
    {
      icon: TrendingDown,
      category: "Returns",
      title: "Slash return mail",
      body: "Correct and confirm deliverability up front so statements and parcels stop bouncing back.",
    },
    {
      icon: Zap,
      category: "Batch",
      title: "Clean the whole file",
      body: "Run your entire mailing list through batch validation and collect results via webhook or file.",
    },
    {
      icon: Send,
      category: "Discounts",
      title: "Qualify for bulk pricing",
      body: "Lodging AMAS-corrected, barcoded mail unlocks Australia Post bulk-mail discounts.",
    },
  ],
  products: ["mailpoint", "gnaf"],
  stats: [
    { value: "−40%", label: "Return-to-sender mail" },
    { value: "$$$", label: "Saved via bulk-mail discounts" },
    { value: "100%", label: "Records barcoded for lodgement" },
  ],
  faqs: [
    {
      q: "How does this qualify my mail for AusPost discounts?",
      a: "MailPoint is AMAS certified: it matches and corrects addresses against Australia Post's PAF and returns the DPID and barcode. Lodging AMAS-corrected, barcoded mail is what unlocks bulk-mail discount tiers.",
    },
    {
      q: "Do you handle PO Boxes and Parcel Lockers?",
      a: "Yes — both are first-class delivery points, validated and returned with their DPID and barcode just like street addresses.",
    },
    {
      q: "Can I clean an existing mailing list in bulk?",
      a: "Yes. Submit your whole file to batch validation and receive standardised, AMAS-corrected results with DPIDs and barcodes via webhook or file download.",
    },
    {
      q: "What about New Zealand mail?",
      a: "New Zealand postal addresses are covered via NZ Post. MailPoint is built for the Australian and New Zealand mail stream — postal addresses only.",
    },
  ],
  ctaHeading: "Send mail that actually arrives.",
}

export function Mail() {
  return <IndustryPage data={DATA} />
}
