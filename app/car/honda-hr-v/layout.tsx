import type React from "react"
import type { Metadata } from "next"
import { MobileFloatingActionButtons } from "../../components/global/mobile-floating-action-buttons"

export const metadata: Metadata = {
  title: "Honda HR-V | Honda Permata Serpong",
  description:
    "Jelajahi Honda HR-V terbaru dengan desain stylish, fitur canggih, dan performa responsif. Pilihan sempurna untuk gaya hidup urban Anda.",
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
