import { Link } from "react-router"
import { AtSign, ArrowUpRight, MapPin, Mail, Phone } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type Product = {
  icon: LucideIcon
  name: string
  href: string
  blurb: string
  points: string[]
  className: string
  featured?: boolean
}

const PRODUCTS: Product[] = [
  {
    icon: MapPin,
    name: "G-NAF Verify",
    href: "/products/gnaf",
    blurb:
      "Real-time address validation, autocomplete and rooftop geocoding — powered by G-NAF®, the dataset the rest of the industry depends on.",
    points: ["15.4M addresses", "Autocomplete", "Lat/long geocoding"],
    className: "md:col-span-2 md:row-span-2",
    featured: true,
  },
  {
    icon: Mail,
    name: "MailPoint Verify",
    href: "/products/mailpoint",
    blurb:
      "AMAS-certified mail verification. Cut return mail and qualify for Australia Post bulk discounts.",
    points: ["AMAS certified", "Return-mail reduction"],
    className: "md:col-span-2",
  },
  {
    icon: Phone,
    name: "Phone Verify",
    href: "/products/phone",
    blurb:
      "Validate AU & international mobile and landline numbers. Detect carrier, line type and disconnections.",
    points: ["Carrier & line type", "Live disconnection"],
    className: "md:col-span-1",
  },
  {
    icon: AtSign,
    name: "Email Verify",
    href: "/products/email",
    blurb:
      "Catch typos, disposables and risky addresses. Syntax, MX, SMTP and risk scoring in one call.",
    points: ["MX + SMTP", "Risk scoring"],
    className: "md:col-span-1",
  },
]

export function ProductsBento() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <div className="max-w-2xl">
        <p className="font-mono text-[0.7rem] tracking-[0.2em] text-primary uppercase">
          One API · four modules
        </p>
        <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
          Every contact point, verified at the source.
        </h2>
      </div>

      <div className="mt-12 grid auto-rows-fr gap-4 md:grid-cols-4">
        {PRODUCTS.map((p) => (
          <Link
            key={p.name}
            to={p.href}
            className={cn(
              "group relative flex flex-col overflow-hidden rounded-xl border bg-card p-6 transition hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5",
              p.className
            )}
          >
            {p.featured && (
              <div className="bg-graticule pointer-events-none absolute inset-0 opacity-60" />
            )}
            <div className="relative flex h-full flex-col">
              <div className="flex items-start justify-between">
                <span className="inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <p.icon className="size-5" />
                </span>
                <ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
              </div>
              <h3
                className={cn(
                  "mt-4 font-medium tracking-tight",
                  p.featured ? "text-2xl" : "text-lg"
                )}
              >
                {p.name}
              </h3>
              <p
                className={cn(
                  "mt-2 text-muted-foreground",
                  p.featured ? "max-w-md text-base" : "text-sm"
                )}
              >
                {p.blurb}
              </p>
              <ul className="mt-auto flex flex-wrap gap-2 pt-5">
                {p.points.map((pt) => (
                  <li
                    key={pt}
                    className="rounded-full border bg-background/60 px-2.5 py-1 font-mono text-[0.7rem] text-muted-foreground"
                  >
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
