import { Link } from "react-router"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AddressDemo } from "@/components/home/address-demo"

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="bg-graticule pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-24 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div className="reveal" style={{ animationDelay: "0ms" }}>
          <span className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 font-mono text-[0.7rem] tracking-wide text-muted-foreground backdrop-blur">
            <span className="size-1.5 rounded-full bg-primary" />
            The team behind G-NAF®
          </span>
        </div>

        <h1
          className="reveal mt-6 max-w-3xl font-heading text-5xl leading-[1.05] font-medium tracking-tight text-balance sm:text-6xl"
          style={{ animationDelay: "80ms" }}
        >
          Australia&rsquo;s most current address data.{" "}
          <span className="text-primary">Verified.</span>
        </h1>

        <p
          className="reveal mt-6 max-w-xl text-lg text-muted-foreground"
          style={{ animationDelay: "160ms" }}
        >
          From address to inbox — one API for address, mail, phone and email,
          built on Australia&rsquo;s authoritative data and updated daily.
        </p>

        <div
          className="reveal mt-8 flex flex-wrap gap-3"
          style={{ animationDelay: "240ms" }}
        >
          <Button asChild size="lg">
            <Link to="/docs">
              Start free <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/products/gnaf">Explore products</Link>
          </Button>
        </div>

        <div className="reveal mt-14" style={{ animationDelay: "340ms" }}>
          <AddressDemo />
        </div>
      </div>
    </section>
  )
}
