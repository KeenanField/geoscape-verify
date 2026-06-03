import * as React from "react"
import { Link, useLocation } from "react-router"
import { Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { navConfig, isMenu, type NavLink } from "@/components/nav-config"

function DesktopNav({ pathname }: { pathname: string }) {
  return (
    <NavigationMenu viewport={false} className="hidden md:flex">
      <NavigationMenuList>
        {navConfig.map((entry) =>
          isMenu(entry) ? (
            <NavigationMenuItem key={entry.label}>
              <NavigationMenuTrigger
                onClick={(e) => {
                  // Hover opens the menu; don't let a click close it again
                  // (avoids accidentally dismissing the menu you just opened).
                  // Radix skips its own toggle when the event's default is
                  // prevented, so the menu only closes on mouse-leave.
                  if (e.currentTarget.getAttribute("data-state") === "open") {
                    e.preventDefault()
                  }
                }}
              >
                {entry.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[22rem] gap-1 p-2">
                  {entry.items.map((item) => (
                    <li key={item.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={item.href}
                          data-active={pathname === item.href}
                          className="flex-col items-start"
                        >
                          <span className="font-medium">{item.label}</span>
                          {item.description ? (
                            <span className="text-muted-foreground">
                              {item.description}
                            </span>
                          ) : null}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={entry.href}>
              <NavigationMenuLink asChild>
                <Link
                  to={entry.href}
                  data-active={pathname === entry.href}
                  className={navigationMenuTriggerStyle()}
                >
                  {entry.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function MobileNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = React.useState(false)

  const flatLink = (item: NavLink) => (
    <Link
      key={item.href}
      to={item.href}
      onClick={() => setOpen(false)}
      data-active={pathname === item.href}
      className={cn(
        "rounded-md px-2 py-1.5 text-sm hover:bg-muted data-[active=true]:bg-muted"
      )}
    >
      {item.label}
    </Link>
  )

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 px-4 pb-6">
          {navConfig.map((entry) =>
            isMenu(entry) ? (
              <div key={entry.label} className="flex flex-col gap-1">
                <span className="px-2 text-xs font-medium text-muted-foreground">
                  {entry.label}
                </span>
                {entry.items.map(flatLink)}
              </div>
            ) : (
              flatLink(entry)
            )
          )}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export function SiteNav() {
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-6">
        <Link to="/" className="font-semibold tracking-tight">
          Geoscape Verify
        </Link>
        <DesktopNav pathname={pathname} />
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="hidden md:inline-flex">
            <Link to="/developers">Sign In</Link>
          </Button>
          <Button asChild className="hidden md:inline-flex">
            <Link to="/developers">Start free</Link>
          </Button>
          <MobileNav pathname={pathname} />
        </div>
      </div>
    </header>
  )
}
