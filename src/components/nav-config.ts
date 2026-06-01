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
