import { Hero } from "@/components/products/phone/hero"
import { TrustBand } from "@/components/products/phone/trust-band"
import { DemoSection } from "@/components/products/phone/demo-section"
import { Features } from "@/components/products/phone/features"
import { Coverage } from "@/components/products/phone/coverage"
import { Faq } from "@/components/products/phone/faq"
import { CtaBand } from "@/components/products/phone/cta-band"

export function PhoneVerify() {
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
