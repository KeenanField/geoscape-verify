import { Link } from "react-router"

import { Button } from "@/components/ui/button"
import { GridBackdrop } from "@/components/ui/grid-backdrop"

export function CtaBand() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 sm:pb-28">
      <div className="relative overflow-hidden rounded-2xl border bg-foreground text-background">
        <GridBackdrop tone="dark" />
        <div className="relative flex flex-col items-center gap-6 px-6 py-14 text-center">
          <h2 className="font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            Stop mailing addresses that bounce.
          </h2>
          <p className="max-w-xl text-background/70">
            Spin up a free sandbox, or talk to an expert about bulk lodgement,
            on-prem and enterprise volumes.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link to="/docs">Start free trial</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background"
            >
              <Link to="/contact">Talk to an expert</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
