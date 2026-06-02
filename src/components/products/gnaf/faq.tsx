import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type QA = { q: string; a: string }

const FAQS: QA[] = [
  {
    q: "How accurate is the data, and where does it come from?",
    a: "G-NAF Verify is built on G-NAF® — the Geocoded National Address File — which Geoscape produces as Australia's authoritative address dataset. It covers 15.4M addresses and is updated daily, so you validate against the source rather than a scraped or stitched copy.",
  },
  {
    q: "What's covered in Australia, New Zealand, and globally?",
    a: "Australia and New Zealand are covered natively with authoritative data. For addresses in other countries, optional Global Services validate and standardise worldwide addresses through the same API, so you don't need a second vendor.",
  },
  {
    q: "Can I run this on-premise or in my own environment?",
    a: "Yes. Alongside the hosted API we offer on-prem and private deployment options for organisations with data-residency or sovereignty requirements, including government and critical infrastructure.",
  },
  {
    q: "Are there batch size limits?",
    a: "Batch validation is designed for whole-database cleansing — submit millions of records per job and receive results via webhook or file. Practical limits depend on your plan; enterprise plans are sized to your volume.",
  },
  {
    q: "How does pricing work?",
    a: "Every plan includes a free sandbox and all of G-NAF Verify's capabilities. You start free, then scale by lookup volume — see Pricing for tiers, or talk to an expert for enterprise and on-prem.",
  },
]

export function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      <div className="text-center">
        <p className="font-mono text-[0.7rem] tracking-[0.2em] text-primary uppercase">
          FAQ
        </p>
        <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
          Questions, answered.
        </h2>
      </div>

      <Accordion type="single" collapsible className="mt-10">
        {FAQS.map((f, i) => (
          <AccordionItem key={f.q} value={`item-${i}`}>
            <AccordionTrigger className="text-left text-base font-medium">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
