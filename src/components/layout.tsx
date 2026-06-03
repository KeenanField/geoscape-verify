import { Outlet } from "react-router"

import { ScrollToTop } from "@/components/scroll-to-top"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"

export function Layout() {
  return (
    <div className="flex min-h-svh flex-col">
      <ScrollToTop />
      <SiteNav />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
