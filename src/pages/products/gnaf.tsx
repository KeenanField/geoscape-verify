import { Hero } from "@/components/products/gnaf/hero"
import { GnafDemo } from "@/components/products/gnaf/demo"
import { Features } from "@/components/products/gnaf/features"
import { Coverage } from "@/components/products/gnaf/coverage"
import { TrustBand } from "@/components/products/gnaf/trust-band"
import { Faq } from "@/components/products/gnaf/faq"
import { CtaBand } from "@/components/products/gnaf/cta-band"

export function GnafVerify() {
  return (
    <>
      <Hero />
      <TrustBand />
      <GnafDemo />
      <Features />
      <Coverage />
      <Faq />
      <CtaBand />
    </>
  )
}
