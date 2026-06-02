import * as React from "react"
import { AtSign, Check, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CheckRow = { label: string; pass: boolean }
type Risk = "low" | "medium" | "high"

type Example = {
  raw: string
  checks: CheckRow[]
  flags: string[]
  score: number
  risk: Risk
}

// Placeholder records — real product runs live MX/SMTP checks.
const EXAMPLES: Example[] = [
  {
    raw: "ada@geoscape.com.au",
    checks: [
      { label: "syntax", pass: true },
      { label: "mx", pass: true },
      { label: "smtp", pass: true },
    ],
    flags: ["deliverable"],
    score: 4,
    risk: "low",
  },
  {
    raw: "sales@gmial.com",
    checks: [
      { label: "syntax", pass: true },
      { label: "mx", pass: false },
      { label: "smtp", pass: false },
    ],
    flags: ["typo: gmail.com?", "undeliverable"],
    score: 82,
    risk: "high",
  },
  {
    raw: "user@mailinator.com",
    checks: [
      { label: "syntax", pass: true },
      { label: "mx", pass: true },
      { label: "smtp", pass: true },
    ],
    flags: ["disposable", "high risk"],
    score: 71,
    risk: "high",
  },
]

const RISK_TONE: Record<Risk, string> = {
  low: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  medium: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  high: "bg-red-500/10 text-red-700 dark:text-red-400",
}

export function EmailDemo() {
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
          POST /v1/email/verify
        </span>
      </div>

      <div className="grid gap-0 md:grid-cols-[1.1fr_1fr]">
        <div className="border-b p-6 md:border-r md:border-b-0">
          <label className="mb-2 block font-mono text-[0.7rem] tracking-wide text-muted-foreground uppercase">
            Email address
          </label>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex, i) => (
              <button
                key={ex.raw}
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
            <AtSign className="size-4" /> Verify
          </Button>
          <p className="mt-3 font-mono text-[0.7rem] text-muted-foreground">
            Syntax, MX, SMTP and risk scoring in one call.
          </p>
        </div>

        <div className="bg-graticule-fine p-6">
          {result ? (
            <div className="flex h-full flex-col gap-4">
              <span
                className={cn(
                  "inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[0.7rem] font-medium",
                  RISK_TONE[result.risk]
                )}
              >
                risk {result.score}/100 · {result.risk}
              </span>
              <ul className="flex flex-col gap-1.5 font-mono text-xs">
                {result.checks.map((c) => (
                  <li key={c.label} className="flex items-center gap-2">
                    {c.pass ? (
                      <Check className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <X className="size-3.5 text-red-600 dark:text-red-400" />
                    )}
                    <span className="text-muted-foreground">{c.label}</span>
                  </li>
                ))}
              </ul>
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
              <AtSign className="size-7 text-muted-foreground/40" />
              <p className="max-w-[20ch] text-sm text-muted-foreground">
                Click Verify to run syntax, MX, SMTP and risk checks.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
