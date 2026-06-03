import { Hero } from "@/components/home/hero"
import { LogoCloud } from "@/components/home/logo-cloud"
import { ProductsBento } from "@/components/home/products-bento"
import { WhyGeoscape } from "@/components/home/why-geoscape"
import { PricingCta } from "@/components/home/pricing-cta"

export function Home() {
  return (
    <>
      <Hero />
      <LogoCloud />
      <ProductsBento />
      <WhyGeoscape />
      <PricingCta />
    </>
  )
}
