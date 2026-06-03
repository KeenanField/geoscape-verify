// Placeholder customer logos — rendered as wordmarks until real assets land.
const LOGOS = [
  "Commonwealth Services",
  "AusPost Digital",
  "Meridian Bank",
  "NSW Government",
  "Telco One",
  "Aurora Energy",
]

export function LogoCloud() {
  return (
    <section className="border-y bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <p className="text-center font-mono text-[0.7rem] tracking-[0.2em] text-muted-foreground uppercase">
          Trusted by government, banks, insurers &amp; utilities
        </p>
        <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
          {LOGOS.map((name) => (
            <div
              key={name}
              className="flex items-center justify-center text-center text-sm font-semibold text-muted-foreground/70 grayscale transition hover:text-foreground hover:grayscale-0"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
