import type React from "react"
import type { Metadata } from "next"
import { MobileFloatingActionButtons } from "../../components/global/mobile-floating-action-buttons"

export const metadata: Metadata = {
  title: "New Honda City | Honda Permata Serpong",
  description:
    "Jelajahi New Honda City dengan desain elegan, interior mewah, dan performa efisien. Sedan premium yang sempurna untuk gaya hidup modern Anda.",
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
