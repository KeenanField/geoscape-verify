import { Route, Routes } from "react-router"

import { Layout } from "@/components/layout"
import { PageStub } from "@/components/page-stub"
import { Home } from "@/pages/home"

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />

        <Route
          path="products/gnaf"
          element={
            <PageStub
              title="G-NAF Verify"
              tagline="Address validation, autocomplete and geocoding, powered by G-NAF®."
            />
          }
        />
        <Route
          path="products/mailpoint"
          element={
            <PageStub
              title="MailPoint Verify"
              tagline="AMAS-certified mail verification and Australia Post discounts."
            />
          }
        />
        <Route
          path="products/phone"
          element={
            <PageStub
              title="Phone Verify"
              tagline="Validate Australian and international mobile and landline numbers."
            />
          }
        />
        <Route
          path="products/email"
          element={
            <PageStub
              title="Email Verify"
              tagline="Syntax, MX, SMTP and risk scoring in one call."
            />
          }
        />

        <Route
          path="solutions/onboarding"
          element={
            <PageStub
              title="Onboarding & KYC"
              tagline="Verify identity-adjacent data at signup."
            />
          }
        />
        <Route
          path="solutions/mail"
          element={
            <PageStub
              title="Mail & Billing"
              tagline="Cut return mail and qualify for AusPost discounts."
            />
          }
        />
        <Route
          path="solutions/crm"
          element={
            <PageStub
              title="Marketing & CRM"
              tagline="Keep databases clean, deliverable and compliant."
            />
          }
        />
        <Route
          path="solutions/logistics"
          element={
            <PageStub
              title="Logistics & Field Services"
              tagline="Geocode to the rooftop, not the street."
            />
          }
        />
        <Route
          path="solutions/government"
          element={
            <PageStub
              title="Government & Utilities"
              tagline="Authoritative data for service delivery."
            />
          }
        />

        <Route
          path="developers"
          element={
            <PageStub
              title="Developers"
              tagline="Free sandbox, clean REST API, and SDKs for Node, Python, .NET and Java."
            />
          }
        />
        <Route
          path="pricing"
          element={
            <PageStub
              title="Pricing"
              tagline="Tier comparison and bundle calculator."
            />
          }
        />
        <Route
          path="trust"
          element={
            <PageStub
              title="Trust"
              tagline="Security, compliance, data provenance and certifications."
            />
          }
        />
        <Route
          path="customers"
          element={
            <PageStub
              title="Customers"
              tagline="Trusted by government, banks, insurers and utilities."
            />
          }
        />
        <Route
          path="about"
          element={
            <PageStub
              title="About"
              tagline="The Geoscape story — why we make G-NAF, and why that matters."
            />
          }
        />

        <Route
          path="*"
          element={
            <PageStub
              title="Page not found"
              tagline="The page you're looking for doesn't exist."
            />
          }
        />
      </Route>
    </Routes>
  )
}

export default App
