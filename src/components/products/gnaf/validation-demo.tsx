import * as React from "react"
import { Check, Wand2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type Example = {
  raw: string
  standardised: string
  locality: string
  state: string
  postcode: string
  pid: string
  flags: string[]
}

// Placeholder records — real product validates against G-NAF.
const EXAMPLES: Example[] = [
  {
    raw: "12 bourke st melb vic",
    standardised: "12 Bourke Street, Melbourne VIC 3000",
    locality: "Melbourne",
    state: "VIC",
    postcode: "3000",
    pid: "GAVIC_424037215",
    flags: ["corrected", "postcode added", "verified"],
  },
  {
    raw: "Unit 5 200 geroge street sydney",
    standardised: "5/200 George Street, Sydney NSW 2000",
    locality: "Sydney",
    state: "NSW",
    postcode: "2000",
    pid: "GANSW_705124883",
    flags: ["typo fixed", "unit parsed", "verified"],
  },
  {
    raw: "1 william st brisbane qld",
    standardised: "1 William Street, Brisbane QLD 4000",
    locality: "Brisbane",
    state: "QLD",
    postcode: "4000",
    pid: "GAQLD_155902014",
    flags: ["standardised", "postcode added", "verified"],
  },
]

export function ValidationDemo() {
  const [index, setIndex] = React.useState(0)
  const [result, setResult] = React.useState<Example | null>(null)
  const current = EXAMPLES[index]

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-2xl shadow-primary/5">
      <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-3">
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="ml-2 font-mono text-xs text-muted-foreground">
          POST /v1/address/validate
        </span>
      </div>

      <div className="grid gap-0 md:grid-cols-[1.1fr_1fr]">
        <div className="border-b p-6 md:border-r md:border-b-0">
          <label className="mb-2 block font-mono text-[0.7rem] tracking-wide text-muted-foreground uppercase">
            Messy input
          </label>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex, i) => (
              <button
                key={ex.pid}
                type="button"
                onClick={() => {
                  setIndex(i)
                  setResult(null)
                }}
                className={cn(
                  "rounded-md border px-2.5 py-1.5 text-left font-mono text-xs",
                  i === index
                    ? "border-primary/50 bg-primary/5 text-foreground"
                    : "bg-background text-muted-foreground"
                )}
              >
                {ex.raw}
              </button>
            ))}
          </div>
          <Button className="mt-4" onClick={() => setResult(current)}>
            <Wand2 className="size-4" /> Validate
          </Button>
          <p className="mt-3 font-mono text-[0.7rem] text-muted-foreground">
            Standardise, correct and confirm against 15.4M G-NAF records.
          </p>
        </div>

        <div className="bg-graticule-fine p-6">
          {result ? (
            <div className="flex h-full flex-col gap-4">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 font-mono text-[0.7rem] font-medium text-emerald-700 dark:text-emerald-400">
                <Check className="size-3.5" /> VERIFIED
              </span>
              <p className="text-sm font-medium">{result.standardised}</p>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 font-mono text-xs">
                <div className="flex flex-col gap-0.5">
                  <dt className="text-[0.65rem] tracking-wide text-muted-foreground uppercase">
                    g-naf pid
                  </dt>
                  <dd className="truncate">{result.pid}</dd>
                </div>
                <div className="flex flex-col gap-0.5">
                  <dt className="text-[0.65rem] tracking-wide text-muted-foreground uppercase">
                    postcode
                  </dt>
                  <dd>{result.postcode}</dd>
                </div>
              </dl>
              <div className="mt-auto flex flex-wrap gap-2">
                {result.flags.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border bg-background/60 px-2.5 py-1 font-mono text-[0.7rem] text-muted-foreground"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-44 flex-col items-center justify-center gap-2 text-center">
              <Wand2 className="size-7 text-muted-foreground/40" />
              <p className="max-w-[20ch] text-sm text-muted-foreground">
                Click Validate to standardise and verify the address.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
