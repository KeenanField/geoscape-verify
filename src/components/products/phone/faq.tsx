import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type QA = { q: string; a: string }

const FAQS: QA[] = [
  {
    q: "What does carrier and line-type detection return?",
    a: "For each number we return the current carrier (including after porting) and the line type — mobile, landline or VoIP — so you can route SMS, calls and verification appropriately.",
  },
  {
    q: "How is disconnection detected?",
    a: "We check the number against live carrier data to flag disconnected, unallocated and unreachable numbers, so you can suppress them before sending.",
  },
  {
    q: "What coverage do you have outside Australia?",
    a: "Alongside full Australian mobile and landline coverage, Phone Verify validates international numbers across more than 200 countries and their numbering plans from the same API.",
  },
  {
    q: "What format do you return numbers in?",
    a: "Numbers are normalised to E.164 (for example +61412345678) so they're consistent and ready to store, alongside a national-format representation.",
  },
  {
    q: "How does pricing work?",
    a: "Every plan includes a free sandbox and all of Phone Verify's capabilities. You start free, then scale by lookup volume — see Pricing for tiers, or talk to an expert for enterprise and on-prem.",
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
