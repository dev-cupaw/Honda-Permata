"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button" // Corrected import
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { MegaMenu } from "./mega-menu"
import { useClickOutside } from "@/hooks/use-click-outside"
import { getWhatsAppNumber } from "@/lib/contact-config"



export function DesktopHeader() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = React.useState(false)
  const [isClickMode, setIsClickMode] = React.useState(false) // Track if menu was opened by click
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)
  const headerRef = React.useRef<HTMLElement>(null)
  const whatsappNumber = getWhatsAppNumber()

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    // Only open on hover if not in click mode
    if (!isClickMode) {
      setIsMegaMenuOpen(true)
    }
  }

  const handleMouseLeave = () => {
    // Only close on mouse leave if not in click mode
    if (!isClickMode) {
      timeoutRef.current = setTimeout(() => {
        setIsMegaMenuOpen(false)
      }, 200) // Delay closing by 200ms
    }
  }

  const handleMenuClick = () => {
    // Toggle mega menu on click and enter click mode
    setIsClickMode(true)
    setIsMegaMenuOpen(!isMegaMenuOpen)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  const handleCloseMegaMenu = () => {
    setIsMegaMenuOpen(false)
    setIsClickMode(false) // Reset click mode when closing
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  // Use the optimized useClickOutside hook to prevent memory leaks
  useClickOutside(
    headerRef,
    handleCloseMegaMenu,
    isClickMode && isMegaMenuOpen // Only enabled when in click mode and menu is open
  )

  return (
    <header ref={headerRef} className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto relative flex h-24 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/honda-permata-logo/logo-hondapermata.svg"
            alt="Honda Permata Logo"
            width={240}
            height={80}
            className="object-contain h-8 w-auto"
            priority
            quality={100}
            unoptimized
          />
        </Link>

        {/* Navigation Menu - Absolutely centered */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ml-14">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/" className={navigationMenuTriggerStyle()}>Beranda</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <NavigationMenuTrigger onClick={handleMenuClick}>Mobil</NavigationMenuTrigger>
                <NavigationMenuContent>
                  {/* MegaMenu is rendered outside NavigationMenuContent to allow full width */}
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/tentang" className={navigationMenuTriggerStyle()}>Tentang</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/promo" className={navigationMenuTriggerStyle()}>Promo</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/testimoni" className={navigationMenuTriggerStyle()}>Testimoni</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/kontak" className={navigationMenuTriggerStyle()}>Kontak</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/brochure" className={navigationMenuTriggerStyle()}>Brochures</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Button */}
        <Button
          asChild
          className="hidden md:flex text-white font-medium px-4 py-2 rounded-md transition-all duration-300 hover:opacity-90"
          style={{ backgroundColor: 'rgb(0, 111, 188)' }}
        >
          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
            <Phone className="mr-2 h-4 w-4" /> Hubungi Kami
          </a>
        </Button>
      </div>
      <MegaMenu
        isOpen={isMegaMenuOpen}
        onClose={handleCloseMegaMenu}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </header>
  );
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"
