import * as React from "react"
import { Link } from "react-router"
import { ArrowRight, Building2, CircleCheck, Mail, MapPin } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { GridBackdrop } from "@/components/ui/grid-backdrop"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"

const INTERESTS = [
  "G-NAF Verify (address)",
  "MailPoint Verify (mail)",
  "Phone Verify",
  "Email Verify",
  "Multiple modules",
  "Not sure yet",
]

const VOLUMES = [
  "Under 50k lookups / mo",
  "50k – 500k / mo",
  "500k – 5M / mo",
  "5M+ / mo",
]

const DETAILS = [
  {
    icon: Mail,
    title: "Prefer email?",
    body: "sales@geoscape.com.au — we reply within one business day.",
  },
  {
    icon: Building2,
    title: "Enterprise & government",
    body: "Custom SLAs, SSO/SCIM and on-prem deployment for regulated teams.",
  },
  {
    icon: MapPin,
    title: "Australian-based team",
    body: "Built and supported locally by the team behind G-NAF.",
  },
]

const FIELD = "mt-1.5 h-10 w-full text-sm"

type Errors = Partial<Record<"name" | "email" | "message", string>>

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function ContactForm() {
  const [submitted, setSubmitted] = React.useState(false)
  const [errors, setErrors] = React.useState<Errors>({})

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = (data.get("name") as string)?.trim() ?? ""
    const email = (data.get("email") as string)?.trim() ?? ""
    const message = (data.get("message") as string)?.trim() ?? ""

    const next: Errors = {}
    if (!name) next.name = "Please enter your name."
    if (!email) next.email = "Please enter your email."
    else if (!isEmail(email)) next.email = "Enter a valid email address."
    if (!message) next.message = "Tell us a little about what you need."

    setErrors(next)
    if (Object.keys(next).length === 0) {
      // No backend in this marketing build — show a confirmation state.
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className="flex min-h-[28rem] flex-col items-center justify-center gap-4 rounded-2xl border bg-card p-10 text-center">
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <CircleCheck className="size-6" />
        </span>
        <h2 className="font-heading text-2xl font-medium tracking-tight">
          Thanks — we&rsquo;ve got it.
        </h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          An expert from our team will be in touch within one business day. In
          the meantime, you can start building in the free sandbox.
        </p>
        <Button asChild className="mt-2">
          <Link to="/docs">
            Explore the docs <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="rounded-2xl border bg-card p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            className={FIELD}
            placeholder="Ada Lovelace"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-destructive">{errors.name}</p>
          )}
        </div>
        <div className="sm:col-span-1">
          <Label htmlFor="email">Work email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            className={FIELD}
            placeholder="ada@company.com.au"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-destructive">{errors.email}</p>
          )}
        </div>
        <div className="sm:col-span-1">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            name="company"
            autoComplete="organization"
            className={FIELD}
            placeholder="Acme Pty Ltd"
          />
        </div>
        <div className="sm:col-span-1">
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={FIELD}
            placeholder="0400 000 000"
          />
        </div>
        <div className="sm:col-span-1">
          <Label htmlFor="interest">I&rsquo;m interested in</Label>
          <NativeSelect id="interest" name="interest" className={FIELD}>
            {INTERESTS.map((i) => (
              <NativeSelectOption key={i} value={i}>
                {i}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
        <div className="sm:col-span-1">
          <Label htmlFor="volume">Expected volume</Label>
          <NativeSelect id="volume" name="volume" className={FIELD}>
            {VOLUMES.map((v) => (
              <NativeSelectOption key={v} value={v}>
                {v}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="message">How can we help?</Label>
          <Textarea
            id="message"
            name="message"
            rows={4}
            aria-invalid={!!errors.message}
            className="mt-1.5 w-full text-sm"
            placeholder="Tell us about your use case, systems and timelines."
          />
          {errors.message && (
            <p className="mt-1 text-xs text-destructive">{errors.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto">
        Send message <ArrowRight className="size-4" />
      </Button>
      <p className="mt-3 text-xs text-muted-foreground">
        By submitting you agree to be contacted about Geoscape Verify. We
        won&rsquo;t share your details.
      </p>
    </form>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b">
      <GridBackdrop />
      <div className="pointer-events-none absolute -top-24 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-12 text-center sm:pt-28">
        <span
          className="reveal inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 font-mono text-[0.7rem] tracking-wide text-muted-foreground backdrop-blur"
          style={{ animationDelay: "0ms" }}
        >
          <span className="size-1.5 rounded-full bg-primary" />
          Contact us
        </span>
        <h1
          className="reveal mx-auto mt-6 max-w-3xl font-heading text-5xl leading-[1.05] font-medium tracking-tight text-balance sm:text-6xl"
          style={{ animationDelay: "80ms" }}
        >
          Talk to an <span className="text-primary">expert.</span>
        </h1>
        <p
          className="reveal mx-auto mt-6 max-w-xl text-lg text-muted-foreground"
          style={{ animationDelay: "160ms" }}
        >
          Tell us what you&rsquo;re building and we&rsquo;ll help you scope the
          right modules, volume and deployment — usually within one business
          day.
        </p>
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <>
      <Hero />
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <ContactForm />
          <div className="flex flex-col gap-4">
            {DETAILS.map((d) => (
              <div
                key={d.title}
                className={cn(
                  "flex gap-4 rounded-xl border bg-card p-6",
                  "lg:border-0 lg:bg-transparent lg:p-0 lg:pt-2"
                )}
              >
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <d.icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-medium">{d.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{d.body}</p>
                </div>
              </div>
            ))}
            <div className="mt-2 rounded-xl border bg-muted/30 p-6">
              <p className="font-mono text-[0.7rem] tracking-[0.2em] text-muted-foreground uppercase">
                Just want to build?
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                You don&rsquo;t need to talk to us to start. Spin up a free
                sandbox and make your first verified call in minutes.
              </p>
              <Button asChild variant="outline" size="sm" className="mt-4">
                <Link to="/docs">Start free</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
