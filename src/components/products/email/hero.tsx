import { Link } from "react-router"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

const COVERAGE = ["Syntax", "MX + SMTP", "Risk score"]

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="bg-graticule pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-24 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-20">
        <span
          className="reveal inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 font-mono text-[0.7rem] tracking-wide text-muted-foreground backdrop-blur"
          style={{ animationDelay: "0ms" }}
        >
          <span className="size-1.5 rounded-full bg-primary" />
          Email Verify
        </span>

        <h1
          className="reveal mt-6 max-w-3xl font-heading text-5xl leading-[1.05] font-medium tracking-tight text-balance sm:text-6xl"
          style={{ animationDelay: "80ms" }}
        >
          Catch bad email{" "}
          <span className="text-primary">before it bounces.</span>
        </h1>

        <p
          className="reveal mt-6 max-w-xl text-lg text-muted-foreground"
          style={{ animationDelay: "160ms" }}
        >
          Syntax, MX, SMTP and risk scoring in one call — so typos, disposables
          and risky addresses never reach your send list or your sender
          reputation.
        </p>

        <div
          className="reveal mt-8 flex flex-wrap gap-3"
          style={{ animationDelay: "240ms" }}
        >
          <Button asChild size="lg">
            <Link to="/docs">
              Start free trial <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/contact">Talk to an expert</Link>
          </Button>
        </div>

        <div
          className="reveal mt-8 flex flex-wrap gap-2"
          style={{ animationDelay: "320ms" }}
        >
          {COVERAGE.map((c) => (
            <span
              key={c}
              className="rounded-full border bg-background/60 px-2.5 py-1 font-mono text-[0.7rem] text-muted-foreground"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
