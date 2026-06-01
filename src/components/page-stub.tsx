type PageStubProps = {
  title: string
  tagline?: string
}

export function PageStub({ title, tagline }: PageStubProps) {
  return (
    <section className="mx-auto flex min-h-[60svh] max-w-3xl flex-col justify-center gap-4 px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      {tagline ? (
        <p className="text-lg text-muted-foreground">{tagline}</p>
      ) : null}
      <p className="text-sm text-muted-foreground">Coming soon.</p>
    </section>
  )
}
