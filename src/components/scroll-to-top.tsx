import * as React from "react"
import { useLocation } from "react-router"

// Reset scroll to the top on every route change. Without this, react-router
// preserves the previous page's scroll offset, so navigating from low on one
// page lands you part-way down the next.
export function ScrollToTop() {
  const { pathname } = useLocation()

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
