import { Route, Routes } from "react-router"

import { Layout } from "@/components/layout"
import { Home } from "@/pages/home"
import { GnafVerify } from "@/pages/products/gnaf"
import { MailpointVerify } from "@/pages/products/mailpoint"
import { PhoneVerify } from "@/pages/products/phone"
import { EmailVerify } from "@/pages/products/email"
import { Onboarding } from "@/pages/industries/onboarding"
import { Mail } from "@/pages/industries/mail"
import { Crm } from "@/pages/industries/crm"
import { Logistics } from "@/pages/industries/logistics"
import { Government } from "@/pages/industries/government"
import { Developers } from "@/pages/docs"
import { Pricing } from "@/pages/pricing"
import { Trust } from "@/pages/trust"
import { Contact } from "@/pages/contact"
import { Customers } from "@/pages/customers"
import { About } from "@/pages/about"
import { NotFound } from "@/pages/not-found"

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="products/gnaf" element={<GnafVerify />} />
        <Route path="products/mailpoint" element={<MailpointVerify />} />
        <Route path="products/phone" element={<PhoneVerify />} />
        <Route path="products/email" element={<EmailVerify />} />

        <Route path="industries/onboarding" element={<Onboarding />} />
        <Route path="industries/mail" element={<Mail />} />
        <Route path="industries/crm" element={<Crm />} />
        <Route path="industries/logistics" element={<Logistics />} />
        <Route path="industries/government" element={<Government />} />

        <Route path="docs" element={<Developers />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="trust" element={<Trust />} />
        <Route path="contact" element={<Contact />} />
        <Route path="customers" element={<Customers />} />
        <Route path="about" element={<About />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
