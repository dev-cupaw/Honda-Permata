import type React from "react"
import type { Metadata } from "next"
import { MobileFloatingActionButtons } from "../../components/global/mobile-floating-action-buttons"

export const metadata: Metadata = {
  title: "New Honda Brio | Honda Permata Serpong",
  description:
    "Jelajahi New Honda Brio dengan desain stylish, performa lincah, dan efisiensi bahan bakar. Mobil perkotaan yang sempurna untuk gaya hidup dinamis Anda.",
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
