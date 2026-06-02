import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type QA = { q: string; a: string }

const FAQS: QA[] = [
  {
    q: "What does AMAS certification mean, and how does it cut return mail?",
    a: "AMAS — the Address Matching Approval System — is Australia Post's certification that an address has been matched and corrected against the authoritative Postal Address File. Mailing AMAS-corrected addresses reduces returned and undeliverable mail, and qualifies your lodgement for Australia Post bulk-mail discounts.",
  },
  {
    q: "What's covered in Australia and New Zealand?",
    a: "Australian postal addresses come from Australia Post's PAF and are AMAS certified. New Zealand postal addresses come from NZ Post. Both are geocoded with G-NAF. MailPoint covers postal addresses only — there is no international coverage.",
  },
  {
    q: "What is a DPID and a barcode, and why do they matter?",
    a: "A DPID (Delivery Point Identifier) is Australia Post's unique ID for a single delivery point. The barcode encodes it for automated sorting. Returning both means your mail is ready for lodgement and eligible for bulk-mail pricing.",
  },
  {
    q: "Do you support PO Boxes and Parcel Lockers?",
    a: "Yes. PO Boxes and Parcel Lockers are first-class delivery points in MailPoint, validated and returned with their DPID and barcode just like street addresses — unlike validators built only for physical street addresses.",
  },
  {
    q: "Why no international addresses or reverse geocoding?",
    a: "MailPoint is purpose-built for the Australian and New Zealand mail stream, so it stays focused on authoritative postal data. For worldwide address validation use G-NAF Verify with optional Global Services; for coordinate-to-address lookups use G-NAF Verify's reverse geocoding.",
  },
  {
    q: "How does pricing work?",
    a: "Every plan includes a free sandbox and all of MailPoint's capabilities. You start free, then scale by lookup volume — see Pricing for tiers, or talk to an expert for enterprise and on-prem.",
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
