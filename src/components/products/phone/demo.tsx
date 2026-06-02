import * as React from "react"
import { Check, Phone } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type Example = {
  raw: string
  e164: string
  country: string
  carrier: string
  lineType: string
  status: "active" | "disconnected"
}

// Placeholder records — real product hits live carrier data.
const EXAMPLES: Example[] = [
  {
    raw: "0412 345 678",
    e164: "+61412345678",
    country: "Australia",
    carrier: "Telstra",
    lineType: "mobile",
    status: "active",
  },
  {
    raw: "(02) 9374 4000",
    e164: "+61293744000",
    country: "Australia",
    carrier: "Telstra",
    lineType: "landline",
    status: "active",
  },
  {
    raw: "0400 000 000",
    e164: "+61400000000",
    country: "Australia",
    carrier: "—",
    lineType: "mobile",
    status: "disconnected",
  },
]

export function PhoneDemo() {
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
          POST /v1/phone/verify
        </span>
      </div>

      <div className="grid gap-0 md:grid-cols-[1.1fr_1fr]">
        <div className="border-b p-6 md:border-r md:border-b-0">
          <label className="mb-2 block font-mono text-[0.7rem] tracking-wide text-muted-foreground uppercase">
            Phone number
          </label>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex, i) => (
              <button
                key={ex.e164}
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
            <Phone className="size-4" /> Verify
          </Button>
          <p className="mt-3 font-mono text-[0.7rem] text-muted-foreground">
            Validate, normalise and check the line against live carrier data.
          </p>
        </div>

        <div className="bg-graticule-fine p-6">
          {result ? (
            <div className="flex h-full flex-col gap-4">
              <span
                className={cn(
                  "inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[0.7rem] font-medium",
                  result.status === "active"
                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                    : "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                )}
              >
                <Check className="size-3.5" />
                {result.status === "active" ? "ACTIVE" : "DISCONNECTED"}
              </span>
              <p className="font-mono text-sm font-medium">{result.e164}</p>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 font-mono text-xs">
                <div className="flex flex-col gap-0.5">
                  <dt className="text-[0.65rem] tracking-wide text-muted-foreground uppercase">
                    carrier
                  </dt>
                  <dd>{result.carrier}</dd>
                </div>
                <div className="flex flex-col gap-0.5">
                  <dt className="text-[0.65rem] tracking-wide text-muted-foreground uppercase">
                    line type
                  </dt>
                  <dd>{result.lineType}</dd>
                </div>
                <div className="flex flex-col gap-0.5">
                  <dt className="text-[0.65rem] tracking-wide text-muted-foreground uppercase">
                    country
                  </dt>
                  <dd>{result.country}</dd>
                </div>
                <div className="flex flex-col gap-0.5">
                  <dt className="text-[0.65rem] tracking-wide text-muted-foreground uppercase">
                    status
                  </dt>
                  <dd>{result.status}</dd>
                </div>
              </dl>
            </div>
          ) : (
            <div className="flex h-full min-h-44 flex-col items-center justify-center gap-2 text-center">
              <Phone className="size-7 text-muted-foreground/40" />
              <p className="max-w-[20ch] text-sm text-muted-foreground">
                Click Verify to check the carrier, line type and status.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
