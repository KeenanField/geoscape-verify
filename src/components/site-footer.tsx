import type { ComponentProps } from "react"

import { Link } from "react-router"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type FooterLink = {
  name: string
  href: string
}

const FOOTER_LINKS: Record<
  "solutions" | "support" | "company" | "legal",
  FooterLink[]
> = {
  solutions: [
    { name: "Onboarding & KYC", href: "/industries/onboarding" },
    { name: "Mail & Billing", href: "/industries/mail" },
    { name: "Marketing & CRM", href: "/industries/crm" },
    { name: "Logistics & Field Services", href: "/industries/logistics" },
    { name: "Government & Utilities", href: "/industries/government" },
  ],
  support: [
    { name: "Submit ticket", href: "/contact" },
    { name: "Documentation", href: "/docs" },
    { name: "Guides", href: "/docs" },
  ],
  company: [
    { name: "About", href: "https://geoscape.com.au/about-us/" },
    { name: "Careers", href: "https://geoscape.com.au/careers/" },
    {
      name: "News",
      href: "https://geoscape.com.au/news-insights/?status=publish&orderby=date&per_page=12&active=all",
    },
  ],
  legal: [
    { name: "Terms of use", href: "https://geoscape.com.au/terms-of-use/" },
    {
      name: "Privacy policy",
      href: "https://geoscape.com.au/privacy-policy/",
    },
    {
      name: "Data copyright & disclaimer",
      href: "https://geoscape.com.au/data-copyright-disclaimer/",
    },
    { name: "Data security", href: "https://geoscape.com.au/data-security/" },
  ],
}

const TRUST_MARKERS = [
  "G-NAF®",
  "AMAS Certified by Australia Post",
  "ISO 27001",
  "IRAP assessed",
]

type SocialLink = {
  name: string
  href: string
  icon: (props: ComponentProps<"svg">) => React.ReactNode
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/geoscape-australia/",
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com/Geoscape_Au",
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@geoscapeaustralia",
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
]

function FooterLink({ name, href }: FooterLink) {
  const className =
    "text-sm text-muted-foreground transition-colors hover:text-foreground"

  return href.startsWith("http") ? (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {name}
    </a>
  ) : (
    <Link to={href} className={className}>
      {name}
    </Link>
  )
}

function FooterColumn({
  heading,
  links,
}: {
  heading: string
  links: FooterLink[]
}) {
  return (
    <div>
      <h3 className="font-mono text-xs tracking-wide text-foreground uppercase">
        {heading}
      </h3>
      <ul role="list" className="mt-6 space-y-4">
        {links.map((link) => (
          <li key={link.name}>
            <FooterLink {...link} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-8 sm:pt-20">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <FooterColumn
                heading="Solutions"
                links={FOOTER_LINKS.solutions}
              />
              <div className="mt-10 md:mt-0">
                <FooterColumn heading="Support" links={FOOTER_LINKS.support} />
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <FooterColumn heading="Company" links={FOOTER_LINKS.company} />
              <div className="mt-10 md:mt-0">
                <FooterColumn heading="Legal" links={FOOTER_LINKS.legal} />
              </div>
            </div>
          </div>

          <div className="mt-10 xl:mt-0">
            <h3 className="font-heading text-lg font-medium tracking-tight">
              From address to inbox — verified at the source.
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Product updates, data releases and developer guides, sent to your
              inbox monthly.
            </p>
            <form
              className="mt-6 sm:flex sm:max-w-md"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <Input
                id="footer-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@company.com.au"
                className="h-9 sm:w-64 xl:w-full"
              />
              <div className="mt-3 sm:mt-0 sm:ml-3 sm:shrink-0">
                <Button type="submit" className="w-full">
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <p className="font-mono text-xs tracking-wide text-muted-foreground">
            {TRUST_MARKERS.join(" · ")}
          </p>
        </div>

        <div className="mt-8 md:flex md:items-center md:justify-between">
          <div className="flex gap-x-6 md:order-2">
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon aria-hidden="true" className="size-5" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground md:order-1 md:mt-0">
            © PSMA Australia Limited trading as Geoscape Australia. ABN 23 089
            912 710
          </p>
        </div>
      </div>
    </footer>
  )
}
