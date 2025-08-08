import type React from "react"
import type { Metadata } from "next"

import "./globals.css"
import { DesktopHeader } from "./components/global/desktop-header"
import { MobileHeader } from "./components/global/mobile-header"
import { Footer } from "./components/global/footer"
import { MobileFloatingActionButtons } from "./components/global/mobile-floating-action-buttons"
import { DesktopFloatingActionButtons } from "./components/global/desktop-floating-action-buttons"
import { ConfigValidator } from "@/components/shared/config-validator"



export const metadata: Metadata = {
  title: "Honda Permata Serpong | Elon Musk - Sales Consultant",
  description:
    "Dealer resmi Honda terpercaya di Gading Serpong. Dapatkan promo terbaik, layanan profesional, dan wujudkan mobil Honda impian Anda bersama Elon Musk.",
  generator: 'v0.dev',
  icons: {
    icon: '/favicon.svg',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" data-scroll-behavior="smooth">
      <body className="font-sans">
        {/* Configuration validation component */}
        <ConfigValidator />
        
        {/* Apply sticky classes to the wrapper divs */}
        <div className="hidden lg:block sticky top-0 z-50">
          <DesktopHeader />
        </div>
        <div className="lg:hidden sticky top-0 z-50">
          <MobileHeader />
        </div>
        <main className="relative">{children}</main>
        <Footer />
        <MobileFloatingActionButtons />
        <DesktopFloatingActionButtons />
      </body>
    </html>
  )
}
