import { Outlet } from "react-router"

import { ScrollToTop } from "@/components/scroll-to-top"
import { SiteNav } from "@/components/site-nav"

export function Layout() {
  return (
    <div className="flex min-h-svh flex-col">
      <ScrollToTop />
      <SiteNav />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-muted-foreground">
          <p>
            Powered by G-NAF® · AMAS Certified by Australia Post · ISO 27001 ·
            IRAP assessed
          </p>
          <p className="mt-2">© Geoscape. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
