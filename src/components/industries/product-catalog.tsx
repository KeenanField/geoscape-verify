import { AtSign, Mail, MapPin, Phone } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import type { IndustryProduct } from "@/components/industries/types"

type ProductMeta = {
  name: string
  href: string
  blurb: string
  icon: LucideIcon
}

// Shared product metadata for the "Recommended products" cross-link section.
export const PRODUCT_CATALOG: Record<IndustryProduct, ProductMeta> = {
  gnaf: {
    name: "G-NAF Verify",
    href: "/products/gnaf",
    blurb: "Address validation, autocomplete and rooftop geocoding.",
    icon: MapPin,
  },
  mailpoint: {
    name: "MailPoint Verify",
    href: "/products/mailpoint",
    blurb: "AMAS-certified postal verification with DPID and barcodes.",
    icon: Mail,
  },
  phone: {
    name: "Phone Verify",
    href: "/products/phone",
    blurb: "Carrier, line-type and disconnection detection.",
    icon: Phone,
  },
  email: {
    name: "Email Verify",
    href: "/products/email",
    blurb: "Syntax, MX, SMTP and risk scoring in one call.",
    icon: AtSign,
  },
}
