import * as React from "react"
import { Check, Wand2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type Example = {
  raw: string
  standardised: string
  postcode: string
  dpid: string
  barcode: string
  lat: string
  lng: string
  flags: string[]
}

// Placeholder records — real product validates against AusPost PAF / NZ Post.
const EXAMPLES: Example[] = [
  {
    raw: "12 bourke st melb vic",
    standardised: "12 Bourke Street, Melbourne VIC 3000",
    postcode: "3000",
    dpid: "61320578",
    barcode: "13011 01100 10011 00101 010",
    lat: "-37.81467",
    lng: "144.96780",
    flags: ["corrected", "postcode added", "deliverable"],
  },
  {
    raw: "po box 1234 sydney nsw",
    standardised: "PO Box 1234, Sydney NSW 2001",
    postcode: "2001",
    dpid: "78451209",
    barcode: "13011 00110 10100 11001 010",
    lat: "-33.86419",
    lng: "151.20835",
    flags: ["PO Box", "deliverable"],
  },
  {
    raw: "parcel locker 100 234 567 brisbane",
    standardised: "Parcel Locker 100234567, Brisbane QLD 4000",
    postcode: "4000",
    dpid: "90233415",
    barcode: "13011 01010 01100 10110 010",
    lat: "-27.47192",
    lng: "153.02410",
    flags: ["Parcel Locker", "deliverable"],
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
          POST /v1/mail/validate
        </span>
      </div>

      <div className="grid gap-0 md:grid-cols-[1.1fr_1fr]">
        <div className="border-b p-6 md:border-r md:border-b-0">
          <label className="mb-2 block font-mono text-[0.7rem] tracking-wide text-muted-foreground uppercase">
            Messy postal input
          </label>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex, i) => (
              <button
                key={ex.dpid}
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
            AMAS-certified against AusPost PAF — returns DPID &amp; barcode.
          </p>
        </div>

        <div className="bg-graticule-fine p-6">
          {result ? (
            <div className="flex h-full flex-col gap-4">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 font-mono text-[0.7rem] font-medium text-emerald-700 dark:text-emerald-400">
                <Check className="size-3.5" /> DELIVERABLE
              </span>
              <p className="text-sm font-medium">{result.standardised}</p>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 font-mono text-xs">
                <div className="flex flex-col gap-0.5">
                  <dt className="text-[0.65rem] tracking-wide text-muted-foreground uppercase">
                    dpid
                  </dt>
                  <dd>{result.dpid}</dd>
                </div>
                <div className="flex flex-col gap-0.5">
                  <dt className="text-[0.65rem] tracking-wide text-muted-foreground uppercase">
                    postcode
                  </dt>
                  <dd>{result.postcode}</dd>
                </div>
                <div className="col-span-2 flex flex-col gap-1">
                  <dt className="text-[0.65rem] tracking-wide text-muted-foreground uppercase">
                    barcode
                  </dt>
                  <dd className="font-mono text-[0.65rem] tracking-[0.2em] text-muted-foreground">
                    {result.barcode}
                  </dd>
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
                Click Validate for the standardised, deliverable result.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
