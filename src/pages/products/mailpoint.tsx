import { Hero } from "@/components/products/mailpoint/hero"
import { MailpointDemo } from "@/components/products/mailpoint/demo"
import { Features } from "@/components/products/mailpoint/features"
import { Coverage } from "@/components/products/mailpoint/coverage"
import { TrustBand } from "@/components/products/mailpoint/trust-band"
import { Faq } from "@/components/products/mailpoint/faq"
import { CtaBand } from "@/components/products/mailpoint/cta-band"

export function MailpointVerify() {
  return (
    <>
      <Hero />
      <TrustBand />
      <MailpointDemo />
      <Features />
      <Coverage />
      <Faq />
      <CtaBand />
    </>
  )
}
