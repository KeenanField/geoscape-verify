import { Clock, MapPin, PackageCheck, Phone, Route, Target } from "lucide-react"

import { IndustryPage } from "@/components/industries/industry-page"
import type { IndustryData } from "@/components/industries/types"

const DATA: IndustryData = {
  eyebrow: "Logistics & Field Services",
  headline: "Geocode to the rooftop,",
  headlineAccent: "not the street.",
  subcopy:
    "Validate and geocode every delivery address to a precise rooftop location — so drivers and field crews arrive at the right door, the first time.",
  audience: ["Last-mile", "Field services", "Fleet", "3PL"],
  pains: [
    {
      pain: "Street-centroid geocoding sends drivers to the middle of the road, not the property.",
      outcome: "Rooftop lat/long lands them at the actual door.",
    },
    {
      pain: "Mistyped delivery addresses cause failed drops and costly redeliveries.",
      outcome: "Validation catches bad addresses before dispatch.",
    },
    {
      pain: "Field crews can't reach customers to confirm access or arrival.",
      outcome: "Verified phone numbers keep the last 100m moving.",
    },
  ],
  capabilities: [
    {
      icon: Target,
      category: "Geocoding",
      title: "Rooftop precision",
      body: "Resolve every address to a precise rooftop lat/long with a confidence score — not a street centroid.",
    },
    {
      icon: MapPin,
      category: "Validation",
      title: "Confirm before dispatch",
      body: "Standardise and validate delivery addresses against G-NAF so bad drops never leave the depot.",
    },
    {
      icon: Route,
      category: "Routing",
      title: "Better route planning",
      body: "Accurate coordinates feed routing and ETA engines for tighter, cheaper runs.",
    },
    {
      icon: Phone,
      category: "Phone",
      title: "Reach the customer",
      body: "Validate mobile numbers so drivers and crews can confirm access and arrival windows.",
    },
    {
      icon: PackageCheck,
      category: "Capture",
      title: "Clean addresses at order",
      body: "Address autocomplete at checkout means fewer failed deliveries downstream.",
    },
    {
      icon: Clock,
      category: "Efficiency",
      title: "Fewer redeliveries",
      body: "Getting the location right the first time cuts failed-delivery cost and missed SLAs.",
    },
  ],
  products: ["gnaf", "phone"],
  stats: [
    { value: "−30%", label: "Failed first-attempt deliveries" },
    { value: "Rooftop", label: "Geocode precision on every drop" },
    { value: "+1hr", label: "Driver time saved per route" },
  ],
  faqs: [
    {
      q: "How precise is your geocoding?",
      a: "G-NAF Verify returns rooftop-level latitude and longitude for each address, with a confidence score — so navigation targets the property, not the middle of the street.",
    },
    {
      q: "Can I validate addresses before they reach dispatch?",
      a: "Yes. Validate and standardise at order capture or in batch, so unverifiable or mistyped addresses are corrected — or flagged — before a driver is ever assigned.",
    },
    {
      q: "Do you cover regional and rural addresses?",
      a: "Yes. G-NAF is Australia's authoritative address dataset and includes rural and locality addressing that generic geocoders frequently miss.",
    },
    {
      q: "Can drivers contact customers from verified data?",
      a: "Phone Verify confirms numbers are valid and live, so your field workflows can reach customers to arrange access and confirm arrival.",
    },
  ],
  ctaHeading: "Get to the right door, first time.",
}

export function Logistics() {
  return <IndustryPage data={DATA} />
}
