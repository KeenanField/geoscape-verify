import { PhoneDemo } from "@/components/products/phone/demo"

export function DemoSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-[0.7rem] tracking-[0.2em] text-primary uppercase">
          Live sandbox
        </p>
        <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
          Check a number before you dial.
        </h2>
      </div>
      <div className="mx-auto mt-10 max-w-3xl">
        <PhoneDemo />
      </div>
    </section>
  )
}
