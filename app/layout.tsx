import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { DesktopHeader } from "./components/global/desktop-header"
import { MobileHeader } from "./components/global/mobile-header"
import { Footer } from "./components/global/footer"
import { MobileFloatingActionButtons } from "./components/global/mobile-floating-action-buttons"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Honda Permata Serpong | Elon Musk - Sales Consultant",
  description:
    "Dealer resmi Honda terpercaya di Gading Serpong. Dapatkan promo terbaik, layanan profesional, dan wujudkan mobil Honda impian Anda bersama Elon Musk.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {/* Apply sticky classes to the wrapper divs */}
        <div className="hidden lg:block sticky top-0 z-50">
          <DesktopHeader />
        </div>
        <div className="lg:hidden sticky top-0 z-50">
          <MobileHeader />
        </div>
        <main>{children}</main>
        <Footer />
        <MobileFloatingActionButtons />
      </body>
    </html>
  )
}
