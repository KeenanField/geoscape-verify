const MARKERS = [
  "Real-time SMTP checks",
  "Disposable & role detection",
  "Risk scoring",
  "ISO 27001",
  "IRAP assessed",
]

export function TrustBand() {
  return (
    <section className="border-b bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-center font-mono text-[0.7rem] tracking-[0.2em] text-muted-foreground uppercase">
          Built on trusted foundations
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {MARKERS.map((m) => (
            <span
              key={m}
              className="text-sm font-semibold text-muted-foreground/80"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
