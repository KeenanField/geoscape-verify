import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddressDemo } from "@/components/home/address-demo"
import { ValidationDemo } from "@/components/products/mailpoint/validation-demo"

export function MailpointDemo() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-[0.7rem] tracking-[0.2em] text-primary uppercase">
          Live sandbox
        </p>
        <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
          Try it on a real postal address.
        </h2>
      </div>

      <Tabs defaultValue="autocomplete" className="mt-10 items-center">
        <TabsList>
          <TabsTrigger value="autocomplete">Autocomplete</TabsTrigger>
          <TabsTrigger value="validation">Validation</TabsTrigger>
        </TabsList>
        <TabsContent value="autocomplete" className="mt-8 w-full">
          <AddressDemo />
        </TabsContent>
        <TabsContent value="validation" className="mt-8 w-full">
          <ValidationDemo />
        </TabsContent>
      </Tabs>
    </section>
  )
}
