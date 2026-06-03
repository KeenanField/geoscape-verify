import {
  BadgeCheck,
  Building2,
  Database,
  Landmark,
  MapPin,
  ShieldCheck,
} from "lucide-react"

import { IndustryPage } from "@/components/industries/industry-page"
import type { IndustryData } from "@/components/industries/types"

const DATA: IndustryData = {
  eyebrow: "Government & Utilities",
  headline: "Authoritative data for",
  headlineAccent: "service delivery.",
  subcopy:
    "Built by the team behind G-NAF. Verify and geocode addresses against Australia's authoritative dataset — with the security, sovereignty and deployment options the public sector requires.",
  audience: ["Government", "Utilities", "Emergency services", "Health"],
  pains: [
    {
      pain: "Citizen records drift out of date, misdirecting services and correspondence.",
      outcome: "Validated, standardised addresses keep records accurate.",
    },
    {
      pain: "Non-authoritative data creates mismatches across agencies and systems.",
      outcome: "One authoritative source — G-NAF — aligns everyone.",
    },
    {
      pain: "Data residency and security requirements rule out many vendors.",
      outcome: "On-prem, IRAP-assessed deployment keeps data sovereign.",
    },
  ],
  capabilities: [
    {
      icon: Landmark,
      category: "Authoritative",
      title: "Straight from the source",
      body: "Geoscape produces G-NAF — your addresses are verified against the authoritative dataset itself.",
    },
    {
      icon: MapPin,
      category: "Geocoding",
      title: "Precise location data",
      body: "Rooftop geocoding supports planning, asset management and emergency response.",
    },
    {
      icon: Database,
      category: "Data quality",
      title: "Align records across agencies",
      body: "Standardise and de-duplicate addresses so systems and departments share one consistent view.",
    },
    {
      icon: ShieldCheck,
      category: "Security",
      title: "Sovereign and assessed",
      body: "ISO 27001 certified and IRAP assessed, with on-prem and private deployment for data residency.",
    },
    {
      icon: BadgeCheck,
      category: "Compliance",
      title: "Defensible provenance",
      body: "Authoritative, traceable data provenance stands up to audit and public scrutiny.",
    },
    {
      icon: Building2,
      category: "Scale",
      title: "Built for the enterprise",
      body: "99.95% SLA, SSO, SCIM and batch processing for whole-of-government workloads.",
    },
  ],
  products: ["gnaf", "mailpoint"],
  stats: [
    { value: "G-NAF", label: "The authoritative source, made by us" },
    { value: "IRAP", label: "Assessed for government use" },
    { value: "99.95%", label: "Enterprise SLA" },
  ],
  faqs: [
    {
      q: "Why is Geoscape the authoritative choice?",
      a: "Geoscape produces G-NAF — the Geocoded National Address File — which the rest of the industry depends on. With Verify you're matching against the source, not a scraped or stitched copy.",
    },
    {
      q: "Can it be deployed on-premise or in a sovereign environment?",
      a: "Yes. Alongside the hosted API we offer on-prem and private deployment for agencies with data-residency and sovereignty requirements.",
    },
    {
      q: "Is it assessed for government security requirements?",
      a: "Verify is ISO 27001 certified and IRAP assessed, with SSO and SCIM for identity governance.",
    },
    {
      q: "Does it support whole-of-government scale?",
      a: "Yes — a 99.95% SLA, batch processing and enterprise controls support high-volume, mission-critical service delivery.",
    },
  ],
  ctaHeading: "Deliver services on data you can trust.",
}

export function Government() {
  return <IndustryPage data={DATA} />
}
