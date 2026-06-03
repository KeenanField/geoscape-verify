import * as React from "react"
import { Check, MapPin, Search } from "lucide-react"

import { cn } from "@/lib/utils"

type Suggestion = {
  full: string
  locality: string
  state: string
  postcode: string
  lat: string
  lng: string
  pid: string
}

// Placeholder G-NAF records — real product hits the live API.
const ADDRESSES: Suggestion[] = [
  {
    full: "32 Currie Street",
    locality: "Adelaide",
    state: "SA",
    postcode: "5000",
    lat: "-34.92410",
    lng: "138.59760",
    pid: "GASA_414913476",
  },
  {
    full: "200 George Street",
    locality: "Sydney",
    state: "NSW",
    postcode: "2000",
    lat: "-33.86419",
    lng: "151.20835",
    pid: "GANSW_705124883",
  },
  {
    full: "120 Collins Street",
    locality: "Melbourne",
    state: "VIC",
    postcode: "3000",
    lat: "-37.81467",
    lng: "144.96780",
    pid: "GAVIC_424021178",
  },
  {
    full: "1 William Street",
    locality: "Brisbane",
    state: "QLD",
    postcode: "4000",
    lat: "-27.47192",
    lng: "153.02410",
    pid: "GAQLD_155902014",
  },
  {
    full: "Parliament Drive",
    locality: "Canberra",
    state: "ACT",
    postcode: "2600",
    lat: "-35.30802",
    lng: "149.12451",
    pid: "GAACT_900221007",
  },
]

function label(s: Suggestion) {
  return `${s.full}, ${s.locality} ${s.state} ${s.postcode}`
}

export function AddressDemo() {
  const [query, setQuery] = React.useState("")
  const [selected, setSelected] = React.useState<Suggestion | null>(null)
  const [open, setOpen] = React.useState(false)
  const [active, setActive] = React.useState(0)

  const matches = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return ADDRESSES.filter((a) => label(a).toLowerCase().includes(q)).slice(
      0,
      5
    )
  }, [query])

  const choose = (s: Suggestion) => {
    setSelected(s)
    setQuery(label(s))
    setOpen(false)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open || matches.length === 0) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActive((i) => (i + 1) % matches.length)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActive((i) => (i - 1 + matches.length) % matches.length)
    } else if (e.key === "Enter") {
      e.preventDefault()
      choose(matches[active])
    } else if (e.key === "Escape") {
      setOpen(false)
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-2xl shadow-primary/5">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-3">
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="ml-2 font-mono text-xs text-muted-foreground">
          POST /v1/address/verify
        </span>
        <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[0.7rem] text-emerald-600 dark:text-emerald-400">
          <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
          live sandbox
        </span>
      </div>

      <div className="grid gap-0 md:grid-cols-[1.1fr_1fr]">
        {/* input + suggestions */}
        <div className="border-b p-6 md:border-r md:border-b-0">
          <label className="mb-2 block font-mono text-[0.7rem] tracking-wide text-muted-foreground uppercase">
            Start typing an Australian address
          </label>
          <div className="relative">
            <div className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2.5 focus-within:ring-2 focus-within:ring-primary/40">
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setSelected(null)
                  setOpen(true)
                  setActive(0)
                }}
                onFocus={() => setOpen(true)}
                onKeyDown={onKeyDown}
                placeholder="e.g. 200 George Street"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                aria-label="Address search"
              />
            </div>

            {open && matches.length > 0 && (
              <ul className="absolute inset-x-0 top-full z-10 mt-1.5 overflow-hidden rounded-lg border bg-popover shadow-lg">
                {matches.map((m, i) => (
                  <li key={m.pid}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onClick={() => choose(m)}
                      className={cn(
                        "flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm",
                        i === active ? "bg-accent" : "bg-transparent"
                      )}
                    >
                      <MapPin className="size-4 shrink-0 text-primary" />
                      <span className="truncate">{label(m)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <p className="mt-3 font-mono text-[0.7rem] text-muted-foreground">
            {matches.length > 0 && !selected
              ? `${matches.length} match${matches.length > 1 ? "es" : ""} from 15.4M G-NAF records`
              : "Autocomplete · validation · geocoding in one call"}
          </p>
        </div>

        {/* verified result */}
        <div className="bg-graticule-fine p-6">
          {selected ? (
            <div className="flex h-full flex-col gap-4">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 font-mono text-[0.7rem] font-medium text-emerald-700 dark:text-emerald-400">
                <Check className="size-3.5" /> VERIFIED
              </span>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 font-mono text-xs">
                <Field k="locality" v={selected.locality} />
                <Field k="state" v={selected.state} />
                <Field k="postcode" v={selected.postcode} />
                <Field k="g-naf pid" v={selected.pid} />
                <Field k="latitude" v={selected.lat} />
                <Field k="longitude" v={selected.lng} />
              </dl>
              <div className="mt-auto rounded-md border border-dashed bg-background/60 px-3 py-2 font-mono text-[0.7rem] text-muted-foreground">
                geocoded to rooftop · confidence 0.99
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-44 flex-col items-center justify-center gap-2 text-center">
              <MapPin className="size-7 text-muted-foreground/40" />
              <p className="max-w-[18ch] text-sm text-muted-foreground">
                Select a suggestion to see the verified, geocoded result.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Field({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-[0.65rem] tracking-wide text-muted-foreground uppercase">
        {k}
      </dt>
      <dd className="truncate text-foreground">{v}</dd>
    </div>
  )
}
