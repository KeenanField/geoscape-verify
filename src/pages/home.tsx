import { Link } from "react-router"

import { Button } from "@/components/ui/button"

export function Home() {
  return (
    <section className="mx-auto flex min-h-[70svh] max-w-4xl flex-col justify-center gap-6 px-6 py-20">
      <p className="text-sm font-medium text-muted-foreground">
        Australia's authoritative contact data platform
      </p>
      <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        From address to inbox — verified at the source.
      </h1>
      <p className="max-w-2xl text-lg text-muted-foreground">
        Geoscape Verify is verification built by the trusted authors of G-NAF —
        with phone and email validation in the same API.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link to="/developers">Start free</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/products/gnaf">Explore products</Link>
        </Button>
      </div>
    </section>
  )
}
