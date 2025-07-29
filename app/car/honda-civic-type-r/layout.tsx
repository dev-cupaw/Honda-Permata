import type React from "react"
import type { Metadata } from "next"
import { MobileFloatingActionButtons } from "../../components/global/mobile-floating-action-buttons"

export const metadata: Metadata = {
  title: "Honda Civic Type R | Honda Permata Serpong",
  description:
    "Jelajahi Honda Civic Type R, mobil sport legendaris dengan performa balap, desain agresif, dan teknologi canggih. Rasakan sensasi berkendara di lintasan.",
}

export default function CarDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}
      <MobileFloatingActionButtons />
    </>
  )
}
