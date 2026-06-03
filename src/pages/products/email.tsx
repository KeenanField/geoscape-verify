import { Hero } from "@/components/products/email/hero"
import { TrustBand } from "@/components/products/email/trust-band"
import { DemoSection } from "@/components/products/email/demo-section"
import { Features } from "@/components/products/email/features"
import { Coverage } from "@/components/products/email/coverage"
import { Faq } from "@/components/products/email/faq"
import { CtaBand } from "@/components/products/email/cta-band"

export function EmailVerify() {
  return (
    <>
      <Hero />
      <TrustBand />
      <DemoSection />
      <Features />
      <Coverage />
      <Faq />
      <CtaBand />
    </>
  )
}
