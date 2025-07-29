import type React from "react"
import type { Metadata } from "next"
import { MobileFloatingActionButtons } from "../../components/global/mobile-floating-action-buttons"

export const metadata: Metadata = {
  title: "All New Honda CR-V | Honda Permata Serpong",
  description:
    "Jelajahi All New Honda CR-V dengan desain premium, teknologi canggih, dan performa tangguh. SUV mewah untuk kenyamanan dan petualangan keluarga Anda.",
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
