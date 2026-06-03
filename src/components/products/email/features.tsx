import * as React from "react"
import { AtSign, Check, Gauge, Server, Trash2, UserX } from "lucide-react"

import { cn } from "@/lib/utils"

type Feature = {
  category: string
  title: string
  body: string
  visual: React.ReactNode
  className: string
}

function VisualPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-graticule-fine relative h-52 shrink-0 overflow-hidden border-b">
      <div className="absolute inset-0 flex items-center justify-center p-6">
        {children}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-card to-transparent" />
    </div>
  )
}

const SyntaxVisual = (
  <div className="w-full max-w-xs rounded-lg border bg-background/80 p-3 font-mono text-xs shadow-sm">
    <div className="flex items-center gap-2">
      <AtSign className="size-3.5 text-primary" />
      <span className="text-foreground">ada@geoscape.com.au</span>
    </div>
    <div className="mt-2 flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
      <Check className="size-3.5" /> valid format
    </div>
  </div>
)

const MxVisual = (
  <div className="w-full max-w-[13rem] rounded-lg border bg-background/80 p-3 font-mono text-xs shadow-sm">
    <div className="flex items-center gap-2 border-b pb-2 text-muted-foreground">
      <Server className="size-3.5 text-primary" /> MX records
    </div>
    <div className="mt-2 flex items-center justify-between">
      <span className="text-muted-foreground">aspmx.l.google.com</span>
      <span className="text-foreground">10</span>
    </div>
    <div className="mt-1 flex items-center justify-between">
      <span className="text-muted-foreground">alt1.aspmx…</span>
      <span className="text-foreground">20</span>
    </div>
  </div>
)

const SmtpVisual = (
  <div className="w-full max-w-[13rem] rounded-lg border bg-background/80 p-3 font-mono text-[0.7rem] shadow-sm">
    <div className="text-muted-foreground">RCPT TO:&lt;ada@…&gt;</div>
    <div className="mt-1 text-emerald-600 dark:text-emerald-400">
      250 2.1.5 OK
    </div>
    <div className="mt-1 text-muted-foreground">mailbox exists</div>
  </div>
)

const DisposableVisual = (
  <div className="flex w-full max-w-[12rem] flex-col gap-2 font-mono text-[0.7rem]">
    <span className="inline-flex items-center gap-1 rounded-full border border-red-500/30 bg-red-500/10 px-2 py-1 text-red-700 dark:text-red-400">
      <Trash2 className="size-3" /> disposable
    </span>
    <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-1 text-amber-700 dark:text-amber-400">
      <UserX className="size-3" /> role: sales@
    </span>
  </div>
)

const ScoreVisual = (
  <div className="flex w-full max-w-[12rem] flex-col items-center gap-3">
    <Gauge className="size-10 text-primary" />
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
      <div className="h-full w-1/5 rounded-full bg-emerald-500" />
    </div>
    <span className="font-mono text-[0.7rem] text-muted-foreground">
      risk 4/100 · low
    </span>
  </div>
)

const FEATURES: Feature[] = [
  {
    category: "Syntax validation",
    title: "Catch typos and malformed addresses",
    body: "Confirm an address is RFC-correct before anything else — the cheapest bounce to prevent.",
    visual: SyntaxVisual,
    className: "lg:col-span-3 lg:rounded-tl-4xl max-lg:rounded-t-4xl",
  },
  {
    category: "MX record check",
    title: "Can the domain receive mail at all?",
    body: "Look up the domain's MX records to confirm there's a mail server ready to accept delivery.",
    visual: MxVisual,
    className: "lg:col-span-3 lg:rounded-tr-4xl",
  },
  {
    category: "SMTP mailbox check",
    title: "Does the mailbox actually exist?",
    body: "A live SMTP probe confirms the specific mailbox accepts mail — without sending anything.",
    visual: SmtpVisual,
    className: "lg:col-span-2 lg:rounded-bl-4xl",
  },
  {
    category: "Disposable & role",
    title: "Flag throwaways and role accounts",
    body: "Detect disposable domains and role addresses like sales@ or info@ that signal low intent.",
    visual: DisposableVisual,
    className: "lg:col-span-2",
  },
  {
    category: "Risk scoring",
    title: "One score for deliverability",
    body: "Roll every signal into a single 0–100 risk score so you can accept, challenge or block in one check.",
    visual: ScoreVisual,
    className: "lg:col-span-2 lg:rounded-br-4xl max-lg:rounded-b-4xl",
  },
]

export function Features() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <div className="max-w-2xl">
        <p className="font-mono text-[0.7rem] tracking-[0.2em] text-primary uppercase">
          Capabilities
        </p>
        <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
          Every check between a typo and a bounce.
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
        {FEATURES.map((f) => (
          <div
            key={f.category}
            className={cn(
              "group relative flex flex-col overflow-hidden rounded-xl border bg-card transition hover:shadow-lg hover:shadow-primary/5",
              f.className
            )}
          >
            <VisualPanel>{f.visual}</VisualPanel>
            <div className="flex flex-1 flex-col p-8 pt-6">
              <p className="font-mono text-[0.7rem] tracking-[0.15em] text-primary uppercase">
                {f.category}
              </p>
              <h3 className="mt-2 font-heading text-xl font-medium tracking-tight">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
