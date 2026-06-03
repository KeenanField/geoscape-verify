import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type QA = { q: string; a: string }

const FAQS: QA[] = [
  {
    q: "What does the risk score mean?",
    a: "We roll every signal — syntax, MX, SMTP, disposable and role detection — into a single 0–100 score. Lower is safer; you choose thresholds to accept, challenge or block an address.",
  },
  {
    q: "How does the SMTP mailbox check work?",
    a: "We open an SMTP conversation with the receiving server and confirm the mailbox would accept mail, without ever delivering a message. For catch-all domains that accept everything, we flag the result as inconclusive rather than guessing.",
  },
  {
    q: "Do you detect disposable and role addresses?",
    a: "Yes. We flag disposable domains (throwaway inboxes) and role accounts such as info@ or sales@, both of which correlate with low engagement and higher risk.",
  },
  {
    q: "Is it safe to run against my list — will it hurt deliverability?",
    a: "Yes. Checks are read-only: no email is ever sent during verification, so your sender reputation is untouched. In fact, removing undeliverable and risky addresses protects it.",
  },
  {
    q: "How does pricing work?",
    a: "Every plan includes a free sandbox and all of Email Verify's capabilities. You start free, then scale by lookup volume — see Pricing for tiers, or talk to an expert for enterprise and on-prem.",
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
